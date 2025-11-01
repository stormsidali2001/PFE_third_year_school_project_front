import Avatar from "../../components/Avatar"
import TeacherVerticalNavbar from "../../components/TeacherVerticalNavbar"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import { useEffect, useState } from "react"
import Select from "react-select"
import { useStoreState, useStoreActions } from "../../store/hooks"
import { useRouter } from 'next/router'
import ModalPortal from "../../components/ModalPortal"
import { Users, FileText, CheckCircle } from 'lucide-react'

const MyTeams = ({ toastsRef }) => {
    const router = useRouter()
    const { promotion } = router.query;
    
    const { promotions } = useStoreState(store => store.promotionsModel)
    const { getAllPromotionsThunk } = useStoreActions(store => store.promotionsModel)
    const [choosenPromotion, setChoosenPromotion] = useState(null)

    const { getTeamsTeacherResponsibleForWithMembers } = useStoreActions(store => store.teacherTeamCommitDocsModel)
    const { teams } = useStoreState(store => store.teacherTeamCommitDocsModel)
    const { canSoutenir } = useStoreActions(store => store.soutenanceModel)
    const [selectedTeam, setSelectedTeam] = useState(null)
    const [openCanSoutenir, setOpenCanSoutenir] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = async option => {
        router.push(`/myteams?promotion=${option.value}`)
    }

    const handleCanSoutenir = async (e) => {
        try {
            e.preventDefault();
            if (!selectedTeam) {
                toastsRef.current.addMessage({ mode: 'Error', text: "Erreur: équipe non sélectionnée" })
                return;
            }
            setLoading(true);
            await canSoutenir({ teamId: selectedTeam.id })
            await getTeamsTeacherResponsibleForWithMembers(promotion)
            toastsRef.current.addMessage({ mode: 'Alert', text: "Équipe autorisée à soutenir!" })
            setOpenCanSoutenir(false)
        } catch (err) {
            console.log(err)
            toastsRef.current.addMessage({ mode: 'Error', text: err?.response?.data?.message || "Erreur lors de la mise à jour" })
        } finally {
            setLoading(false)
        }
    }

    useEffect(async () => {
        if (promotions?.length === 0) await getAllPromotionsThunk()

        if (!promotion || promotion?.length === 0) {
            promotions?.length > 0 && await getTeamsTeacherResponsibleForWithMembers()
            return;
        }
        const label = promotions.find(el => el.id === promotion)?.name
        if (!label) {
            return ;
        }

        setChoosenPromotion({ value: promotion, label })
        await getTeamsTeacherResponsibleForWithMembers(promotion)

    }, [promotion, promotions])

    return (
        <div>
            <HorisontalNavbar />
            <TeacherVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#000000' }}>Mes Équipes</h1>
                        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#5375E2' }}></div>
                    </div>

                    {/* Filter Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold mb-3" style={{ color: '#000000' }}>Sélectionner une promotion</label>
                        <div className="w-full md:w-64">
                            <Select
                                placeholder="Choisir une promotion..."
                                onChange={handleChange}
                                options={promotions.map(el => ({ value: el.id, label: el.name }))}
                                value={choosenPromotion}
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

                    {/* Teams Grid or Empty State */}
                    {teams && teams.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teams.map((el, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                                    {/* Card Header */}
                                    <div className="p-6 border-b border-gray-100">
                                        <h2 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>#{el.pseudo}</h2>
                                        <div className="flex items-center gap-2 text-sm" style={{ color: '#000000' }}>
                                            <Users className="w-4 h-4" style={{ color: '#5375E2' }} />
                                            <span>{el.students?.length || 0} membres</span>
                                        </div>
                                    </div>

                                    {/* Members List */}
                                    <div className="p-6 space-y-3">
                                        <p className="text-xs font-semibold mb-3" style={{ color: '#000000' }}>MEMBRES</p>
                                        <div className="space-y-2">
                                            {el.students?.map((element, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#5375E2' }}>
                                                        {element.firstName?.charAt(0)}{element.lastName?.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate" style={{ color: '#000000' }}>
                                                            {element.firstName} {element.lastName}
                                                        </p>
                                                    </div>
                                                    {element.id === el.teamLeader?.id && (
                                                        <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: '#F4FCFF', color: '#5375E2' }}>
                                                            CF
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    {el.peutSoutenir && (
                                        <div className="px-6 py-3" style={{ backgroundColor: '#E8F5E9', borderTop: '1px solid #E5E7EB' }}>
                                            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#000000' }}>
                                                <CheckCircle className="w-4 h-4" style={{ color: '#5375E2' }} />
                                                Autorisée à soutenir
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="p-6 border-t border-gray-100 space-y-2">
                                        <button
                                            onClick={() => router.push('/myteams/' + el.id)}
                                            className="w-full py-2 rounded-lg font-semibold text-white transition-all hover:shadow-md flex items-center justify-center gap-2"
                                            style={{ backgroundColor: '#5375E2' }}
                                        >
                                            <FileText className="w-4 h-4" />
                                            Voir les documents
                                        </button>
                                        {!el.peutSoutenir && (
                                            <button
                                                onClick={() => { setSelectedTeam(el); setOpenCanSoutenir(true) }}
                                                className="w-full py-2 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                                                style={{ borderColor: '#5375E2', color: '#5375E2' }}
                                            >
                                                Autoriser à soutenir
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#F4FCFF' }}>
                                <Users className="w-10 h-10" style={{ color: '#5375E2' }} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>Aucune équipe</h3>
                            <p className="text-gray-500 mb-6" style={{ color: '#000000' }}>Vous n'êtes actuellement responsable d'aucune équipe. Sélectionnez une promotion pour voir les équipes.</p>
                            <button
                                onClick={() => setChoosenPromotion(null)}
                                className="px-6 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                                style={{ backgroundColor: '#5375E2' }}
                            >
                                Sélectionner une promotion
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <ModalPortal
                open={openCanSoutenir}
                handleClose={setOpenCanSoutenir}
            >
                <div className="w-full max-w-md p-6">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Confirmer</h2>
                    <p className="mb-6" style={{ color: '#000000' }}>
                        Êtes-vous certain de vouloir autoriser l'équipe <span className="font-semibold">#{selectedTeam?.pseudo}</span> à soutenir ?
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setOpenCanSoutenir(false)}
                            className="flex-1 py-2 rounded-lg border border-gray-300 font-semibold transition-all hover:bg-gray-50"
                            style={{ color: '#000000' }}
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleCanSoutenir}
                            disabled={loading}
                            className="flex-1 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: '#5375E2' }}
                        >
                            {loading ? 'Traitement...' : 'Confirmer'}
                        </button>
                    </div>
                </div>
            </ModalPortal>
        </div>
    )
}
export default MyTeams