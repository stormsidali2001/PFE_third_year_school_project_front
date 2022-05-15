import { useState } from "react"
import Link from "next/link"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import DownIcon from "../../icons/DownIcon"
import UpIcon from "../../icons/UpIcon"
import Trash from "../../icons/Trash"

const suggestion = props => {

    const [proposePar , setProposerPar] = useState(
        [
            {
                nomEncadreur : "Malki Mimoun",
                lienProfil : "/login"
            },
            {
                nomEncadreur : "Malki Mimouna",
                lienProfil : "/theme"
            },
            {
                nomEncadreur : "Mimouna Malki",
                lienProfil : "/chat"
            },
        ]
    ) 
   
    const userType = "admin"
    const [modifier , setModifier] = useState(false)
    const [idtheme , setIdtheme] = useState(1)
    const [title , setTilte] = useState("PFE")
    const [description , setDescription] = useState("Plateforme de gestion des projets de fin d'études")
    const [specialite , setSpecialite] = useState("Application web")
    const [document , setDocument] = useState("document")
    const [countEncadreur , setCountEncadreur] = useState(proposePar.length)
    const [clickDownEncadreur , setClickDownEncadreur] = useState(false)
    const [clickUpEncadreur , setClickUpEncadreur] = useState(false)
   
    return (
        <div>
            <StudentVerticalNavbar/>
            <HorisontalNavbar/>
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <div className="flex flex-col items-center justify-center">
                    <img src="/themeStudent.png" className="mix-blend-darken absolute"/>
                    <div className={`p-10 justify-center flex-col space-y-8 h-[500px] w-[650px] px-10 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl text-[16px] ${idtheme === 1 ? "flex" : "hidden"}`}>
                        <div className="flex flex-row items-center space-x-4 text-[26px]">
                            <div className="text-[28px]">Titre :</div>
                            <div className={` ${modifier === false ? "flex" : "hidden"}`}>{title}</div>
                            <input value={title} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setTilte(e.target.value)}}/>
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">Description :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{description}</div>
                            <input value={description} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setDescription(e.target.value)}}/>
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">Spécialité :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{specialite}</div>
                            <input value={specialite} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setSpecialite(e.target.value)}}/>
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <div className="text-[19px]">Document(s) :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{document}</div>
                            <input value={document} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setDocument(e.target.value)}}/>
                        </div>
                        <div className="flex flex-row items-center flex-wrap space-x-4">
                                <div className="text-[19px]">Proposé par :</div>
                                {
                                    proposePar.map((element , index)=> {
                                        return(
                                            <div className={`flex flex-row space-x-2 items-center justify-center ${countEncadreur > 2 && index > 1 ? (clickDownEncadreur === true && clickUpEncadreur === false ? "flex" : "hidden") : "flex"}`}>
                                                <Link href={element.lienProfil}><button className={`items-center justify-center flex-col space-y-10 hover:text-blue-500 bg-blue-300/20 backdrop-blur-lg rounded-full px-3`}>{element.nomEncadreur}</button></Link> 
                                                <button  className={`${modifier === true ? "flex" : "hidden"}`}><Trash/></button>
                                            </div>
                                        )
                                    })
                                }
                               <div className={`${modifier === true ? "hidden" : "flex"}`}>
                                    <button className={`${clickDownEncadreur === true ? "hidden" : "flex"}`} onClick={(e) => {setClickDownEncadreur(true) ; setClickUpEncadreur(false)}}><DownIcon/></button>
                                    <button className={`${clickDownEncadreur === true && clickUpEncadreur === false  ? "flex" : "hidden"}`} onClick={(e) => {setClickUpEncadreur(true) ; setClickDownEncadreur(false)}}><UpIcon/></button>
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
export default suggestion;