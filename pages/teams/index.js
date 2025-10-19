import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Select from "react-select"
import { useStoreActions, useStoreState } from "../../store/hooks"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar"
import { Eye } from 'lucide-react'

const TeamList = props => {
    const router = useRouter();
     const {promotion} = router.query;
     console.log("kkkkkk",promotion)

    const {getTeamsList} = useStoreActions(store=>store.teamListModel)
    const {teamsList:teamsData} =useStoreState(store=>store.teamListModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)   
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)         
    const [choosenPromotion,setChoosenPromotion]  = useState(null)             
  
   useEffect(async()=>{
      
        
        
    if(promotions?.length === 0) await getAllPromotionsThunk()
    
  
  
        if(!promotion || promotion?.length === 0) {
           console.log('kkkk',"1")
           promotions?.length > 0 && await getTeamsList();
            return;
        }
        const label = promotions.find(el=>el.id=== promotion)?.name
        if(!label) {
            console.log('kkkk',"1")
           
            return ;
        }
        console.log('kkkk',"1")
        setChoosenPromotion({value:promotion,label})
          await getTeamsList(promotion);

    
    

},[promotion,promotions])

 
   let teamsList = teamsData.map(el=>{
       return {
           ...el,
           theme:el?.theme?.title
       }
   })
   console.log(teamsList,'******')
   
   const handleChange =  option=>{
      
    router.push(`/teams?promotion=${option.value}`)
   
}

   
    const columns = [...Object.keys(teamsList.length >0 &&teamsList[0])?.filter(el=>el !=='id')];
    return (
        <div>
            <HorisontalNavbar />
            <AdminVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 max-w-[calc(100vw-5rem)]">
                <div className="px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: '#1A2562'}}>
                            Liste des Équipes
                        </h1>
                        <p className="text-lg mb-6" style={{color: '#000000'}}>
                            Consultez toutes les équipes et leur statut de validation
                        </p>
                        <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                    </div>

                    {/* Promotions Status */}
                    <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Validated Promotions */}
                            <div>
                                <h3 className="font-semibold mb-3" style={{color: '#1A2562'}}>Promotions complètement validées:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {promotions.filter(p => p.allTeamsValidated).map(p => (
                                        <span key={p.id} className="px-3 py-1 bg-blue-50 rounded-full text-sm font-medium" style={{color: '#5375E2'}}>
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Non-Validated Promotions */}
                            <div>
                                <h3 className="font-semibold mb-3" style={{color: '#1A2562'}}>Promotions en attente de validation:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {promotions.filter(p => !p.allTeamsValidated).map(p => (
                                        <span key={p.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium" style={{color: '#1A2562'}}>
                                            {p.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="mb-12 flex justify-center">
                        <div className="w-full max-w-xs">
                            <label className="block text-sm font-semibold mb-2" style={{color: '#1A2562'}}>Promotion</label>
                            <Select
                                className="w-full"
                                placeholder="Sélectionner une promotion..." 
                                onChange={(option)=>{handleChange(option)}}
                                options={promotions?.map(el=>{return {value:el.id,label:el.name}})}
                                isLoading = {!promotions}
                                value={choosenPromotion}
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
                    {teamsList.length > 0 ? (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{backgroundColor: '#FFFFFF'}}>
                                            {columns.map(el=>(
                                                <th key={el} className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>
                                                    {el}
                                                </th>
                                            ))}    
                                            <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {teamsList.map(row=>(
                                            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                                {Object.keys(teamsList[0]).filter(el=>el!=='id').map(col=>{
                                                    let value = "";
                                                    if(col === 'complete' ||  col === 'peut_soutenir'){
                                                        value = row[col]?'Oui':'Non';
                                                    }else {
                                                        value = row[col]?row[col]:'___'
                                                    }
                                                    return(
                                                        <td key={`${row.id}-${col}`} className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>
                                                            <span className="block truncate">{value}</span>
                                                        </td>
                                                    )
                                                })}
                                                <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                                    <Link href={`/teams/${row.id}`}>
                                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 inline-flex" title="Voir plus">
                                                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" style={{color: '#5375E2'}} strokeWidth={1.5} />
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg" style={{color: '#000000'}}>Aucune équipe disponible</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default TeamList