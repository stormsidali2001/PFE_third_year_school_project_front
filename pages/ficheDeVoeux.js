import { useState } from "react"
import Voeu from "../components/voeu"

const ficheDeVoeux = props =>{
    
    const [voeux , setVoeux ] = useState(
        [
            { 
                id : 1,
                order : 1,
                theme : "PFE"
            },
            {
                id : 2,
                order : 2,
                theme : "E-learn"  
            },
            {
                id : 3,
                order : 3,
                theme : "Conférence"  
            },
            {
                id : 4,
                order : 4,
                theme : "Madrasa-TIC"  
            },
            {
                id : 5,
                order : 5,
                theme : "Recrutement"
            }
        ]
    )
    const [dragOrder, setDragOrder] = useState();

    const handleDrag = (ev) => {
         setDragOrder(ev.currentTarget.order);
    };

    const drag = (e) => {
        console.log(voeux)
        e.preventDefault(); 
    }

    const drop = (e) => {
       voeux.map((voeux)=>{
        if (voeux.order === dragOrder){
            
        }
       })
    }
    const over = (e) =>{

    }
    
    return(
        <div className="bg-background h-[100vh] w-[100vw] text-[18px] text-textcolor font-light flex items-center justify-center">
            <div className="flex flex-col border-2 rounded-md border-slate-400">
                {voeux.sort((a,b)=> a.order - b.order).map((voeux)=>{
                    return(
                        <div draggable={true} onDragStart={console.log('coucou')} onDragOver={console.log('sbah lkhir')} onDrop={console.log('rani hna')}>{voeux.theme}</div>
                    )
                })}
            </div>
        </div>
    )
}
export default ficheDeVoeux;