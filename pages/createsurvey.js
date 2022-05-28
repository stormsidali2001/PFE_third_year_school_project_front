import { useStoreActions } from "../store/hooks";
import { useState ,useEffect} from "react"
import { useRouter } from "next/router";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import HorisontalNavbar from "../components/HorisontalNavbar";
import LoadingIcon from "../icons/LoadingIcon";



const CreerSondage = ({toastsRef}) => {

    const [option , setOption] = useState('');
    const [title,setTitle] = useState('');
    const [description , setDescription] = useState('');
    const [duree,setDuree] = useState(1);
    const [options , setOptions] = useState([]);
    const {createSurveyThunk} = useStoreActions(store=>store.surveysModel);
    const [loading,setLoading] = useState(false)
    const router = useRouter();
   


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
                        <LoadingIcon/>
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