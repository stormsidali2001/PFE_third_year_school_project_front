import { useEffect, useState } from "react"
import Link from "next/link"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import {useRouter} from 'next/router'
import { useStoreActions, useStoreState } from "../../store/hooks"
import AddIcon from "../../icons/AddIcon"
import ModalPortal from "../../components/ModalPortal"
import Select from 'react-select'


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
            <div className="bg-background h-screen w-screen px-[80px] relative flex flex-col items-center pt-[100px] font-xyz text-textcolor justify-center">
                <div className="bg-white shadow-lg w-[50vw] h-fit py-4 space-y-2 rounded-[10px] flex flex-col items-start px-4 text-textcolor">
                    <div className="text-[24px] w-full text-center">Theme</div>
                    <div className="flex space-x-2 text-[20px] mt-4 w-full">
                        <div className="font-medium">Title:</div>
                        <div className="bg-gray-200 px-2 rounded-[5px]  font-normal text-[18px] w-full flex items-center">
                            PFE
                        </div>
                    </div>
                    <div className="flex flex-col space-x-2 text-[20px] mt-4 w-full">
                        <div className="font-medium">Description:</div>
                        <div className="bg-gray-200 px-2 rounded-[5px]  font-normal text-[15px] w-full flex break-all h-[80px] overflow-y-auto">
                            faskjfsajasfkjasfkljafskjlafslkjfskjlkjafsl fasjfaslafsjkfsakjfaskjl fasjksafjklsaflkjfa
                        </div>
                    </div>
                <div className="flex flex-col space-x-2 text-[20px] mt-4 w-full">
                        
                        <div className="font-medium">Equipes:</div>
                        <div className="border-2 px-2 rounded-[5px]  font-normal text-[15px] w-full flex  h-[80px] overflow-y-auto flex-wrap py-2 gap-5">
                                {
                                    theme?.teams?.map(({nickName,id})=>{
                                        return(
                                          <div key={id} className=" bg-blue-300 rounded-[10px] w-fit h-fit  px-2 py-1 cursor-pointer" onClick={()=>router.push(`/team/${id}`)}> #{nickName}</div>
                                        )
                                    })
                                }
                        </div>
                        <div className="font-medium">Encadreurs disponible:</div>
                        <div className="border-2 px-2 rounded-[5px]  font-normal text-[15px] w-full flex  h-[80px] overflow-y-auto flex-col py-2 gap-5">
                            {
                                theme?.encadrement?.map(({id,teacher})=>{
                                    const {firstName,lastName,id:teacherId} = teacher;
                                    return(
                                        <div key={id} className=" flex space-y-2  flex-col " >
                                              <div className="flex space-x-2">
                                                    <div className="bg-blue-300 rounded-[10px] w-fit h-fit  px-2 py-1">#{firstName+' '+lastName}</div>
                                                    
                                                    <div 
                                                        className="flex space-x-2 cursor-pointer"
                                                        onClick={async (e)=>{e.preventDefault();await handleOpenModalTeam(teacherId,firstName,lastName)}}
                                                    >
                                                            <AddIcon
                                                                className = 'w-6 h-6 text-textcolor/90 group-hover:text-textcolor'
                                                                />
                                                            <div className="text-[15px]">ajouter equipe</div>
                                                    </div>
                                              </div>
                                           <div className="pl-4 flex  flex-wrap gap-4">
                                            {
                                                teacher?.teamsInCharge.map(({id,team})=>{
                                                    return (
                                                        <div id={id} className="bg-blue-300 rounded-[10px] w-fit h-fit  px-2 py-1">
                                                            {team?.nickName}
                                                        </div>

                                                    )
                                                })
                                            }
                                           </div>
                                           
                                        </div>
                                    )
                                })
                            }   
                        </div>
                        <div className="flex space-x-2 group cursor-pointer items-center"
                            onClick={handleOpenModal}
                        >
                            <AddIcon
                                className = 'w-6 h-6 text-textcolor/90 group-hover:text-textcolor'
                            />
                            <div>Ajouter un Encadreur</div>
                        </div>  
                    </div>  
                </div>  
            </div>
            <ModalPortal
                open={open}
                handleClose = {setOpen}
            >
                <form className="flex flex-col w-[50vw] h-fit py-4 px-2 text-textcolor space-y-3">
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
                    <button onClick={handleEncadrerTheme} className="bg-blue-300 w-fit px-2 py-1  mx-auto rounded-[10px]">Valider</button>
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