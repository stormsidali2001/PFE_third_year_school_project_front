import { useEffect, useState } from "react"
import Link from "next/link"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import {useRouter} from 'next/router'
import { useStoreActions, useStoreState } from "../../store/hooks"
import AddIcon from "../../icons/AddIcon"
import ModalPortal from "../../components/ModalPortal"
import Select from 'react-select'
import OutLinedButton from "../../components/utils/outlinedButton"
import { BookOpen, Users, Users2, Plus } from "lucide-react"


const Theme = ({toastsRef}) => {
    const router = useRouter();
    const {themeId} = router.query;
    const {theme} = useStoreState(store=>store.themesModel)
    const {getThemeThunk,encadrerThemeThunk,assignTeamsToTeacher} = useStoreActions(store=>store.themesModel)
    const [open,setOpen] = useState(false)
    const [openAddTeam,setOpenAddTeam] = useState(false)
    const {getTeachers} = useStoreActions(store=>store.teacherListModel)
    const {teachers} = useStoreState(store=>store.teacherListModel)
    
    const [chosenTeacher,setChoosenTeacher] = useState(null)
    const [addTeamChosenTeacher,setAddTeamChosenTeacher] = useState(null)
    const [addTeamChosenTeam,setAddTeamChosenTeam] = useState(null)
    const user = useStoreState(store=>store.user)
    const isAdmin = user.userType === 'admin';

    useEffect(async ()=>{
        if(!themeId) return;
        console.log(themeId,'1111111')
        await  getThemeThunk(themeId)
       

    },[themeId])

    const handleOpenModal = async(e)=>{
        e.preventDefault();
        !open &&  await getTeachers();
        setOpen(o=>!o)

    }
    const handleOpenModalTeam = async(teacherId,firstName,lastName)=>{
        if(!openAddTeam){
            setOpenAddTeam(o=>!o)
            setAddTeamChosenTeacher({value:teacherId,label:firstName+' '+lastName})
            
        }
    }
    const handleEncadrerTheme = async e =>{
        e.preventDefault();
       
        if(!chosenTeacher?.value || !theme?.id){
            toastsRef.current.addMessage({
                text:'ops...error try again',
                mode:'Error'
            })
            return
        }
    
        try{
            await encadrerThemeThunk({
                themeId:theme.id,
                teacherId:chosenTeacher.value
            })
            toastsRef.current.addMessage({
                text:"c'est fait !!",
                mode:'Alert'
            })
            setOpen(false)
            await getThemeThunk(themeId)

        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({
                text:err?.response?.data?.message,
                mode:'Error'
            })
            setOpen(false)
        }
        
      
    }
    
    const handleSubmitAssignTeamsToTeacher = async e=>{
        e.preventDefault();
        try{
            console.log(addTeamChosenTeacher,'99999999999')
            await assignTeamsToTeacher({
                teacherId:addTeamChosenTeacher.value,
                teamIds:addTeamChosenTeam.map(el=>el?.value)
            })
            toastsRef.current.addMessage({
                text:"C'est fait!!",
                mode:'Alert'
            })
            setOpenAddTeam(false)
            setTimeout(async()=>{

                await getThemeThunk(themeId)
            },2000)

        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({
                text:err?.response?.data?.message,
                mode:'Error'
            })
            setOpenAddTeam(false)

        }
     
    }
    return (
        <div>
            <HorisontalNavbar />
            <StudentVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.back()}
                            className="mb-4 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                            style={{color: '#5375E2'}}
                        >
                            ← Retour
                        </button>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{color: '#1A2562'}}>Thème</h1>
                        <div className="h-1 w-20 rounded-full" style={{backgroundColor: '#5375E2'}}></div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        {/* Theme Description Card */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{color: '#000000'}}>PFE {theme?.title || 'Chargement...'}</h2>
                            <p style={{color: '#000000'}} className="text-base leading-relaxed">{theme?.description}</p>
                        </div>

                        {/* Two Column Layout for Teachers and Teams */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Teachers Card */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8">
                                <h3 className="text-2xl font-bold mb-6" style={{color: '#000000'}}>Encadreurs</h3>
                                {theme?.encadrement?.length > 0 ? (
                                    <div className="space-y-4">
                                        {
                                            theme?.encadrement?.map(({id,teacher})=>{
                                                const {firstName,lastName,id:teacherId} = teacher;
                                                return(
                                                    <div key={id} className="p-4 rounded-xl border border-gray-200 hover:shadow-md hover:border-boutton transition-all">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="font-semibold text-lg" style={{color: '#000000'}}>
                                                                {firstName} {lastName}
                                                            </div>
                                                            {isAdmin && (
                                                                <button 
                                                                    onClick={async (e)=>{e.preventDefault();await handleOpenModalTeam(teacherId,firstName,lastName)}}
                                                                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:bg-blue-100"
                                                                    style={{backgroundColor: '#F4FCFF', color: '#5375E2'}}
                                                                >
                                                                    + Ajouter équipe
                                                                </button>
                                                            )}
                                                        </div>
                                                        {teacher?.teamsInCharge?.length > 0 ? (
                                                            <div className="flex flex-wrap gap-2">
                                                                {
                                                                    teacher?.teamsInCharge.map(({id,team})=>{
                                                                        return (
                                                                            <button
                                                                                key={id} 
                                                                                onClick={()=>router.push(`/teams/${team.id}`)}
                                                                                className="px-3 py-1.5 rounded-lg text-sm font-medium text-white transition-all hover:shadow-md"
                                                                                style={{backgroundColor: '#5375E2'}}
                                                                            >
                                                                                #{team?.nickName}
                                                                            </button>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        ) : (
                                                            <p style={{color: '#999999'}} className="text-sm italic">Aucune équipe assignée</p>
                                                        )}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F4FCFF'}}>
                                            <Users2 className="w-8 h-8" style={{color: '#5375E2'}} />
                                        </div>
                                        <p className="font-medium mb-2" style={{color: '#000000'}}>Aucun encadreur</p>
                                        <p className="text-sm" style={{color: '#999999'}}>Les encadreurs assignés apparaîtront ici</p>
                                    </div>
                                )}
                                {isAdmin && (
                                    <button 
                                        onClick={handleOpenModal}
                                        className="w-full py-3 rounded-lg border-2 border-dashed font-semibold transition-all hover:bg-blue-50 mt-4"
                                        style={{borderColor: '#5375E2', color: '#5375E2'}}
                                    >
                                        + Ajouter un Encadreur
                                    </button>
                                )}
                            </div>

                            {/* Teams Card */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8">
                                <h3 className="text-2xl font-bold mb-6" style={{color: '#000000'}}>Équipes</h3>
                                {theme?.teams?.length > 0 ? (
                                    <div className="space-y-3">
                                        {
                                            theme?.teams?.map(({nickName,id})=>{
                                                return(
                                                    <button
                                                        key={id} 
                                                        onClick={()=>router.push(`/teams/${id}`)}
                                                        className="w-full p-4 rounded-xl border border-gray-200 hover:shadow-md hover:border-boutton transition-all text-left font-medium"
                                                        style={{color: '#000000'}}
                                                    >
                                                        #{nickName}
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F4FCFF'}}>
                                            <Users className="w-8 h-8" style={{color: '#5375E2'}} />
                                        </div>
                                        <p className="font-medium mb-2" style={{color: '#000000'}}>Aucune équipe</p>
                                        <p className="text-sm" style={{color: '#999999'}}>Les équipes assignées apparaîtront ici</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <ModalPortal
                open={open}
                handleClose = {setOpen}
            >
                <form className="flex flex-col w-[450px] h-fit py-4 px-2 text-textcolor space-y-3">
                    <div className="text-center text-[20px]">Ajouter un Encadreur</div>
                    <div className="px-4">choisir un encadreur parmis la liste des ensiegnant</div>
                    <Select
                        placeholder="Enseignants..." 
                        onChange={(option)=>{setChoosenTeacher(option)}}
                        options={teachers.map(el=>{return {value:el.id,label:el.firstName+' '+el.lastName}})}
                        isLoading = {!teachers}
                        value={chosenTeacher}
                        styles = {{menuPortal:base=>({...base,zIndex:100,width:'100px',height:'30px',borderRadius:'5px',color:'black',outline:'none'})}}
                    />
                    <OutLinedButton onClick={handleEncadrerTheme} className='mx-auto' >Valider</OutLinedButton>
                </form>
            </ModalPortal>
            <ModalPortal
                open={openAddTeam}
                handleClose = {setOpenAddTeam}
            >
                <form className="flex flex-col w-[50vw] h-fit py-4 px-2 text-textcolor space-y-3">
                    <div className="text-center text-[20px]">Encadrer equipe</div>
                    <div className="px-4">choisir une Equipe a encadrer parmis les equipe de theme <stron className='font-semibold'>{theme?.title}</stron></div>
                    <div className="flex space-x-2 items-center mx-auto">
                        <div>Enseignant:</div>
                        <Select
                            placeholder="Enseignant..." 
                            onChange={(option)=>{setAddTeamChosenTeacher(option)}}
                            options={theme?.encadrement?.map(el=>{return {value:el?.teacher?.id,label:el.teacher?.firstName+' '+el?.teacher?.lastName}})}
                            isLoading = {!theme?.encadrement}
                            value={addTeamChosenTeacher}
                            styles = {{menuPortal:base=>({...base,zIndex:100,width:'100px',height:'30px',borderRadius:'5px',color:'black',outline:'none'})}}
                        />
                    </div>
                    <div className="flex space-x-2 items-center mx-auto">
                        <div>Equipe:</div>
                        <Select
                            placeholder="Equipes..." 
                            onChange={(option)=>{setAddTeamChosenTeam(option)}}
                            options={theme?.teams?.map(({id,nickName})=>{return {value:id,label:nickName}})}
                            isMulti
                            isLoading = {!theme?.teams}
                            value={addTeamChosenTeam}
                            styles = {{menuPortal:base=>({...base,zIndex:100,width:'100px',height:'30px',borderRadius:'5px',color:'black',outline:'none'})}}
                        />
                    </div>
                    <button onClick={handleSubmitAssignTeamsToTeacher} className="bg-blue-300 w-fit px-2 py-1  mx-auto rounded-[10px]">Valider</button>
                </form>
            </ModalPortal>
        </div>
    )
}
export default Theme;