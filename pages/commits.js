import { useEffect, useState } from "react"
import { useStoreActions, useStoreState } from "../store/hooks"
import { useRouter } from 'next/router'
import HorisontalNavbar from "../components/HorisontalNavbar"
import TeacherVerticalNavbar from "../components/TeacherVerticalNavbar"
import { FileText, X } from 'lucide-react'

const commitDocumentTeacher = props => {
    const router = useRouter();
    const [selectedTeam, setSelectedteam] = useState(null)
    const [selectedDoc, setSelectedDoc] = useState(null)
    const { getTeamsTeacherResponsibleFor, getTeamCommits } = useStoreActions(store => store.commitsModel)
    const { teamsInResponsability, documents, commits } = useStoreState(store => store.commitsModel)

    useEffect(() => {
        try {
            getTeamsTeacherResponsibleFor()
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleGetCommits = async (team) => {
        try {
            await getTeamCommits({ teamId: team.id })
            setSelectedteam(team)
        } catch (err) {
            console.log(err)
        }
    }

    const getFileExtension = (filename) => {
        return filename?.split('.').pop()?.toUpperCase() || 'DOC'
    }

    const getFileBadgeColor = (extension) => {
        const ext = extension?.toUpperCase()
        const colors = {
            'PDF': { bg: '#FEE2E2', text: '#991B1B' },
            'DOC': { bg: '#DBEAFE', text: '#1E40AF' },
            'DOCX': { bg: '#DBEAFE', text: '#1E40AF' },
            'XLS': { bg: '#DCFCE7', text: '#15803D' },
            'XLSX': { bg: '#DCFCE7', text: '#15803D' },
            'PPT': { bg: '#F3E8FF', text: '#6D28D9' },
            'PPTX': { bg: '#F3E8FF', text: '#6D28D9' },
            'JPG': { bg: '#FEF3C7', text: '#92400E' },
            'PNG': { bg: '#FEF3C7', text: '#92400E' },
        }
        return colors[ext] || { bg: '#F3F4F6', text: '#374151' }
    }

    return (
        <div>
            <HorisontalNavbar />
            <div className="flex min-h-screen" style={{ backgroundColor: '#F4FCFF' }}>
                <TeacherVerticalNavbar />
                
                <div className="flex-1 mx-28 mt-24">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#000000' }}>Commits de Projets</h1>
                        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#5375E2' }}></div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Team Selection Sidebar */}
                        <div className="lg:col-span-1 sticky top-24">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                                <h2 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Vos équipes</h2>
                                
                                {teamsInResponsability && teamsInResponsability.length > 0 ? (
                                    <div className="space-y-2">
                                        {teamsInResponsability.map((team, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleGetCommits(team)}
                                                className={`w-full p-3 rounded-lg text-left font-medium transition-all truncate`}
                                                style={{
                                                    backgroundColor: selectedTeam?.id === team.id ? '#5375E2' : 'transparent',
                                                    color: selectedTeam?.id === team.id ? '#FFFFFF' : '#000000'
                                                }}
                                            >
                                                #{team.pseudo || team.nickName}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: '#999999' }}>Aucune équipe trouvée</p>
                                )}
                            </div>
                        </div>

                        {/* Commits List */}
                        <div className="lg:col-span-3">
                            {selectedTeam ? (
                                <div>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-bold" style={{ color: '#000000' }}>
                                            Commits - #{selectedTeam.pseudo || selectedTeam.nickName}
                                        </h2>
                                        <p className="text-sm mt-1" style={{ color: '#666666' }}>
                                            {commits?.length || 0} commit(s) trouvé(s)
                                        </p>
                                    </div>

                                    {commits && commits.length > 0 ? (
                                        <div className="space-y-4">
                                            {commits.map(({ title, description, documents }, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
                                                >
                                                    {/* Commit Header */}
                                                    <div className="mb-4">
                                                        <h3 className="text-lg font-bold" style={{ color: '#000000' }}>
                                                            {title}
                                                        </h3>
                                                    </div>

                                                    {/* Commit Description */}
                                                    <div className="mb-5">
                                                        <p className="text-sm" style={{ color: '#000000' }}>
                                                            {description}
                                                        </p>
                                                    </div>

                                                    {/* Documents Section */}
                                                    {documents && documents.length > 0 && (
                                                        <div>
                                                            <p className="text-xs font-semibold mb-3" style={{ color: '#000000' }}>
                                                                DOCUMENTS ({documents.length})
                                                            </p>
                                                            <div className="flex flex-wrap gap-3">
                                                                {documents.map((doc, i) => {
                                                                    const colors = getFileBadgeColor(getFileExtension(doc.name))
                                                                    return (
                                                                        <button
                                                                            key={i}
                                                                            onClick={() => setSelectedDoc(doc)}
                                                                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:shadow-md transition-all"
                                                                            style={{ backgroundColor: colors.bg }}
                                                                        >
                                                                            <FileText className="w-5 h-5" style={{ color: colors.text }} />
                                                                            <span
                                                                                className="text-xs font-semibold text-center max-w-[80px] truncate"
                                                                                style={{ color: colors.text }}
                                                                            >
                                                                                {getFileExtension(doc.name)}
                                                                            </span>
                                                                            <span
                                                                                className="text-xs text-center max-w-[80px] line-clamp-2"
                                                                                style={{ color: colors.text }}
                                                                            >
                                                                                {doc.name}
                                                                            </span>
                                                                        </button>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                                            <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#5375E2' }} />
                                            <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>Aucun commit</h3>
                                            <p style={{ color: '#000000' }}>Cette équipe n'a pas encore de commits enregistrés.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                                    <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#5375E2' }} />
                                    <h3 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>Sélectionnez une équipe</h3>
                                    <p style={{ color: '#000000' }}>Choisissez une équipe à gauche pour visualiser ses commits.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Document Detail Modal */}
                {selectedDoc && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
                        <div className="relative bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto w-full max-w-md p-6">
                            <button
                                onClick={() => setSelectedDoc(null)}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" style={{ color: '#000000' }} />
                            </button>

                            <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
                                Détails du document
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold mb-2" style={{ color: '#000000' }}>NOM</p>
                                    <p className="text-sm break-all" style={{ color: '#000000' }}>
                                        {selectedDoc.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold mb-2" style={{ color: '#000000' }}>DESCRIPTION</p>
                                    <p className="text-sm break-all" style={{ color: '#000000' }}>
                                        {selectedDoc.description || 'Pas de description'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold mb-2" style={{ color: '#000000' }}>TYPE</p>
                                    <p className="text-sm" style={{ color: '#000000' }}>
                                        {selectedDoc.type?.name || 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold mb-2" style={{ color: '#000000' }}>VALIDÉ</p>
                                    <p className="text-sm" style={{ color: '#000000' }}>
                                        {selectedDoc.type?.validated ? 'Oui' : 'Non'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold mb-2" style={{ color: '#000000' }}>LIEN</p>
                                    <button
                                        onClick={() => router.push('http://localhost:8080/' + selectedDoc.url?.slice(2))}
                                        className="text-sm font-medium px-3 py-2 rounded-lg transition-all text-white w-full"
                                        style={{ backgroundColor: '#5375E2' }}
                                    >
                                        Télécharger
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default commitDocumentTeacher;