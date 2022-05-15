
import Link from "next/link";
import { useState } from "react";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
import DownIcon from "../../icons/DownIcon"
import ArrowIcon from "../../icons/ArrowIcon";


const config = props => {

    const [promotion , setPromotion] = useState(
        [
            {promo : ["2CPI"]} , 
            {promo : ["1CS"]} , 
            {promo : ["2CS"]} , 
            {promo : ["3CS"]} , 
        ]  
    )
   
    const [validerEquipes , setvaliderEquipe] = useState(false)
    const [ValiderEquipePromotion , setValiderEquipePromotion] = useState(promotion)
    const [downIconValiderEquipePromotion , setDownIconValiderEquipePromotion] = useState(false)
    const [longueur , setLongueur] = useState(ValiderEquipePromotion.length)
    const [choosenPromo , setChoosenPromo] = useState(false)
    const [minEtudiantEquipe , setMinEtudiantEquipe] = useState(1)
    const [maxEtudiantEquipe , setMaxEtudiantEquipe] = useState(1)
    const [affecterEtudiantSansEquipes , setAffecterEtudiantsSansEquipes] = useState(false)
    const [bouttonAffectationEquipe , setBouttonAffectationEquipes] = useState(false)
    const [conpleterEquipes , setCompleterEquipes] = useState(false)
    const [bouttonCompleterEquipe , setBouttonComplterEquipes] = useState(false)
    return (
        <div>
            <StudentVerticalNavbar/>
            <HorisontalNavbar/>
            <div className="bg-background space-x-10 h-screen w-screen relative flex flex-row items-center justify-center font-xyz text-textcolor">
                <div className="flex items-center justify-center relative flex-col text-[20px]">
                    <div className="text-[30px] absolute top-10">Centre de contrôl :</div>
                    <img src="/config.jpg" className={`h-[600px] object-contain mix-blend-darken ${validerEquipes === true ? "opacity-20":""}`}/>
                    <div className={`absolute h-[400px] w-[500px] bg-white/80 shadow-lg rounded-xl flex-col justify-center items-center flex ${validerEquipes === true ? "flex":"hidden"}`}>
                        <div className="absolute top-4 mb-2 text-[28px]">Valider les équipes :</div>
                        <div className={`flex flex-row space-x-4 items-start justify-center absolute top-24 ${choosenPromo === true ? "hidden" : "flex"}`}>
                            <div>Promotion :</div>
                            <div className="flex flex-col space-y-2">
                               <div className="flex flex-row space-x-4">
                                    <input className="h-[40px] w-[250px] rounded-full shadow-md flex items-center px-3" value = {`${longueur === 1 ? ValiderEquipePromotion : "Choisir une promotion"}`} />
                                    <button className={`pt-4 ${downIconValiderEquipePromotion === true ? "hidden": "flex"}`} onClick={(e)=>{setDownIconValiderEquipePromotion(true)}}><DownIcon/></button>
                               </div>
                                <div className={`bg-gray-50 shadow-sm rounded-xl p-2 backdrop-blur-sm justify-start w-[250px] flex flex-col ${downIconValiderEquipePromotion === true ? "flex": "hidden"}`}>
                                {
                                        promotion.map((element , index) => {
                                            return (
                                                <button className={`h-[35px] w-full hover:border-2 border-y-slate-200 border-x-transparent`} onClick={(e)=>{setValiderEquipePromotion(element.promo) ; setLongueur(ValiderEquipePromotion.length) ; setDownIconValiderEquipePromotion(false)}}>{element.promo}</button>
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
                                    <input className="h-[35px] w-[60px] bg-gray-50 shadow-md rounded-md px-3" type="number" min="1" max="10" value={minEtudiantEquipe} onChange = {(e) => setMinEtudiantEquipe(e.target.value)}/>
                                </div>
                                <div className="flex flex-row space-x-2">
                                    <div>Max :</div>
                                    <input className="h-[35px] w-[60px] bg-gray-50 shadow-md rounded-md px-3" type="number" min="2" max="10" value={maxEtudiantEquipe} onChange = {(e) => setMaxEtudiantEquipe(e.target.value)}/>
                                </div>
                            </div>
                            <div>
                                <button onClick={(e) => setBouttonAffectationEquipes(true)} className="hover:text-blue-400">Affecter les étudiants sans équipes</button>
                                <button className="hover:text-blue-400">Compléter les équipes</button>
                            </div>
                            <button onClick={(e) => setBouttonComplterEquipes(true)}  className="h-[40px] w-[120px] hover:bg-blue-500 bg-[#8FD4FB] rounded-full">Valider</button>
                        </div>
                        <button className={`rotate-180 absolute bottom-2 right-4 ${choosenPromo === true ? "hidden": "flex"}`} onClick={(e) => {longueur === 1 ? setChoosenPromo(true) : ""}}><ArrowIcon/></button>
                        <button onClick={(e) => {longueur === 1 ? setChoosenPromo(false) : ""}} className={`absolute bottom-2 left-4 ${choosenPromo === false ? "hidden": "flex"}`} ><ArrowIcon/></button>
                    </div>
                    <div className={`absolute h-[300px] w-[400px] z-50 bg-white space-y-6 shadow-lg rounded-xl flex-col justify-center items-center flex ${(bouttonAffectationEquipe === true) ||  bouttonCompleterEquipe === true ? "flex":"hidden"}`}>
                        <div className="text-center">{bouttonAffectationEquipe === true ? "En cliquant sur valider , l'affectation se fera de manière automatique" : "En cliquant sur valider , les équipes non satisfaisantes les condition seront complété aléatoirement"}</div>
                        <button className="h-[40px] w-[120px] hover:bg-blue-500 bg-[#8FD4FB] rounded-full" onClick={(e) => {bouttonAffectationEquipe === true ? setAffecterEtudiantsSansEquipes(true) : setCompleterEquipes(true) ; setBouttonAffectationEquipes(false) ; setBouttonComplterEquipes(false)}}>Valider</button>
                    </div>
                </div>
                <div className="flex flex-col fit p-3 w-[350px] bg-white text-[20px] rounded-lg shadow-lg">
                    <Link href='/AddStudent'><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Ajouter des étudiant</button></Link>
                    <Link href='/AddTeacher'><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Ajouter des enseignant</button></Link>
                    <Link href='/admin/studentlist'><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Liste des étudiants</button></Link>
                    <Link href='/admin/teacherlist'><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Liste des enseignant</button></Link>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent" onClick={(e) => setvaliderEquipe(true)}>Valider les équipes</button> <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Affecter les thèmes</button>
                    <Link href="/theme"><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Valider les thèmes</button></Link>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Affecter les equipes</button>
                    <Link href="/ficheDeVoeux "><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Fiches de voeux</button></Link>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Préparer les soutenances</button>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Rapport de projet</button>
                </div>
            </div>
        </div>
    )
}
export default config;