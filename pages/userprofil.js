import { useStoreActions, useStoreState } from "../store/hooks";
import { useEffect, useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import Link from 'next/link'

const userProfil = props => {
    
    const idUser = 5;

    // const data = 
    //     {
    //         userType : 'teacher', //admin teacher
    //         email : "h.debza@esi-sba.dz",
    //         student:{
    //             id : 1,
    //             firstName : "kadour",
    //             lastName : "bnadem",
    //             pseudo : "Kado",
    //             dob : "25/11/2042",
    //             team : {
    //                 id : 1111,
    //                 nom : "jjjjjjjjjj",
                   
    //             },
    //         },
    //         teacher:{
    //             id : 1,
    //             firstName : "yamina",
    //             lastName : "bnadem",
    //             pseudo : "Kado",
    //             dob : "25/11/2042",
    //             encadre : [
    //                 {
    //                     id : 1,
    //                     teamName : "team2"
    //                 },
    //                 {
    //                     id : 1,
    //                     teamName : "team2"
    //                 },
    //                 {
    //                     id : 1,
    //                     teamName : "team3"
    //                 },
    //             ]
    //         },
    //         admin:{
    //             id : 1,
    //             firstName : "yamina",
    //             lastName : "bnadem",
    //             pseudo : "Kado",
    //             dob : "25/11/2042",
    //         },
            
    //     }

        const user = useStoreState(store => store.user);
        const {getUserInfo} = useStoreActions(store => store.user);
        let data = user;
        const [modifier , setModifier] = useState(false)
        const typeUtilisateur  =  (data.userType === 'student' ? data.student : (data.userType === "teacher" ? data.teacher : data.admin))
       

        useEffect(async()=>{
            await getUserInfo()
        },[])
    
    if(!typeUtilisateur) return 'loading'
       
    return (
        <div>
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <img src="/studentProfil.jpg" className="h-[550px] object-contain mix-blend-darken opacity-30"/>
                <div className="text-[20px] h-[500px] w-[600px] shadow-lg rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center absolute">
                {  
                    <div className="flex items-center justify-center flex-col space-y-6">
                        {/* <div className="text-[30px] flex flex-row space-x-4">{idUser === data.student.id ? "Votre Profil" : data.student.pseudo}</div> */}
                        <div className="flex flex-col space-y-3">
                        <div className="flex flex-row space-x-4">
                                <div>Nom :</div>
                                <div>{typeUtilisateur.firstName}</div>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>Prénom :</div>
                                <div>{typeUtilisateur.lastName}</div>
                            </div>
                            {/* <div className="flex flex-row space-x-4">
                                <div>Pseudo :</div>
                                <div className={`${modifier === true ? "hidden" : "flex"}`}>{pseudo}</div>
                                <input
                                    className={`${modifier === false ? "hidden" : "flex"}`}
                                    value = {pseudo}
                                    onChange = {(e) => setPseudo(e.target.value)}
                                />
                            </div> */}
                            <div className="flex flex-row space-x-4">
                                <div>Date de naissance :</div>
                                <div>{typeUtilisateur.dob}</div>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>Email :</div>
                                <div>{data.email}</div>
                            </div>
                            <div className={`flex flex-row space-x-4 ${data.userType === 'student' ? "flex" : "hidden"}`}>
                                <div>Team :</div>
                                {
                                    typeUtilisateur?.team?.id?(
                                        <Link href={`/team/${typeUtilisateur?.team?.id}`}>{typeUtilisateur?.team?.nickName}</Link> 

                                    ):(
                                        sssss
                                    )
                                }
                               
                             
                              
                            </div>
                            <div className={`flex flex-row space-x-4 ${data.userType === 'teacher' ? "flex" : "hidden"}`}>
                                <div>Equipes :</div>
                                {/* <div className="flex flex-row items-center justify-center space-x-3">
                                    {
                                        data.teacher.encadre.map((el , index) => {
                                            return (
                                                <div className="h-[30px] w-fit px-3 rounded-full bg-blue-400 hover:bg-blue-300 shadow-blue-200 shadow-md ">{el.teamName}</div>
                                            )
                                        })
                                    }
                                </div> */}
                            </div>
                        </div>
                        <button 
                            className={`h-[35px] w-[130px] bg-blue-300 hover:bg-blue-400 rounded-full items-center justify-center ${idUser === data.student.id ? "flex" : "hidden"}`}
                            onClick = {(e) => {setModifier(!modifier)}}
                        >
                            {modifier === false ? "Modifier" : "Valider"}
                        </button>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}
export default userProfil