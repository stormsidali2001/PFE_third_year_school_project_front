import Link from "next/Link";
import { useEffect, useState } from "react";
import {useStoreActions,useStoreState} from '../store/hooks'

const AfficherTousLesSondages = props => {
    const {getSurveysThunk} = useStoreActions(store=>store.surveysModel)
    const {surveys} = useStoreState(store=>store.surveysModel)
    useEffect(()=>{
        getSurveysThunk();
    },[])
    
    const DayToHourMinSec = (temps) => {
        
        const [restant , setRestant] = useState(temps * 24 * 60 * 60) ;
        const day = (restant / 86400)
        const hours = (restant / (3600 * day) ) % 24
        const min = (restant / (day * 24 *60)) % 60
        const seconds = (restant / (day * 86400) -1 ) // le moin 1 est du au resultat de la division
        const leftTime = day + " : " + hours + " : " + min  +" : " + seconds
        return (
          leftTime
        )
    }
    console.log(DayToHourMinSec(25))
    return(
        <div className="h-fit min-h-screen py-16 w-[100vw] flex flex-row flex-wrap gap-12 items-center justify-center bg-blue-100 font-xyz">
            {
            /*
                ${el.tempsRestant == 0 ? "bg-gradient-to-b hover:from-blue-400 hover:to-blue-600 from-blue-300 to-blue-500" : "bg-gradient-to-b from-blue-100 to-blue-300 hover:from-blue-200 hover:to-blue-400"}
            */
                surveys.map((el,index)=>{
                let tempsRestant = new Date(el.createdAt).getTime() - Date.now();
                if(tempsRestant < 0){
                    tempsRestant = 0;
                }
               

                return(
                    <form key={index} className={`relative rounded-xl shadow-xl border-2 hover:h-[320px] hover:w-[370px] h-[300px] w-[350px] flex flex-col items-center justify-center  text-center  `}>
                        <img src="vote.jpg" className={`h-full w-full object-contain mix-blend-darken ${tempsRestant == 0 ? "opacity-100" : "opacity-50"}`}/>
                        <div className="absolute space-y-3">
                            <div className="text-[24px] break-words ">{el.title}</div>
                            <div className="text-[18px] break-words border-2 w-full">{el.description}</div>
                            <div className="text-[22px] border-red-700">
                                {
                                tempsRestant == 0 ? "Sondage fermé" : "temps restant :"} {tempsRestant == 0 ? "" : `${DayToHourMinSec(tempsRestant)}`
                                }
                            </div>
                            {/* <div className="text-[22px] hidden">Options :</div> */}
                            {/* <div className="text-[18px] hidden">{el.option.map((ele , id)=>{
                                return(
                                    <div>{ele}</div>
                                )
                            })}
                            </div> */}
                            {/* <Link href = "./Sondage"><button type = "submit" className = {`h-[35px] w-[130px] bg-blue-300 rounded-full hover:bg-blue-400`}>{el.tempsRestant != 0 ?(el.voted == true ? "Changer" : "Voter") : "Resultat"}</button></Link>    */}
                        </div>
                    </form>
                    // <div>{JSON.stringify({el,tempsRestant})}</div>
                )
            })
            
            
            }
        </div>
    )
}
export default AfficherTousLesSondages;