import Link from "next/link";

const Config = props => {
    const sections = [
        {
            title: "Gestion des Utilisateurs",
            icon: "👥",
            items: [
                { name: "Ajouter Étudiants", link: "/admin/addstudent" },
                { name: "Liste Étudiants", link: "/admin/studentlist" },
                { name: "Ajouter Enseignants", link: "/admin/addteacher" },
                { name: "Liste Enseignants", link: "/admin/teacherlist" },
                { name: "Ajouter Entreprises", link: "/admin/addentreprise" },
                { name: "Liste Entreprises", link: "/" },
            ]
        },
        {
            title: "Gestion des Thèmes & Équipes",
            icon: "📚",
            items: [
                { name: "Suggestion de Thème", link: "/suggestions" },
                { name: "Thèmes Validés", link: "/themes" },
                { name: "Affecter Thèmes aux Étudiants", link: "/admin/asign-teams-to-themes" },
                { name: "Liste des Équipes", link: "/teams" },
                { name: "Compléter les Équipes", link: "/admin/complete-teams" },
            ]
        },
        {
            title: "Gestion des Soutenances",
            icon: "🎓",
            items: [
                { name: "Créer Soutenances", link: "/admin/config/create-soutenance" },
                { name: "Liste de Soutenance", link: "/soutenances" },
            ]
        },
        {
            title: "Gestion Administrative",
            icon: "📋",
            items: [
                { name: "Documents Déposées", link: "/admin/teams-docs" },
                { name: "Affecter Équipes à Enseignant", link: "/" },
                { name: "Envoyer la Fiche de Vœux", link: "/admin/send-wish-list" },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 font-roboto">
            <div className="pt-24 pb-16 px-6 ml-16">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="text-5xl font-bold mb-2" style={{color: '#1A2562'}}>
                            Centre d'Administration
                        </h1>
                        <p className="text-lg" style={{color: '#1A2562', opacity: 0.7}}>
                            Gérez tous les aspects du système de gestion de projet
                        </p>
                        <div className="h-1 w-32 bg-boutton rounded-full mx-auto mt-6"></div>
                    </div>

                    {/* Sections Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {sections.map((section, sectionIdx) => (
                            <div key={sectionIdx} className="space-y-4">
                                {/* Section Header */}
                                <div className="bg-boutton rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-5xl">{section.icon}</div>
                                        <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                                    </div>
                                </div>

                                {/* Section Items Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {section.items.map((item, itemIdx) => (
                                        <Link key={itemIdx} href={item.link}>
                                            <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 cursor-pointer hover:-translate-y-0.5 border-2 border-gray-100 hover:border-boutton min-h-[120px] flex flex-col items-center justify-center text-center">
                                                <div className="mb-3 text-4xl">
                                                    {section.icon}
                                                </div>
                                                <p className="text-sm font-semibold leading-tight transition-colors" style={{color: '#1A2562'}}>
                                                    {item.name}
                                                </p>
                                                <div className="mt-3 h-0.5 w-8 bg-boutton rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Stats */}
                    
                </div>
            </div>
        </div>
    )
}

export default Config;