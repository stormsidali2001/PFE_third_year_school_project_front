import Link from "next/link"
import { useEffect, useState,useRef, useLayoutEffect } from "react"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar"
import TeacherVerticalNavbar from "../../components/TeacherVerticalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import { useStoreActions, useStoreState } from "../../store/hooks"
import Select from 'react-select'
import { useRouter } from "next/router";
import { Eye, Check } from 'lucide-react'



const Suggestions = ({toastsRef}) => {
    const renders = useRef(null)
    const router = useRouter();
    console.log(router.query,'********')
    const {promotion} = router.query;
    renders?.current++

   
    const {getThemeSuggestionsThunk,validateThemeSuggestionThunk} = useStoreActions(store=>store.themeSuggestionsModel)
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const {themeSuggestions:themeSuggestionsData} = useStoreState(store=>store.themeSuggestionsModel)
    const [chosenPromotion,setChoosenPromotion] = useState(null)
    const user = useStoreState(store=>store.user)
    const isAdmin = user?.userType === 'admin';
    
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
               
                promotions?.length > 0 && await getThemeSuggestionsThunk()
                return;
            }
            const label = promotions.find(el=>el.id=== promotion)?.name
            if(!label) {
               
                return ;
            }
          
            setChoosenPromotion({value:promotion,label})
            await getThemeSuggestionsThunk(promotion)

        
        

    },[promotion,promotions])
   
    const handleChange = async option=>{
      
        router.push(`/suggestions?promotion=${option.value}`)
       
    }

    const hanldeValidateThemeSuggestion = async(themeId)=>{
        try{
            await validateThemeSuggestionThunk(themeId)
            toastsRef.current.addMessage({text:"Suggestion validée!",mode:'Alert'})
            await getThemeSuggestionsThunk(promotion)
        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"Erreur lors de la validation",mode:'Error'})
        }
    }
   

    
   
  
   


    let themeSuggestions = themeSuggestionsData.map(th=>{
        const newObj = {...th};
        if(th.promotion){
            newObj.promotion = th.promotion.name;
        }
        if(th.suggestedByTeacher){
            newObj.suggestedByTeacher = th.suggestedByTeacher.firstName+' '+th.suggestedByTeacher.lastName;
            delete newObj.suggestedByEntreprise;
            
        }else if(th.suggestedByEntreprise){
            newObj.suggestedByEntreprise = th.suggestedByEntreprise.name;
            delete newObj.suggestedByTeacher;
        }


        return newObj;

    });
    console.log(themeSuggestions,'**** th')
     const columns = themeSuggestions.length !== 0?[...Object.keys(themeSuggestions[0]).filter(el=>el!=='id')]:[];


   
  



    return (
        <div>
            <HorisontalNavbar />
            {getSidebar()}
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-20 max-w-[calc(100vw-5rem)]">
                <div className="px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: '#000000'}}>
                            Liste des Suggestions
                        </h1>
                        <p className="text-lg mb-6" style={{color: '#000000'}}>
                            Consultez toutes les suggestions de thèmes proposées
                        </p>
                        <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                    </div>

                    {/* Filters */}
                    <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 max-w-md">
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
                    {themeSuggestions.length !== 0 && (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{backgroundColor: '#FFFFFF'}}>
                                            {
                                                columns.map(el=>{
                                                    return(
                                                        <th key={el} className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>
                                                            {el}
                                                        </th>
                                                    )
                                                })
                                               
                                               
                                            }     
                                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {
                                            themeSuggestions.map((row,rindex)=>{
                                                console.log(row,'777')
                                               
                                                return(
                                                    <tr key={`${rindex}`} className="hover:bg-gray-50 transition-colors">
                                                        {
                                                           
                                                           columns.map((col,cindex)=>{
                                                               let value = row[col];
                                                               console.log(col,value,'777')
                                                            
                                                            if(value === true){
                                                                value = 'Oui'
                                                            }else if(value === false){
                                                                value = 'Non'
                                                            }
                                                      
                                                                return(
                                                                    <td 
                                                                    className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap"
                                                                    key={`${rindex} ${cindex}`}
                                                                    style={{color: '#000000'}}
                                                                    >
                                                                        <span className="block truncate">{value}</span>
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                                            <div className='flex flex-row gap-2 sm:gap-3 items-center justify-center'>
                                                                <Link href={`/suggestions/${row['id']}`}>
                                                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0" title="Voir plus">
                                                                        <Eye className="w-4 h-4 sm:w-5 sm:h-5" style={{color: '#5375E2'}} strokeWidth={1.5} />
                                                                    </button>
                                                                </Link>
                                                                {  !row['validated']&& isAdmin&&(
                                                                    <button 
                                                                        className="p-2 hover:bg-green-50 rounded-lg transition-colors flex-shrink-0"
                                                                        onClick={(e)=>{e.preventDefault();hanldeValidateThemeSuggestion(row['id'])}}
                                                                        title="Valider"
                                                                    >
                                                                        <Check className="w-4 h-4 sm:w-5 sm:h-5" style={{color: '#10B981'}} strokeWidth={1.5} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td> 
                                                     
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {themeSuggestions.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-lg" style={{color: '#000000'}}>Aucune suggestion disponible</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Suggestions;