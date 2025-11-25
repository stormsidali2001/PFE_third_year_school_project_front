import { useEffect, useState } from "react";
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import ModalPortal from "../../components/ModalPortal";
import { useStoreActions,useStoreState } from "../../store/hooks";
import Select from 'react-select'
import { useRouter } from "next/router";
import { Users, ArrowRight, ArrowLeft, Check } from 'lucide-react';


const AssignTeamsToThemes = ({toastsRef}) => {
    const router  = useRouter()
  const [open,setOpen] = useState(false)
  const [chosenPromotion,setChoosenPromotion] = useState(null)
  const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
  const {promotions} = useStoreState(store=>store.promotionsModel)
  const [loading,setLoading] = useState(false)
  const {getTeamsStats,completeTeams,applyTeamsCompletion} = useStoreActions(store=>store.teamListModel)
  const [teamsStats,setTeamsStats] = useState(null);
  const [results,setResults] = useState({})


  const [step,setStep] = useState(0)

  useEffect(async()=>{
     
    await getAllPromotionsThunk();

},[])
const handleCompleteTeams = async e=>{
    e.preventDefault()
    if(!chosenPromotion ) {
        toastsRef.current.addMessage({text:"Veuillez sélectionner une promotion",mode:'Error'})
        return;
    }
    try{

       const data =   await completeTeams({
                                              promotionId:chosenPromotion?.value
                                         });
       

        setResults(data)                             
        setStep(step=>step+1)
        toastsRef.current.addMessage({text:"Équipes complétées avec succès!",mode:'Alert'})
    }catch(err){
        toastsRef.current.addMessage({text:'Erreur lors de la complétion',mode:'Error'})
        console.log(err)
    }
    
}
const handleApplyTeamsCompletion = async e=>{
    try{

        e.preventDefault()
         await applyTeamsCompletion({
            addedStudents:results.studentAdded.map(el=>{return {studentId:el.student.id,teamId:el.team.id}}),
            deletedStudents:results.studentDeleted.map(el=>{return {studentId:el.student.id,teamId:el.team.id}}),
            newTeams:results.newTeams.map(el=>{return {
                    students:el.students.map(st=>{
                        return {studentId:st.id}
                    }),
          
            }}),
            promotionId:chosenPromotion.value
         
            
        })
        toastsRef.current.addMessage({text:"Changements appliqués avec succès!",mode:"Alert"})
        setStep(0)
        setOpen(false)
        router.reload()
    }catch(err){
        console.log(err)
        toastsRef.current.addMessage({text:err.response.data.message,mode:"Error"})
    }
}

 
   return(
      <div>
        <HorisontalNavbar />
        <AdminVerticalNavbar />
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-20 max-w-[calc(100vw-5rem)]">
            <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[calc(100vh-150px)]">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4" style={{color: '#000000'}}>
                            Compléter les Équipes
                        </h1>
                        <p className="text-base" style={{color: '#000000'}}>
                            Équilibrer les équipes est une tâche manuelle difficile, mais avec notre plateforme cela se fait en quelques clics
                        </p>
                    </div>

                    {/* Description Box */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-8 border-l-4" style={{borderColor: '#5375E2'}}>
                        <p className="text-sm font-semibold mb-2" style={{color: '#5375E2'}}>Remarque importante:</p>
                        <p className="text-sm" style={{color: '#000000'}}>
                            Les étudiants sans équipe seront affectés à des équipes non complètes ou réunis dans de nouvelles équipes
                        </p>
                    </div>

                    {/* Start Button */}
                    <button 
                        className="w-full py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        style={{backgroundColor: '#5375E2', color: 'white'}}
                        onClick={()=>setOpen(true)}
                    >
                        <Users className="w-5 h-5" />
                        Compléter les Équipes
                    </button>
               
                    <ModalPortal
                        open={open}
                        handleClose={setOpen}
                    >
                        <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 border border-gray-100">
                            <form>
                                {/* Step 0: Selection */}
                                {step === 0 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-center" style={{color: '#000000'}}>Sélectionner une promotion</h2>
                                        
                                        <Select
                                            placeholder="Sélectionner une promotion..." 
                                            className="w-full"
                                            onChange={async (option)=>{
                                                setChoosenPromotion(option);
                                                const data = await getTeamsStats({promotionId:option.value})
                                                setTeamsStats(data)
                                            }}
                                            options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                                            isLoading={!promotions}
                                            value={chosenPromotion}
                                            styles={{
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

                                        {teamsStats && (
                                            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                                                <div>
                                                    <p className="text-sm font-semibold" style={{color: '#000000'}}>Étudiants sans équipe</p>
                                                    <p className="text-2xl font-bold" style={{color: '#5375E2'}}>{teamsStats.studentsWithoutATeam}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold" style={{color: '#000000'}}>Équipes incomplètes</p>
                                                    <p className="text-2xl font-bold" style={{color: '#5375E2'}}>{teamsStats.notCompleteTeams}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold" style={{color: '#000000'}}>Min par équipe</p>
                                                    <p className="text-2xl font-bold" style={{color: '#5375E2'}}>{teamsStats.minMembersInTeam}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold" style={{color: '#000000'}}>Max par équipe</p>
                                                    <p className="text-2xl font-bold" style={{color: '#5375E2'}}>{teamsStats.maxMembersInTeam}</p>
                                                </div>
                                            </div>
                                        )}

                                        {teamsStats?.allTeamsValidated ? (
                                            <div className="bg-blue-50 rounded-lg p-4 text-center" style={{color: '#5375E2'}}>
                                                ✓ Toutes les équipes de cette promotion sont déjà validées
                                            </div>
                                        ) : (
                                            <div className="flex gap-3">
                                                <button 
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
                                                    style={{color: '#000000'}}
                                                >
                                                    Annuler
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={handleCompleteTeams}
                                                    className="flex-1 py-2 px-4 rounded-lg font-medium text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                                    style={{backgroundColor: '#5375E2'}}
                                                >
                                                    Suivant <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Step 1: Results */}
                                {step === 1 && (
                                    <div className="space-y-6 max-h-[600px] overflow-y-auto">
                                        <h2 className="text-2xl font-bold text-center" style={{color: '#000000'}}>Résultats</h2>

                                        {/* Deletions */}
                                        {results?.studentDeleted?.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-3" style={{color: '#EF4444'}}>Suppressions ({results.studentDeleted.length})</h3>
                                                <div className="space-y-2 bg-red-50 rounded-lg p-4">
                                                    {results.studentDeleted.map(({student, team}, index) => (
                                                        <p key={index} className="text-sm" style={{color: '#000000'}}>
                                                            {index + 1}. <span className="font-semibold">{student.firstName} {student.lastName}</span> supprimé de <span className="font-semibold">#{team.nickName}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Additions */}
                                        {results?.studentAdded?.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-3" style={{color: '#10B981'}}>Ajouts ({results.studentAdded.length})</h3>
                                                <div className="space-y-2 bg-green-50 rounded-lg p-4">
                                                    {results.studentAdded.map(({student, team}, index) => (
                                                        <p key={index} className="text-sm" style={{color: '#000000'}}>
                                                            {index + 1}. <span className="font-semibold">{student.firstName} {student.lastName}</span> ajouté à <span className="font-semibold">#{team.nickName}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* New Teams */}
                                        {results?.newTeams?.length > 0 && (
                                            <div>
                                                <h3 className="font-semibold mb-3" style={{color: '#5375E2'}}>Nouvelles équipes ({results.newTeams.length})</h3>
                                                <div className="space-y-4 bg-blue-50 rounded-lg p-4">
                                                    {results.newTeams.map(({students}, index) => (
                                                        <div key={index} className="bg-white p-3 rounded-lg border border-blue-200">
                                                            <p className="font-semibold mb-2" style={{color: '#5375E2'}}>Équipe {index + 1}</p>
                                                            <div className="space-y-1 text-sm">
                                                                {students.map((student, idx) => (
                                                                    <p key={idx} style={{color: '#000000'}}>
                                                                        {idx + 1}. {student.firstName} {student.lastName}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-3 pt-4 border-t">
                                            <button 
                                                type="button"
                                                onClick={() => setStep(0)}
                                                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                                                style={{color: '#000000'}}
                                            >
                                                <ArrowLeft className="w-4 h-4" /> Retour
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={handleApplyTeamsCompletion}
                                                className="flex-1 py-2 px-4 rounded-lg font-medium text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                                style={{backgroundColor: '#5375E2'}}
                                            >
                                                <Check className="w-4 h-4" /> Confirmer
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </ModalPortal>
                </div>
            </div>
        </div>
      </div>
   )
}
export default AssignTeamsToThemes;