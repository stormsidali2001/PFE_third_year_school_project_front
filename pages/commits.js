import { useEffect, useState } from "react"
import Link  from "next/link"
import HorisontalNavbar from "../components/HorisontalNavbar"
import TeacherVerticalNavbar from "../components/TeacherVerticalNavbar"
import { useStoreActions, useStoreState } from "../store/hooks"
import {useRouter} from 'next/router'
const commitDocumentTeacher = props => {

   

        const router = useRouter()

        const [selectedTeam,setSelectedteam] = useState(null)
        const [selectedDoc,setSelectedDoc] = useState(null)
        const  {getTeamsTeacherResponsibleFor,getTeamCommits} = useStoreActions(store=>store.commitsModel)
        const {teamsInResponsability,documents,commits} = useStoreState(store=>store.commitsModel)
        useEffect(async()=>{
            try{

                await getTeamsTeacherResponsibleFor()
            }catch(err){
                    console.log(err)
            }
        },[])

        const handleGetCommits = async (team)=>{
            try{

                await getTeamCommits({teamId:team.id})
                setSelectedteam(team);
            }catch(err){
                console.log(err)
            }
        }

        return (
            <div>
                <TeacherVerticalNavbar/>
                <HorisontalNavbar/>
                <div className="bg-background space-x-10 h-screen w-screen relative flex flex-row pt-24 pl-24 font-xyz text-textcolor">
                    <div className="flex flex-col space-y-6">
                        <div className="text-[30px] text-center">Vos équipes</div>
                        <div className="h-fit w-[250px] flex-col text-[22px] flex items-center rounded-xl justify-center p-3 bg-white shadow-xl">
                            {
                                teamsInResponsability.map((team , index) => {
                                    return (
                                        <div
                                            className="h-[40px] border-transparent border-y-2 p-3 hover:border-zinc-300 items-center justify-center w-full hover:shadow-inner"
                                            key = {index}
                                        >
                                            <button
                                                className="h-full w-full items-center justify-center flex"
                                                onClick={async(e) => {handleGetCommits(team)}}
                                            >
                                                {team.nickName}
                                            </button>
                                        </div>
                                    )
                                }) 
                            }
                        </div>
                    </div>
                    <div className="h-full w-fit flex items-center justify-center relative">
                        <img 
                            src = "/commitDocument.webp"
                            className = {`h-[600px] object-contain mix-blend-darken `}
                        />
                        <div className="absolute items-center justify-center top-0">
                            <div className="text-center text-[30px]">{commits?.length >0 ? `Commits de l'équipe : ${selectedTeam?.nickName}` : "Cliquez sur une équipe pour visualiser ses commits"}</div>
                            <div className = {`text-[20px] h-[550px] w-[700px] flex-col space-y-4 items-center justify-center bg-white/70 shadow-xl rounded-xl backdrop-blur-sm overflow-y-scroll ${commits?.length >0 ? "flex" : "hidden"} pt-5`}>
                                {
                                    commits.map (({title,description,documents} , index) => {
                                        return (
                                            <div
                                                className="h-fit w-[600px] rounded-xl shadow-xl bg-white/50 backdrop-blur-sm p-8 flex-col"
                                                key={index}
                                            >
                                                <div>
                                                    Titre : {title}
                                                </div>  
                                                <div>
                                                    Description : {description}
                                                </div>  
                                                <div className="flex flex-col space-y-2">
                                                    <div>Documents :</div>
                                                    <div className="flex flex-row space-x-2">
                                                        {
                                                            documents.map((doc , i) => {
                                                                return (
                                                                    <button 
                                                                        className="flex flex-col space-y-2 items-center justify-center"
                                                                        onClick={()=>{setSelectedDoc(doc)}}
                                                                        key={i}
                                                                    >
                                                                        <img 
                                                                            src="/doc.png"
                                                                            className="h-[60px] object-contain mix-blend-darken"
                                                                        />
                                                                        <div>{doc.name}</div>
                                                                    </button>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div> 
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                 { selectedDoc&&  <div className={`h-[500px] w-[300px] bg-white flex flex-col space-y-4 shadow-lg rounded-xl  `}>
                        {
                           
                             
                                         
                                                        <div className="flex flex-col w-ful space-y-4 text-center p-4"
                                                            onClick={()=>{}}
                                                        >
                                                            <div className="text-[30px]">Details :</div>
                                                            <div className="flex flex-col space-y-2">
                                                                <div className="text-[22px]">Titre :</div>
                                                                <div className="text-[19px]">{selectedDoc.name}</div>
                                                            </div>
                                                            <div className="flex flex-col space-y-2">
                                                                <div className="text-[22px]">Description :</div>
                                                                <div className="text-[19px]">{selectedDoc.description}</div>
                                                            </div>
                                                            <div className="flex flex-col space-y-2">
                                                                <div className="text-[22px]">Lien :</div>
                                                              
                                                                    <button onClick={()=>router.push('http://localhost:8080/'+selectedDoc.url?.slice(2))} className="hover:text-blue-500 text-[19px]" >{'http://localhost:8080/'+selectedDoc.url?.slice(2)}</button>
                                                               
                                                            </div>
                                                        </div>
                                                        
                                             
                                     
                           
                        }
                    </div>}
                </div>
           </div>
    )
}
export default commitDocumentTeacher;