import HorisontalNavbar from '../../components/HorisontalNavbar'
import AdminVerticalNavbar from '../../components/AdminVerticalNavbar'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useStoreActions, useStoreState } from '../../store/hooks'
import { useRouter } from 'next/router'
const listesoutenance = props => {

    const router = useRouter()
    const {promotion} = router.query;

    const {getSoutenances} = useStoreActions(store=>store.soutenanceModel)
    const {soutenances} = useStoreState(store=>store.soutenanceModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const [chosenPromotion,setChosenPromotion] = useState(null)


   


useEffect(async()=>{
      
        
        
    if(promotions?.length === 0) await getAllPromotionsThunk()
    
  
  
        if(!promotion || promotion?.length === 0) {
           
            promotions?.length > 0 && await getSoutenances()
            return;
        }
        const label = promotions.find(el=>el.id=== promotion)?.name
        if(!label) return;
      
        setChosenPromotion({value:promotion,label})
        await getSoutenances(promotion)

    
    

},[promotion,promotions])
const handleOption = option=>{
    router.push(`/soutenances?promotion=${option.value}`)
}
    return (
        <div className='min-h-screen h-fit w-screen bg-background'>
            <div className="pt-[100px] sm:pl-[100px]font-xyz text-textcolor flex flex-col items-center justify-center p-24 space-y-12">
                <div className="text-[32px]">Liste des soutenances</div>
                <div className='flex flex-row items-center justify-center space-x-6'>
                    <div className='text-[20px] md:flex hidden'>Choisir une promotion :</div>
                    <Select
                        placeholder="Promotion..." 
                        className="z-50 h-[40px] w-[230px] rounded-lg bg-slate-200 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                        onChange={(option)=>{handleOption(option)}}
                        options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                        value={chosenPromotion}
                        styles = {{menuPortal:base=>({...base,zIndex:500})}}
                    />
                </div>
                <div className="flex flex-wrap gap-24">
                    {
                        soutenances.map((el , index) => {
                            return (
                                <div className="bg-gradient-to-b hover:bg-gradient-to-t from-blue-50 to-blue-300 rounded-md border-2 ease-linear border-slate-300 h-[350px] w-[300px] relative">
                                    <img src="/creerSoutenance.jpg" className="h-[350px] object-contain mix-blend-darken opacity-20"/>
                                    <div className="flex flex-col px-6 justify-center h-full w-full space-y-3 absolute top-0 text-[18px]">
                                        <div className='text-center w-full text-[22px]'>{el.team.promtion}</div>
                                        <div>Titre : {el.title}</div>
                                        <div>Description :{el.description}</div>
                                        <div>Equipe :{el.team.nickName}</div>
                                        <div>Date :{el.date}</div>
                                        <div>Duration :{el.duration}</div>
                                        <div className='w-full flex items-center justify-center'>
                                            <button className="h-[35px] w-[150px] rounded-full shadow-lg bg-blue-300 hover:bg-blue-400" onClick={()=>router.push(`soutenances/${el.id}`)}>Voir plus</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default listesoutenance