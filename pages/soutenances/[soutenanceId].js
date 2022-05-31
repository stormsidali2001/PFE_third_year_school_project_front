import { useEffect } from "react"
import { useStoreActions,useStoreState } from "../../store/hooks"
import { useRouter } from "next/router"

const soutenanceId = props => {
    const router = useRouter()
    const {soutenanceId} = router.query;

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
    
    const {getSoutenance} = useStoreActions(store=>store.soutenanceModel)
    const {soutenance} = useStoreState(store=>store.soutenanceModel)
    useEffect(async()=>{
        if(!soutenanceId) return;
        await getSoutenance(soutenanceId)
    },[soutenanceId])

    if(!soutenance) return "loading"
  
    return (
        <div className="min-h-screen h-fit py-6 w-screen bg-background">
            <div  className="pt-[100px] sm:pl-[100px] text-[16px] text-black font-xyz flex items-center justify-center flex-col space-y-12 lg:flex-row lg:space-y-0 lg:space-x-16">
                <img src="/detailsoutenace.jpg" className="w-[90vw] md:w-[70vw] lg:w-[45vw] object-contain mix-blend-darken"/>
                <div className="h-[75vh] w-[90vw] md:w-[70vw] lg:w-[40vw] bg-white p-6 shadow-lg rounded-lg flex space-y-4 flex-col">
                    <div className="text-[24px] w-full text-center underline font-semibold italic">{title}</div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Equipe</div>
                        <div>{soutenance?.team?.nickName}</div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Theme</div>
                        <div>{soutenance?.team?.givenTheme.title}</div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Date et heure</div>
                        <div>{soutenance.date}</div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Duree</div>
                        <div>{soutenance.duration}</div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Salle</div>
                        <div>{soutenance?.salle?.name}</div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="font-semibold">Détails</div>
                        <div className="text-[15px] h-fit max-h-[150px] scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500  hover:scrollbar-track-blue-200">{soutenance.description}</div>
                    </div>
                    <div className="flex flex-col h-[80px] scrollbar scrollbar-thumb-blue-500  hover:scrollbar-track-blue-200 space-y-4">
                        <div className="font-semibold">Jury</div>
                        <div className="flex flex-wrap gap-4">
                            {
                                soutenance?.jurys?.map((jr , index) => {
                                    const teacher = jr.teacher;

                                    return(
                                        <button className=" bg-blue-500 rounded-full hover:bg-blue-600 text-white shadow-xl h-fit w-fit px-3 p-1">
                                            <div>#{teacher.firstName} {teacher.lastName}</div>
                                            
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