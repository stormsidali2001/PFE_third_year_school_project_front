import ArrowIcon from "../../../icons/ArrowIcon"
import DownIcon from "../../../icons/DownIcon"

const ValiderEquipes = ({promotion , validerEquipes , ValiderEquipePromotion ,  setDownIconValiderEquipePromotion ,setBouttonAffectationEquipes , setBouttonComplterEquipes , choosenPromo , longueur , downIconValiderEquipePromotion , minEtudiantEquipe , maxEtudiantEquipe , clickChoixPromotionHandler , setChoosenPromo , setMinEtudiantEquipe , setMaxEtudiantEquipe}) => {
    return (
        <div className={`absolute h-[400px] w-[500px] bg-white/80 shadow-lg rounded-xl flex-col justify-center items-center flex ${validerEquipes === true ? "flex":"hidden"}`}>
            <div className="absolute top-4 mb-2 text-[28px]">Valider les équipes :</div>
            <div className={`flex flex-row space-x-4 items-start justify-center absolute top-24 ${choosenPromo === true ? "hidden" : "flex"}`}>
                <div>Promotion :</div>
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row space-x-4">
                        <input 
                            className="h-[40px] w-[250px] rounded-full shadow-md flex items-center px-3" 
                            value = {`${longueur === 1 ? ValiderEquipePromotion : "Choisir une promotion"}`}
                        />
                        <button 
                            className={`pt-4 ${downIconValiderEquipePromotion === true ? "hidden": "flex"}`} 
                            onClick={(e)=>{setDownIconValiderEquipePromotion(true)}}
                        >
                                <DownIcon/>
                        </button>
                    </div>
                    <div className={`bg-gray-50 shadow-sm rounded-xl p-2 backdrop-blur-sm justify-start w-[250px] flex flex-col ${downIconValiderEquipePromotion === true ? "flex": "hidden"}`}>
                    {
                            promotion.map((element , index) => {
                                return (
                                    <button 
                                        className={`h-[35px] w-full hover:border-2 border-y-slate-200 border-x-transparent`} 
                                        onClick={(e)=>{clickChoixPromotionHandler(element)}}
                                    >
                                        {element.promo}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={`items-center flex-col space-y-6 justify-center px-6 text-center ${choosenPromo === true ? "flex":"hidden"}`}>
                <div>Choisir le mon d'étudiants par équipe , la manière de traiter les étudiants sans équipes et les équipes non complètes</div>
                <div className="flex flex-row space-x-16">
                    <div className="flex flex-row space-x-2">
                        <div>Min :</div>
                        <input 
                            className="h-[35px] w-[60px] bg-gray-50 shadow-md rounded-md px-3" 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={minEtudiantEquipe} 
                            onChange = {(e) => setMinEtudiantEquipe(e.target.value)
                        }/>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <div>Max :</div>
                        <input 
                            className="h-[35px] w-[60px] bg-gray-50 shadow-md rounded-md px-3" 
                            type="number" 
                            min="2" 
                            max="10" 
                            value={maxEtudiantEquipe} 
                            onChange = {(e) => setMaxEtudiantEquipe(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button 
                        onClick={(e) => setBouttonAffectationEquipes(true)} 
                        className="hover:text-blue-400"
                    >
                        Affecter les étudiants sans équipes
                    </button>
                    <button 
                        onClick={(e) => setBouttonComplterEquipes(true)} 
                        className="hover:text-blue-400"
                    >
                        Compléter les équipes
                    </button>
                </div>
                <button
                    onClick={(e) => setBouttonComplterEquipes(true)}  
                    className="h-[40px] w-[120px] hover:bg-blue-500 bg-[#8FD4FB] rounded-full"
                >
                    Valider
                </button>
            </div>
            <button 
                className={`rotate-180 absolute bottom-2 right-4 ${choosenPromo === true ? "hidden": "flex"}`} 
                onClick={(e) => {longueur === 1 ? setChoosenPromo(true) : ""}}
            >
                <ArrowIcon/>
            </button>
            <button 
                onClick={(e) => {longueur === 1 ? setChoosenPromo(false) : ""}} 
                className={`absolute bottom-2 left-4 ${choosenPromo === false ? "hidden": "flex"}`} 
            >
                <ArrowIcon/>
            </button>
        </div>
    )
}
export default ValiderEquipes;