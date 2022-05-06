import Link from "next/link";
import StudentVerticalNavbar from "./StudentVerticalNavbar";

const AcceuilAdmin = ({ajouteEtudiant , valideEquipe , finProjet , soutenance}) => {
    return (
        <div className="text-[#1A2562] bg-[#F8FDFF] font-xyz px-12 flex flex-row space-y-3 py-10 lg:h-[100vh] h-fit w-[100vw] items-center justify-center">
            <StudentVerticalNavbar/>
            <div className="flex flex-col space-y-8 px-12 items-center justify-center text-center">
                <div className="text-[40px] font-bold">Bonjour ,</div>
                <div className="text-[30px] font-semibold">Nous somme heureux de vous acceuil sur notre plateforme. On espère qu’elle vous serait utile dans le managment des projets pluridiciplinaires.</div>
                <div className="text-[27px] font-light">Vous pouvez déjà commencer par ajouter les étudiants et les enseignants participant au projets.</div>
                <div className="flex flex-row space-x-10 text-[21px] font-extralight">
                    <Link href={ajouteEtudiant === true ? (valideEquipe === true ? (finProjet === true ? (soutenance === true ? "/listEquipe" : "/listEquipe") : "/listepv" ) : "/studentlist") : "/AddStudent"}>
                        <button className="h-[40px] w-[270px] text-white bg-[#32AFF5] rounded-full">{ajouteEtudiant === true ? (valideEquipe === true ? (finProjet === true ? (soutenance === true ? "Note final" : "Programmer soutenance") : "Consulter les PV" ) : "Valider équipes") : "Ajouter étudiants"}</button>
                    </Link>
                    <Link href={ajouteEtudiant === true ? (valideEquipe === true ? (finProjet === true ? (soutenance === true ? "rapportProjet" : "/rapportProjet") : "/themes" ) : "/themes") : "/AddTeacher"}>
                        <button className="h-[40px] w-[230px] bg-[#8FD4FB] rounded-full">{ajouteEtudiant === true ? (valideEquipe === true ? (finProjet === true ? (soutenance === true ? "Rapport Jury" : "Consulter PFE") : "Programmer fin" ) : "Valider thèmes") : "Ajouter enseignants"}</button>
                    </Link>
                </div>
            </div>
            <img src="AceeuilAdmin.jpg" className="h-[500px] object-contain mix-blend-darken"/>
        </div>
    )
}
export default AcceuilAdmin;