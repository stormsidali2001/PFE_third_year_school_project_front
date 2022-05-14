import Link from "next/link";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";

const config = props => {
    return (
        <div>
            <StudentVerticalNavbar/>
            <HorisontalNavbar/>
            <div className="bg-background space-x-10 h-screen w-screen relative flex flex-row items-center justify-center font-xyz text-textcolor">
                <div className="flex items-center justify-center flex-col">
                     <div className="text-[35px] mt-16">Centre de configuration :</div>
                    <img src="/config.jpg" className="h-[600px] object-contain mix-blend-darken"/>
                </div>
                <div className="flex flex-col fit p-3 w-[350px] bg-white text-[20px] rounded-lg shadow-lg">
                    <Link href='/AddStudent'><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Ajouter des étudiant</button></Link>
                    <Link href='/AddTeacher'><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Ajouter des enseignant</button></Link>
                    <Link href='/admin/studentlist'><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Liste des étudiants</button></Link>
                    <Link href='/admin/teacherlist'><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Liste des enseignant</button></Link>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Valider les équipes</button>
                    <Link href="/theme"><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Valider les thèmes</button></Link>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Affecter les thèmes</button>
                    <Link href="/ficheDeVoeux "><button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Fiches de voeux</button></Link>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Fin de projets</button>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Préparer les soutenances</button>
                    <button className="h-[40px] w-full hover:border-2 border-y-slate-200 border-x-transparent">Rapport de projet</button>
                </div>
            </div>
        </div>
    )
}
export default config;