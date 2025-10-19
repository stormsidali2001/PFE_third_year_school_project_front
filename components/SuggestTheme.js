import React, { useEffect, useState } from "react"
import { useRouter } from "next/router";
import {useStoreActions,useStoreState} from '../store/hooks';
import Select from 'react-select'
import { Upload, FileText, Loader } from 'lucide-react'


const SuggestTheme = ({toastsRef}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const {uploadFilesThunk} = useStoreActions(store=>store.user)
    const {createThemeSuggestionThunk} = useStoreActions(store=>store.themeSuggestionsModel)
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const [chosenPromotion,setChoosenPromotion] = useState(null)
    useEffect(async()=>{
        await getAllPromotionsThunk();
    },[])


    function handleChange(event) {
        const { files: fileLst } = event.target;
        console.log(fileLst,  [...fileLst].map(({name}) => {return {name}}));
        setFiles(event.target.files)
      };
    const Empty = (elements)=>{
        return elements.some(el=>el === '')
    }
   
      
    const handleSubmit = async e=>{
        e.preventDefault();
        if(Empty([title,description]) && !chosenPromotion){
            toastsRef.current.addMessage({text:"Tous les champs doivent être remplis",mode:'Error'})
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
           toastsRef.current.addMessage({text:"Fichiers téléchargés",mode:'Alert'})
           await createThemeSuggestionThunk({
               title,
               description,
               documents:files.length!=0 ?savedFiles.map(({filename,destination,originalname})=>{
                   const path = destination+'/'+filename;
                   return {
                        name:originalname,
                        url:path,
                   }
               }):[],
               promotionId:chosenPromotion.value
           })
           toastsRef.current.addMessage({text:"La suggestion de thème a été créée avec succès!",mode:'Alert'})
           setLoading(false);
           setDescription('')
           setTitle('')
           setFiles([])


        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"Problème lors de la création",mode:'Error'})
            setLoading(false)
        }
        

    }
    return (

        <form 
            className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            onSubmit={handleSubmit}
        >    
            <div className='space-y-6 flex flex-col w-full'>
                {/* Promotion Select */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold" style={{color: '#1A2562'}}>Promotion</label>
                    <Select
                        className="w-full"
                        placeholder="Sélectionner une promotion..." 
                        onChange={(option)=>{setChoosenPromotion(option)}}
                        options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                        isLoading = {!promotions}
                        value={chosenPromotion}
                        styles = {{
                            control: (base) => ({
                                ...base,
                                backgroundColor: 'white',
                                borderColor: '#e5e7eb',
                                borderRadius: '0.5rem',
                                padding: '0.25rem',
                                boxShadow: 'none',
                                '&:hover': {
                                    borderColor: '#5375E2'
                                }
                            }),
                            option: (base, state) => ({
                                ...base,
                                backgroundColor: state.isSelected ? '#5375E2' : state.isFocused ? '#f0f0f0' : 'white',
                                color: state.isSelected ? 'white' : '#000000'
                            })
                        }}
                    />
                </div>

                {/* Title Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold" style={{color: '#1A2562'}}>Titre</label>
                    <input 
                        placeholder='Entrez le titre du thème...'
                        value={title}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 font-roboto focus:border-boutton focus:ring-2 focus:ring-blue-200 transition-all" 
                        onChange={(e)=>setTitle(e.target.value)}
                        style={{color: '#000000'}}
                    />
                </div>

                {/* Description Textarea */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold" style={{color: '#1A2562'}}>Description</label>
                    <textarea 
                        placeholder='Décrivez votre idée de thème (max 250 caractères)...'
                        value={description}
                        maxLength="250" 
                        className="w-full resize-none border border-gray-300 rounded-lg px-4 py-3 font-roboto h-24 focus:border-boutton focus:ring-2 focus:ring-blue-200 transition-all" 
                        onChange={(e)=>setDescription(e.target.value)}
                        style={{color: '#000000'}}
                    />
                    <p className="text-xs" style={{color: '#666'}}>
                        {description.length}/250 caractères
                    </p>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold mb-3" style={{color: '#1A2562'}}>Fichiers joints</label>
                    <label htmlFor='file' className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-boutton hover:bg-blue-50 transition-all">
                        <Upload className="w-8 h-8 mb-2" style={{color: '#5375E2'}} />
                        <span className="font-semibold" style={{color: '#1A2562'}}>Cliquez pour ajouter des fichiers</span>
                        <span className="text-xs" style={{color: '#666'}}>ou glissez-déposez</span>
                    </label>
                    <input id="file" className="hidden" type="file" multiple onChange={handleChange} />
                </div>

                {/* Files Display */}
                {files.length > 0 && (
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{color: '#1A2562'}}>Fichiers sélectionnés ({files.length})</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...files].map((file,index)=>{
                                return(
                                    <div 
                                        className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all border border-gray-200"
                                        key={index}
                                    >
                                        <FileText className="w-8 h-8 mb-2" style={{color: '#5375E2'}} />
                                        <p className="text-xs text-center break-words font-roboto" style={{color: '#000000'}}>
                                            {file.name}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 bg-boutton text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                En cours...
                            </>
                        ) : (
                            'Valider la suggestion'
                        )}
                    </button>
                </div>
            </div>
     </form>
    )
}
export default SuggestTheme;
