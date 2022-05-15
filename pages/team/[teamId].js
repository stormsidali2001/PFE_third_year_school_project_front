import { useState } from "react"
import Link from "next/link"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import DownIcon from "../../icons/DownIcon"
import UpIcon from "../../icons/UpIcon"
import Trash from "../../icons/Trash"

const teamId = props => {

    const [membre , setMembre] = useState(
        [
            {
                nomMembre : "Sidali assoul",
                lienProfil : "/",
                chef : true
            },
            {
                nomMembre : "Sidali assoul",
                lienProfil : "/",
                chef : false
            },
            {
                nomMembre : "Sidali assoul",
                lienProfil : "/",
                chef : false
            },
            {
                nomMembre : "Sidali assoul",
                lienProfil : "/",
                chef : false
            },
            {
                nomMembre : "Sidali assoul",
                lienProfil : "/",
                chef : false
            },
        ]
    ) 
    const [encadreur , setEncadreur] = useState("Mimouna mimoun") 
    const userType = "admin"
    const [modifier , setModifier] = useState(false)
    const [idtheme , setIdtheme] = useState(1)
    const [teamName , setTeamName] = useState("IT experts")
    const [theme , setTheme] = useState("PFE")
    const [countEquipe , setCountEquipe] = useState(membre.length)
    const [clickDownEquipe, setClickDownEquipe] = useState(false)
    const [clickUpEquipe, setClickUpEquipe] = useState(false)
    
   
    return (
        <div>
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <div className="flex flex-col items-center justify-center">
                    <img src="/themeStudent.png" className="mix-blend-darken absolute"/>
                    <div className={`p-10 justify-center flex-col space-y-8 h-[500px] w-[650px] px-10 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl text-[16px] ${idtheme === 1 ? "flex" : "hidden"}`}>
                        <div className="flex flex-row items-center space-x-4 text-[26px]">
                            <div className={` ${modifier === false ? "flex" : "hidden"}`}>{teamName}</div>
                            <input value={teamName} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setTeamName(e.target.value)}}/>
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">Theme :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{theme}</div>
                            <input value={theme} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setTheme(e.target.value)}}/>
                        </div>
                        <div className="flex flex-row items-center flex-wrap space-x-4">
                            <div className="text-[19px]">Encadreur(s) :</div>
                           
                            <Link href="/admin/teacherlist"><button className={`items-center justify-center flex-col space-y-10 bg-blue-300/20 backdrop-blur-lg rounded-full px-3 hover:text-blue-500 `}>{encadreur}</button></Link>
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <div className="text-[19px]">Chef d'équipe :</div>
                            {
                                    membre.map((element , index)=> {
                                        return(
                                            <div className={` flex flex-row space-x-2 items-center justify-center ${element.chef === true ? "flex" : "hidden"}`}>
                                                <Link href={element.lienProfil}><button className={`items-center justify-center flex-col space-y-10 bg-blue-300/20 backdrop-blur-lg rounded-full px-3 hover:text-blue-500 `}>{element.nomMembre}</button></Link>
                                                <button  className={`h-[30px] items-center justify-center w-[100px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full  ${modifier === true ? "flex" : "hidden"}`}>Modifier</button>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                            <div className="flex flex-row items-center flex-wrap space-x-4">
                                <div className="text-[19px]">Affécté à :</div>
                                {
                                    membre.map((element , index)=> {
                                        return(
                                            <div className={` flex flex-row space-x-2 items-center justify-center ${countEquipe > 2 && index > 1 ? (clickDownEquipe === true && clickUpEncadreur === false ? "flex" : "hidden") : "flex"}`}>
                                                <Link href={element.lienProfil}><button className={`items-center justify-center flex-col space-y-10 bg-blue-300/20 backdrop-blur-lg rounded-full px-3 hover:text-blue-500 `}>{element.nomMembre}</button></Link>
                                                <button  className={`${modifier === true ? "flex" : "hidden"}`}><Trash/></button>
                                            </div>
                                        )
                                    })
                                }
                                <div className={`${modifier === true ? "hidden" : "flex"}`}>
                                    <button className={`${clickDownEquipe === true ? "hidden" : "flex"}`} onClick={(e) => {setClickDownEquipe(true) , setClickUpEquipe(false)}}><DownIcon/></button>
                                    <button className={`${clickDownEquipe === true && clickUpEquipe === false  ? "flex" : "hidden"}`} onClick={(e) => {setClickUpEquipe(true) ; setClickDownEquipe(false)}}><UpIcon/></button>
                                </div>
                                <Link href="/"><button className={`h-[30px] w-[100px] text-[18px] flex items-center justify-center bg-blue-300 hover:bg-blue-400 rounded-full ${modifier === true ? "flex" : "hidden"}`}>Ajouter</button></Link>
                            </div>
                        <div className="flex items-center justify-center">
                        <button className="h-[40px] w-[120px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full " onClick={(e)=>setModifier(true)}>Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default teamId;