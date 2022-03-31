import { useState } from "react";
import CreerSondage from "./CreerSondage";
const Sondage = ({title, description , duree , options , n}) => {

    const [voted , setVoted] = useState(false);
    const [choice , setChoice] = useState(null)

    const voteHandler = () => {
        if (choice !== null) {
            setVoted(true)
        }
    }

    return(
        <form className="text-[#1A2562] bg-[#F8FDFF] font-xyz px-12 flex flex-col space-y-3 py-10 lg:h-[100vh] h-fit w-[100vw] justify-center">
            <div className="text-[40px]">{title}</div>
            <div className="text-[24px]">{description}</div>
            <div className="flex flex-row space-x-10">
                <div className="flex flex-col space-y-3">
                    <div className="text-[24px] flex flex-rox space-x-2">
                        <div>Temps restant :</div>
                        <div>{duree}</div>
                        <div>jours</div>
                    </div>
                    <div className="text-[24px]">Choix :</div>
                    <div className="flex flex-col px-12">
                        {options.map((el,id)=>{
                            return(
                                <div className="flex flex-row items-center space-x-2 bg-white h-[40px] w-[720px] border-2 border-black shadow-md rounded-md px-2 py-1">
                                    <input type="radio" value={el} name="options" onClick={()=>setChoice(id)}/>
                                    <div>{el}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img src="sondage.png" className="object-contain mix-blend-darken"/>
                    <button type="submit" className="h-[50px] w-[200px] bg-[#32AFF5] rounded-md shadow-md" onClick={voteHandler}>Valider</button>
                </div>
            </div>
        </form>
    )
}
export default Sondage;