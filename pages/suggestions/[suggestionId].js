import { useEffect, useState } from "react"
import Link from "next/link"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import TeacherVerticalNavbar from "../../components/TeacherVerticalNavbar"
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar"
import { useRouter } from "next/router";
import { useStoreActions, useStoreState } from "../../store/hooks"
import { FileText, User, Tag } from "lucide-react"

const suggestion = ({toastsRef}) => {
    const [modifier , setModifier] = useState(false)
    const [title , setTilte] = useState('')
    const [description , setDescription] = useState('')
    const {getThemeSuggestionThunk} = useStoreActions(store=>store.themeSuggestionsModel)
    const router = useRouter();
    const {suggestionId} = router.query;
    const [suggestedBy,setSuggestedBy] = useState({})
    const [promotion,setPromotion] = useState({})
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)
    const user = useStoreState(store=>store.user)
    
    const getSidebar = () => {
        if (user.userType === 'admin') {
            return <AdminVerticalNavbar />
        } else if (user.userType === 'teacher') {
            return <TeacherVerticalNavbar />
        } else {
            return <StudentVerticalNavbar />
        }
    }
   
    useEffect(async()=>{
        if(!suggestionId) return;
        setLoading(true)
        const data = await getThemeSuggestionThunk(suggestionId)
        setTilte(data?.title)
        setDescription(data?.description)
        setPromotion(data?.promotion)
        setDocuments(data?.documents || [])
      
        if(data?.suggestedByTeacher){
            setSuggestedBy({type:'teacher',suggestedBy:data.suggestedByTeacher})
        }else if(data?.suggestedByEntreprise){
            setSuggestedBy({type:'entreprise',suggestedBy:data.suggestedByEntreprise})
        }
        setLoading(false)
    },[suggestionId])
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-boutton border-t-transparent rounded-full animate-spin"></div>
                    <p style={{color: '#000000'}} className="font-semibold">Chargement...</p>
                </div>
            </div>
        )
    }
 
    return (
        <div>
            <HorisontalNavbar />
            {getSidebar()}
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.back()}
                            className="mb-4 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                            style={{color: '#5375E2'}}
                        >
                            ← Retour
                        </button>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{color: '#000000'}}>Suggestion de thème</h1>
                        <div className="h-1 w-20 rounded-full" style={{backgroundColor: '#5375E2'}}></div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8">
                        
                        {/* Title and Description Card */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{color: '#000000'}}>{title || 'Chargement...'}</h2>
                            <p style={{color: '#000000'}} className="text-base leading-relaxed">{description}</p>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            
                            {/* Promotion Card */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8">
                                <h3 className="text-2xl font-bold mb-6" style={{color: '#000000'}}>Promotion</h3>
                                <div className="p-4 rounded-xl border border-gray-200">
                                    <p className="text-lg font-semibold" style={{color: '#000000'}}>{promotion?.name || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Suggested By Card */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8">
                                <h3 className="text-2xl font-bold mb-6" style={{color: '#000000'}}>Proposé par</h3>
                                {suggestedBy?.suggestedBy ? (
                                    <button 
                                        onClick={() => {
                                            if(suggestedBy?.type === 'teacher') {
                                                router.push(`/teachers/${suggestedBy?.suggestedBy?.id}`)
                                            }
                                        }}
                                        className="w-full p-4 rounded-xl border border-gray-200 hover:shadow-md hover:border-boutton transition-all text-left"
                                        style={{
                                            cursor: suggestedBy?.type === 'teacher' ? 'pointer' : 'default',
                                            borderColor: suggestedBy?.type === 'teacher' ? 'inherit' : '#e5e7eb'
                                        }}
                                    >
                                        <p className="text-lg font-semibold" style={{color: '#000000'}}>
                                            {suggestedBy?.suggestedBy?.firstName} {suggestedBy?.suggestedBy?.lastName}
                                        </p>
                                        <p className="text-sm capitalize mt-2" style={{color: '#999999'}}>
                                            {suggestedBy?.type === 'teacher' ? 'Enseignant' : 'Entreprise'}
                                        </p>
                                    </button>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F4FCFF'}}>
                                            <User className="w-8 h-8" style={{color: '#5375E2'}} />
                                        </div>
                                        <p className="font-medium" style={{color: '#000000'}}>Aucune information</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Documents Section */}
                        {documents.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8">
                                <h3 className="text-2xl font-bold mb-6" style={{color: '#000000'}}>Fichiers joints ({documents.length})</h3>
                                <div className="space-y-3">
                                    {documents.map((doc, index) => (
                                        <a
                                            key={index}
                                            href={doc.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full p-4 rounded-xl border border-gray-200 hover:shadow-md hover:border-boutton transition-all text-left font-medium flex items-center gap-3 group"
                                            style={{color: '#000000'}}
                                        >
                                            <div className="p-2 rounded-lg group-hover:bg-blue-100 transition-colors flex-shrink-0" style={{backgroundColor: '#F4FCFF'}}>
                                                <FileText className="w-5 h-5" style={{color: '#5375E2'}} />
                                            </div>
                                            <span className="truncate">{doc.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}
export default suggestion;