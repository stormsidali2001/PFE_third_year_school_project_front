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
   const [complete,setComplete] = useState(false)
   const [promotion,setPromotion] = useState({})
   const [teamLeader,setTeamLeader] = useState({})
   const [peutSoutenir,setPeutSoutenir] = useState(null)
   const [moyenne,setMoyenne] = useState(0)
 
   

    
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
        setComplete(team?.complete)
        setPromotion(team?.promotion)
        setTeamLeader(team?.teamLeader)
        setPeutSoutenir(team?.peut_soutenir)
        setMoyenne(team?.moyenne)


    },[teamId])
    
    
    return (
        <div>
           
            <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
                <div className="flex flex-col items-center justify-center ">
                    <img src="/themeStudent.png" className="mix-blend-darken absolute"/>
                    <div className={`p-10 justify-center flex-col space-y-8 h-fit w-[650px] px-10 bg-white/70 backdrop-blur-sm shadow-lg rounded-xl text-[16px] `}>
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
                          
                            {
                                //   <Link href={"/themes/"+theme?.id} className='border-blue-300 border-2 text-white/80 text-slate-700  hover:border-blue-400 px-2 py-1 rounded-[10px] shadow-sm'>{'#'+theme?.title}</Link>
                                theme?(
                                    <Link href={"/themes/"+theme?.id} ><div className='w-fit px-2 py-1  backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg flex items-center cursor-pointer'>{'#'+theme?.title}</div></Link>
                                ):(
                                   <div>{'__'}</div> 
                                )
                            }
                     
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">complete :</div>
                            <div className={``}>{complete?"oui":"non"}</div>
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">Peut soutenir :</div>
                            <div className={``}>{peutSoutenir?"oui":"non"}</div>
                        </div>
                        <div className="flex items-center flex-row space-x-4">
                            <div className="text-[19px]">moyenne :</div>
                            <div className={``}>{moyenne}</div>
                        </div>
                        {/* <div className="flex flex-row items-center flex-wrap space-x-4">
                            <div className="text-[19px]">Encadreur(s) :</div>
                           
                            <Link href="/admin/teacherlist">
                                <button className={`items-center justify-center flex-col space-y-10 bg-blue-300/20 backdrop-blur-lg rounded-full px-3 hover:text-blue-500 `}>{encadreur}</button>
                            </Link>
                        </div> */}
                      
                            <div className="flex flex-col  flex-wrap space-x-4">
                                <div className="text-[19px]">Membres:</div>
                                <div className="flex flex-col  space-y-2 my-2">
                                    {
                                        membres?.map((el , index)=> {
                                            return(
                                                <Link href={`/students/${el.id}`}>
                                                <button key={index} className=' w-fit px-2   backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg flex items-center cursor-pointer space-x-4'>
                                                    <div className=" w-4 h-4 rounded-full bg-blue-300 text-white text-[10px] flex items-center justify-center">{index+1}</div>
                                                   <span>{` ${el?.firstName} ${el?.lastName} ${teamLeader?.id === el.id?'(CF)':''}`}</span>
                                                    
                                                    </button>
                                                    </Link>
                                                
                                            
                                            )
                                        })
                                    }

                                </div>
                               
                                
                                {/* <Link href="/"><button className={`h-[30px] w-[100px] text-[18px] flex items-center justify-center bg-blue-300 hover:bg-blue-400 rounded-full ${modifier === true ? "flex" : "hidden"}`}>Ajouter</button></Link> */}
                            </div>
                     
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Team;