import Link from "next/link";
import { LayoutDashboard, Lightbulb, BookOpen, Users, GitCommit } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";
import ModalPortal from "./ModalPortal";

const TeacherVerticalNavbar = props => {
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState(null);
    const [open, setOpen] = useState(false);

    const navItems = [
        { 
            id: 'dashboard', 
            icon: LayoutDashboard,
            label: 'Dashboard', 
            href: '/teacherdashboard' 
        },
        { 
            id: 'suggestions', 
            icon: Lightbulb,
            label: 'Suggestion thèmes', 
            href: null,
            onClick: () => setOpen(o => !o)
        },
        { 
            id: 'themes', 
            icon: BookOpen,
            label: 'Thèmes', 
            href: '/themes' 
        },
        { 
            id: 'teams', 
            icon: Users,
            label: 'Équipes', 
            href: '/myteams' 
        },
        { 
            id: 'commits', 
            icon: GitCommit,
            label: 'Commits', 
            href: '/commits' 
        },
    ];

    const isActive = (href) => href && router.pathname === href;

    return (
        <>
            <ModalPortal
                open={open}
                handleClose={setOpen}
            >
                <div className="flex flex-col text-textcolor space-y-6 p-8 w-full max-w-md">
                    <div>
                        <h2 className="text-2xl font-bold" style={{color: '#1A2562'}}>Suggestion de thème</h2>
                        <div className="h-1 w-12 bg-boutton rounded-full mt-2"></div>
                    </div>
                    <div className="text-base leading-relaxed" style={{color: '#1A2562'}}>
                        Vous voulez consulter la liste des thèmes ou bien vous voulez créer une nouvelle suggestion?
                    </div>
                    <div className="flex gap-3 pt-4">
                        <Link href='/createthemesuggestion'>
                            <button className="flex-1 py-3 px-6 bg-boutton text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95" style={{backgroundColor: '#5375E2'}}>
                                Créer
                            </button>
                        </Link>
                        <Link href='/suggestions'>
                            <button className="flex-1 py-3 px-6 border-2 font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95" style={{borderColor: '#5375E2', color: '#5375E2'}}>
                                Naviguer
                            </button>
                        </Link>
                    </div>
                </div>
            </ModalPortal>

            <div className="fixed left-0 top-0 h-screen w-20 bg-white shadow-sm z-30">
                {/* Main content area */}
                <div className="h-full flex flex-col items-center justify-center gap-8">
                    
                    {/* Nav Items */}
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item) => {
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
                                            onClick={item.onClick}
                                            className='w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95'
                                            style={{
                                                backgroundColor: 'white',
                                                color: '#1A2562'
                                            }}
                                        >
                                            <IconComponent className='w-6 h-6' strokeWidth={1.5} />
                                        </button>
                                    )}
                                    
                                    {/* Animated Tooltip */}
                                    {hoveredId === item.id && !active && (
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

export default TeacherVerticalNavbar;