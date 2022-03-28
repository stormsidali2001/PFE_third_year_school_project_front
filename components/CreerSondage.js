import { useState } from "react"

const CreerSondage = ({toastsRef}) => {
    const [title,setTitle] = useState('Titre');
    const [description , setDescription] = useState('Ajoutez une description');
    const [duree , setDuree] = useState(0);
    const [click , setClick] = useState(false);
    const [option , setOption] = useState('');
    const [options , setOptions] = useState([]);

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
        <form className="h-fit lg:h-[100vh] justify-center flex flex-col w-[100vw] text-[#1A2562] font-xyz">
            <div className="text-[40px]">Créer un sondage :</div>
            <div className="flex flex-row space-x-12 text-[23px]">
                <div>Titre :</div>
                <input placeholder={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="flex flex-row space-x-12 text-[23px]">
                <div>Description :</div>
                <input placeholder={description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="flex flex-row space-x-12 text-[23px]">
                <div>Duree</div>
                <input placeholder={duree} type='number' min="1" max='7' onChange={(e)=>setDuree(e.target.value)}/>
            </div>
            <div className="text-[23px]">Options :</div>
            <div className="flex items-center justify-center text-[20px]">
            <table className="lg:w-[80vw]">
                {options.map((el,index)=>{
                    return(
                        <tr className="border-2 border-stone-600">
                            <td>{el}</td>
                            <td>
                                <img src='poubelle.png' className="object-contain h-[25px]" onClick={(e)=>setOptions(options.filter((el,i)=>i !== index))}/>
                            </td>
                        </tr>
                    )})}
            </table>
            </div>
            <div className="hover:cursor-pointer text-[22px]" onClick={(e)=>setClick(true)}>Ajouter un choix :</div>
            <div  className={`flex flex-row space-x-12 ${!click ? 'hidden' : 'flex'}`}>
                <input placeholder="Ajoutez un choix ..." onChange={(e)=>setOption(e.target.value)}/>
                <div onClick={optionhandler} className="bg-blue-400 h-[35px] flex items-center justify-center w-[130px] rounded-full">Ajouter</div>
            </div>
            <button type="submit" className="bg-blue-500 h-[40px] w-[180px] rounded-full shadow-lg">Valider</button>
        </form>
    )
}
export default CreerSondage;