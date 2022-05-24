const validerLesEquipes = props => {

    const promotion = "1CS"
    const etudiantSansEquipes = 5
    const equipesNonComplete = 6

    return (
        <div className="bg-background space-x-10 h-screen w-screen relative flex text-center items-center font-xyz text-textcolor justify-center text-[20px]">
            <div className="h-[450px] w-[550px] bg-white shadow-lg rounded-xl flex justify-center">
                <div className=" flex flex-col space-y-8 items-center justify-center">
                    <div className="text-[30px]">{promotion}</div>
                    <div className="flex flex-col space-y-4">
                        <div>{etudiantSansEquipes} étudiants sans équipes</div>
                        <div>{equipesNonComplete} équipes non satisfaisantes les conditions</div>
                    </div>
                    <button>Completer</button>
                </div>
            </div>
        </div>
    )
}
export default validerLesEquipes