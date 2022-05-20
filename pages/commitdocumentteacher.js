import { useState } from "react"

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
    ]

    

        const [teamChoisi , setTeamChoisi] = useState(teams.nickname)
        const [choosenTeam , setChoosenTeam] = useState(false)
        const [idChoosenTeam , setIdChoosenTeam] = useState(teams.id)

        return (
            <div className="bg-background space-x-10 h-screen w-screen relative flex flex-row items-center pl-24 font-xyz text-textcolor">
            <div>
                    <div>Vos équipes</div>
                <div className="h-fit w-[250px] flex-col flex items-center rounded-xl justify-center p-3 bg-white shadow-xl">
                    {
                        teams.map((el , index) => {
                            return (
                                <div
                                    className="h-[40px] border-transparent border-y-2 p-3 hover:border-zinc-300 items-center justify-center w-full hover:shadow-inner"
                                    key = {index}
                                >
                                    <button
                                        className="h-full w-full items-center justify-center"
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
                <div className="absolute top-24">
                    <div className="">{choosenTeam === true ? `Document de l'équipe : ${teamChoisi}` : "Cliquez sur une équipe pour visualiser ses documents"}</div>
                    <div className = {`h-[500px] w-[700px] flex-col space-y-4 items-center justify-center bg-white/70 shadow-xl rounded-xl backdrop-blur-sm ${choosenTeam === true ? "flex" : "hidden"}`}>
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
                                            Description : {el.name}
                                        </div>   
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default commitDocumentTeacher;