
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import AjouterAnnouncemnt from "../components/AjouterAnnouncemnt";
import SpeakerIcon from "../icons/SpeakerIcon";
import Document from "../components/Document";
import {useStoreActions,useStoreState} from '../store/hooks'
import { useEffect } from "react";

const AnnouncementList = ({toastsRef}) => {
    const {getAnnouncementsThunk} = useStoreActions(store=>store.teamAnnouncementsModel)
    const {announcements} = useStoreState(store=>store.teamAnnouncementsModel)
    const {getFileThunk} = useStoreActions(store=>store.user)
    
    useEffect(async ()=>{
        await getAnnouncementsThunk();
       
    },[])
    const handleClick = async doc=>{
         
         const file = await getFileThunk(doc.url.split("./files/")[1]);
                        
        console.log("*//*/*/*/*/",file)

        
    }
    return (
        <>
        <div className="min-h-[200vh] bg-background h-fit  items-center  flex flex-col   ">
           
            <div className="bg-white overflow-y-scroll scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 py-4 hover:scrollbar-track-blue-200 overflow-x-hidden relative w-[70vw] h-[70vh] mt-[100px] shadow-lg flex flex-col justify-center items-center text-textcolor pt-2">
                <div className="text-[30px] flex space-x-4 absolute top-4"> 
                        <SpeakerIcon className=' w-12 text-[#5375E2]  text-3xl'/>
                        <span className="">Announcemnt</span>
                    
                </div>
                <img
                    src='/announcement-background.jpg'
                    className="h-[500px]  object-contain opacity-20"
                />
               <div className="flex-col items-center justify-center absolute top-16 space-y-4 p-4 w-full">
                    {
                        announcements.map(({title,description,documents})=>{
                            return(
                                <div className="w-[95%] bg-white/50 h-[140px]  overflow-y-scroll scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 py-4 hover:scrollbar-track-blue-200 overflow-x-hidden backdrop-blur-sm shadow-lg rounded-[20px] flex flex-col space-y-2  px-4">
                                    <div className="text-textcolor text-xl font-medium">{title}</div>
                                    <div className="break-words">
                                        {description}
                                    </div>
                                    <div className="flex flex-wrap w-full gap-4">
                                            {
                                                documents.map(doc=>{
                                                    return (
                                                        <div className="w-[80px] break-all">
                                                            <Document
                                                                file={doc}
                                                                onClick={(e)=>handleClick(doc)}
                                                            />
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
        </>
    )
}
export default AnnouncementList;
