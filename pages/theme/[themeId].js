import { useState } from "react"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"

const theme = props => {

    const userType = "admin"
    const [modifier , setModifier] = useState(false)
    const [equipes , setEquipe] = useState(
        [
            {
                nomEquipe : "IT experts",
                lienProfil : "/"
            },
            {
                nomEquipe : "IT experts 2",
                lienProfil : "/"
            },
            {
                nomEquipe : "IT experts 3",
                lienProfil : "/"
            },
        ]
    ) 
    const [encadreur , setEncadreur] = useState(
        [
            {
                nomEncadreur : "Encadreur1",
                lienProfil : "/"
            },
            {
                nomEncadreur : "Encadreur2",
                lienProfil : "/"
            },
            {
                nomEncadreur : "Encadreur3",
                lienProfil : "/"
            },
        ]
    ) 
    const [idtheme , setIdtheme] = useState(1)
    const [title , setTilte] = useState("PFE")
    const [description , setDescription] = useState("Plateforme de gestion des projets de fin d'études")
    const [specialite , setSpecialite] = useState("Application web")
    const [document , setDocument] =useState("document55555555555555555555555555555555555")
    
    return (
        <div>
            <StudentVerticalNavbar/>
            <HorisontalNavbar/>
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <div className="flex flex-col items-center justify-center">
                    <div className={`items-center justify-center flex-col space-y-10 ${idtheme === 1 ? "flex" : "hidden"}`}>
                        <div className="flex flex-row space-x-4">
                            <div>Titre :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{title}</div>
                            <input value={title} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setTilte(e.target.value)}}/>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div>Description :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{description}</div>
                            <input value={description} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setDescription(e.target.value)}}/>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div>Spécialité :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{specialite}</div>
                            <input value={specialite} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setSpecialite(e.target.value)}}/>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div>Document(s) :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{document}</div>
                            <input value={document} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setDocument(e.target.value)}}/>
                        </div>
                        <div className="flex flex-row space-x-4">
                                <div>Encadreur(s) :</div>
                                {
                                    encadreur.map((element , index)=> {
                                        return(
                                            <div>
                                                <div className={`items-center justify-center flex-col space-y-10 ${modifier === false ? "flex" : "hidden"}`}>{element.nomEncadreur} ,</div>
                                                <input value={element.nomEncadreur} className={`${modifier === true ? "flex" : "hidden"}`}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>Affécté à :</div>
                                {
                                    equipes.map((element , index)=> {
                                        return(
                                            <div>
                                                <div className={`items-center justify-center flex-col space-y-10 ${modifier === false ? "flex" : "hidden"} `}>{element.nomEquipe} ,</div>
                                                <input value={element.nomEquipe} className={`${modifier === true ? "flex" : "hidden"}`}/>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        <button onClick={(e)=>setModifier(true)}>Modifier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default theme;