import Avatar from "../../components/Avatar"
import TeacherVerticalNavbar from "../../components/TeacherVerticalNavbar"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import { useEffect, useState } from "react"
import  Select  from "react-select"
import { useStoreState,useStoreActions } from "../../store/hooks"
import {useRouter} from 'next/router'
import ModalPortal from "../../components/ModalPortal"
import Link from 'next/link'
const WishLists = ({toastsRef}) => {
    const router = useRouter()
    const {promotion}  = router.query;
    
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const [choosenPromotion , setChoosenPromotion] = useState(null)
    const {getWishLists} = useStoreActions(store=>store.wishListModel)
    const {wishes} = useStoreState(store=>store.wishListModel)


   

    const handleChange = async option=>{
      
        router.push(`/admin/wish-lists?promotion=${option.value}`)
       
    }

  

    useEffect(async()=>{
      
        
        
        if(promotions?.length === 0) await getAllPromotionsThunk()
        
      
      
            if(!promotion || promotion?.length === 0) {
               
                promotions?.length > 0 && await getWishLists({})
                return;
            }
            const label = promotions.find(el=>el.id=== promotion)?.name
            if(!label) {
               
                return ;
            }
          
            setChoosenPromotion({value:promotion,label})
            await getWishLists({promotionId:promotion})

        
        

    },[promotion,promotions])



    return(
        <div>
            
            <div className=" w-screen bg-background text-black font-xyz flex flex-col space-y-10 items-center justify-center pl-[100px] py-[80px]">
            <div className="flex flex-row space-x-4">
                <div className='text-[20px]'>Choisir une promotion :</div>
                <Select
                    placeholder="Promotion..." 
                    className="z-50 h-[40px] w-[230px] rounded-lg bg-slate-200 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                    onChange={(option)=>{handleChange(option)}}
                    options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                    value={choosenPromotion}
                    styles = {{menuPortal:base=>({...base,zIndex:500})}}
                />
            </div>
                <div className="flex flex-wrap gap-16 w-full items-center">
                    {
                      wishes.map(team=>{
                        return (
                            <div className="flex flex-col space-y-3 bg-gradient-to-b from-blue-50 to-blue-100 hover:bg-gradient-to-t h-[300px] w-[250px] rounded-lg border-2 border-slate-300 shadow-lg p-6 text-[15px] relative">
                            <img src="/teamStudent.jpg" className="h-full object-contain mix-blend-darken opacity-20"/>
                            <div className="absolute top-2 flex flex-col space-y-2">
                           <div  className="w-full text-center text-[17px] cursor-pointer border-blue-300 px-1">  <Link  href={`/teams/${team?.id}`}>{'#'+team?.nickName}</Link></div>
                                {
                                    team?.wishes?.map(wish=>{
                                        return (
                                            <div className="flex space-x-4">
                                                <div className="bg-blue-300 w-4 h-4 rounded-full flex items-center justify-center text-[12px]">{(wish?.order+1)}</div>
                                                <div>{wish?.theme?.title}</div>
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
    )
}
export default WishLists