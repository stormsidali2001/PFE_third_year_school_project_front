import {useState} from "react"

const validerLesEquipes = props => {

    const promotion = "1CS"
    const etudiantSansEquipes = 5
    const equipesNonComplete = 6

    const [etape , setEtape] = useState(0)

    return (
        <div className={`bg-background space-x-10 h-screen w-screen relative items-center font-xyz text-textcolor justify-center flex text-[20px]`}>
            <div className={`h-[450px] w-[550px] bg-white shadow-lg rounded-xl flex flex-col relative${etape === 1 ? "flex" : "hidden"}`}>
                <div className=" flex flex-col space-y-8 items-center mt-12">
                    <div className="text-[30px]">{promotion}</div>
                    <div className="flex flex-col space-y-4">
                        <div>{etudiantSansEquipes} étudiants sans équipes</div>
                        <div>{equipesNonComplete} équipes non satisfaisantes les conditions</div>
                    </div>
                    <button className="h-[35px] w-[150px] shadow-md rounded-full bg-blue-400" onClick={(e) => setEtape(etape + 1)}>Completer</button>
                </div>
            </div>
        
            <div className={`h-[550px] w-[550px] bg-white shadow-lg rounded-xl flex flex-col relative${etape === 2 ? "flex" : "hidden"}`}>
                <div className=" flex flex-col space-y-6 items-center mt-12">
                    <div className="text-[30px]">Changements :</div>
                    <div className="h-[350px] w-[450px] rounded-md border-2 border-dashed">

                    </div>
                    <button className="h-[35px] w-[150px] shadow-md rounded-full bg-blue-400" onClick={(e) => setEtape(etape + 1)}>Confirmer</button>
                </div>
            </div>
        </div>
    )
}
export default validerLesEquipes