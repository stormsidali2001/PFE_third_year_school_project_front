import Link from "next/link";
import { useEffect, useState } from "react";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
import {useStoreActions,useStoreState} from '../../store/hooks'
import { Clock, ChevronRight, Plus } from 'lucide-react';

const AfficherTousLesSondages = props => {
    const {getSurveysThunk} = useStoreActions(store=>store.surveysModel)
    const {surveys} = useStoreState(store=>store.surveysModel)
    
    useEffect(async()=>{
        await getSurveysThunk();
    },[])
    
    const formatTime = (ms) => {
        if (ms <= 0) return "Fermé";
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) return `${days}j ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    };

    return(
        <div>
            <HorisontalNavbar />
            <StudentVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto">
                <div className="ml-16 px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: '#1A2562'}}>
                            Sondages
                        </h1>
                        <p className="text-lg mb-6" style={{color: '#000000'}}>
                            Participez aux sondages de votre équipe
                        </p>
                        <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                    </div>

                    {/* Surveys Table */}
                    {surveys.length > 0 ? (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr style={{backgroundColor: 'white', borderBottom: '2px solid #5375E2'}}>
                                            <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: '#1A2562'}}>Titre</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: '#1A2562'}}>Description</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: '#1A2562'}}>Statut</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: '#1A2562'}}>Temps restant</th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold" style={{color: '#1A2562'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {surveys.map((el, index) => {
                                            const tempsRestant = new Date(el.createdAt).getTime() + (el.period * 24 * 60 * 60 * 1000) - Date.now();
                                            const isClosed = tempsRestant <= 0;
                                            const formattedTime = formatTime(tempsRestant);

                                            return (
                                                <tr 
                                                    key={index}
                                                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-4 font-medium" style={{color: '#1A2562'}}>
                                                        {el.title}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm truncate max-w-xs" style={{color: '#000000'}}>
                                                        {el.description}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isClosed ? 'bg-gray-200 text-gray-700' : 'bg-green-100 text-green-700'}`}>
                                                            {isClosed ? 'Fermé' : 'Ouvert'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm" style={{color: '#000000'}}>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4" style={{color: '#5375E2'}} />
                                                            {isClosed ? 'Expiré' : formattedTime}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <Link href={`surveys/${el.id}`}>
                                                            <a className="px-4 py-2 bg-boutton text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all inline-flex items-center gap-2">
                                                                Voir plus
                                                                <ChevronRight className="w-4 h-4" />
                                                            </a>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-16 text-center">
                            <div className="mb-4">
                                <div className="text-7xl mb-6">📭</div>
                            </div>
                            <h2 className="text-2xl font-bold mb-3" style={{color: '#1A2562'}}>
                                Aucun sondage disponible
                            </h2>
                            <p className="text-base mb-6" style={{color: '#000000'}}>
                                Les sondages créés par votre équipe apparaîtront ici.
                            </p>
                            <Link href="/createsurvey">
                                <a className="inline-flex items-center gap-2 px-6 py-3 bg-boutton text-white rounded-lg font-medium hover:bg-blue-600 transition-all">
                                    <Plus className="w-5 h-5" />
                                    Créer un sondage
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AfficherTousLesSondages;