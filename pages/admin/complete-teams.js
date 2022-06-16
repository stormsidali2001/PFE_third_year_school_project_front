import { useEffect, useState } from "react";
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import ModalPortal from "../../components/ModalPortal";
import { useStoreActions,useStoreState } from "../../store/hooks";
import Select from 'react-select'


const AssignTeamsToThemes = ({toastsRef}) => {
  const [open,setOpen] = useState(false)
  const [chosenPromotion,setChoosenPromotion] = useState(null)
  const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
  const {promotions} = useStoreState(store=>store.promotionsModel)
  const [loading,setLoading] = useState(false)
  const {getTeamsStats,completeTeams,applyTeamsCompletion} = useStoreActions(store=>store.teamListModel)
  const [teamsStats,setTeamsStats] = useState(null);
  const [results,setResults] = useState({})


  const [step,setStep] = useState(0)

  const [chosenIndex,setChosenIndex] = useState(0)
  const choices = [{label:'Random',value:'random'},{label:'FIFO',value:'time'},{label:'Moyenne',value:'moy'}];
  useEffect(async()=>{
     
    await getAllPromotionsThunk();

},[])
const handleCompleteTeams = async e=>{
    e.preventDefault()
    if(!chosenPromotion ) {
        toastsRef.current.addMessage({text:"Chose a promotion !!",mode:'Error'})
        return;
    }
    try{

       const data =   await completeTeams({
                                              promotionId:chosenPromotion?.value
                                         });
       

        setResults(data)                             
        setStep(step=>step+1)
        toastsRef.current.addMessage({text:"c'est fait !!",mode:'Alert'})
    }catch(err){
        toastsRef.current.addMessage({text:'ops Erreur...',mode:'Error'})
        console.log(err)
    }
    
}
const handleApplyTeamsCompletion = async e=>{
    try{

        e.preventDefault()
        await applyTeamsCompletion({
            addedStudents:results.studentAdded.map(el=>{return {studentId:el.student.id,teamId:el.team.id}}),
            deletedStudents:results.studentDeleted.map(el=>{return {studentId:el.student.id,teamId:el.team.id}}),
            newTeams:results.newTeams.map(el=>{return {
                    students:el.students.map(st=>{
                        return {studentId:st.id}
                    }),
          
            }}),
            promotionId:chosenPromotion.value
         
            
        })
        toastsRef.current.addMessage({text:"c'est fait !!",mode:"Alert"})
        setOpen(false)
    }catch(err){
        console.log(err)
        toastsRef.current.addMessage({text:"Ops...Erreur",mode:"Error"})
    }
}

 
   return(
      
            <div className="h-screen w-screen pl-[100px] pt-[100px] bg-background font-xyz relative flex items-center justify-center">
                <img src="/teamToTheme.jpg" className="h-[550px] object-contain mix-blend-darken opacity-60"/>
                <div className="absolute bg-white/80 shadow-xl text-center rounded-xl h-[450px] w-[700px] flex flex-col space-y-8 items-center justify-center p-6">
                    <div className="text-[28px] font-semibold underline italic">Completer les Equipes</div>
                    <div className="text-[20px] font-thin">Equilibrer les Equipe est une tache manuelle difficile qui prend beaucoup de temps , mais avec notre platforme cella ce fait en quelque click</div>
                    <div className="text-[18px] font-thin flex-col space-y-2 italic">
                        <div className="text-red-500 underline text-ellipsis">Remarque : </div>
                       Les etudiants sans equipe seront affecter a des equipes non complete ou reunit dans des nouvelles equipes
                    </div>
                    <button 
                        className="h-[35px] w-[250px] rounded-full shadow-lg border-blue-400 border-2 hover:border-blue-600 text-[18px]"
                        onClick={()=>setOpen(true)}
                    >
                       Completer les Equipes
                    </button>
                </div>
            
               <ModalPortal
                    open={open}
                    handleClose = {setOpen}
               >
                   <form
                    className="w-[450px]"
                   >
                   {  step===0 &&<div className="w-full py-2 flex flex-col space-y-4 items-center">
                       <div className="mx-auto text-black text-[24px]">Completer</div>
                        <Select
                            placeholder="Promotion..." 
                            className="z-50 h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                            onChange={async (option)=>{
                                setChoosenPromotion(option);
                                const data = await getTeamsStats({promotionId:option.value})
                                setTeamsStats(data)

                            }}
                            options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                            isLoading = {!promotions}
                            value={chosenPromotion}
                            styles = {{menuPortal:base=>({...base,zIndex:500,width:'100%'})}}
                        />
                    { teamsStats&& <div className="flex flex-col space-y-2">
                                        <div className="flex space-x-2">
                                            <div>Etudiants sans Equipes :</div>
                                            <div>{teamsStats.studentsWithoutATeam}</div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div>Equipes non complete :</div>
                                            <div>{teamsStats.notCompleteTeams}</div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div>min dans Equipe :</div>
                                            <div>{teamsStats.minMembersInTeam}</div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div>max dans Equipe :</div>
                                            <div>{teamsStats.maxMembersInTeam}</div>
                                        </div>
                                       
                                    </div>
                    }
                    
                      <button className="border-blue-300 border-2 text-white/80 text-slate-700  w-[120px] hover:border-blue-400 px-2 py-1 rounded-[555555px] shadow-sm" onClick={handleCompleteTeams}>Suivant</button>

                       </div>
                     }
                    
                    {
                    //**   Step 1 */
                    }
        {  step===1 &&<div className="w-full py-2 flex flex-col space-y-1 items-center  scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 max-h-[500px] h-fit hover:scrollbar-track-blue-200 overflow-x-hidden overflow-y-auto">                     
                      <div className="mx-auto font-semibold underline text-[22px]">Resultats:</div>
                      <div className="font-semibold ">suppression :</div>
                      <div className="w-[90%] h-fit  space-y-6 flex flex-col items-start  scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 py-4 hover:scrollbar-track-blue-200 overflow-x-hidden overflow-y-auto px-2">
                      
                        {
                            results?.studentDeleted?.map(({student,team},index)=>{
                                return (
                                    <div className="flex space-x-2 ">
                                        <div>{index+1}-</div>
                                        <div className=" text-white/80 text-slate-700  hover:border-blue-400  cursor-pointer">#{student.firstName} {student.lastName}</div>
                                        <div>  {` supprimé de l'equipe: `}</div>
                                        <div className="text-white/80 text-slate-700  hover:border-blue-400 cursor-pointer">#{team.nickName}</div>
                                      
                                    </div>
                                )
                            })
                        }
                      </div>
                      <div className="font-semibold ">Ajout :</div>
                      <div className="w-[90%] h-fit  space-y-6 flex flex-col items-start  scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 py-4 hover:scrollbar-track-blue-200 overflow-x-hidden overflow-y-auto px-2">
                      
                        {
                            results?.studentAdded?.map(({student,team},index)=>{
                                return (
                                    <div className="flex space-x-2 ">
                                        <div>{index+1}-</div>
                                        <div className=" text-white/80 text-slate-700  hover:border-blue-400  cursor-pointer">#{student.firstName} {student.lastName}</div>
                                        <div>  {` ajouté a l'equipe: `}</div>
                                        <div className="text-white/80 text-slate-700  hover:border-blue-400 cursor-pointer">#{team.nickName}</div>
                                      
                                    </div>
                                )
                            })
                        }
                      </div>
                      <div className="font-semibold ">Nouvelle Equipe :</div>
                      <div className="w-[90%] h-fit  space-y-6 flex flex-col items-start  scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 py-4 hover:scrollbar-track-blue-200 overflow-x-hidden overflow-y-auto px-2">
                      
                        {
                            results?.newTeams?.map(({students},index)=>{
                                return (
                                    <div className="flex space-y-2 flex-col ">
                                       <div >
                                           Equipe {index+1}:
                                       </div>
                                       {
                                        students.map((student,index1)=>{
                                            return (
                                                <div className="flex space-x-2  items-center">
                                                    <div>{index1+1}-</div>
                                                    <div className=" text-white/80 text-slate-700  hover:border-blue-400  cursor-pointer">#{student.firstName} {student.firstName}</div>
                                                  </div>
                                            )
                                        })
                                       }
                                    </div>
                                )
                            })
                        }
                      </div>
                      {/*************************************** */}
                      <div className="flex space-x-8  ">
                          <button className="border-blue-300 border-2 text-slate-700 hover:border-blue-400 w-[120px] py-1 rounded-[999999px] shadow-sm" 
                              onClick={()=>setStep(0)}
                          >Back</button>
                        <button className="border-blue-300 border-2 text-white/80 text-slate-700  w-[120px] hover:border-blue-400 px-2 py-1 rounded-[555555px] shadow-sm" 
                            onClick={handleApplyTeamsCompletion}

                        >Confirmer</button>

                      </div>
                     


                       </div>
                     }
                   </form>
               </ModalPortal>
       </div>
   )
}
export default AssignTeamsToThemes;