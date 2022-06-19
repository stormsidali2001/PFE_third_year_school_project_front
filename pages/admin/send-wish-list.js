import { useEffect, useState } from "react";
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import ModalPortal from "../../components/ModalPortal";
import { useStoreActions,useStoreState } from "../../store/hooks";
import Select from 'react-select'
import { useRouter } from "next/router";


const AssignTeamsToThemes = ({toastsRef}) => {
    const router  = useRouter()
  const [open,setOpen] = useState(false)
  const [chosenPromotion,setChoosenPromotion] = useState(null)
  const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
  const {promotions} = useStoreState(store=>store.promotionsModel)
  const {sendWishList} = useStoreActions(store=>store.wishListModel)


  const [step,setStep] = useState(0)

  useEffect(async()=>{
     
    await getAllPromotionsThunk();

},[])

  const handleSendWishList = async e =>{
    e.preventDefault();
    if(!chosenPromotion)return;
    try{
        await sendWishList({
            promotionId:chosenPromotion.value
        })
        toastsRef.current.addMessage({text:"c'est fait...",mode:'Alert'})
        setOpen(false)

    }catch(err){
        toastsRef.current.addMessage({text:err.response.data.message,mode:'Error'})
        setOpen(false)
    }
   
  }
   return(
      
            <div className="h-screen w-screen pl-[100px] pt-[100px] bg-background font-xyz relative flex items-center justify-center">
                <img src="/teamToTheme.jpg" className="h-[550px] object-contain mix-blend-darken opacity-60"/>
                <div className="absolute bg-white/80 shadow-xl text-center rounded-xl h-[450px] w-[700px] flex flex-col space-y-8 items-center justify-center p-6">
                    <div className="text-[28px] font-semibold underline italic">Envoyer les fiche de voeux</div>
                    <div className="text-[20px] font-thin">envoyer la fiche de voeux a une promotion specifique</div>
                    <div className="text-[18px] font-thin flex-col space-y-2 italic">
                        <div className="text-red-500 underline text-ellipsis">Remarque : </div>
                      une notification sera envoyer a tout les equipes de la promotion selectionée
                    </div>
                    <button 
                        className="h-[35px] w-[250px] rounded-full shadow-lg border-blue-400 border-2 hover:border-blue-600 text-[18px]"
                        onClick={()=>setOpen(true)}
                    >
                      envoyer
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
                            onChange={ (option)=>{
                                setChoosenPromotion(option);
                                
                            }}
                            options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                            isLoading = {!promotions}
                            value={chosenPromotion}
                            styles = {{menuPortal:base=>({...base,zIndex:500,width:'100%'})}}
                        />
                        {
                            promotions?.find(el=>el.id === chosenPromotion?.value)?.wishListSent?(
                                <div className="text-red-700">Vous avez Envoyer la fiche de voeux a cette promotion</div>
                            ):(
                                <button className=" w-fit px-2 py-1  backdrop-blur-sm bg-white/20 border-2 border-blue-300 hover:border-slate-400  rounded-full shadow-lg flex items-center cursor-pointer" onClick={handleSendWishList}>Envoyer</button>
                            )
                        }
                       
                       </div>
                     }
                    
                  
     
                   </form>
               </ModalPortal>
       </div>
   )
}
export default AssignTeamsToThemes;