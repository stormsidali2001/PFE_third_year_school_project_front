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
  const {asignThemesToTeams,applyThemesToTeamsAssignements} = useStoreActions(store=>store.adminAsignTeamsToThemesModel)
  const {results} = useStoreState(store=>store.adminAsignTeamsToThemesModel)
  const [loading,setLoading] = useState(false)

  const [step,setStep] = useState(0)

  const [chosenIndex,setChosenIndex] = useState(0)
  const choices = [{label:'Random',value:'random'},{label:'FIFO',value:'time'},{label:'Moyenne',value:'moy'}];
  useEffect(async()=>{
     
    await getAllPromotionsThunk();

},[])
const handleAsignThemesToTeams = async e=>{
    e.preventDefault()
    if(!chosenPromotion ) {
        toastsRef.current.addMessage({text:"Chose a promotion !!",mode:'Error'})
        return;
    }
    try{

        await asignThemesToTeams({
            promotionId:chosenPromotion.value,
            method:choices[chosenIndex].value
        })
        setStep(step=>step+1)
        toastsRef.current.addMessage({text:"c'est fait !!",mode:'Alert'})
    }catch(err){
        toastsRef.current.addMessage({text:'ops Erreur...',mode:'Error'})
        console.log(err)
    }
    
}
const handleApplyThemesToTeamsAssignements = async e=>{
    try{
        e.preventDefault()
        await applyThemesToTeamsAssignements({
                themeToTeam:results.map(res=>{
                    return {
                        idTheme:res.theme.id,
                        teamIds:res.teams.map(tm=>tm.id)
                    }
                })
        })
        toastsRef.current.addMessage({text:"c'est fait !!",mode:'Alert'})
        setOpen(false)

    }catch(err){
        console.log(err)
        toastsRef.current.addMessage({text:'ops Erreur...',mode:'Error'})
    }


}
   return(
      
            <div className="h-screen w-screen pl-[100px] pt-[100px] bg-background font-xyz relative flex items-center justify-center">
                <img src="/teamToTheme.jpg" className="h-[550px] object-contain mix-blend-darken opacity-60"/>
                <div className="absolute bg-white/80 shadow-xl text-center rounded-xl h-[450px] w-[700px] flex flex-col space-y-8 items-center justify-center p-6">
                    <div className="text-[28px] font-semibold underline italic">Affecter les thèmes au équipes</div>
                    <div className="text-[20px] font-thin">En cliquant sur affecter et en choisissant une méthode d'affectation toutes les équipes receveront un thème</div>
                    <div className="text-[18px] font-thin flex-col space-y-2 italic">
                        <div className="text-red-500 underline text-ellipsis">Remarque : </div>
                        Les équipes non renvoyantes la fiche de voeux seront affécter automatiquement
                    </div>
                    <button 
                        className="h-[35px] w-[250px] rounded-full shadow-lg bg-blue-200 hover:bg-blue-300 text-[18px]"
                        onClick={(e) => setOpen(true)}
                    >
                        Affecter les thèmes
                    </button>
                </div>
            
               <ModalPortal
                    open={open}
                    handleClose = {setOpen}
               >
                   <form
                    className="w-[450px]"
                   >
                   {  step===0 &&<div className="w-full py-2 flex flex-col space-y-2 items-center">
                       <div className="mx-auto text-textcolor text-[24px]">Affectation</div>
                        <Select
                            placeholder="Promotion..." 
                            className="z-50 h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                            onChange={(option)=>{setChoosenPromotion(option)}}
                            options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                            isLoading = {!promotions}
                            value={chosenPromotion}
                            styles = {{menuPortal:base=>({...base,zIndex:500,width:'100%'})}}
                        />
                      <div className="mx-auto text-textcolor text-[22px]">Methode d{"'"}affectation</div>
                      <div className="w-[80%] h-fit py-2 border-2 flex flex-col items-center">
                         { 
                         choices.map((el,index)=>{
                                 return(
                                 <div onClick={()=>setChosenIndex(index)} className="flex space-x-2 items-center w-[100px] cursor-pointer">
                                     <div  className={`w-[15px] h-[15px] rounded-full cursor-pointer ${chosenIndex===index?'bg-blue-300':'bg-blue-100'} `}></div>
                                     <div>{el.label}</div>
                                 </div>
                                 )
                         })
                         }
                       
                        
                      </div>
                      <button className="bg-blue-300 px-2 py-1 rounded-[5px]" onClick={handleAsignThemesToTeams}>suivant</button>

                       </div>
                     }
                    
                    {
//**   Step 1 */
                    }
        {  step===1 &&<div className="w-full py-2 flex flex-col space-y-2 items-center">
                       <div className="mx-auto text-textcolor text-[24px]">Affectation</div>
                     

                     
                      <div className="mx-auto text-textcolor text-[22px]">Resultats</div>
                      <div className="w-[80%] h-[100px] py-2 border-2 flex flex-col items-center overflow-y-auto px-2">
                         { 
                            results.map(({theme,teams})=>{
                                return (
                                    <div className="flex flex-col w-full text-textcolor">
                                        <div className="flex space-x-2 justify-start  ">
                                            <div className="font-medium">Theme:</div>
                                            <div>{theme.title}</div>
                                        </div>
                                        <div className="flex flex-wrap gap-2  px-4">
                                            {
                                                teams.map(({nickName})=>{
                                                    return (
                                                        <div className="bg-blue-300 rounded-[5px] px-1 text-white/80">#{nickName}</div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                         }
                       
                        
                      </div>
                      <div className="flex space-x-2">
                          <button className="bg-blue-300 px-2 py-1 rounded-[5px]" 
                              onClick={()=>setStep(0)}
                          >Back</button>
                        <button className="bg-blue-300 px-2 py-1 rounded-[5px]" 
                            onClick={handleApplyThemesToTeamsAssignements}
                        >Confirmer</button>

                      </div>
                     


                       </div>
                     }
                    
                    {
                        
                    }

                  

                   </form>

               </ModalPortal>
       </div>
   )
}
export default AssignTeamsToThemes;