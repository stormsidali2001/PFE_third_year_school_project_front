import Link from "next/link"
import { userInfo } from "os"
import { useState } from "react"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"

const TeamList = props => {

    const typeUtilisateur = "admin"

    const data = [
        {
            id : 1,
            Equipe : "It experts",
            nombre : 3,
            Thème : "",
        },
        {
            id : 2,
            Equipe : "It experts",
            nombre : 6,
            Thème : "Enseignement",
        },
        {
            id : 3,
            Equipe : "It experts",
            nombre : 2,
            Thème : "E-commerce",
        },
        {
            id : 4,
            Equipe : "It experts",
            nombre : 2,
            Thème : "",
        },
        {
            id : 5,
            Equipe : "It experts",
            nombre : 6,
            Thème : "PFE",
        },
    ]

    if(data.length === 0) return <div>Aucune donnée</div>
    const columns = [...Object.keys(data[0]).filter(el=>el !=='id')];

    const [colonne , setColonne] = useState ([])
    const [copie , setCopie] = useState([])
    
    return (
        <div>
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor">
            <img src="themeStudent.png"  className="object-contain mix-blend-darken absolute inset-1/4"/>
                
                <div className="text-[30px] pt-10">Liste des Equipes</div>
                    
                <table className="bg-[#282873]/10 backdrop-blur-[8px] shadow-lg leading-normal h-fit p-4 w-[80vw]">
                    <thead>
                        <tr  className="bg-white  rounded-[10px] h-[36px]  border-b-2 ">
                            {
                               
                                columns.map(el=>{
                                    return(
                                        <th className={`text-center`}>{el}</th>
                                    )
                                })
                               
                               
                            }    
                             <th className="text-center">Options</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            data.map(row=>{
                                return(
                                    <tr  className=" bg-white/60  rounded-[10px] border-red  border-b-2">
                                        {
                                            Object.keys(data[0]).filter(el=>el!=='id').map(col=>{
                                                return(
                                                    <td className="text-center truncate h-[36px] ">
                                                        {row[col]}
                                                    </td>
                                                    
                                                )
                                            })
                                        }
                                      <td className="flex items-center space-x-4 justify-center">
                                            <Link href={`/team/${row.id}`}><button className="shadow-lg h-[25px] mt-1 w-[100px] text-[15px] bg-blue-300 hover:bg-blue-400 rounded-full">Voir plus</button></Link>
                                            <button className={`shadow-lg items-center justify-center h-[25px] mt-1 w-[100px] text-[15px] bg-blue-300 hover:bg-blue-400 rounded-full ${typeUtilisateur === "admin" && colonne[row.id] === colonne[row.id] ? "flex" : "hidden"}`} onClick={(e)=> {setColonne([...colonne , row.id])}}>Valider</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
       </div>
    )
}
export default TeamList