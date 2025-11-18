import { useEffect, useState } from "react";
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import ModalPortal from "../../components/ModalPortal";
import { useStoreActions, useStoreState } from "../../store/hooks";
import Select from 'react-select'
import { useRouter } from "next/router";
import { Send, AlertCircle, CheckCircle } from 'lucide-react';

const SendWishList = ({ toastsRef }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [chosenPromotion, setChoosenPromotion] = useState(null)
    const { getAllPromotionsThunk } = useStoreActions(store => store.promotionsModel)
    const { promotions } = useStoreState(store => store.promotionsModel)
    const { sendWishList } = useStoreActions(store => store.wishListModel)
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        await getAllPromotionsThunk();
    }, [])

    const handleSendWishList = async e => {
        e.preventDefault();
        if (!chosenPromotion) return;
        setLoading(true)
        try {
            await sendWishList({
                promotionId: chosenPromotion.value
            })
            toastsRef.current.addMessage({ text: "Fiche de vœux envoyée avec succès!", mode: 'Alert' })
            setOpen(false)
            setChoosenPromotion(null)
        } catch (err) {
            toastsRef.current.addMessage({ text: err.response?.data?.message || "Erreur lors de l'envoi", mode: 'Error' })
        } finally {
            setLoading(false)
        }
    }

    const isWishListSent = chosenPromotion && promotions?.find(el => el.id === chosenPromotion?.value)?.wishListSent;

    return (
        <div>
            <HorisontalNavbar />
            <AdminVerticalNavbar />
            <div className="min-h-screen pt-24 pb-12 font-roboto pl-20" style={{ backgroundColor: '#F4FCFF' }}>
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
                            Envoyer les Fiches de Vœux
                        </h1>
                        <p className="text-lg mb-6" style={{ color: '#000000' }}>
                            Envoyez les fiches de vœux à une promotion spécifique
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
                                    Une notification sera envoyée à toutes les équipes de la promotion sélectionnée pour les informer que les fiches de vœux sont disponibles.
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
                                onChange={(option) => {
                                    setChoosenPromotion(option);
                                }}
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

                        {/* Status Message */}
                        {chosenPromotion && (
                            <div className="mb-8 p-4 rounded-lg flex gap-4" style={{
                                backgroundColor: isWishListSent ? '#DBEAFE' : '#DCFCE7'
                            }}>
                                {isWishListSent ? (
                                    <>
                                        <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#1E40AF' }} />
                                        <div>
                                            <p className="font-semibold" style={{ color: '#1E40AF' }}>Déjà envoyé</p>
                                            <p className="text-sm mt-1" style={{ color: '#1E40AF' }}>
                                                Les fiches de vœux ont déjà été envoyées à cette promotion.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#15803D' }} />
                                        <div>
                                            <p className="font-semibold" style={{ color: '#15803D' }}>Prêt à envoyer</p>
                                            <p className="text-sm mt-1" style={{ color: '#15803D' }}>
                                                Cliquez sur "Envoyer" pour notifier les équipes de cette promotion.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Action Button */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setOpen(true)}
                                disabled={!chosenPromotion || isWishListSent}
                                className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                style={{ backgroundColor: '#5375E2' }}
                            >
                                <Send className="w-5 h-5" />
                                Envoyer les fiches de vœux
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <ModalPortal
                open={open}
                handleClose={setOpen}
            >
                <div className="w-full max-w-md p-6">
                    <h2 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Confirmer l'envoi</h2>
                    <p className="mb-6" style={{ color: '#000000' }}>
                        Êtes-vous certain de vouloir envoyer les fiches de vœux à la promotion <span className="font-semibold">{chosenPromotion?.label}</span> ?
                    </p>
                    <p className="text-sm mb-6 p-3 rounded-lg" style={{ color: '#992200', backgroundColor: '#FEE2E2' }}>
                        Une notification sera envoyée à toutes les équipes de cette promotion.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setOpen(false)}
                            disabled={loading}
                            className="flex-1 py-2 rounded-lg border border-gray-300 font-semibold transition-all hover:bg-gray-50 disabled:opacity-50"
                            style={{ color: '#000000' }}
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSendWishList}
                            disabled={loading}
                            className="flex-1 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{ backgroundColor: '#5375E2' }}
                        >
                            <Send className="w-4 h-4" />
                            {loading ? 'Envoi...' : 'Confirmer'}
                        </button>
                    </div>
                </div>
            </ModalPortal>
        </div>
    )
}
export default SendWishList;