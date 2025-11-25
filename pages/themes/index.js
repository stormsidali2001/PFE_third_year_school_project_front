import Link from "next/link"
import { useEffect, useState,useRef } from "react"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar"
import TeacherVerticalNavbar from "../../components/TeacherVerticalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import { useStoreActions, useStoreState } from "../../store/hooks"
import Select from 'react-select'
import { useRouter } from "next/router";
import { BookOpen } from 'lucide-react'




const Themes = ({toastsRef}) => {
    const renders = useRef(null)
    const router = useRouter();
    console.log(router.query,'********')
    const {promotion} = router.query;
    renders?.current++

  

   
    const {getThemesThunk} = useStoreActions(store=>store.themesModel)
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const {themes:themesData} = useStoreState(store=>store.themesModel)
    const [chosenPromotion,setChoosenPromotion] = useState(null)
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
      
        
       
        if(promotions?.length === 0) await getAllPromotionsThunk()
        
      
      
            if(!promotion || promotion?.length === 0) {
               
                promotions?.length > 0 && await getThemesThunk()
                return;
            }
            const label = promotions.find(el=>el.id=== promotion)?.name
            if(!label) {
               
                return ;
            }
          
            setChoosenPromotion({value:promotion,label})
            await getThemesThunk(promotion)

        
        

    },[promotion,promotions])
   
   
    const handleChange = async option=>{
      
        router.push(`/themes?promotion=${option.value}`)
       
    }


 
   

    
   
   
   

    let suggestedBy;
    let themes = themesData.map(th=>{
        const newObj = {...th};
        if(th.promotion){
            newObj.promotion = th.promotion.name;
        }
        if(th.suggestedByTeacher){
            suggestedBy = 'teacher'
            newObj.suggestedByTeacher = th.suggestedByTeacher.firstName+' '+th.suggestedByTeacher.lastName;
            delete newObj.suggestedByEntreprise;
            
        }else if(th.suggestedByEntreprise){
            suggestedBy = 'entreprise'
            newObj.suggestedByEntreprise = th.suggestedByEntreprise.name;
            delete newObj.suggestedByTeacher;
        }


        return newObj;

    });
    console.log(themes,'**** th')


    if(!themes  ) return 'loading'
  


    return (
        <div>
            <HorisontalNavbar />
            {getSidebar()}
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-20 max-w-[calc(100vw-5rem)]">
                <div className="px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: '#000000'}}>
                            Liste des Thèmes
                        </h1>
                        <p className="text-lg mb-6" style={{color: '#000000'}}>
                            Explorez tous les thèmes disponibles pour vos projets
                        </p>
                        <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                    </div>

                    {/* Filter */}
                    <div className="mb-12 flex justify-center">
                        <div className="w-full max-w-xs">
                            <label className="block text-sm font-semibold mb-2" style={{color: '#000000'}}>Promotion</label>
                            <Select
                                className="w-full"
                                placeholder="Sélectionner une promotion..." 
                                onChange={(option)=>{handleChange(option)}}
                                options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                                isLoading = {!promotions}
                                value={chosenPromotion}
                                styles = {{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: 'white',
                                        borderColor: '#e5e7eb',
                                        borderRadius: '0.5rem',
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
                    </div>

                    {/* Table */}
                    {themes?.length !== 0 ? (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{backgroundColor: '#FFFFFF'}}>
                                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>Promotion</th>
                                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>Titre</th>
                                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>Description</th>
                                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>Proposé par</th>
                                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {themes?.map(({title,description,suggestedByTeacher,suggestedByEntreprise,promotion,id})=>{
                                            return (
                                                <tr key={id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={()=>id&&router.push(`/themes/${id}`)}>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>
                                                        <span className="block truncate">{promotion}</span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>
                                                        <span className="block truncate">{title}</span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm max-w-xs" style={{color: '#000000'}}>
                                                        <span className="block truncate">{description}</span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>
                                                        <span className="block truncate">{suggestedByTeacher ? suggestedByTeacher : suggestedByEntreprise}</span>
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                                        <button 
                                                            className="px-3 py-1 bg-boutton text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-all duration-200"
                                                            onClick={(e)=>{e.stopPropagation(); router.push(`/themes/${id}`)}}
                                                        >
                                                            Voir
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg" style={{color: '#000000'}}>Aucun thème disponible</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Themes;