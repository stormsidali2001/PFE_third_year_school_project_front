import { useEffect } from "react"
import { useStoreActions, useStoreState } from "../../store/hooks"
import { useRouter } from "next/router"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar"
import { Calendar, Clock, BookOpen, Users, MapPin, User, ArrowLeft } from 'lucide-react'

const SoutenanceDetail = props => {
    const router = useRouter()
    const { soutenanceId } = router.query;

    const { getSoutenance } = useStoreActions(store => store.soutenanceModel)
    const { soutenance } = useStoreState(store => store.soutenanceModel)

    useEffect(async () => {
        if (!soutenanceId) return;
        await getSoutenance(soutenanceId)
    }, [soutenanceId])

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDuration = (milliseconds) => {
        if (!milliseconds) return 'N/A';
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    };

    if (!soutenance || Object.keys(soutenance).length === 0) {
        return (
            <div>
                <HorisontalNavbar />
                <AdminVerticalNavbar />
                <div className="min-h-screen pt-24 pb-12 font-roboto pl-20 flex items-center justify-center" style={{ backgroundColor: '#F4FCFF' }}>
                    <p style={{ color: '#000000' }}>Chargement...</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <HorisontalNavbar />
            <AdminVerticalNavbar />
            <div className="min-h-screen pt-24 pb-12 font-roboto pl-20" style={{ backgroundColor: '#F4FCFF' }}>
                <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="mb-8 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ color: '#5375E2' }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Retour</span>
                    </button>

                    {/* Title */}
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: '#000000' }}>
                            {soutenance?.title}
                        </h1>
                        <div className="h-1 w-24 rounded-full" style={{ backgroundColor: '#5375E2' }}></div>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Header Section */}
                        <div className="p-8 border-b border-gray-200" style={{ backgroundColor: '#FFFFFF' }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Team Info */}
                                <div className="flex items-start gap-3">
                                    <Users className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#5375E2' }} />
                                    <div>
                                        <p className="text-xs font-semibold" style={{ color: '#000000' }}>ÉQUIPE</p>
                                        <p className="text-lg font-semibold mt-1" style={{ color: '#000000' }}>
                                            #{soutenance?.team?.nickName}
                                        </p>
                                    </div>
                                </div>

                                {/* Theme Info */}
                                <div className="flex items-start gap-3">
                                    <BookOpen className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#5375E2' }} />
                                    <div>
                                        <p className="text-xs font-semibold" style={{ color: '#000000' }}>THÈME</p>
                                        <p className="text-lg font-semibold mt-1" style={{ color: '#000000' }}>
                                            {soutenance?.team?.givenTheme?.title || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="p-8 space-y-6">
                            {/* Date & Time */}
                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#5375E2' }} />
                                <div>
                                    <p className="text-xs font-semibold" style={{ color: '#000000' }}>DATE ET HEURE</p>
                                    <p className="text-sm mt-1" style={{ color: '#000000' }}>
                                        {formatDate(soutenance?.date)}
                                    </p>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#5375E2' }} />
                                <div>
                                    <p className="text-xs font-semibold" style={{ color: '#000000' }}>DURÉE</p>
                                    <p className="text-sm mt-1" style={{ color: '#000000' }}>
                                        {formatDuration(soutenance?.duration)}
                                    </p>
                                </div>
                            </div>

                            {/* Room */}
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: '#5375E2' }} />
                                <div>
                                    <p className="text-xs font-semibold" style={{ color: '#000000' }}>SALLE</p>
                                    <p className="text-sm mt-1" style={{ color: '#000000' }}>
                                        {soutenance?.salle?.name || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="p-4 rounded-lg border border-gray-200" style={{ backgroundColor: '#FAFAFA' }}>
                                <p className="text-xs font-semibold mb-2" style={{ color: '#000000' }}>DESCRIPTION</p>
                                <p className="text-sm leading-relaxed" style={{ color: '#000000' }}>
                                    {soutenance?.description}
                                </p>
                            </div>

                            {/* Jury Section */}
                            <div>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#000000' }}>
                                    <User className="w-5 h-5" style={{ color: '#5375E2' }} />
                                    Jury
                                </h3>
                                {soutenance?.jurys && soutenance.jurys.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {soutenance.jurys.map((jr, index) => {
                                            const teacher = jr.teacher;
                                            return (
                                                <div
                                                    key={index}
                                                    className="px-4 py-2 rounded-lg text-white font-medium transition-all hover:shadow-md"
                                                    style={{ backgroundColor: '#5375E2' }}
                                                >
                                                    {teacher?.firstName} {teacher?.lastName}
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <p style={{ color: '#999999' }}>Aucun jury assigné</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SoutenanceDetail;