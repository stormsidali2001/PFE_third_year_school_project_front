
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
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
        <HorisontalNavbar />
        <StudentVerticalNavbar />
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8">
           <div className="max-w-5xl mx-auto">
               {/* Header */}
               <div className="mb-8">
                   <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{color: '#1A2562'}}>Annonces</h1>
                   <div className="h-1 w-20 rounded-full" style={{backgroundColor: '#5375E2'}}></div>
               </div>

               {/* Announcements List */}
               <div className="space-y-4">
                   {announcements.length > 0 ? (
                       <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                           {/* Table Header */}
                           <div className="grid grid-cols-12 gap-4 p-4 font-semibold text-sm bg-white" style={{borderBottom: '2px solid #5375E2'}}>
                               <div className="col-span-3" style={{color: '#1A2562'}}>Titre</div>
                               <div className="col-span-4" style={{color: '#1A2562'}}>Description</div>
                               <div className="col-span-3" style={{color: '#1A2562'}}>Fichiers</div>
                               <div className="col-span-2" style={{color: '#1A2562'}}>Actions</div>
                           </div>

                           {/* Table Rows */}
                           <div className="divide-y divide-gray-100">
                               {announcements.map(({id, title, description, documents}, index) => (
                                   <div 
                                       key={id || index}
                                       className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors items-center"
                                   >
                                       {/* Title */}
                                       <div className="col-span-3">
                                           <h3 className="font-semibold text-sm line-clamp-2" style={{color: '#1A2562'}}>
                                               {title}
                                           </h3>
                                       </div>

                                       {/* Description */}
                                       <div className="col-span-4">
                                           <p className="text-xs sm:text-sm line-clamp-2" style={{color: '#000000'}}>
                                               {description}
                                           </p>
                                       </div>

                                       {/* Files Display */}
                                       <div className="col-span-3">
                                           {documents && documents.length > 0 ? (
                                               <div className="flex flex-wrap gap-2 items-center">
                                                   {documents.slice(0, 3).map((doc, docIndex) => {
                                                       const fileExtension = doc.name?.split('.').pop()?.toUpperCase() || 'FILE';
                                                       const getFileColor = (ext) => {
                                                           if (['PDF'].includes(ext)) return '#DC2626';
                                                           if (['DOC', 'DOCX', 'TXT'].includes(ext)) return '#2563EB';
                                                           if (['XLS', 'XLSX', 'CSV'].includes(ext)) return '#16A34A';
                                                           if (['PPT', 'PPTX'].includes(ext)) return '#EA580C';
                                                           if (['JPG', 'JPEG', 'PNG', 'GIF'].includes(ext)) return '#8B5CF6';
                                                           return '#6B7280';
                                                       };
                                                       return (
                                                           <div 
                                                               key={docIndex}
                                                               onClick={(e)=>handleClick(doc)}
                                                               className="flex flex-col items-center p-2 rounded-lg bg-gray-50 hover:bg-blue-50 border border-gray-200 cursor-pointer transition-all hover:shadow-md group"
                                                           >
                                                               <div 
                                                                   className="w-10 h-10 rounded flex items-center justify-center text-white text-xs font-bold shadow-sm group-hover:shadow-md transition-all"
                                                                   style={{backgroundColor: getFileColor(fileExtension)}}
                                                               >
                                                                   {fileExtension.substring(0, 3)}
                                                               </div>
                                                               <span className="text-xs mt-1 truncate w-12 text-center" style={{color: '#000000'}}>
                                                                   {doc.name?.split('.')[0] || 'Doc'}
                                                               </span>
                                                           </div>
                                                       );
                                                   })}
                                                   {documents.length > 3 && (
                                                       <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 border border-gray-300">
                                                           <span className="text-xs font-semibold" style={{color: '#5375E2'}}>+{documents.length - 3}</span>
                                                       </div>
                                                   )}
                                               </div>
                                           ) : (
                                               <span className="text-xs text-gray-400">-</span>
                                           )}
                                       </div>

                                       {/* Info Badge */}
                                       <div className="col-span-2">
                                           {documents && documents.length > 0 ? (
                                               <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" style={{backgroundColor: '#F4FCFF', color: '#5375E2'}}>
                                                   {documents.length} fichier{documents.length > 1 ? 's' : ''}
                                               </span>
                                           ) : (
                                               <span className="text-xs text-gray-400">-</span>
                                           )}
                                       </div>
                                   </div>
                               ))}
                           </div>
                       </div>
                   ) : (
                       <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
                           <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                           </svg>
                           <p className="text-gray-500 text-lg">Aucune annonce pour le moment</p>
                       </div>
                   )}
               </div>
           </div>
        </div>
        </>
    )
}
export default AnnouncementList;
