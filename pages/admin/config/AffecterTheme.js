import ArrowIcon from "../../../icons/ArrowIcon"

import DownIcon from "../../../icons/DownIcon"

const AffecterTheme = ({promotion  , ValiderEquipePromotion ,  setDownIconValiderEquipePromotion   , choosenPromo , longueur , downIconValiderEquipePromotion, clickChoixPromotionHandler , setChoosenPromo ,affecterTheme , setAffecterTheme , affectationThemeFifo , setAffectationThemeFifo , affecterThemeMoy , setAffecterThemeMoy , affecterThemeEquipe , affecterThemeEnseignant , setAffecterThemeEquipe}) => {
    return (
        <div className={`absolute h-[400px] px-4 w-[500px] bg-white/80 shadow-lg rounded-xl flex-col justify-center items-center flex ${affecterTheme === true ? "flex":"hidden"}`}>
        <div className="flex flex-col space-y-8 items-center justify-center text-center text-[20px]">
            <div className="text-[30px] absolute top-6">Affecter les themes :</div>
            <div className={`flex flex-col space-y-6 items-center justify-center ${affecterThemeEnseignant === true || affecterThemeEquipe === true || choosenPromo === true ? "hidden" : "flex"}`}>
                <div className="text-[23px]">
                    Vous voulez affecter les thèmes au étudiant ou enseignat
                </div>
                <div className="flex flex-row space-x-6">
                    <button 
                        className="bg-blue-300 hover:bg-blue-400 h-[35px] w-[120px] rounded-full shadow-md"
                        onClick = {(e) => {setAffecterThemeEquipe(true)}}
                    >
                        Etudiants
                    </button>
                    <button 
                        className="bg-blue-400 hover:bg-blue-300 h-[35px] w-[140px] rounded-full shadow-md"
                        onClick = {(e) => {setAffecterThemeEnseignant(true)}}
                    >
                        Enseignants
                    </button>
                </div>
            </div>
            <div className={`flex flex-row space-x-4 items-start justify-center absolute top-24 ${choosenPromo === false && affecterThemeEquipe === true ? "flex" : "hidden"}`}>
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
            <button 
                    className={`rotate-180 absolute bottom-2 right-4 ${choosenPromo === true ? "hidden": "flex"}`} 
                    onClick={(e) => {longueur === 1 ? setChoosenPromo(true) : ""}}
                >
                    <ArrowIcon/>
                </button>
                <button 
                    onClick={(e) => {longueur === 1 ? (choosenPromo === true ? setChoosenPromo(false) : (affecterThemeEnseignant === true ? setAffecterThemeEnseignant(false) : affecterThemeEquipe === true ? setAffecterThemeEquipe(false) : "")) : ""}} 
                    className={`absolute bottom-2 left-4 ${choosenPromo === false ? "hidden": "flex"}`} 
                >
                    <ArrowIcon/>
                </button>

            <div className={`flex flex-col space-y-6 items-center px-3 justify-center ${choosenPromo === true ? "flex" : "hidden"}`}>
                <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="font-semibold">Choisisser la manière d'affectation des étudiant suivant la fiche de voeux:</div>
                    <button 
                        className="hover:text-blue-400"  
                        onClick = {(e) => {setAffectationThemeFifo(true)}}
                    >
                        Premier arrivé premier servi
                    </button>
                    <button
                        className="hover:text-blue-400"  
                        onClick = {(e) => {setAffecterThemeMoy(true)}} 
                    >
                        Par moyenne
                    </button>
                </div>
                <button className="h-[40px] w-[120px] hover:bg-blue-500 bg-[#8FD4FB] rounded-full">Valider</button>
            </div>
        </div>
    </div> 
    )
}
export default AffecterTheme;