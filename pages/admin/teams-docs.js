import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useStoreActions, useStoreState } from "../../store/hooks";
import Select from "react-select";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar";
import { FileText, Download } from 'lucide-react';

const TeamsDocs = ({ toastsRef }) => {
    const router = useRouter()
    const { team, promotion } = router.query;
    const [selectedFiles, setSelectedFiles] = useState({})

    const [chosenPromotion, setChoosenPromotion] = useState(null)
    const [chosenTeam, setChosenTeam] = useState(null)
    const { promotions } = useStoreState(store => store.promotionsModel)
    const { teamsList: teams } = useStoreState(store => store.teamListModel)

    const { getAllPromotionsThunk } = useStoreActions(store => store.promotionsModel)
    const { getTeamsList } = useStoreActions(store => store.teamListModel)

    const { getAllDocsAdmin } = useStoreActions(store => store.adminTeamsDocsModel)
    const { documents } = useStoreState(store => store.adminTeamsDocsModel)

    const handleSelectFiles = file => {
        if (selectedFiles[file.id]) {
            setSelectedFiles(files => {
                const newFiles = { ...files }
                delete newFiles[file.id]
                return newFiles;
            })
        } else {
            setSelectedFiles(files => {
                return { ...files, [file.id]: file }
            })
        }
    }

    const handleChangePromotion = (option) => {
        router.push(`/admin/teams-docs?promotion=${option.value}&team=all`)
    }

    const handleChangeTeam = (option) => {
        router.push(`/admin/teams-docs?promotion=${chosenPromotion?.value ? chosenPromotion?.value : 'all'}&team=${option.value}`)
    }

    useEffect(async () => {
        if (promotions?.length === 0) {
            await getAllPromotionsThunk()
            return;
        }

        await getTeamsList(promotion)

        const label = promotions.find(el => el.id === promotion)?.name
        if (label) {
            setChoosenPromotion({ value: promotion, label })
            setChosenTeam(null)
        }
        await getAllDocsAdmin({ teamId: team, promotionId: promotion })

    }, [promotion, promotions])

    useEffect(async () => {
        if (teams.length === 0) return
        const label1 = teams.find(el => el.id === team)?.pseudo
        if (label1) setChosenTeam({ value: team, label: label1 })

        await getAllDocsAdmin({ teamId: team, promotionId: promotion })

    }, [team])

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
            <AdminVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto pl-20">
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#000000' }}>Documents des Équipes</h1>
                        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#5375E2' }}></div>
                    </div>

                    {/* Filters */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: '#000000' }}>Promotion</label>
                            <Select
                                placeholder="Sélectionner une promotion..."
                                onChange={(option) => { handleChangePromotion(option) }}
                                options={promotions.map(el => { return { value: el.id, label: el.name } })}
                                isLoading={!promotions}
                                value={chosenPromotion}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: '#E5E7EB',
                                        borderRadius: '0.75rem',
                                        boxShadow: 'none'
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2" style={{ color: '#000000' }}>Équipe</label>
                            <Select
                                placeholder="Sélectionner une équipe..."
                                onChange={(option) => { handleChangeTeam(option) }}
                                options={teams.map(el => { return { value: el.id, label: el.pseudo } })}
                                isLoading={!teams}
                                value={chosenTeam}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderColor: '#E5E7EB',
                                        borderRadius: '0.75rem',
                                        boxShadow: 'none'
                                    })
                                }}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>
                                {documents?.length > 0 ? `Fichiers (${documents.length})` : 'Fichiers'}
                            </h2>

                            {documents?.length === 0 ? (
                                <div className="border-2 border-dashed rounded-xl p-12 text-center" style={{ borderColor: '#5375E2', backgroundColor: '#F4FCFF' }}>
                                    <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#5375E2' }} />
                                    <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>Aucun fichier</h3>
                                    <p style={{ color: '#000000' }}>Sélectionnez une équipe pour voir ses documents</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {documents?.map(doc => {
                                        const colors = getFileBadgeColor(getFileExtension(doc.name))
                                        return (
                                            <div
                                                key={doc.id}
                                                className="relative group cursor-pointer"
                                                onClick={() => handleSelectFiles(doc)}
                                            >
                                                <div
                                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedFiles[doc.id] ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                                    style={selectedFiles[doc.id] ? { borderColor: '#5375E2', backgroundColor: '#F4FCFF' } : {}}
                                                >
                                                    <div className="p-3 rounded-lg" style={{ backgroundColor: colors.bg }}>
                                                        <FileText className="w-6 h-6" style={{ color: colors.text }} />
                                                    </div>
                                                    <p className="text-xs text-center truncate max-w-full" style={{ color: '#000000' }}>
                                                        {getFileExtension(doc.name)}
                                                    </p>
                                                    <p className="text-xs text-center line-clamp-2" style={{ color: '#000000' }}>
                                                        {doc.name}
                                                    </p>
                                                </div>
                                                {selectedFiles[doc.id] && (
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#5375E2' }}>
                                                        <span className="text-white text-sm">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Document Info Sidebar */}
                        {Object.keys(selectedFiles).length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Détails du document</h3>
                                <div className="space-y-4">
                                    {Object.keys(selectedFiles).map(k => {
                                        const selectedFile = selectedFiles[k];
                                        return (
                                            <div key={k} className="p-4 rounded-lg border border-gray-200 space-y-2">
                                                <div>
                                                    <p className="text-xs font-semibold" style={{ color: '#000000' }}>NOM</p>
                                                    <p className="text-sm break-words" style={{ color: '#000000' }}>{selectedFile.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold" style={{ color: '#000000' }}>TYPE</p>
                                                    <p className="text-sm" style={{ color: '#000000' }}>{selectedFile.type?.name}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold" style={{ color: '#000000' }}>ÉQUIPE</p>
                                                    <p className="text-sm" style={{ color: '#000000' }}>{selectedFile.commit?.team?.nickName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold" style={{ color: '#000000' }}>PROMOTION</p>
                                                    <p className="text-sm" style={{ color: '#000000' }}>{selectedFile.commit?.team?.promotion?.name}</p>
                                                </div>
                                                <button
                                                    onClick={() => router.push('http://localhost:8080/' + selectedFile.url?.slice(2))}
                                                    className="w-full mt-2 px-4 py-2 rounded-lg text-white font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2"
                                                    style={{ backgroundColor: '#5375E2' }}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Télécharger
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TeamsDocs;