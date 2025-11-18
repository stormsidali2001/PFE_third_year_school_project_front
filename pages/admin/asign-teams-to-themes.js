import { useEffect, useState } from "react";
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import ModalPortal from "../../components/ModalPortal";
import { useStoreActions, useStoreState } from "../../store/hooks";
import Select from 'react-select'
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

const AssignTeamsToThemes = ({ toastsRef }) => {
    const [open, setOpen] = useState(false)
    const [chosenPromotion, setChoosenPromotion] = useState(null)
    const { getAllPromotionsThunk } = useStoreActions(store => store.promotionsModel)
    const { promotions } = useStoreState(store => store.promotionsModel)
    const { asignThemesToTeams, applyThemesToTeamsAssignements } = useStoreActions(store => store.adminAsignTeamsToThemesModel)
    const { results } = useStoreState(store => store.adminAsignTeamsToThemesModel)
    const [loading, setLoading] = useState(false)

    const [step, setStep] = useState(0)
    const [chosenIndex, setChosenIndex] = useState(0)
    const choices = [
        { label: 'Aléatoire', value: 'random', description: 'Affectation aléatoire des thèmes' },
        { label: 'FIFO', value: 'time', description: 'Premier arrivé, premier servi' },
        { label: 'Par Moyenne', value: 'moy', description: 'Basé sur la moyenne des étudiants' }
    ];

    useEffect(async () => {
        await getAllPromotionsThunk();
    }, [])

    const handleAsignThemesToTeams = async e => {
        e.preventDefault()
        if (!chosenPromotion) {
            toastsRef.current.addMessage({ text: "Sélectionnez une promotion", mode: 'Error' })
            return;
        }
        setLoading(true)
        try {
            await asignThemesToTeams({
                promotionId: chosenPromotion.value,
                method: choices[chosenIndex].value
            })
            setStep(step => step + 1)
            toastsRef.current.addMessage({ text: "Affectation calculée avec succès!", mode: 'Alert' })
        } catch (err) {
            toastsRef.current.addMessage({ text: err.response?.data?.message || "Erreur", mode: 'Error' })
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const handleApplyThemesToTeamsAssignements = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            await applyThemesToTeamsAssignements({
                themeToTeam: results.map(res => {
                    return {
                        idTheme: res.theme.id,
                        teamIds: res.teams.map(tm => tm.id)
                    }
                })
            })
            toastsRef.current.addMessage({ text: "Affectation confirmée!", mode: 'Alert' })
            setOpen(false)
            setStep(0)
            setChoosenPromotion(null)
        } catch (err) {
            console.log(err)
            toastsRef.current.addMessage({ text: err.response?.data?.message || "Erreur", mode: 'Error' })
        } finally {
            setLoading(false)
        }
    }

    const isPromotionAssignedThemes = () => {
        const promotionDetails = promotions.find(el => el.id === chosenPromotion?.value)
        if (!promotionDetails) return false;
        return promotionDetails.themesAssignedToTeams;
    }

    return (
        <div>
            <HorisontalNavbar />
            <AdminVerticalNavbar />
            <div className="min-h-screen pt-24 pb-12 font-roboto pl-20" style={{ backgroundColor: '#F4FCFF' }}>
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
                            Affecter les Thèmes aux Équipes
                        </h1>
                        <p className="text-lg mb-6" style={{ color: '#000000' }}>
                            Assignez automatiquement les thèmes aux équipes selon la méthode choisie
                        </p>
                        <div className="h-1 w-24 rounded-full mx-auto" style={{ backgroundColor: '#5375E2' }}></div>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                        {/* Info Box */}
                        <div className="mb-8 p-4 rounded-lg flex gap-4" style={{ backgroundColor: '#FEF3C7' }}>
                            <AlertCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#92400E' }} />
                            <div>
                                <p className="font-semibold" style={{ color: '#92400E' }}>Remarque importante</p>
                                <p className="text-sm mt-1" style={{ color: '#92400E' }}>
                                    Les équipes qui n'ont pas soumis leur fiche de vœux seront affectées automatiquement à un thème disponible.
                                </p>
                            </div>
                        </div>

                        {/* Selection Section */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold mb-3" style={{ color: '#000000' }}>
                                Sélectionner une promotion
                            </label>
                            <Select
                                placeholder="Choisir une promotion..."
                                onChange={(option) => { setChoosenPromotion(option) }}
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

                        {/* Status or Method Selection */}
                        {chosenPromotion && (
                            <>
                                {!isPromotionAssignedThemes() ? (
                                    <div className="mb-8">
                                        <h3 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Sélectionner la méthode d'affectation</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            {choices.map((method, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => setChosenIndex(index)}
                                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                                        chosenIndex === index
                                                            ? 'border-blue-400 bg-blue-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                    style={chosenIndex === index ? { borderColor: '#5375E2', backgroundColor: '#F4FCFF' } : {}}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div
                                                            className={`w-5 h-5 rounded-full flex-shrink-0 mt-1 transition-all ${
                                                                chosenIndex === index ? 'ring-2 ring-offset-2' : ''
                                                            }`}
                                                            style={{
                                                                backgroundColor: chosenIndex === index ? '#5375E2' : '#E5E7EB',
                                                                ringColor: chosenIndex === index ? '#5375E2' : 'transparent'
                                                            }}
                                                        ></div>
                                                        <div>
                                                            <p className="font-semibold" style={{ color: '#000000' }}>{method.label}</p>
                                                            <p className="text-sm mt-1" style={{ color: '#666666' }}>{method.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={handleAsignThemesToTeams}
                                            disabled={loading}
                                            className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            style={{ backgroundColor: '#5375E2' }}
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                            {loading ? 'Calcul en cours...' : 'Calculer l\'affectation'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 rounded-lg flex gap-4" style={{ backgroundColor: '#DBEAFE' }}>
                                        <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#1E40AF' }} />
                                        <div>
                                            <p className="font-semibold" style={{ color: '#1E40AF' }}>Déjà affecté</p>
                                            <p className="text-sm mt-1" style={{ color: '#1E40AF' }}>
                                                Les thèmes ont déjà été affectés à cette promotion.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Results Modal */}
            <ModalPortal
                open={open}
                handleClose={setOpen}
            >
                <div className="w-full max-w-2xl p-6">
                    {step === 0 ? (
                        <>
                            <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Confirmation</h2>
                            <p className="mb-6" style={{ color: '#000000' }}>
                                Êtes-vous certain de vouloir affecter les thèmes à la promotion <span className="font-semibold">{chosenPromotion?.label}</span> en utilisant la méthode <span className="font-semibold">{choices[chosenIndex].label}</span> ?
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="flex-1 py-2 rounded-lg border border-gray-300 font-semibold transition-all hover:bg-gray-50"
                                    style={{ color: '#000000' }}
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleAsignThemesToTeams}
                                    disabled={loading}
                                    className="flex-1 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
                                    style={{ backgroundColor: '#5375E2' }}
                                >
                                    {loading ? 'Affectation...' : 'Confirmer'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Résultats de l'affectation</h2>
                            <div className="max-h-96 overflow-y-auto mb-6 space-y-4">
                                {results.map(({ theme, teams }, idx) => (
                                    <div key={idx} className="p-4 rounded-lg border border-gray-200">
                                        <h3 className="font-semibold mb-3" style={{ color: '#000000' }}>
                                            Thème: {theme.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {teams.map((team, tidx) => (
                                                <span
                                                    key={tidx}
                                                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                                    style={{ backgroundColor: '#5375E2' }}
                                                >
                                                    #{team.pseudo || team.nickName}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(0)}
                                    disabled={loading}
                                    className="flex-1 py-2 rounded-lg border border-gray-300 font-semibold transition-all hover:bg-gray-50"
                                    style={{ color: '#000000' }}
                                >
                                    Retour
                                </button>
                                <button
                                    onClick={handleApplyThemesToTeamsAssignements}
                                    disabled={loading}
                                    className="flex-1 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
                                    style={{ backgroundColor: '#5375E2' }}
                                >
                                    {loading ? 'Application...' : 'Appliquer l\'affectation'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </ModalPortal>

            {/* Step Button (in main card) */}
            {!open && step === 0 && chosenPromotion && !isPromotionAssignedThemes() && (
                <div className="mt-8 text-center">
                    <button
                        onClick={() => setOpen(true)}
                        disabled={loading}
                        className="px-8 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50"
                        style={{ backgroundColor: '#5375E2' }}
                    >
                        Affecter les thèmes
                    </button>
                </div>
            )}
        </div>
    )
}
export default AssignTeamsToThemes;