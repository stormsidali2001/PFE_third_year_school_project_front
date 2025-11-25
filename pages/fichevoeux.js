import { useEffect, useState ,useRef} from "react";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import HorisontalNavbar from "../components/HorisontalNavbar";
import TeacherVerticalNavbar from "../components/TeacherVerticalNavbar";
import AdminVerticalNavbar from "../components/AdminVerticalNavbar";
import { useStoreActions, useStoreState } from "../store/hooks";
import { GripVertical, Send, BookOpen, ListOrdered } from "lucide-react";

const FicheVoeux = ({toastsRef}) => {
  const {getThemesThunk} = useStoreActions(store=>store.themesModel)
  const {themes} = useStoreState(store=>store.themesModel)

  const listeRef = useRef(null);
  const user = useStoreState(store=>store.user)
  const promotionId = user?.student?.promotion?.id
  const [themeList,setThemeList] = useState(themes);
  const [dragging,setDragging] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const currentNode = useRef();
  const dragNode = useRef()
  const {submitWishList} = useStoreActions(store=>store.wishListModel)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSidebar = () => {
    if (user.userType === 'admin') {
        return <AdminVerticalNavbar />
    } else if (user.userType === 'teacher') {
        return <TeacherVerticalNavbar />
    } else {
        return <StudentVerticalNavbar />
    }
  }
    useEffect(async ()=>{
      if(!promotionId) return;
     const data =  await getThemesThunk(promotionId)
     setThemeList(data)
    },[promotionId])
   
    const handleDragEnd = e =>{
      setDragging(false)
      setDraggedIndex(null);
      dragNode.current.removeEventListener("dragend",handleDragEnd)
      dragNode.current = null;
      currentNode.current = null;
    }
    const handleDragStart = (e,index)=>{
      currentNode.current = index;
      setDraggedIndex(index);
      dragNode.current = e.target;
      dragNode.current.addEventListener("dragend",handleDragEnd)
      setTimeout(()=>{
        setDragging(true)
      },0)
    }
    const handleDragEnter = (e,index) =>{
      console.log(e.target,"handleDragEnter")
      if(index === currentNode.current) {
        console.log("same node")
        return;
      }
        const startIndex = currentNode.current;
        const endIndex = index;
        if(!Number.isInteger(index)){
          return;
        }
        console.log("start index",startIndex,"end index ",endIndex)

        setThemeList(themeList=>{
          const newThemeList= [...themeList]
          const tmp ={...newThemeList[startIndex]}
          newThemeList[startIndex] = {...newThemeList[endIndex]}
          newThemeList[endIndex] = tmp;
          currentNode.current = endIndex;
          return newThemeList;
        })
      


    }
    const handleSubmitWishList = async(e)=>{
      e.preventDefault();
      setIsSubmitting(true);
      try{
        await submitWishList({
          wishes:themeList.map(({id},index)=>{
            return {
              order:index,
              themeId:id
            }
          })
        })
        toastsRef.current.addMessage({mode:'Alert',text:"Fiche de vœux envoyée avec succès!"})
      }catch(err){
        toastsRef.current.addMessage({text:err.response?.data?.message || "Erreur lors de l'envoi",mode:'Error'})
      }finally{
        setIsSubmitting(false);
      }
    }
    return (
        <div>
            <HorisontalNavbar />
            {getSidebar()}
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 rounded-lg" style={{backgroundColor: '#F4FCFF'}}>
                                <ListOrdered className="w-8 h-8" style={{color: '#5375E2'}} />
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold" style={{color: '#000000'}}>Fiche de vœux</h1>
                        </div>
                        <div className="h-1 w-20 rounded-full mt-3" style={{backgroundColor: '#5375E2'}}></div>
                        <p className="text-base mt-4" style={{color: '#000000'}}>Organisez vos préférences de thèmes en les glissant-déposant. Votre classement sera envoyé à l'administration.</p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-8">
                        
                        {/* Info Box */}
                        <div className="mb-8 p-4 rounded-lg border-l-4" style={{backgroundColor: '#F4FCFF', borderColor: '#5375E2'}}>
                            <p className="text-sm font-medium" style={{color: '#000000'}}>
                                💡 Conseil: Ordonnez les thèmes par ordre de préférence (1 = votre préférence)
                            </p>
                        </div>

                        {/* Themes List */}
                        <div className="space-y-3 mb-8">
                            {themeList && themeList.length > 0 ? (
                                themeList.map((item, index) => (
                                    <div
                                        key={item.id}
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnter={(e) => dragging ? handleDragEnter(e, index) : null}
                                        draggable={true}
                                        className={`
                                            p-4 rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing
                                            flex items-center gap-4
                                            hover:shadow-md
                                            ${draggedIndex === index ? 'opacity-50 bg-gray-50' : 'bg-white hover:border-boutton'}
                                            ${dragging && index === currentNode.current ? 'invisible' : 'visible'}
                                        `}
                                        style={{
                                            borderColor: draggedIndex === index ? '#e5e7eb' : '#e5e7eb'
                                        }}
                                    >
                                        {/* Drag Handle */}
                                        <div className="flex-shrink-0" style={{color: '#999999'}}>
                                            <GripVertical className="w-5 h-5" />
                                        </div>

                                        {/* Priority Badge */}
                                        <div 
                                            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white"
                                            style={{backgroundColor: '#5375E2'}}
                                        >
                                            {index + 1}
                                        </div>

                                        {/* Theme Title */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4 flex-shrink-0" style={{color: '#5375E2'}} />
                                                <p className="font-semibold truncate" style={{color: '#000000'}}>{item.title}</p>
                                            </div>
                                        </div>

                                        {/* Indicator */}
                                        <div className="flex-shrink-0" style={{color: '#999999'}}>
                                            <GripVertical className="w-4 h-4" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#F4FCFF'}}>
                                        <BookOpen className="w-8 h-8" style={{color: '#5375E2'}} />
                                    </div>
                                    <p className="font-medium" style={{color: '#000000'}}>Aucun thème disponible</p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-3 justify-end">
                            <button
                                disabled={isSubmitting || !themeList || themeList.length === 0}
                                onClick={handleSubmitWishList}
                                className="flex items-center gap-2 px-6 py-3 font-semibold rounded-lg text-white transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{backgroundColor: '#5375E2'}}
                            >
                                <Send className="w-5 h-5" />
                                {isSubmitting ? 'Envoi...' : 'Envoyer la fiche'}
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default FicheVoeux;