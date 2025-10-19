import { useStoreActions ,useStoreState} from "../store/hooks";
import { useState ,useEffect} from "react"
import { useRouter } from "next/router";


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
    const Empty = (elements)=>{
        return elements.some(el=>el === '')
    }
    const handleSubmitForm =async(e)=>{
        e.preventDefault();
         if(Empty([title,description]) || options.length === 0){
            toastsRef.current.addMessage({text:"tout les champs doivent etre remplit",mode:'Error'})
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
          
            toastsRef.current.addMessage({text:"Le sondage a eté créé",mode:'Alert'})
            setTimeout(()=>router.reload(),1000)


         }catch(err){
             console.log(err);
             toastsRef.current.addMessage({text:"probleme!!!",mode:'Error'})
             setLoading(false)


         }
      

    }

    

    return(
        <div className="bg-background min-h-screen min-w-screen">
            <div className="h-full pt-[100px] pl-[100px] w-screen font-xyz relative flex items-center justify-center">
                <img src='/createSurvey.webp' className="h-full object-contain mix-blend-darken"/>
                <div className="absolute lg:h-[500px] sm:w-[450px] h-fit w-fit p-10 lg:w-[900px] flex flex-col space-y-10 bg-white/80 rounded-2xl shadow-2xl backdrop-blur-sm items-center justify-center">
                    <div className="text-[24px] underline italic">Créer un sondage :</div>
                    <div className="flex lg:flex-row flex-col space-y-6 lg:space-y-0 lg:space-x-12">
                        <div className="flex flex-col space-y-4">
                            <div className="flex-row flex space-x-4 items-center">
                                <div> Titre </div>
                                <input 
                                    placeholder='Titre...'
                                    value={title}
                                    className=" border border-slate-200 backdrop-blur-sm rounded-md outline-none h-[30px] w-[200px] px-3 bg-white/80 shadow-md text-black" 
                                    onChange={(e)=>setTitle(e.target.value)}
                                />
                            </div>  
                            <div className="flex-row flex space-x-4 items-start">
                                <div> Durée </div>
                                <input 
                                    type='number'
                                    min= '1'
                                    max = '7'
                                    value={duree}
                                    onChange={(e)=>setDuree(e.target.value)}
                                    className=" border border-slate-200 outline-none h-[30px] w-[190px] px-3 bg-white/80 backdrop-blur-sm shadow-md rounded-md text-black" 
                                />
                            </div> 
                            <div className="flex-col flex space-y-2 items-start">
                                <div> Description </div>
                                <textarea 
                                    placeholder='Description...'
                                    value={description}
                                    maxLength="250" 
                                    className=" resize-none py-2 border border-slate-200 outline-none h-[130px] w-[250px] px-3 bg-white/80 shadow-md rounded-md text-black" 
                                    onChange={(e)=>setDescription(e.target.value)}
                                />
                            </div>  
                        </div>
                        <div className="flex flex-col space-y-4">
                            <form onSubmit={optionhandler} className="flex flex-col space-y-2">
                                <div>Ajouter une option</div>
                                <div className="flex flex-rox space-x-4">
                                    <input 
                                        placeholder='option...'
                                        value={option}
                                        className=" border rounded-md outline-none h-[30px] w-[80%] px-3 bg-white/80 backdrop-blur-sm shadow-md border-slate-200 text-black" 
                                        onChange={(e)=>setOption(e.target.value)}
                                        
                                    />
                                    <button type="submit" className="bg-blue-200 px-4 hover:bg-blue-300 rounded-full ease-in w-[100px]">Ajouter</button>
                                </div>
                            </form>
                            <ol>
                                {
                                    options.map((el,index)=>{
                                        return(
                                            <li key={index}>{(index+1)+'- '+el}</li>
                                            
                                        )
                                })
                                }
                            </ol>
                        </div>
                        
                
                    </div>
                    <div>
                    {
                     loading?(
                        <svg role="status" className="h-[60px] lg:w-[360px] min-w-[250px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    ):(
                        <button onClick={handleSubmitForm} className="bg-blue-200 h-[35px] w-[120px] px-4  hover:bg-blue-300 rounded-full ease-in transition-colors ml-auto">Valider</button>

                    )
                }
                    </div>
                </div>
            </div>
        </div>
    )

   
}
export default CreerSondage;