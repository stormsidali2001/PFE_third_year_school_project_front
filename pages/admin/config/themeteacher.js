import { useState } from "react"
import AdminVerticalNavbar from "../../../components/AdminVerticalNavbar"
import HorisontalNavbar from "../../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../../components/StudentVerticalNavbar"

const themeTeacher = props => {
const teachers = [
    {
        id : 1,
        nom : "teacher1",
        prenom : "teacher1"
    },
    {
        id : 2,
        nom : "teacher2",
        prenom : "teacher2"
    },
    {
        id : 3,
        nom : "teacher3",
        prenom : "teacher3"
    },
    {
        id : 4,
        nom : "teacher4",
        prenom : "teacher4"
    },
    {
        id : 5,
        nom : "teacher5",
        prenom : "teacher5"
    },
    {
        id : 6,
        nom : "teacher6",
        prenom : "teacher6"
    },
]

const theme = [
    {
        id : 1,
        nom : "PFE",
    },
    {
        id : 2,
        nom : "Madrasa tic"
    },
    {
        id : 3,
        nom : "E-learn"
    },
    {
        id : 4,
        nom : "Conférences"
    },
    {
        id : 5,
        nom : "Recrutement"
    },
]
const [idChoosenTheme , setIdChoosenTheme] = useState(0)
const [choosenTheme , setChoosenTheme] = useState(theme.nom)
const [booleanChoosenTheme , setBooleanChoosenTheme] = useState(false)
const [ajouter , setAjouter] = useState(false)
const [encadre , setEncadre] = useState([])
const [modifier , setModifier] = useState(false)
const [encadreurSupprime , setEncadreurSupprime] = useState()
const [nonEncadrant , setNonEncadrant] = useState(teachers)


const clickThemeHandler = (el) => {
    setBooleanChoosenTheme(true) ; 
    setChoosenTheme(el.nom) ; 
    setIdChoosenTheme(el.id);
    setEncadre([]) ;
    setAjouter(false)
}

const encadreEquipes = (el) => {
    if(encadre.length > 0)
    {
        encadre.map((element) => {
             (
                 element === el.id ?  setEncadre([...encadre]) : (setEncadre([...encadre , el.id])) 
                 
             )    
        })
    }
    else
    {
        setEncadre([el.id]) 
    }
}
    return (
        <div>
            <HorisontalNavbar/>
            <AdminVerticalNavbar/>
            <div className={`bg-background space-x-10 h-screen w-screen relative flex text-center flex-row font-xyz text-textcolor  justify-center `}>
            <div className="flex flex-col space-y-6 ml-24 mt-24">
                    <div className="text-[30px]">Thèmes :</div>
                    <div className="w-[320px] py-3 h-fit bg-white shadow-lg rounded-xl flex flex-col space-y-2 text-[20px]">
                        {
                            theme.map((el,index) => {
                                return (
                                    <button 
                                        key={index}
                                        className="h-[40px] flex flex-row items-center justify-center space-x-2 border-transparent border-y-2 hover:border-gray-300 hover:shadow-inner"
                                        onClick={(e) => {clickThemeHandler(el)}}
                                    >
                                        <div>{el.nom}</div>
                                        <div>{el.prenom}</div>
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex items-center justify-center h-screen flex-col relative">
                    <div className="text-[35px]">{booleanChoosenTheme === true ? choosenTheme : "Cliquez sur un thèmes d'abord"}</div>
                    <img src="/themeTeacher.webp" className={`h-[500px] object-contain mix-blend-darken ${booleanChoosenTheme === true ? "opacity-30" : ""}`}/>
                    <div className={` mt-24 h-[500px] w-[500px] items-center justify-center bg-white/50 shadow-lg flex-col rounded-2xl backdrop-blur-sm absolute ${booleanChoosenTheme === true ? "flex" : "hidden"}`}>
                        <div className="text-[30px] px-8 absolute top-6">Ajoutez des encadreurs au  thème : {choosenTheme}</div>
                        <div className="h-[200px] w-[350px] text-[20px] flex-col space-y-2 px-3 border-2 border-dashed border-gray-400 flex items-center justify-center">
                            {encadre.length > 1 ? 
                               teachers.map((element , index) => {
                                   return (
                                       <div key={index}>
                                            {
                                                encadre.map((el ,i) => {
                                                    return (
                                                        <button
                                                            className="flex flex-row space-x-2 items-center w-[250px] justify-center bg-blue-300 hover:bg-blue-400 rounded-full shadow-md"
                                                            key={i} 
                                                            onClick = {(e) => {setModifier(false) ; setEncadreurSupprime(el)}}
                                                        >
                                                            <div  className="text-25px">{el === element.id && modifier === true ? "x" : ""}</div>
                                                            <div>{el === element.id ? element.nom : ""}</div>
                                                            <div>{el === element.id ? element.prenom : ""}</div>
                                                        </button>
                                                    )
                                                })
                                            }
                                       </div>
                                   )
                               })
                               : 
                               "Les encadreurs s'afficheront ici après ajout."
                            }
                        </div>
                        <div className="flex flex-row space-x-40 absolute bottom-6">
                            <button  
                                className="bg-blue-300 hover:bg-blue-400 h-[35px] w-[120px] rounded-full shadow-md"
                                onClick={(e) => {setModifier(true) , setAjouter(false)}}
                            >
                                Modifier
                            </button>
                            <button 
                                className="bg-blue-400 hover:bg-blue-300 h-[35px] w-[140px] rounded-full shadow-md"
                                onClick = {(e) => {setAjouter(true) ; setModifier(false)}}
                            >
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-6 mt-24 mr-6">
                    <div className="text-[30px]">Enseignants :</div>
                    <div className={`w-[320px] py-3 h-fit shadow-lg rounded-xl flex flex-col space-y-2 text-[20px] ${ajouter === true ? "bg-cyan-100":"bg-white"}`}>
                        {
                            nonEncadrant.map((el,index) => {
                                return (
                                    <button
                                        key={index}
                                        className={`h-[40px] flex flex-row items-center justify-center space-x-2 border-transparent border-y-2 hover:border-gray-300 hover:shadow-inner`}
                                        onClick={(e) => {encadreEquipes(el)}}
                                    > 
                                        <div>{el.nom}</div>
                                        <div>{el.prenom}</div>
                                    </button> 
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default themeTeacher
                                   