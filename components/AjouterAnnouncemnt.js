import React, { useState } from "react"
import axios from 'axios';
import { useStoreActions } from "../store/hooks";
import AttachFileIcon from "../icons/AttachFileIcon";
import SpeakerIcon from "../icons/SpeakerIcon";
import DocumentIcon from "../icons/documentIcon";


const AjouterAnnouncemnt = ({toastsRef}) => {
    const [title,setTitle] = useState('titre ici...');
    const [description,setDescription] = useState('ajouter une description de maximum 250 caracteres');
    const [files, setFiles] = useState([]);
    const {uploadFilesThunk} = useStoreActions(store=>store.user)
    const {createAnnouncementThunk} = useStoreActions(store=>store.teamAnnouncementsModel)


    function handleChange(event) {
        setFiles(event.target.files)
      };
    const Empty = (elements)=>{
        return elements.some(el=>el === '')
    }
   
      
    const handleSubmit = async e=>{
        e.preventDefault();
        if(Empty([title,description])){
            toastsRef.current.addMessage({text:"tout les champs doivent etre remplit",mode:'Error'})
            return;
         }
       
        const formData = new FormData()
        if(files.length!=0){
            
            Array.from(files).forEach(file => {
                 formData.append("files",file)
             });
        }

     console.log([...formData.entries()])
       
     
           
        try{
           const res =  await uploadFilesThunk(formData)
           console.log(res.data,"...")
           const savedFiles = res.data;
           toastsRef.current.addMessage({text:"files uploaded",mode:'Alert'})
           await createAnnouncementThunk({
               title,
               description,
               documents:files.length!=0 ?savedFiles.map(({filename,destination,originalname})=>{
                   const path = destination+'/'+filename;
                   return {
                        name:originalname,
                        url:path,
                   }
               }):[]
           })
           toastsRef.current.addMessage({text:"annoncement cree avec success!!",mode:'Alert'})


        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"probleme",mode:'Error'})
        }
        


    }
    return (

        <form 
            className="h-fit  justify-center flex flex-col space-y-6  text-[#1A2562]  font-xyz mt-[100px] mx-auto  items-center bg-white shadow-lg p-2 lg:w-[40vw] w-[80vw]"
            onSubmit={handleSubmit}
        >
           <div className="text-[30px] flex space-x-4"> 
                    <SpeakerIcon className=' w-12 text-[#5375E2]  '/>
                    <span className="">Announcemnt</span>
                  
           </div>
           <div className='space-y-3 flex flex-col w-[95%]  px-8'>
               
                <div className='flex flex-wrap -mx-3 mb-6  '>
                            <div className="flex-1  space-x-6">
                                <div> Title</div>
                                <input 
                                    placeholder={title} 
                                    className=" border   rounded-[5px]  outline-none h-[30px] w-[80%] px-3 bg-gray-200 text-black" 
                                    onChange={(e)=>setTitle(e.target.value)}
                                />
                            </div>   
                    </div> 

                    <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="flex-1  space-x-6">
                            <div> Description</div> 
                                <textarea 
                                    placeholder={description}   
                                    maxLength="250" 
                                    className=" resize-none border   outline-none rounded-2xl h-[200px] w-[80%] px-3 bg-gray-200 text-black" 
                                    onChange={(e)=>setDescription(e.target.value)}
                                />
                        </div>   
                    </div> 
            
                    <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="flex-1  space-x-6">
                            <label for='file'  className="flex space-x-2 group cursor-pointer">
                                <AttachFileIcon className='w-6 text-[#5375E2]/80 group-hover:text-[#5375E2]/60'/>
                                <div> Joindre des fichiers </div>
                            </label>
                           
                            <input id="file" className="hidden" type="file" multiple onChange={handleChange} optional/>
                        </div>   
                    </div> 
                    
                   
                  
                    <div className="w-full grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 place-content-center content-center p-2 gap-4  rounded-[5px] ">
                     
                        {
                            [...files].map(file=>{
                                return(
                                    <div className=" w-fit flex flex-col">
                                         <div className=" bg-gray-100 flex justify-center items-center p-4 w-fit">
                                            
                                            <DocumentIcon
                                                className='w-8'
                                            />
                                            
                                        </div>
                                        <div className="w-full  text-center  break-words text-sm">{file.name}</div>
                                    </div>
                                   
                                )
                            })
                        }
                    </div>
                    <button type="submit" className="bg-[#5375E2]/80 backdrop-blur-[8px]   font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider ml-auto">Valider</button>
                    
                    
            </div>
     </form>
    )
}
export default AjouterAnnouncemnt;
