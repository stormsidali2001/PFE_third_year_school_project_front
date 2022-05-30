const soutenanceId = props => {


    const title = "Soutenace équipe 55"
    const description = "description de la soutenance numéro N-1 de l'équipe p-2 description de la soutenance numéro N-1 de l'équipe p-2 description de la soutenance numéro N-1 de l'équipe p-2 description de la soutenance numéro N-1 de l'équipe p-2 description de la soutenance numéro N-1 de l'équipe p-2 description de la soutenance numéro N-1 de l'équipe p-2 description de la soutenance numéro N-1 de l'équipe p-2 description de la soutenance numéro N-1 de l'équipe p-2 description de la soutenance numéro N-1 de l'équipe p-2"
    const date = "25/04/2012 à 10:55"
    const team = "team5"
    const jury = [
        {
            id : 1,
            firstName : "jury1",
            lastName : "jury2" 
        },
        {
            id : 1,
            firstName : "jury1",
            lastName : "jury2" 
        },
        {
            id : 1,
            firstName : "jury1",
            lastName : "jury2" 
        },
        {
            id : 1,
            firstName : "jury1",
            lastName : "jury2" 
        },
    ]
    

    return (
        <div className="min-h-screen h-fit py-6 w-screen bg-background">
            <div  className="pt-[100px] sm:pl-[100px] text-[16px] text-black font-xyz flex items-center justify-center flex-row space-x-16">
                <img src="/detailsoutenace.jpg" className="w-[45vw] object-contain mix-blend-darken"/>
                <div className="h-[75vh] w-[40vw] bg-white p-6 shadow-lg rounded-lg flex space-y-4 flex-col">
                    <div className="text-[24px] w-full text-center underline font-semibold italic">{title}</div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Equipe</div>
                        <div>{team}</div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Date et heure</div>
                        <div>{date}</div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Détails</div>
                        <div className="text-[15px] h-fit max-h-[150px] scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500  hover:scrollbar-track-blue-200">{description}</div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="font-semibold">Jury</div>
                        <div className="flex flex-wrap gap-4">
                            {
                                jury.map((el , index) => {
                                    return(
                                        <button className=" bg-blue-300 hover:bg-blue-400 rounded-md shadow-xl h-fit w-fit px-3 p-1">
                                            <div>#{el.firstName} {el.lastName}</div>
                                            
                                        </button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
export default soutenanceId;