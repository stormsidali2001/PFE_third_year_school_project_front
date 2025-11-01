import Link from 'next/link'
import { useStoreActions, useStoreState } from "../store/hooks";
import { useRouter } from "next/router";
import { useState } from 'react'
import ModalPortal from "./ModalPortal";
import { Home, MessageSquare, FileText, Users, Inbox, Share2, BookMarked } from 'lucide-react';

const StudentVerticalNavbar = () => {
    const router = useRouter()
    const user = useStoreState(store=>store.user)
    const {student,userType} = user;
    const [hoveredId, setHoveredId] = useState(null);
    const [announcementChoiceOpen, setAnnouncementChoiceOpen] = useState(false)
    const [surveyChoiceOpen, setSurveyChoiceOpen] = useState(false)

    const hasTeam = student?.team;
    const isTeamLeader = hasTeam && (user.student?.team?.teamLeader?.id === user.student?.id);
    const wishListSent = user?.student?.promotion?.wishListSent
    const allTeamsValidated = user?.student?.promotion?.allTeamsValidated

    const navItems = [
        { 
            id: 'dashboard', 
            icon: Home,
            label: 'Dashboard', 
            href: '/studentdashboard',
            show: true
        },
        { 
            id: 'announcements', 
            icon: MessageSquare,
            label: 'Announcements', 
            href: null,
            show: hasTeam,
            action: (e) => {
                e.preventDefault();
                if(isTeamLeader){
                    setAnnouncementChoiceOpen(!announcementChoiceOpen);
                    setSurveyChoiceOpen(false)
                } else {
                    router.push("/announcementlist");
                }
            }
        },
        { 
            id: 'surveys', 
            icon: FileText,
            label: 'Surveys', 
            href: null,
            show: hasTeam,
            action: (e) => {
                e.preventDefault();
                if(isTeamLeader){
                    setSurveyChoiceOpen(!surveyChoiceOpen);
                    setAnnouncementChoiceOpen(false)
                } else {
                    router.push("/surveys");
                }
            }
        },
        { 
            id: 'documents', 
            icon: BookMarked,
            label: 'Documents', 
            href: '/teamdocs',
            show: hasTeam
        },
        { 
            id: 'chat', 
            icon: MessageSquare,
            label: 'Chat', 
            href: '/chat',
            show: hasTeam
        },
        { 
            id: 'invites', 
            icon: Inbox,
            label: 'Invitations', 
            href: '/teamInvitation',
            show: !hasTeam
        },
        { 
            id: 'inviter', 
            icon: Users,
            label: 'Inviter', 
            href: '/studentlist',
            show: (!hasTeam || isTeamLeader) && !allTeamsValidated
        },
        { 
            id: 'wishlist', 
            icon: Share2,
            label: 'Fiche de vœux', 
            href: '/fichevoeux',
            show: hasTeam && isTeamLeader && wishListSent
        },
    ];

    const isActive = (href) => href && router.pathname === href;
    const visibleItems = navItems.filter(item => item.show);

    return (
        <>
            <ModalPortal
                open={announcementChoiceOpen}
                handleClose={() => setAnnouncementChoiceOpen(false)}
            >
                <div className="w-full max-w-md p-6">
                    <h2 className="text-2xl font-bold mb-4" style={{color: '#1A2562'}}>Announcements</h2>
                    <p className="mb-6" style={{color: '#000000'}}>Voulez-vous consulter la liste des annonces ou créer une nouvelle ?</p>
                    <div className="flex gap-3">
                        <Link href='/addannouncement' className="flex-1">
                            <button className="w-full py-2 px-4 bg-boutton text-white rounded-lg font-medium hover:bg-blue-600 transition-all">
                                Créer
                            </button>
                        </Link>
                        <Link href='/announcementlist' className="flex-1">
                            <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all">
                                Consulter
                            </button>
                        </Link>
                    </div>
                </div>
            </ModalPortal>

            <ModalPortal
                open={surveyChoiceOpen}
                handleClose={() => setSurveyChoiceOpen(false)}
            >
                <div className="w-full max-w-md p-6">
                    <h2 className="text-2xl font-bold mb-4" style={{color: '#1A2562'}}>Sondages</h2>
                    <p className="mb-6" style={{color: '#000000'}}>Voulez-vous consulter la liste des sondages ou créer un nouveau ?</p>
                    <div className="flex gap-3">
                        <Link href='/createsurvey' className="flex-1">
                            <button className="w-full py-2 px-4 bg-boutton text-white rounded-lg font-medium hover:bg-blue-600 transition-all">
                                Créer
                            </button>
                        </Link>
                        <Link href='/surveys' className="flex-1">
                            <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all">
                                Consulter
                            </button>
                        </Link>
                    </div>
                </div>
            </ModalPortal>

            <div className="fixed left-0 top-0 h-screen w-20 bg-white shadow-sm z-30">
                <div className="h-full flex flex-col items-center justify-center gap-8">
                    <nav className="flex flex-col gap-4">
                        {visibleItems.map((item) => {
                            const active = isActive(item.href);
                            const IconComponent = item.icon;
                            
                            return (
                                <div 
                                    key={item.id}
                                    className="relative"
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {item.href ? (
                                        <Link href={item.href}>
                                            <button 
                                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
                                                    active 
                                                        ? 'text-white shadow-lg scale-110' 
                                                        : ''
                                                }`}
                                                style={{
                                                    backgroundColor: active ? '#5375E2' : 'white',
                                                    color: active ? 'white' : '#1A2562'
                                                }}
                                            >
                                                <IconComponent className='w-6 h-6' strokeWidth={1.5} />
                                            </button>
                                        </Link>
                                    ) : (
                                        <button 
                                            onClick={item.action}
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95`}
                                            style={{
                                                backgroundColor: 'white',
                                                color: '#1A2562'
                                            }}
                                        >
                                            <IconComponent className='w-6 h-6' strokeWidth={1.5} />
                                        </button>
                                    )}
                                    
                                    {hoveredId === item.id && (
                                        <div className="absolute left-16 top-1/2 -translate-y-1/2 text-white px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none shadow-lg" style={{backgroundColor: '#1A2562'}}>
                                            {item.label}
                                            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rotate-45" style={{backgroundColor: '#1A2562'}}></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </>
    )
}

export default StudentVerticalNavbar;