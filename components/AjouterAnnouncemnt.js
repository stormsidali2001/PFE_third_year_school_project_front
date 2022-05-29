import React, { useState } from "react"
import { useStoreActions } from "../store/hooks";
import AttachFileIcon from "../icons/AttachFileIcon";
import SpeakerIcon from "../icons/SpeakerIcon";
import DocumentIcon from "../icons/documentIcon";
import { useRouter } from "next/router";


const AjouterAnnouncemnt = ({toastsRef}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const {uploadFilesThunk} = useStoreActions(store=>store.user)
    const {createAnnouncementThunk} = useStoreActions(store=>store.teamAnnouncementsModel)
    const router = useRouter();
    const [loading,setLoading] = useState(false);


    function handleChange(event) {
        const { files: fileLst } = event.target;
        // setFiles(fileLst);
        console.log(fileLst, [...fileLst].map(({name}) => {return {name}}));
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
            setLoading(true);
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
           setLoading(false);
           setDescription('')
           setTitle('')
           setFiles([])


        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"probleme",mode:'Error'})
        }
        


    }
    return (

        <form 
            className="h-[500px] w-[500px]  justify-center flex flex-col space-y-6  text-[#1A2562]  font-xyz mt-[100px] mx-auto rounded-2xl items-center bg-white/80 backdrop-blur-sm shadow-xl p-2  absolute"
            onSubmit={handleSubmit}
        >
            <span className="text-[26px]">Annoncement</span>
        
           <div className='space-y-3 flex flex-col w-[95%] items-center px-8'>
               
                <div className='flex flex-wrap -mx-3 mb-6  '>
                            <div className="flex flex-row items-center justify-center space-x-6">
                                <div> Titre</div>
                                <input 
                                    placeholder='Titre...'
                                    value={title}
                                    className=" border border-slate-200 rounded-md shadow-lg  outline-none h-[30px] w-[300px] px-3 bg-white/20 backdrop-blur-sm text-black" 
                                    onChange={(e)=>setTitle(e.target.value)}
                                />
                            </div>   
                </div> 

                    <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="flex-1  space-x-6">
                            <div> Description</div> 
                                <textarea 
                                    placeholder='Description...'
                                    value={description}
                                    maxLength="250" 
                                    className=" resize-none border border-slate-200  outline-none rounded-md shadow-md h-[120px] w-[350px] px-3 bg-white/20 backdrop-blur-sm text-black" 
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
                    [...files].map((file,index)=>{
                                return(
                                    <label 
                                    className=" w-fit flex flex-col hover:scale-105 cursor-pointer transition-transform ease-in"
                                    key={index}
                                
                                >
                                <div className=" bg-gray-100 flex justify-center items-center p-4 w-fit">
                                   
                                   <DocumentIcon
                                       className='w-8'
                                   />
                                   
                               </div>
                               <div className="w-full  text-center  break-words text-sm">{file.name}</div>
                           </label>

                               
                                   
                                )
                            })
                        }
                    </div>
                    {
                         loading?(
                            <svg role="status" class="h-[60px] lg:w-[360px] min-w-[250px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
                        ):(
                            <button type="submit" className="bg-blue-200 hover:bg-blue-300 rounded-full shadow-md h-[35px] w-[120px]">Valider</button>

                        )
                    }
                   
                    
                    
            </div>
     </form>
    )
}
export default AjouterAnnouncemnt;
