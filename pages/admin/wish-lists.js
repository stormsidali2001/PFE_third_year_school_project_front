import Avatar from "../../components/Avatar"
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import { useEffect, useState } from "react"
import Select from "react-select"
import { useStoreState, useStoreActions } from "../../store/hooks"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'

const WishLists = ({ toastsRef }) => {
    const router = useRouter()
    const { promotion } = router.query;

    const { promotions } = useStoreState(store => store.promotionsModel)
    const { getAllPromotionsThunk } = useStoreActions(store => store.promotionsModel)
    const [choosenPromotion, setChoosenPromotion] = useState(null)
    const { getWishLists } = useStoreActions(store => store.wishListModel)
    const { wishes } = useStoreState(store => store.wishListModel)

    const handleChange = async option => {
        router.push(`/admin/wish-lists?promotion=${option.value}`)
    }

    useEffect(async () => {
        if (promotions?.length === 0) await getAllPromotionsThunk()

        if (!promotion || promotion?.length === 0) {
            promotions?.length > 0 && await getWishLists({})
            return;
        }
        const label = promotions.find(el => el.id === promotion)?.name
        if (!label) {
            return;
        }

        setChoosenPromotion({ value: promotion, label })
        await getWishLists({ promotionId: promotion })

    }, [promotion, promotions])

    return (
        <div>
            <HorisontalNavbar />
            <AdminVerticalNavbar />
            <div className="min-h-screen pt-24 pb-12 font-roboto pl-20" style={{ backgroundColor: '#F4FCFF' }}>
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3" style={{ color: '#000000' }}>Listes de Vœux</h1>
                        <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#5375E2' }}></div>
                    </div>

                    {/* Filter Section */}
                    <div className="mb-12">
                        <label className="block text-sm font-semibold mb-3" style={{ color: '#000000' }}>Sélectionner une promotion</label>
                        <div className="w-full md:w-64">
                            <Select
                                placeholder="Choisir une promotion..."
                                onChange={(option) => { handleChange(option) }}
                                options={promotions.map(el => { return { value: el.id, label: el.name } })}
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

                    {/* Wishes Grid */}
                    {wishes && wishes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wishes.map((team, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all">
                                    {/* Team Header */}
                                    <div className="mb-6 pb-4 border-b border-gray-200">
                                        <Link href={`/teams/${team?.id}`}>
                                            <a className="flex items-center gap-2 hover:text-blue-600 transition-colors group">
                                                <h3 className="text-lg font-bold" style={{ color: '#000000' }}>
                                                    #{team?.nickName}
                                                </h3>
                                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                            </a>
                                        </Link>
                                    </div>

                                    {/* Wishes List */}
                                    {team?.wishes && team.wishes.length > 0 ? (
                                        <div className="space-y-3">
                                            <p className="text-xs font-semibold" style={{ color: '#000000' }}>PRÉFÉRENCES</p>
                                            {team?.wishes?.map((wish, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                                        style={{ backgroundColor: '#5375E2' }}
                                                    >
                                                        {wish?.order + 1}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium break-words" style={{ color: '#000000' }}>
                                                            {wish?.theme?.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <Heart className="w-8 h-8 mx-auto mb-2" style={{ color: '#999999' }} />
                                            <p className="text-sm" style={{ color: '#999999' }}>Aucun vœu enregistré</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                            <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: '#5375E2' }} />
                            <h3 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>Aucune liste de vœux</h3>
                            <p style={{ color: '#000000' }}>Sélectionnez une promotion pour voir les listes de vœux des équipes.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default WishLists