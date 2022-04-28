import { useStoreActions } from "../store/hooks";
import { useState } from "react"
import { useRouter } from "next/router";


const CreerSondage = ({toastsRef}) => {
   
    const [click , setClick] = useState(false);
    const [option , setOption] = useState('');
    const [title,setTitle] = useState('Titre');
    const [description , setDescription] = useState('Ajoutez une description');
    const [duree , setDuree] = useState(1);
    const [options , setOptions] = useState([]);
    const {createSurveyThunk} = useStoreActions(store=>store.surveysModel);
    const [loading,setLoading] = useState(false)
    const router = useRouter();


    const optionhandler = (e) => {
        e.preventDefault();
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
                    period:10*1000,
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
        <div className="h-fit lg:h-[100vh] justify-center flex flex-col space-y-6 min-w-[100vw] text-[#1A2562] bg-[#F8FDFF] font-xyz px-6 lg:px-16 py-12 lg:py-0">
            <div className="text-[40px]">Créer un sondage :</div>
            <div className="flex lg:flex-row flex-col lg:space-x-64 space-y-6 text-[23px]">
                    <div className="flex flex-row space-x-6">
                        <div>Titre :</div>
                        <input placeholder={title} className="shadow-md rounded-md outline-none h-[40px] w-[350px] px-3" onChange={(e)=>setTitle(e.target.value)}/>
                    </div> 
                    <div className="flex flex-row space-x-6">
                        <div>Duree :</div>
                        <input placeholder={duree} className="shadow-md rounded-md outline-none h-[40px] w-[80px] px-3" type='number' min="1" max='7' onChange={(e)=>setDuree(e.target.value)}/>
                        <div className="text-[#8F8F8F] italic">jours</div>
                    </div>   
            </div>
            <div className="flex flex-row space-x-12 text-[23px]">
                <div>Description :</div>
                <input placeholder={description} className="shadow-md rounded-md outline-none h-[40px] lg:w-[780px] min-w-fit px-3" onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="flex flex-col lg:flex-row space-x-16 text-[23px]">
                <div>Choix</div>
                <div className="flex flex-row flex-wrap gap-[0.5px]">
                    {options.map((el,index)=>{ 
                        return(
                            <div className="flex flex-row h-[40px] relative lg:w-[500px] min-w-[300px] bg-white shadow-md border-2 rounded-md border-black px-3">
                                <div>{el}</div>
                                <img src='pou.png' className="object-contain h-[25px] absolute right-4 top-2 cursor-pointer" onClick={(e)=>setOptions(options.filter((el,i)=>i !== index))}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="hover:cursor-pointer bg-[#32AFF5] h-[40px] w-[260px] rounded-full text-[22px] flex place-content-center cursor-pointer" onClick={(e)=>setClick(!click)}>Ajouter un choix :</div>
            <form onSubmit={optionhandler} className={`flex flex-row space-x-12 ${!click ? 'hidden' : 'flex'}`}>
                <input autoFocus placeholder="Ajoutez un choix ..." className="h-[40px] w-[400px] px-3 border-2 border-black shadow-md rounded-md text-[22px]" value={option} onChange={(e)=>setOption(e.target.value)}/>
                <button type="submit" className="bg-blue-400 h-[35px] flex items-center justify-center w-[130px] rounded-full text-[22px] cursor-pointer">Ajouter</button>
            </form>
            <div className="lg:w-[80vw] w-[95vw] flex justify-end items-end">
                {
                     loading?(
                        <svg role="status" class="h-[60px] lg:w-[360px] min-w-[250px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
                    ):(
                        <button onClick={handleSubmitForm} className="bg-blue-500 h-[50px] w-[200px] rounded-md shadow-lg text-[24px]">Valider</button>
                    )
                }
               
            </div>
        </div>
    )
}
export default CreerSondage;