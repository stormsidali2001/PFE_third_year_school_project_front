import Link from "next/Link";
import { useEffect, useState } from "react";
import Sondage from "./Sondage";

const AfficherTousLesSondages = props => {
    const sondageData = [
        {
            title : 'Sondage1',
            description : 'ceci est le premier sondage',
            tempsRestant : 1,
            voted : false ,
            option : ['option1' , 'option2' , 'option3' , 'option4' , 'option5']
        },
        {
            title : 'Sondage2',
            description : 'ceci est le deuxième sondage',
            tempsRestant : 0,
            voted : true ,
            option : ['option1' , 'option2' , 'option3' , 'option4' , 'option5']
        },
        
        {
            title : 'Sondage3',
            description : 'ceci est le troisième sondage',
            tempsRestant : 3,
            voted : true ,
            option : ['option1' , 'option2' , 'option3' , 'option4']
        },
        {
            title : 'Sondage1',
            description : 'ceci est le premier sondage',
            tempsRestant : 1,
            voted : false ,
            option : ['option1' , 'option2' , 'option3' , 'option4' , 'option5']
        },
        {
            title : 'Sondage2',
            description : 'ceci est le deuxième sondage',
            tempsRestant : 0,
            voted : true ,
            option : ['option1' , 'option2' , 'option3' , 'option4' , 'option5']
        },
        
        {
            title : 'Sondage3',
            description : 'ceci est le troisième sondage',
            tempsRestant : 3,
            voted : true ,
            option : ['option1' , 'option2' , 'option3' , 'option4']
        },
    ];
    
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
            {sondageData.map((el,index)=>{
                return(
                    <form className={`relative rounded-xl shadow-xl border-2 hover:h-[320px] hover:w-[370px] h-[300px] w-[350px] flex flex-col items-center justify-center  text-center ${el.tempsRestant == 0 ? "bg-gradient-to-b hover:from-blue-400 hover:to-blue-600 from-blue-300 to-blue-500" : "bg-gradient-to-b from-blue-100 to-blue-300 hover:from-blue-200 hover:to-blue-400"} ${el.voted ? "border-green-700" : "border-red-600"}`}>
                        <img src="vote.jpg" className={`h-full w-full object-contain mix-blend-darken ${el.tempsRestant == 0 ? "opacity-100" : "opacity-50"}`}/>
                        <div className="absolute space-y-3">
                            <div className="text-[28px]">{el.title}</div>
                            <div className="text-[24px]">{el.description}</div>
                            <div className="text-[22px]">{el.tempsRestant == 0 ? "Sondage fermé" : "temps restant :"} {el.tempsRestant == 0 ? "" : `${DayToHourMinSec(el.tempsRestant)}`}</div>
                            <div className="text-[22px] hidden">Options :</div>
                            <div className="text-[18px] hidden">{el.option.map((ele , id)=>{
                                return(
                                    <div>{ele}</div>
                                )
                            })}
                            </div>
                            <Link href = "./Sondage"><button type = "submit" className = {`h-[35px] w-[130px] bg-blue-300 rounded-full hover:bg-blue-400`}>{el.tempsRestant != 0 ?(el.voted == true ? "Changer" : "Voter") : "Resultat"}</button></Link>   
                        </div>
                    </form>
                )
            })}
        </div>
    )
}
export default AfficherTousLesSondages;