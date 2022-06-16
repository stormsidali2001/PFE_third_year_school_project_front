import { useStoreActions, useStoreState } from "../store/hooks";
import { useEffect, useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import Link from 'next/link'

const userProfil = props => {
    
    const idUser = 5;

   

        const user = useStoreState(store => store.user);
        const {getUserInfo} = useStoreActions(store => store.user);
        let data = user;
        const [modifier , setModifier] = useState(false)
        const typeUtilisateur  =  (data.userType === 'student' ? data.student : (data.userType === "teacher" ? data.teacher : data.admin))
       

        useEffect(async()=>{
            await getUserInfo()
        },[])
    
    if(!typeUtilisateur) return 'loading'

    // return JSON.stringify(typeUtilisateur) 
       
    return (
        <div>
       
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <img src="/studentProfil.jpg" className="h-[550px] object-contain mix-blend-darken opacity-30"/>
                <div className="text-[20px] h-[500px] w-[600px] shadow-lg rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center absolute">
                {  
                    <div className="flex items-center justify-center flex-col space-y-6">
                        {/* <div className="text-[30px] flex flex-row space-x-4">{idUser === data.student.id ? "Votre Profil" : data.student.pseudo}</div> */}
                        <div className="flex flex-col space-y-3">
                        <div className="flex flex-row space-x-4">
                                <div>Nom :</div>
                                <div>{typeUtilisateur?.firstName}</div>
                            </div>
                            <div className="flex flex-row space-x-4">
                                <div>Prénom :</div>
                                <div>{typeUtilisateur?.lastName}</div>
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
                       {    user.userType ==='student'&&   <div className="flex flex-row space-x-4">
                                <div>Date de naissance :</div>
                                <div>{typeUtilisateur.dob}</div>
                            </div>}
                            <div className="flex flex-row space-x-4">
                                <div>Email :</div>
                                <div>{data.email}</div>
                            </div>
                       {  user.userType ==='student'&&   <div className={`flex flex-row space-x-4 ${data.userType === 'student' ? "flex" : "hidden"}`}>
                                <div>Team :</div>
                                {
                                    typeUtilisateur?.team?.id?(
                                        <Link href={`/teams/${typeUtilisateur?.team?.id}`}>{typeUtilisateur?.team?.nickName}</Link> 

                                    ):(
                                        sssss
                                    )
                                }
                               
                             
                              
                            </div>}
                        </div>
                     
                    </div>
                }
                </div>
            </div>
        </div>
    )
}
export default userProfil