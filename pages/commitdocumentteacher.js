import { useState } from "react"

const commitDocumentTeacher = props => {

    const teams = [
        {
            id : 1,
            nickname : "team1",
            document : [
                {
                    id : 5,
                    name : "docement1",
                    description : "Document n1",
                    url : "/"
                },
                {
                    id : 6,
                    name : "docement2",
                    description : "ceci est le docment de ....",
                    url : "/"
                },
                {
                    id : 7,
                    name : "docement3",
                    description : "ceci est le docment de melit men esi",
                    url : "/"
                },
                {
                    id : 8,
                    name : "docement4",
                    description : "ceci est le docment de je ne sais pas quoi",
                    url : "/"
                },
            ]
        },
        {
            id : 1,
            nickname : "team3",
            document : [
                {
                    id : 5,
                    name : "docement1",
                    description : "Document n1",
                    url : "/"
                },
                {
                    id : 6,
                    name : "docement2",
                    description : "ceci est le docment de ....",
                    url : "/"
                },
                {
                    id : 7,
                    name : "docement3",
                    description : "ceci est le docment de melit men esi",
                    url : "/"
                },
                {
                    id : 8,
                    name : "docement4",
                    description : "ceci est le docment de je ne sais pas quoi",
                    url : "/"
                },
            ]
        },
    ]

    const [teamChoisi , setTeamChoisi] = useState(teams.nickname)

    return (
        <div className="bg-background space-x-10 h-screen w-screen relative flex flex-row items-center justify-center font-xyz text-textcolor">
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
                                        onClick={(e) => {setTeamChoisi(el.nickname)}}
                                    >
                                        {el.nickname}
                                    </button>
                                </div>
                            )
                        }) 
                    }
                </div>
            </div>
            <div className="h-full w-fit flex items-center justify-center">
                <div>Document de l'équipe : {teamChoisi}</div>
            </div>
        </div>
    )
}
export default commitDocumentTeacher;