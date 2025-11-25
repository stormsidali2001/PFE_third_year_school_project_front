import { useEffect, useState } from "react"
import Link from "next/link"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import { Users, BookOpen, CheckCircle, TrendingUp } from "lucide-react"

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
            <HorisontalNavbar />
            <StudentVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => router.back()}
                            className="mb-4 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                            style={{color: '#5375E2'}}
                        >
                            ← Retour
                        </button>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{color: '#000000'}}>Équipe</h1>
                        <div className="h-1 w-20 rounded-full" style={{backgroundColor: '#5375E2'}}></div>
                    </div>

                    {/* Team Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                        {/* Content */}
                        <div className="px-6 sm:px-8 py-8 space-y-6">
                            {/* Team Name and Promotion */}
                            <div>
                                <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-gray-100">
                                    <div>
                                        <p className="text-sm font-semibold mb-2" style={{color: '#000000'}}>Promotion</p>
                                        <p className="text-2xl font-bold" style={{color: '#000000'}}>{promotion?.name || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold mb-2" style={{color: '#000000'}}>Nom de l'équipe</p>
                                        {modifier === false ? (
                                            <p className="text-2xl font-bold" style={{color: '#000000'}}>{teamName}</p>
                                        ) : (
                                            <input 
                                                value={teamName} 
                                                onChange={(e) => {setTeamName(e.target.value)}}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-boutton"
                                                style={{color: '#000000'}}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Theme */}
                            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="w-5 h-5" style={{color: '#5375E2'}} />
                                    <p className="font-semibold" style={{color: '#000000'}}>Thème</p>
                                </div>
                                {theme?.id ? (
                                    <Link href={"/themes/"+theme?.id}>
                                        <a className="inline-flex items-center px-4 py-2 rounded-lg font-medium text-white transition-all hover:shadow-md" style={{backgroundColor: '#5375E2'}}>
                                            #{theme?.title}
                                        </a>
                                    </Link>
                                ) : (
                                    <p style={{color: '#999999'}}>Pas de thème</p>
                                )}
                            </div>

                            {/* Status Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5" style={{color: '#5375E2'}} />
                                        <p className="font-semibold text-sm" style={{color: '#000000'}}>Complète</p>
                                    </div>
                                    <p className="text-lg font-bold" style={{color: '#000000'}}>{complete ? "Oui" : "Non"}</p>
                                </div>

                                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="w-5 h-5" style={{color: '#5375E2'}} />
                                        <p className="font-semibold text-sm" style={{color: '#000000'}}>Peut soutenir</p>
                                    </div>
                                    <p className="text-lg font-bold" style={{color: '#000000'}}>{peutSoutenir ? "Oui" : "Non"}</p>
                                </div>

                                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-5 h-5" style={{color: '#5375E2'}} />
                                        <p className="font-semibold text-sm" style={{color: '#000000'}}>Moyenne</p>
                                    </div>
                                    <p className="text-lg font-bold" style={{color: '#000000'}}>{moyenne ? parseFloat(moyenne).toFixed(2) : '0.00'}</p>
                                </div>
                            </div>

                            {/* Members */}
                            <div className="pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Users className="w-5 h-5" style={{color: '#5375E2'}} />
                                    <h3 className="text-lg font-semibold" style={{color: '#000000'}}>Membres ({membres?.length || 0})</h3>
                                </div>
                                <div className="space-y-2">
                                    {
                                        membres?.map((el, index)=> {
                                            return(
                                                <Link key={index} href={`/students/${el.id}`}>
                                                    <a className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-boutton hover:bg-blue-50 transition-all cursor-pointer">
                                                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{backgroundColor: '#5375E2'}}>
                                                            {index+1}
                                                        </div>
                                                        <span style={{color: '#000000'}} className="font-medium">
                                                            {el?.firstName} {el?.lastName}
                                                            {teamLeader?.id === el.id && (
                                                                <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full" style={{backgroundColor: '#F4FCFF', color: '#5375E2'}}>CF</span>
                                                            )}
                                                        </span>
                                                    </a>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Team;