import { useEffect, useState } from "react"
import Link from "next/link"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"

import { useStoreActions, useStoreState } from "../../store/hooks"
import { useRouter } from "next/router"
const Team = props => {

   
  
   const [teamName,setTeamName] = useState('')
   const [description,setDescription] = useState('')
   const [rules,setRules] = useState('')
   const [theme,setTheme] = useState('')
   const [membres,setMembres] = useState([])
   const [validated,setValidated] = useState(false)
   const [promotion,setPromotion] = useState({})
   const [teamLeader,setTeamLeader] = useState({})
 
   

    
    const [clickDownEquipe, setClickDownEquipe] = useState(false)
    const [clickUpEquipe, setClickUpEquipe] = useState(false)
    const {getTeam} = useStoreActions(store=>store.teamListModel)
    const router = useRouter();
    const {teamId} = router.query;
    const [modifier,setModifier] = useState(false)
    const user = useStoreState(store=>store.user)
    const {userType,student} = user;
 
    useEffect(async()=>{
        if(!teamId) return;
        const team =  await getTeam(teamId)
        setTeamName(team?.pseudo)
        setDescription(team?.description)
        setRules(team?.rules)
        setTheme(team?.theme?team?.theme:{})
        setMembres(team?.members)
        setValidated(team?.validated)
        setPromotion(team?.promotion)
        setTeamLeader(team?.teamLeader)


    },[teamId])
    
    
    return (
        <div>
           
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <div className="flex flex-col items-center justify-center">
                    <img src="/themeStudent.png" className="mix-blend-darken absolute"/>
                    <div className={`p-10 justify-center flex-col space-y-8 h-[500px] w-[650px] px-10 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl text-[16px] `}>
                    <div className="flex flex-row items-center space-x-4 text-[26px]">
                            <div className={`text-center w-full`}>
                               {promotion?.name}
                            </div>
                        </div>
                        <div className="flex flex-row items-center space-x-4 text-[26px]">
                            <div className={` ${modifier === false ? "flex" : "hidden"}`}>
                               {teamName}
                            </div>
                            <input value={teamName} className={`${modifier === true ? "flex" : "hidden"}`} onChange={(e) => {setTeamName(e.target.value)}}/>
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">Theme :</div>
                            <div className={`${modifier === false ? "flex" : "hidden"}`}>{(theme?.title)?theme?.title
                            :'__'}</div>
                     
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">Validee :</div>
                            <div className={``}>{validated?"true":"false"}</div>
                        </div>
                        {/* <div className="flex flex-row items-center flex-wrap space-x-4">
                            <div className="text-[19px]">Encadreur(s) :</div>
                           
                            <Link href="/admin/teacherlist">
                                <button className={`items-center justify-center flex-col space-y-10 bg-blue-300/20 backdrop-blur-lg rounded-full px-3 hover:text-blue-500 `}>{encadreur}</button>
                            </Link>
                        </div> */}
                      
                            <div className="flex flex-col  flex-wrap space-x-4">
                                <div className="text-[19px]">Membres:</div>
                                <div className="flex flex-col  space-y-2">
                                    {
                                        membres?.map((el , index)=> {
                                            return(
                                                
                                                <button key={index} className=' bg-blue-300/40 backdrop-blur-lg rounded-full px-3 hover:text-blue-500 w-[200px]  flex flex-row space-x-2 items-center'>
                                                    <div className=" w-4 h-4 rounded-full bg-blue-300 text-white text-[10px] flex items-center justify-center">{index+1}</div>
                                                   <span>{` ${el?.firstName} ${el?.lastName} ${teamLeader?.id === el.id?'(CF)':''}`}</span>
                                                    
                                                    </button>
                                                
                                            
                                            )
                                        })
                                    }

                                </div>
                               
                                
                                {/* <Link href="/"><button className={`h-[30px] w-[100px] text-[18px] flex items-center justify-center bg-blue-300 hover:bg-blue-400 rounded-full ${modifier === true ? "flex" : "hidden"}`}>Ajouter</button></Link> */}
                            </div>
                        <div className="flex items-center justify-center">
                        <button className="h-[40px] w-[120px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full " onClick={(e)=>setModifier(true)}>Modifier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Team;