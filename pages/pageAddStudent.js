import { useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";

const addStudent = props => {
    const [oneclick , setOneClick] = useState(false)
    const [manyClick , setManyClick] = useState(false)
    return (
       <div>
           <StudentVerticalNavbar/>
           <HorisontalNavbar/>
            <div className="bg-background h-screen w-screen relative flex items-center justify-center font-xyz">
                <img src="addStudent.jpg" className="h-full w-full object-contain mix-blend-darken absolute"/>
                <div className={`h-[200px] w-[450px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex-col space-y-6 items-center justify-center text-[18px] ${oneclick || manyClick === true ? "hidden" : "flex"}`}>
                    <div className="text-[23px] text-center px-10">Vous voulez ajouter un ou plusieur étudiant ?</div>
                    <div className="space-x-6">
                        <button className="h-[35px] w-[160px] rounded-full bg-[#32AFF5] text-white" onClick={()=> setOneClick(true)}>Un seul</button>
                        <button className="h-[35px] w-[160px] rounded-full bg-[#8FD4FB]" onClick={()=> setManyClick(true)}>Plusieurs</button>
                    </div>
                </div>
                <form className = {`h-[600px] w-[650px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex-col space-y-6 items-center justify-center text-[18px] ${oneclick === true ? "flex" : "hidden"}`}>
                    <div>Ajouter un étudiant</div>
                    <table>
                        <tr>
                            <td className="flex flex-row space-x-2">
                                <div>Matricule :</div>
                                <input className="h-[30px] w-[180px] rounded-md bg-gray-200 outline-none px-3"/>
                            </td>
                            <td className="flex flex-row space-x-2">
                                <div>Email :</div>
                                <input className="h-[30px] w-[180px] rounded-md bg-gray-200 outline-none px-3"/>
                            </td>
                        </tr>
                        <div className="flex flex-row space-x-2">
                            <div>Nom :</div>
                            <input className="h-[30px] w-[180px] rounded-md bg-gray-200 outline-none px-3"/>
                        </div>
                       <tr>
                       <td className="flex flex-row space-x-2">
                            <div>Prénom :</div>
                            <input className="h-[30px] w-[180px] rounded-md bg-gray-200 outline-none px-3"/>
                        </td>
                        <td className="flex flex-row space-x-2">
                            <div>Promotion</div>
                            <input className="h-[30px] w-[180px] rounded-md bg-gray-200 outline-none px-3"/>
                        </td>
                       </tr>
                       </table>
                  
                    <button>Valider</button>
                </form>
                <form className = {`${manyClick === true ? "flex" : "hidden"}`}>
                    llllllllll
                </form>
            </div>
       </div>
    )
}
export default addStudent;