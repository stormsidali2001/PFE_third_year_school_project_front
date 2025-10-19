import  Link  from "next/link";

const Footer = props => {
    return(
        <footer className="w-full flex justify-center bg-gradient-to-r from-[#8FD4FB]/20 via-background to-[#8FD4FB]/20 py-8 font-roboto border-t border-gray-100">
            <div className="max-w-6xl w-full px-6 lg:px-16">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <img src='Resetpass.jpg' className='object-cover rounded-full h-10 w-10 ring-2 ring-boutton/20' alt="Project101 Logo"/>
                        <div className="text-base font-bold text-textcolor tracking-tight">
                            PROJECT101
                        </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                        <Link href="https://it-experts.vercel.app/">
                            <button className="text-sm text-textcolor hover:opacity-80 transition-opacity duration-200 flex items-center space-x-1">
                                <span>&copy; {new Date().getFullYear()} Tous les droits réservés à</span>
                                <span className="font-medium underline hover:no-underline">IT-Expert</span>
                            </button>
                        </Link>
                    </div>
                    
                    <div className="flex items-center text-sm text-textcolor">
                        <span className="hover:opacity-80 cursor-pointer transition-opacity">
                            ESI Sidi Bel-Abbès
                        </span>
                    </div>
                </div>
                
                <div className="mt-5 pt-5 border-t border-textcolor/10 text-center text-sm text-textcolor">
                    Développé avec passion par les étudiants de l'ESI-SBA
                </div>
            </div>
        </footer>
    )
}
export default Footer;