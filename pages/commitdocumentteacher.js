import { useState } from "react"
import Link  from "next/link"
import HorisontalNavbar from "../components/HorisontalNavbar"
import TeacherVerticalNavbar from "../components/TeacherVerticalNavbar"

const commitDocumentTeacher = props => {

    const teams = [
        {
            id : 1,
            nickname : "team1",
            
        },
        {
            id : 2,
            nickname : "team3",
        },
    ]

    const commits = [
        {
            id : 5,
            name : "commit555",
            description : "commit de ch pas qui",
            documents : [
                {
                    id : 8,
                    name : "docuemnt55555",
                    description : "ceci est le document melit men esi",
                    url : "/"
                },
                {
                    id : 9,
                    name : "docuemnt55555",
                    description : "ceci est le document melit men esi",
                    url : "/"
                },
                {
                    id : 10,
                    name : "docuemnt55555",
                    description : "ceci est le document melit men esi",
                    url : "/"
                },
            ]
        },
        {
            id : 6,
            name : "commit666",
            description : "commit de ch pas quoi",
            documents : [
                {
                    id : 15,
                    name : "docuemnt55555",
                    description : "ceci est le document melit men esi",
                    url : "/"
                },
                {
                    id : 16,
                    name : "docuemnt55555",
                    description : "ceci est le document melit men esi",
                    url : "/"
                },
                {
                    id : 17,
                    name : "docuemnt55555",
                    description : "ceci est le document melit men esi",
                    url : "/"
                },
            ]
        },
    ]

        const [teamChoisi , setTeamChoisi] = useState(teams.nickname)
        const [choosenTeam , setChoosenTeam] = useState(false)
        const [idChoosenTeam , setIdChoosenTeam] = useState(teams.id)
        const [idchoosenDocument , setIdChoosenDocument] = useState()
        const [choosenDocument , setChoosenDocument] = useState(false)

        return (
            <div>
                <TeacherVerticalNavbar/>
                <HorisontalNavbar/>
                <div className="bg-background space-x-10 h-screen w-screen relative flex flex-row pt-24 pl-24 font-xyz text-textcolor">
                    <div className="flex flex-col space-y-6">
                        <div className="text-[30px] text-center">Vos équipes</div>
                        <div className="h-fit w-[250px] flex-col text-[22px] flex items-center rounded-xl justify-center p-3 bg-white shadow-xl">
                            {
                                teams.map((el , index) => {
                                    return (
                                        <div
                                            className="h-[40px] border-transparent border-y-2 p-3 hover:border-zinc-300 items-center justify-center w-full hover:shadow-inner"
                                            key = {index}
                                        >
                                            <button
                                                className="h-full w-full items-center justify-center flex"
                                                onClick={(e) => {setTeamChoisi(el.nickname) ; setChoosenTeam(true) ; setIdChoosenTeam(el.id)}}
                                            >
                                                {el.nickname}
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
                            className = {`h-[600px] object-contain mix-blend-darken ${teamChoisi === true ? 'opacity-20' : ''}`}
                        />
                        <div className="absolute items-center justify-center top-0">
                            <div className="text-center text-[30px]">{choosenTeam === true ? `Commits de l'équipe : ${teamChoisi}` : "Cliquez sur une équipe pour visualiser ses commits"}</div>
                            <div className = {`text-[20px] h-[550px] w-[700px] flex-col space-y-4 items-center justify-center bg-white/70 shadow-xl rounded-xl backdrop-blur-sm overflow-y-scroll ${choosenTeam === true ? "flex" : "hidden"}`}>
                                {
                                    commits.map ((el , index) => {
                                        return (
                                            <div
                                                className="h-[fit] w-[600px] rounded-xl shadow-xl bg-white/50 backdrop-blur-sm p-8 flex-col"
                                                key={index}
                                            >
                                                <div>
                                                    Titre : {el.name}
                                                </div>  
                                                <div>
                                                    Description : {el.description}
                                                </div>  
                                                <div className="flex flex-col space-y-2">
                                                    <div>Documents :</div>
                                                    <div className="flex flex-row space-x-2">
                                                        {
                                                            el.documents.map((element , i) => {
                                                                return (
                                                                    <button 
                                                                        className="flex flex-col space-y-2 items-center justify-center"
                                                                        onClick={(e) => {setIdChoosenDocument(element.id) ; setChoosenDocument(true)}}
                                                                        key={i}
                                                                    >
                                                                        <img 
                                                                            src="/doc.png"
                                                                            className="h-[60px] object-contain mix-blend-darken"
                                                                        />
                                                                        <div>{element.name}</div>
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
                    <div className={`h-[500px] w-[300px] bg-white flex flex-col space-y-4 shadow-lg rounded-xl ${choosenDocument === true ? 'flex' : "hidden"}`}>
                        {
                            commits.map ((el , index) => {
                                return (
                                    <div>
                                        {
                                            el.documents.map((element , i) => {
                                                return (
                                                    ( element.id === idchoosenDocument ? 
                                                        <div className="flex flex-col w-ful space-y-4 text-center p-4">
                                                            <div className="text-[30px]">Details :</div>
                                                            <div className="flex flex-col space-y-2">
                                                                <div className="text-[22px]">Titre :</div>
                                                                <div className="text-[19px]">{element.name}</div>
                                                            </div>
                                                            <div className="flex flex-col space-y-2">
                                                                <div className="text-[22px]">Description :</div>
                                                                <div className="text-[19px]">{element.description}</div>
                                                            </div>
                                                            <div className="flex flex-col space-y-2">
                                                                <div className="text-[22px]">Lien :</div>
                                                                <Link href = {element.url}>
                                                                    <button className="hover:text-blue-500 text-[19px]">Cliquer pour visualiser le document</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                            : 
                                                        <div></div>)
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
           </div>
    )
}
export default commitDocumentTeacher;