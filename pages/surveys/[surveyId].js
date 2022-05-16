import { useEffect ,useState} from "react";
import { useStoreState } from "../../store/hooks";
import { useRouter } from "next/router";
import { useStoreActions } from "../../store/hooks";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
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
  
  
     const {getSurveyThunk} = useStoreActions(store=>store.surveysModel)
     const {getUserInfo} = useStoreActions(store=>store.user)
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
        await getUserInfo();
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
    const optionhandler = (e) => {
        e.preventDefault();
        if(option.length === 0){
            toastsRef.current.addMessage({text:"L'option doit etre non vide",mode:'Error'})
            return;
        }
        if(options.length < 10){

            setOptions([...options, option])
            setOption('')
        }
        else{
            toastsRef.current.addMessage({text:"il y a trop d'options",mode:'Error'})
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
        <div className="h-[200vh] bg-background min-h-screen items-center  flex flex-col   ">
            <HorisontalNavbar/>
            <StudentVerticalNavbar
            />
        <form 
        className="h-fit  justify-center flex flex-col space-y-6  text-[#1A2562]  font-xyz mt-[100px] mx-auto  items-center bg-white shadow-lg p-2 lg:w-[40vw] w-[80vw]"
        onSubmit={handleSubmitAnswer}
        
    >
       <div className="text-[30px] flex space-x-4"> 
               
                <span className="">Sondage</span>
              
       </div>
       <div className='space-y-3 flex flex-col w-[95%]  px-8'>
           
            <div className='flex flex-wrap -mx-3 mb-6  '>
                        <div className="flex-1  space-x-6">
                            <div> Title</div>
                            <div 
                              
                                className=" border   rounded-[5px]  outline-none h-[30px] w-[80%] px-3 bg-gray-200 text-black" 
                               
                            >
                                {title}
                            </div>
                        </div>   
            </div> 
            <div className='flex flex-wrap -mx-3 mb-6 '>
                    <div className="flex-1  space-x-6">
                        <div> Duree</div> 
                        <div 
                              
                              className=" border   rounded-[5px]  outline-none h-[30px] w-[80%] px-3 bg-gray-200 text-black" 
                             
                          >
                              {duree/1000/3600/24}
                          </div>
                    </div>   
                </div> 

                <div className='flex flex-wrap -mx-3 mb-6 '>
                    <div className="flex-1  space-x-6">
                        <div> Description</div> 
                           
                             <div 
                              
                              className=" break-all  border   outline-none rounded-2xl h-[200px] w-[80%] px-3 bg-gray-200 text-black" 
                             
                          >
                              {description}
                          </div>
                    </div>   
                </div> 
                <div className='flex flex-wrap -mx-3 mb-6 '>
                    <div className="flex-1  space-x-6">
                        <div> Les options gagnants</div> 
                           
                        {
                                  surveyClosed&&(
                                      <div className='flex flex-col'>
                                          <div>les options gagnants:</div>
                                          {
                                              winningOptions.map(op=>{
                                                  return (
                                                      <div
                                                        className='flex  items-center space-x-2 w-fit '
                                                      >


                                                         <div className={`w-[15px] h-[15px] rounded-full bg-blue-100 flex items-center justify-center text-[10px]`}>{op.answersCount}</div>
                                                          <div>{op.description}</div>
                                                      </div>
                                                  )
                                              })
                                          }
                                      </div>

                                  )
                              }
                    </div>   
                </div> 
                             
             {  !surveyClosed&& <div className='flex flex-wrap -mx-3 mb-6 '>
                    <div className="flex-1  space-x-6">
                        <div> Options</div> 
                           
                             <div 
                           
                             
                          >
                              
                              {options?.map(({description,answersCount},index)=>{
                                return(
                                    <div 
                                    key={index} 
                                    className='flex  items-center space-x-2 w-fit cursor-pointer'
                                    onClick={(e)=>setChosenOption(index)}
                                    >
                                        <div className={`w-[15px] h-[15px] rounded-full bg-blue-100 flex items-center justify-center text-[10px]`}>{answersCount}</div>
                                        <div className={`w-[15px] h-[15px] rounded-full ${chosenOption === index?"bg-blue-300":"bg-blue-100"} `}></div>
                                        <div >{description}</div>
                                    </div>
                                      
                                )
                        })}
                          </div>
                    </div>   
                    
                </div> }
             {  !surveyClosed&& <div className='flex flex-wrap -mx-3 mb-6 '>
                    <div className="flex-1  space-x-6">
                        <div> Argument</div> 
                            <textarea 
                                placeholder='exprimer vous ...'
                                value={argument}
                                maxLength="250" 
                                className=" resize-none border   outline-none rounded-2xl h-[150px] w-[80%] px-3 bg-gray-200 text-black" 
                                onChange={(e)=>setArgument(e.target.value)}
                            />
                    </div>   
                </div>}
               
        
              
                
               
              
               
                {
                     loading?(
                        <svg role="status" class="h-[60px] lg:w-[360px] min-w-[250px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
                    ):(
                       !surveyClosed&&<button type='submit' className="bg-[#5375E2]/80 backdrop-blur-[8px]   font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider ml-auto">Voter</button>

                    )
                }
               
                
                
        </div>
 </form>


 </div>
    )
}

export default SingleSurvey;