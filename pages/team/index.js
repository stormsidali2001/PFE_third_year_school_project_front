import Link from "next/link"
import { userInfo } from "os"
import { useEffect, useState } from "react"
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import { useStoreActions, useStoreState } from "../../store/hooks"

const TeamList = props => {

    const typeUtilisateur = "admin"
    const {getTeamsList} = useStoreActions(store=>store.teamListModel)
    const {teamsList:teamsData} =useStoreState(store=>store.teamListModel)
    const [colonne , setColonne] = useState ([])
    const [copie , setCopie] = useState([])
    useEffect(async()=>{
        await getTeamsList();
        
   },[])

  
   let teamsList = teamsData.map(el=>{
       return {
           ...el,
           theme:el.theme.title
       }
   })
   console.log(teamsList,'******')
   
    if(teamsList.length === 0) return <div>Aucune donnée</div>
    const columns = [...Object.keys(teamsList[0]).filter(el=>el !=='id')];
    return (
        <div>
            <HorisontalNavbar/>
            <AdminVerticalNavbar/>
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
                            teamsList.map(row=>{
                                return(
                                    <tr  className=" bg-white/60  rounded-[10px] border-red  border-b-2">
                                        {
                                            Object.keys(teamsList[0]).filter(el=>el!=='id').map(col=>{
                                                return(
                                                    <td className="text-center truncate h-[36px] ">
                                                        {
                                                        col === 'validated'?( row[col]?'true':'false')
                                                        :( row[col]?row[col]:'___')
                                                        
                                                        
                                                        }
                                                    </td>
                                                    
                                                )
                                            })
                                        }
                                      <td className="flex items-center space-x-4 justify-center">
                                            <Link href={`/team/${row.id}`}><button className="shadow-lg h-[25px] mt-1 w-[100px] text-[15px] bg-blue-300 hover:bg-blue-400 rounded-full">Voir plus</button></Link>
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