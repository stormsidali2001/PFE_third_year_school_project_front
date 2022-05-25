import { useEffect, useState } from "react"
import Link from "next/link"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import DownIcon from "../../icons/DownIcon"
import UpIcon from "../../icons/UpIcon"
import Trash from "../../icons/Trash"
import { useRouter } from "next/router";
import { useStoreActions } from "../../store/hooks"

const suggestion = props => {

  
   
    const [modifier , setModifier] = useState(false)
    const [idtheme , setIdtheme] = useState(1)
    const [title , setTilte] = useState('')
    const [description , setDescription] = useState('')
    const {getThemeSuggestionThunk} = useStoreActions(store=>store.themeSuggestionsModel)
    const router = useRouter();
    const {suggestionId} = router.query;
    const [suggestedBy,setSuggestedBy] = useState({})
    const [promotion,setPromotion] = useState({})
   
    useEffect(async()=>{
        if(!suggestionId) return;
        const data = await getThemeSuggestionThunk(suggestionId)
        setTilte(data?.title)
        setDescription(data?.description)
        setPromotion(data?.promotion)
      
        if(data?.suggestedByTeacher){
            setSuggestedBy({type:'teacher',suggestedBy:data.suggestedByTeacher})
         
            
        }else if(data?.suggestedByEntreprise){
            setSuggestedBy({type:'entreprise',suggestedBy:data.suggestedByEntreprise})

        }


    },[suggestionId])
 
    return (
        <div>
            <StudentVerticalNavbar/>
            <HorisontalNavbar/>
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <div className="flex flex-col items-center justify-center">
                    <img src="/themeStudent.png" className="mix-blend-darken absolute"/>
                    <div className={`p-10 justify-center flex-col space-y-8 h-[500px] w-[650px] px-10 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl text-[16px] flex  `}>
                        <div className="flex flex-row items-center space-x-4 text-[26px]">
                            <div className="text-[28px]">Titre :</div>
                            <div className={` ${modifier === false ? "flex" : "hidden"}`}>{title}</div>
                            <input value={title} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setTilte(e.target.value)}}/>
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">Description :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"} h-[80px] p-2 bg-gray-100/80 w-[80%] backdrop-blur-sm rounded-[10px]`}>{description}</div>
                            <input value={description} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setDescription(e.target.value)}}/>
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">Promotion :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{promotion?.name}</div>
                            <input value={description} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setDescription(e.target.value)}}/>
                        </div>
                      
                      
                      
                            
                        <div className="flex items-center justify-center">
                        <button className="h-[40px] w-[120px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full " onClick={(e)=>setModifier(true)}>Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default suggestion;