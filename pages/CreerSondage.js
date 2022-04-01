import { useState } from "react"

const CreerSondage = ({toastsRef ,title, description , duree, options }) => {
   
    const [click , setClick] = useState(false);
    const [option , setOption] = useState('');
    const [title,setTitle] = useState('Titre');
    const [description , setDescription] = useState('Ajoutez une description');
    const [duree , setDuree] = useState(1);
    const [options , setOptions] = useState(['option1' , 'option2', 'option1' , 'option2','option1' , 'option2','option1' , 'option2','option1' , 'option2']);

    const optionhandler = (e) => {
        e.preventDefault();
        if(options.length < 10){
            setOptions([...options, option])
        }
        else{
            toastsRef.current.addMessage({text:"il y a trop d'options",mode:'Error'})
        }
    }

    return(
        <form className="h-fit lg:h-[100vh] justify-center flex flex-col space-y-6 min-w-[100vw] text-[#1A2562] bg-[#F8FDFF] font-xyz px-6 lg:px-16 py-12 lg:py-0">
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
                                <img src='pou.png' className="object-contain h-[25px] absolute right-4 top-2" onClick={(e)=>setOptions(options.filter((el,i)=>i !== index))}/>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="hover:cursor-pointer bg-[#32AFF5] h-[40px] w-[260px] rounded-full text-[22px] flex place-content-center " onClick={(e)=>setClick(!click)}>Ajouter un choix :</div>
            <div  className={`flex flex-row space-x-12 ${!click ? 'hidden' : 'flex'}`}>
                <input placeholder="Ajoutez un choix ..." className="h-[40px] w-[400px] px-3 border-2 border-black shadow-md rounded-md text-[22px]" onChange={(e)=>setOption(e.target.value)}/>
                <div onClick={optionhandler} className="bg-blue-400 h-[35px] flex items-center justify-center w-[130px] rounded-full text-[22px]">Ajouter</div>
            </div>
            <div className="lg:w-[80vw] w-[95vw] flex justify-end items-end">
                <button type="submit" className="bg-blue-500 h-[50px] w-[200px] rounded-md shadow-lg text-[24px]">Valider</button>
            </div>
        </form>
    )
}
export default CreerSondage;