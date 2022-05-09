import Link from "next/Link";
import { useEffect, useState } from "react";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
import {useStoreActions,useStoreState} from '../../store/hooks'

const AfficherTousLesSondages = props => {
    const [possedeEquipe , setPossedeEquipe] = useState(false)
    const [debutProjet , setDebutProjet] = useState(false)

    const {getSurveysThunk} = useStoreActions(store=>store.surveysModel)
    const {surveys} = useStoreState(store=>store.surveysModel)
    useEffect(()=>{
        getSurveysThunk();
    },[])
    
    
   
    return(
<div>
<HorisontalNavbar/>
<div className="h-[200vh] bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8 ">
<StudentVerticalNavbar possedeEquipe = {possedeEquipe} debutProjet = {debutProjet}/>
        <div className="h-fit min-h-screen py-16 w-[100vw] flex flex-row flex-wrap gap-12 items-center justify-center  font-xyz">
            {
            /*
                ${el.tempsRestant == 0 ? "bg-gradient-to-b hover:from-blue-400 hover:to-blue-600 from-blue-300 to-blue-500" : "bg-gradient-to-b from-blue-100 to-blue-300 hover:from-blue-200 hover:to-blue-400"}
            */
                surveys.map((el,index)=>{
                let tempsRestant = new Date(el.createdAt).getTime() + el.period - Date.now();

                const formatedRemainingTime = new Date(tempsRestant).getDate() + "J:" + new Date(tempsRestant).getHours() + ":" + new Date(tempsRestant).getMinutes() + ":" + new Date(tempsRestant).getSeconds() ;
                console.log(tempsRestant,"_____",el.title)
                if(tempsRestant < 0){
                    tempsRestant = 0;
                }
               

                return(
               

                   
                    <div 
                        className="h-[300px] w-[250px]  flex flex-col items-center bg-gradient-to-b from-blue-100 to-blue-300 hover:from-blue-100 hover:to-blue-200   rounded-lg shadow-lg relative text-textcolor cursor-pointer group"
                        
                        >
                    <div className="  h-full w-full"> 
                        <img src ="vote.jpg" className="object-contain h-full w-full mix-blend-darken opacity-50"/>
                    </div>
                    <div className="absolute space-y-6  flex items-center justify-center flex-col w-full h-full">
                        <div className="text-[22px] w-[90%] mx-2  text-center">{el.title}</div>
                        <div className="text-[14px] break-all   px-2 mx-2 bg-background/10 transition-all ease-in group-hover:bg-background/30 backdrop-blur-sm w-[90%]   py-1 h-[20%]">{el.description}</div>
                      
                        <div className="text-[18px] break-all   px-2 mx-2 group-hover:bg-background/30 bg-background/10 transition-all ease-in backdrop-blur-sm w-[90%]   py-1 text-center">
                               {
                                tempsRestant == 0 ? "Sondage fermé" : ""} {tempsRestant == 0 ? "" : `${formatedRemainingTime}`
                                }
                            </div>
                        <button className="h-[35px] w-[130px] text-[20px] bg-blue-300 hover:bg-blue-400 rounded-full"><Link href={`surveys/${el.id}`}>Voir plus</Link></button>
                    </div>
                </div>
                    // <div>{JSON.stringify({el,tempsRestant})}</div>
                )
            })
            
            
            }
        </div>
</div>
</div>
    )
}
export default AfficherTousLesSondages;