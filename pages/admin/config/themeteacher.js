import { useState } from "react"
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
        id : 1,
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
        nom : "PFE"
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

const [choosenTheme , setChoosenTheme] = useState(theme.nom)
const [booleanChoosenTheme , setBooleanChoosenTheme] = useState(false)
    return (
        <div>
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <div className="bg-background space-x-10 h-screen w-screen relative flex flex-row font-xyz text-textcolor  justify-center">
            <div className="flex flex-col space-y-6 ml-24 mt-24">
                    <div className="text-[30px]">Thèmes :</div>
                    <div className="w-[320px] py-3 h-fit bg-white shadow-lg rounded-xl flex flex-col space-y-2 text-[20px]">
                        {
                            theme.map((el,index) => {
                                return (
                                    <button 
                                        className="h-[40px] flex flex-row items-center justify-center space-x-2 border-transparent border-y-2 hover:border-gray-300 hover:shadow-inner"
                                        onClick={(e) => {setChoosenTheme(el.nom) ; setBooleanChoosenTheme(true)}}
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
                    <div className={` mt-12 h-[500px] w-[500px] bg-white/50 shadow-lg rounded-2xl backdrop-blur-sm absolute ${booleanChoosenTheme === true ? "flex" : "hidden"}`}>

                    </div>

                </div>

                <div className="flex flex-col space-y-6 mt-24 mr-6">
                    <div className="text-[30px]">Enseignants :</div>
                    <div className="w-[320px] py-3 h-fit bg-white shadow-lg rounded-xl flex flex-col space-y-2 text-[20px]">
                        {
                            teachers.map((el,index) => {
                                return (
                                    <button className="h-[40px] flex flex-row items-center justify-center space-x-2 border-transparent border-y-2 hover:border-gray-300 hover:shadow-inner">
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
