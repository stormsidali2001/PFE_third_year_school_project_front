import { useStoreActions ,useStoreState} from "../store/hooks";
import { useState ,useEffect} from "react"
import { useRouter } from "next/router";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import { Plus, Trash2, Loader } from 'lucide-react';


const CreerSondage = ({toastsRef}) => {

    const [option , setOption] = useState('');
    const [title,setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [duree,setDuree] = useState(1);
    const [options , setOptions] = useState([]);
    const {createSurveyThunk} = useStoreActions(store=>store.surveysModel);
    const [loading,setLoading] = useState(false)
    const router = useRouter();
    const user = useStoreState(store=>store.user)


    const optionhandler = (e) => {
        e.preventDefault();
        if(option.length === 0){
            toastsRef.current.addMessage({text:"L'option doit être non vide",mode:'Error'})
            return;
        }
        if(options.length < 10){

            setOptions([...options, option])
            setOption('')
        }
        else{
            toastsRef.current.addMessage({text:"Il y a trop d'options",mode:'Error'})
        }
    }
    const Empty = (elements)=>{
        return elements.some(el=>el === '')
    }
    const handleSubmitForm =async(e)=>{
        e.preventDefault();
         if(Empty([title,description]) || options.length === 0){
            toastsRef.current.addMessage({text:"Tous les champs doivent être remplis",mode:'Error'})
            return;
         }
      
         try{
            setLoading(true)
            await createSurveyThunk({
                survey:{

                    title,
                    description,
                    period:duree,
                    options:options.map(el=>{return {description:el}})
                }
            })
          
            toastsRef.current.addMessage({text:"Le sondage a été créé",mode:'Alert'})
            setTimeout(()=>router.reload(),1000)


         }catch(err){
             console.log(err);
             toastsRef.current.addMessage({text:"Problème lors de la création",mode:'Error'})
             setLoading(false)


         }
      

    }

    const removeOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    }

    return(
        <div>
            <HorisontalNavbar />
            <StudentVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto">
                <div className="ml-16 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: '#1A2562'}}>
                            Créer un sondage
                        </h1>
                        <p className="text-lg mb-6" style={{color: '#000000'}}>
                            Posez vos questions à votre équipe
                        </p>
                        <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                    </div>

                    {/* Main Form */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <form onSubmit={handleSubmitForm} className="space-y-4">
                                {/* Top Row - Title and Duration */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Titre *</label>
                                        <input 
                                            placeholder='Ex: Quel est votre langage préféré ?'
                                            value={title}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-boutton focus:ring-1 focus:ring-blue-200 text-sm"
                                            onChange={(e)=>setTitle(e.target.value)}
                                            style={{color: '#000000'}}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Durée (jours) *</label>
                                        <select 
                                            value={duree}
                                            onChange={(e)=>setDuree(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-boutton focus:ring-1 focus:ring-blue-200 text-sm"
                                            style={{color: '#000000'}}
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7].map(day => (
                                                <option key={day} value={day}>{day}j</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Description Row */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Description *</label>
                                    <textarea 
                                        placeholder='Contexte du sondage...'
                                        value={description}
                                        maxLength="250" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg h-16 resize-none focus:border-boutton focus:ring-1 focus:ring-blue-200 text-sm"
                                        onChange={(e)=>setDescription(e.target.value)}
                                        style={{color: '#000000'}}
                                    />
                                    <p className="text-xs mt-1" style={{color: '#666666'}}>
                                        {description.length}/250
                                    </p>
                                </div>

                                {/* Options Row */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Options ({options.length}/10) *</label>
                                    <div className="flex gap-2 mb-3">
                                        <input 
                                            placeholder='Entrez une option...'
                                            value={option}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-boutton focus:ring-1 focus:ring-blue-200 text-sm"
                                            onChange={(e)=>setOption(e.target.value)}
                                            style={{color: '#000000'}}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    optionhandler(e);
                                                }
                                            }}
                                        />
                                        <button 
                                            onClick={optionhandler}
                                            type="button"
                                            className="px-4 py-2 bg-boutton text-white rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center gap-1 whitespace-nowrap text-sm"
                                        >
                                            <Plus className="w-4 h-4" /> Ajouter
                                        </button>
                                    </div>

                                    {/* Options List - Compact */}
                                    {options.length > 0 && (
                                        <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 max-h-24 overflow-y-auto">
                                            <div className="space-y-1">
                                                {options.map((el, index) => (
                                                    <div 
                                                        key={index}
                                                        className="flex items-center justify-between bg-white p-2 rounded border border-gray-100 text-sm"
                                                    >
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <span className="font-semibold w-5 h-5 bg-boutton text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">
                                                                {index + 1}
                                                            </span>
                                                            <span style={{color: '#000000'}} className="truncate">{el}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeOption(index)}
                                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-all flex-shrink-0 ml-2"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end gap-3 pt-3 border-t">
                                    <button 
                                        type="button"
                                        onClick={() => router.back()}
                                        className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm"
                                        style={{color: '#1A2562'}}
                                    >
                                        Annuler
                                    </button>
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2 bg-boutton text-white rounded-lg font-semibold hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader className="w-4 h-4 animate-spin" /> Création...
                                            </>
                                        ) : (
                                            'Créer'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

   
}
export default CreerSondage;