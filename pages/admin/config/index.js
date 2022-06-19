import Link from "next/link";
import { useState } from "react";

const config = props => {

    const options = [
        {
            nomOption : "Ajouter Etudiants",
            lien : "/admin/addstudent"
        },
        {
            nomOption : "Ajouter Enseignants",
            lien : "/admin/addteacher"
        },
        {
            nomOption : "Ajouter Entreprises",
            lien : "/admin/addentreprise"
        },
        {
            nomOption : "Liste Etudiants",
            lien : "/admin/studentlist"
        },
        {
            nomOption : "Liste Enseignants",
            lien : "/admin/teacherlist"
        },
        {
            nomOption : "Liste Entreprises",
            lien : "/"
        },
        {
            nomOption : "les suggestion de theme",
            lien : "/suggestions"
        },
        {
            nomOption : "les themes(suggestion validé)",
            lien : "/themes"
        },
        {
            nomOption : "Affecter Thèmes au Etudiants",
            lien : "/admin/asign-teams-to-themes"
        },
        {
            nomOption : "liste des equipes",
            lien : "/teams"
        },
        {
            nomOption : "Affecter Equipes à Enseignant",
            lien : "/"
        },
        {
            nomOption : "Créer Soutenances",
            lien : "/admin/config/create-soutenance"
        },
        {
            nomOption : "Liste de soutenance",
            lien : "/soutenances"
        },
        {
            nomOption : "Documents Déposées",
            lien : "/admin/teams-docs"
        },
        {
            nomOption : "Completer les  equipes",
            lien : "/admin/complete-teams"
        },
        {
            nomOption : "Envoyer la fiche de voeux",
            lien : "/admin/send-wish-list"
        },
    ]

    return (
        <div className="bg-background min-h-screen min-w-screen flex items-center justify-center">
            <div className=" pt-[100px] pl-[100px] flex-col space-y-10 flex items-center justify-center font-xyz">
                <div className="font-light text-[25px]">Centre de configurations</div>
                <div className="flex flex-wrap items-center justify-center gap-8">
                    {
                        options.map((el , index) => {
                            return(
                                <div className="relative font-thin font-mono text-[18px]">
                                    <img src="/config.jpg" className="h-[80px] w-[250px] mix-blend-darken opacity/10"/>
                                    <Link href={el.lien}>
                                        <button className="bg-white/80 hover:border-2 border-slate-300 hover:shadow-2xl top-0 absolute backdrop-blur-sm shadow-lg rounded-lg h-[80px] w-[250px]">
                                            {el.nomOption}
                                        </button>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default config;