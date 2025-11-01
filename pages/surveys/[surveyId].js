import { useEffect ,useState} from "react";
import { useStoreState } from "../../store/hooks";
import { useRouter } from "next/router";
import { useStoreActions } from "../../store/hooks";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
import ModalPortal from "../../components/ModalPortal";
const SingleSurvey = ({toastsRef})=>{
    const {survey} = useStoreState(store=>store.surveysModel);
    const {submitAnswerThunk} = useStoreActions(store=>store.surveysModel)

    const [title,setTitle] = useState(survey?.title);
    const [description,setDescription] = useState(survey?.description);
    const [options,setOptions] = useState(survey?.options);
    const [option,setOption] = useState('');
    const [duree,setDuree] = useState(survey?.period);
    const [loading,setLoading] = useState(false)
    const [chosenOption,setChosenOption] = useState(0);
    const [argument,setArgument] = useState(survey?.argument );
    const [createdAt,setCreatedAt] = useState('');
    const [pageLoaded,setPageLoaded] = useState(false)
    const [showOptionDetails,setShowOptionDetails] = useState(false)
  
  
     const {getSurveyThunk,getSurveyParticipantsArguments} = useStoreActions(store=>store.surveysModel)
     const {surveyParticipantsArguments} = useStoreState(store=>store.surveysModel)
     const user = useStoreState(store=>store.user)
     const teamLeader = user?.student?.team?.teamLeader;
    
    const router = useRouter();
    const {surveyId} = router.query;
    let tempsRestant = new Date(createdAt).getTime() + duree - Date.now();

  
    if(tempsRestant < 0){
        tempsRestant = 0;
    }
    const surveyClosed  =  tempsRestant === 0;
    let winningOptions = [];
    let max =-Infinity;

    
    options?.forEach(op=>{
        if(op.answersCount >= max){
            max = op.answersCount;
        }
    })
    winningOptions = options?.filter(op=>op.answersCount ===max)
    
    useEffect(async()=>{
        console.log(surveyId,"33333333333")
        const survey = await  getSurveyThunk(surveyId)
        setTitle(survey?.title)
        setDescription(survey?.description)
        setOptions(survey?.options)
        setDuree(survey?.period)
        setArgument(survey?.argument )
        setCreatedAt(survey?.createdAt)
        setLoading(false)
        const index = survey?.options?.findIndex(op=>op.id === survey?.answer.id);
      
        setChosenOption(index?index:0)
        setPageLoaded(true)
    },[surveyId])
    const handleShowParticipants = async optionId=>{
        if(!surveyId) return;
        
        try{
            await getSurveyParticipantsArguments({
                surveyId,
                optionId
            })
            setShowOptionDetails(true)

        }catch(err){
            console.log(err)
        }
      

    }
    const handleSubmitAnswer  = async(e)=>{
        e.preventDefault();
        try{
            setLoading(true)
            await submitAnswerThunk({
                surveyId,
                optionId:options[chosenOption].id,
                argument:argument?argument:'',
            })
            setLoading(false)
            toastsRef.current.addMessage({text:"Votre reponse a eté envoyée",mode:'Alert'})
            setTimeout(()=>{
                router.reload()
            },500)

        }catch(err){
            console.log(err);
            toastsRef.current.addMessage({text:"ops... Erreur",mode:'Error'})
            setLoading(false)
        }
      
    }
    if(!pageLoaded) return "Loading..."
    return(
        <div>
            <HorisontalNavbar />
            <StudentVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto">
                <div className="ml-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <form 
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                            onSubmit={handleSubmitAnswer}
                        >
                            {/* Header */}
                            <div className="bg-white p-8 border-b" style={{borderColor: '#f0f0f0'}}>
                                <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{color: '#1A2562'}}>{title}</h1>
                                <div className="h-1 w-20 rounded-full mb-3" style={{backgroundColor: '#5375E2'}}></div>
                                <p className="text-xs sm:text-sm leading-relaxed max-w-2xl" style={{color: '#000000'}}>{description}</p>
                            </div>

                            {/* Content */}
                            <div className='flex lg:flex-row flex-col space-y-6 lg:space-y-0 lg:space-x-8 p-8'>
                                {/* Left Column - Info */}
                                <div className="flex-1 flex flex-col space-y-6">
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                        <div className="text-xs font-semibold mb-1" style={{color: '#1A2562'}}>Durée</div>
                                        <div className="text-xl font-bold" style={{color: '#000000'}}>{duree/1000/3600/24} jours</div>
                                    </div>

                                    {surveyClosed && (
                                        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border-2 border-green-200">
                                            <div className="text-xs font-semibold mb-3" style={{color: '#1A2562'}}>Options gagnantes:</div>
                                            <div className="space-y-2">
                                                {winningOptions?.map(op=>(
                                                    <div key={op.id} className='flex items-center space-x-3 bg-white p-3 rounded-lg border border-green-100'>
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white`} style={{backgroundColor: '#5375E2'}}>{op.answersCount}</div>
                                                        <div style={{color: '#000000'}}>{op.description}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column - Voting */}
                                {!surveyClosed && (
                                    <div className="flex-1 flex flex-col space-y-6">
                                        {/* Options Section */}
                                        <div>
                                            <div className="text-sm font-semibold mb-3" style={{color: '#1A2562'}}>Choisissez une option:</div>
                                            <div className="space-y-2">
                                                {options?.map(({description,answersCount,id},index)=>(
                                                    <div 
                                                        key={index} 
                                                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${
                                                            chosenOption === index 
                                                                ? 'border-boutton bg-blue-50 shadow-md' 
                                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                                        }`}
                                                        onClick={(e)=>setChosenOption(index)}
                                                    >
                                                        <div className="flex items-center space-x-3 flex-1">
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                                                chosenOption === index 
                                                                    ? 'border-boutton bg-boutton' 
                                                                    : 'border-gray-400'
                                                            }`}>
                                                                {chosenOption === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                            </div>
                                                            <span style={{color: '#000000'}} className="font-medium">{description}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {e.stopPropagation(); handleShowParticipants(id)}}
                                                            className="text-xs px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-all font-medium flex-shrink-0"
                                                            style={{color: '#5375E2'}}
                                                        >
                                                            {answersCount}
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Argument Section */}
                                        <div>
                                            <div className="text-sm font-semibold mb-2" style={{color: '#1A2562'}}>Argument</div>
                                            <textarea 
                                                placeholder='Expliquez votre choix...'
                                                value={argument || ''}
                                                maxLength="250" 
                                                className="w-full resize-none border-2 border-gray-200 bg-white rounded-lg outline-none p-3 text-sm h-24 focus:border-boutton focus:shadow-md transition-all" 
                                                onChange={(e)=>setArgument(e.target.value)}
                                                style={{color: '#000000'}}
                                            />
                                            <p className="text-xs mt-2 text-right" style={{color: '#999999'}}>{(argument || '').length}/250</p>
                                        </div>

                                        {/* Submit Button */}
                                        <button 
                                            type='submit' 
                                            disabled={loading}
                                            className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                            style={{backgroundColor: '#5375E2'}}
                                        >
                                            {loading ? (
                                                <>
                                                    <svg role="status" className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Envoi...</span>
                                                </>
                                            ) : (
                                                <span>Voter</span>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ModalPortal
                open={showOptionDetails}
                handleClose={()=>{setShowOptionDetails(false)}}
            >
                <div className="w-full max-w-2xl p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-2" style={{color: '#1A2562'}}>Arguments des participants</h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {surveyParticipantsArguments?.length > 0 ? (
                            surveyParticipantsArguments.map(({id,student,argument: arg})=>(
                                <div 
                                    key={id} 
                                    className='bg-gray-50 shadow-sm flex flex-col space-y-2 p-4 rounded-xl border border-gray-100'
                                >
                                    <div className='flex items-center space-x-2'>
                                        <div className="w-8 h-8 rounded-full font-bold text-white flex items-center justify-center text-xs" style={{backgroundColor: '#5375E2'}}>
                                            {student?.firstName?.charAt(0)}{student?.lastName?.charAt(0)}
                                        </div>
                                        <div className="font-semibold text-sm" style={{color: '#1A2562'}}>{student?.firstName} {student?.lastName}</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-gray-100 text-sm break-words" style={{color: '#000000'}}>
                                        {arg}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center py-8 text-gray-500">Aucun argument</p>
                        )}
                    </div>
                </div>
            </ModalPortal>
        </div>
    )
}

export default SingleSurvey;