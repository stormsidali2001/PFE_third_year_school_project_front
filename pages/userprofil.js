import { useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";

const userProfil = props => {
    
    const idUser = 1;
    const data = 
        {
            userType : 'student', //admin teacher
            email : "h.debza@esi-sba.dz",
            student:{
                id : 1,
                firstName : "kadour",
                lastName : "bnadem",
                pseudo : "Kado",
                dob : "25/11/2042",
                team : {
                    id : 1111,
                    nom : "jjjjjjjjjj",
                    lienProfil : "/"
                }
            }
        }

        const [modifier , setModifier] = useState(false)
        const [pseudo , setPseudo] = useState (data.student.pseudo)

    return (
        <div>
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <img src="/studentProfil.jpg" className="h-[520px] object-contain mix-blend-darken opacity-30"/>
                <div className="text-[20px] h-[500px] w-[500px] shadow-lg rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center absolute">
                {
                    (data.userType === 'student' ?
                        <div className="flex items-center justify-center flex-col space-y-6">
                            <div className="text-[30px] flex flex-row space-x-4">{idUser === data.student.id ? "Votre Profil" : data.student.pseudo}</div>
                           <div className="flex flex-col space-y-3">
                            <div className="flex flex-row space-x-4">
                                    <div>Nom :</div>
                                    <div>{data.student.firstName}</div>
                                </div>
                                <div className="flex flex-row space-x-4">
                                    <div>Prénom :</div>
                                    <div>{data.student.lastName}</div>
                                </div>
                                <div className="flex flex-row space-x-4">
                                    <div>Pseudo :</div>
                                    <div className={`${modifier === true ? "hidden" : "flex"}`}>{pseudo}</div>
                                    <input
                                        className={`${modifier === false ? "hidden" : "flex"}`}
                                        value = {pseudo}
                                        onChange = {(e) => setPseudo(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-row space-x-4">
                                    <div>Date of birth :</div>
                                    <div>{data.student.dob}</div>
                                </div>
                                <div className="flex flex-row space-x-4">
                                    <div>Email :</div>
                                    <div>{data.email}</div>
                                </div>
                                <div className="flex flex-row space-x-4">
                                    <div>Team :</div>
                                    <div>{data.student.team.nom}</div>
                                </div>
                           </div>
                            <button 
                                className={`h-[35px] w-[130px] bg-blue-300 hover:bg-blue-400 rounded-full items-center justify-center ${idUser === data.student.id ? "flex" : "hidden"}`}
                                onClick = {(e) => {setModifier(!modifier)}}
                            >
                                {modifier === false ? "Modifier" : "Valider"}
                            </button>
                        </div>
                    : 
                        ""
                    )
                }
                </div>
            </div>
        </div>
    )
}
export default userProfil