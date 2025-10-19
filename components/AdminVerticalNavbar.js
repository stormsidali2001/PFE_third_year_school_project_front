import Link from "next/link";
import { LayoutDashboard, Settings, FileText } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";

const AdminVerticalNavbar = props => {
    const router = useRouter();
    const [hoveredId, setHoveredId] = useState(null);

    const navItems = [
        { 
            id: 'dashboard', 
            icon: LayoutDashboard,
            label: 'Dashboard', 
            href: '/admindashboard' 
        },
        { 
            id: 'config', 
            icon: Settings,
            label: 'Configuration', 
            href: '/admin/config' 
        },
        { 
            id: 'wishlist', 
            icon: FileText,
            label: 'Fiches de vœux', 
            href: '/admin/wish-lists' 
        },
    ];

    const isActive = (href) => router.pathname === href;

    return (
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
    )
}

export default AdminVerticalNavbar;