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
        <div className="bg-background h-fit min-h-screen w-fit md:w-screen">
            <div className=" pt-[100px] space-y-10 flex flex-col items-center pb-4 pr-4 sm:pl-[100px] font-xyz text-textcolor justify-center">
                <div className="text-[24px] flex flex-row space-x-2 w-full text-center">
                    <div className="">Theme</div>
                    <div>: PFE{theme?.title}</div>
                </div>
                
                <div className="flex flex-col space-y-6 md:flex-row md:space-x-16">
                <div className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-2 p-4 relative md:w-[35vw] w-[90vw] h-[30vh]">
                    <img src="/description.webp" className="h-full object-contain mix-blend-darken opacity-50"/>
                <div className="flex flex-col space-y-2 p-4 absolute top-0 backdrop-blur-sm scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 py-4 hover:scrollbar-track-blue-200 bg-white/50 shadow-xl h-full w-full rounded-xl text-[20px]">
                    <div className="font-medium">Description:</div>
                    <div className="px-2 rounded-[5px]  font-normal text-[15px] font-mono">
                        {theme?.description}
                    </div>
                </div>
                </div>

                <div className="flex flex-col space-y-2 w-[90vw] md:w-[35vw] h-[30vh] relative  py-6 rounded-xl text-[20px]">
                    <img src='/themeTeacher.webp' className="h-full object-contain mix-blend-darken opacity-50"/>
                <div className="flex flex-col space-y-2 p-4 absolute top-0 backdrop-blur-sm scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500  hover:scrollbar-track-blue-200 bg-white/50 shadow-xl w-[90vw] md:w-[35vw] h-fit py-6 rounded-xl text-[20px]">
                    <div className="font-medium">Encadreurs :</div>
                
                        <div className=" text-[15px] flex flex-col space-y-4 border-l-2 pl-2 ">
                            {
                                theme?.encadrement?.map(({id,teacher})=>{
                                    const {firstName,lastName,id:teacherId} = teacher;
                                    return(
                                        <div key={id} className=" flex space-y-2  flex-col " >
                                                <div className="flex space-x-2">
                                                    <div className="h-[35px] w-fit  backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg flex items-center  cursor-pointer   px-2 py-1">#{firstName+' '+lastName}</div>
                                                    
                                                {   isAdmin&& <div 
                                                        className="flex space-x-2 cursor-pointer items-center"
                                                        onClick={async (e)=>{e.preventDefault();await handleOpenModalTeam(teacherId,firstName,lastName)}}
                                                    >
                                                                     <button 
                                                                        className='text-[22px] shadow-md backdrop-blur-sm rounded-full h-[23px] flex items-center justify-center w-[23px] bg-white/20 border-2 border-slate-200 hover:border-slate-400'
                                                                    
                                                                    >
                                                                        +
                                                                    </button>
                                                            <div className="text-[15px]">ajouter equipe</div>
                                                
                                                    </div>}
                                                    
                                                </div>
                                            <div className="pl-4 flex  flex-wrap gap-4  ">
                                            {
                                                teacher?.teamsInCharge.map(({id,team})=>{
                                                    return (
                                                        <div onClick={()=>router.push(`/teams/${id}`)} id={id} className="h-[35px] w-fit px-2 py-1  backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg flex items-center cursor-pointer">
                                                            #{team?.nickName}
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
                </div>
                </div>
                
                </div>
               <div className="flex flex-col space-y-12">
               <div className="flex flex-col space-y-2 p-4 relative w-[90vw] md:w-[30vw] h-[45vh] ">
                   <img src="/teamStudent.jpg" className="h-full object-contain mix-blend-darken opacity-50"/>
               <div className="bg-white/50 scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 py-4 hover:scrollbar-track-blue-200 p-3 shadow-xl rounded-xl text-[20px] backdrop-blur-sm h-full w-full absolute top-0">
               <div className="font-medium">Equipes:</div>
            
                    <div className=" text-[15px] flex gap-3 mt-4 flex-wrap ">
                            {
                                theme?.teams?.map(({nickName,id})=>{
                                    return(
                                        <div key={id} className=" h-[35px] w-fit px-2 py-1  backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg flex items-center justify-center cursor-pointer" onClick={()=>router.push(`/teams/${id}`)}> #{nickName}</div>
                                    )
                                })
                            }
                    </div>
               </div>
                </div>
            {  isAdmin&&  <div className="flex space-x-2 group w-full justify-center cursor-pointer items-center"
                            onClick={handleOpenModal}
                        >
                              <button 
                            className='text-[28px] shadow-md backdrop-blur-sm rounded-full h-[32px] flex items-center justify-center w-[32px] bg-white/20 border-2 border-slate-200 hover:border-slate-400'
                         
                           >
                            +
                            </button>
                            <div>Ajouter un Encadreur</div>
                 </div>  }
                  
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