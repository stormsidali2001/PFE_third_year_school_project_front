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
    const [isDragActive, setIsDragActive] = useState(false);


    function handleChange(event) {
        const { files: fileLst } = event.target;
        // setFiles(fileLst);
        console.log(fileLst, [...fileLst].map(({name}) => {return {name}}));
        setFiles(event.target.files)
      };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        const droppedFiles = e.dataTransfer.files;
        setFiles(droppedFiles);
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
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 space-y-6"
            onSubmit={handleSubmit}
        >
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold mb-2" style={{color: '#1A2562'}}>Créer une annonce</h1>
                <div className="h-1 w-16 rounded-full" style={{backgroundColor: '#5375E2'}}></div>
            </div>
        
           <div className='space-y-6'>
               
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-semibold mb-2" style={{color: '#1A2562'}}>Titre *</label>
                    <input 
                        placeholder='Entrez le titre...'
                        value={title}
                        className="w-full border border-gray-300 rounded-lg outline-none px-4 py-2 text-sm focus:border-boutton focus:ring-1 focus:ring-blue-200 transition-all" 
                        onChange={(e)=>setTitle(e.target.value)}
                        style={{color: '#000000'}}
                    />
                </div> 

                {/* Description Input */}
                <div>
                    <label className="block text-sm font-semibold mb-2" style={{color: '#1A2562'}}>Description *</label>
                    <textarea 
                        placeholder='Décrivez votre annonce...'
                        value={description}
                        maxLength="250" 
                        className="w-full resize-none border border-gray-300 outline-none rounded-lg px-4 py-2 text-sm h-28 focus:border-boutton focus:ring-1 focus:ring-blue-200 transition-all" 
                        onChange={(e)=>setDescription(e.target.value)}
                        style={{color: '#000000'}}
                    />
                    <p className="text-xs mt-1 text-right" style={{color: '#999999'}}>{description.length}/250</p>
                </div> 
            
                {/* File Upload */}
                <div>
                    <label htmlFor='file' className="block text-sm font-semibold mb-3 cursor-pointer" style={{color: '#1A2562'}}>
                        Joindre des fichiers (optionnel)
                    </label>
                    <label 
                        htmlFor='file' 
                        className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all ${
                            isDragActive ? 'bg-blue-100 border-boutton' : 'bg-gray-50 border-gray-300 hover:border-boutton hover:bg-blue-50/50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="text-center">
                            <div className="mb-2">
                                <svg className="w-8 h-8 mx-auto" style={{color: '#5375E2'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium" style={{color: '#1A2562'}}>
                                {isDragActive ? 'Déposez les fichiers ici' : 'Cliquez pour ajouter des fichiers'}
                            </p>
                            <p className="text-xs" style={{color: '#999999'}}>
                                {isDragActive ? '' : 'ou glissez-déposez'}
                            </p>
                        </div>
                    </label>
                    <input id="file" className="hidden" type="file" multiple onChange={handleChange} optional/>
                </div> 
                
                {/* Files Preview */}
                {[...files].length > 0 && (
                    <div>
                        <p className="text-sm font-semibold mb-3" style={{color: '#1A2562'}}>Fichiers sélectionnés ({[...files].length}):</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[...files].map((file,index)=>(
                                <div 
                                    key={index}
                                    className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-boutton hover:bg-blue-50 transition-all"
                                >
                                    <svg className="w-8 h-8 mb-2" style={{color: '#5375E2'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="w-full text-center text-xs break-words" style={{color: '#000000'}}>{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    style={{backgroundColor: '#5375E2'}}
                >
                    {loading ? (
                        <>
                            <svg role="status" className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Création...</span>
                        </>
                    ) : (
                        <span>Créer l'annonce</span>
                    )}
                </button>
            </div>
     </form>
    )
}
export default AjouterAnnouncemnt;
