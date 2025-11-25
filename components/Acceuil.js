import { Link } from "react-scroll/modules";
import Login from "../pages/login";

const Acceuil = props => {
    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-blue-50 flex items-center justify-center px-6 lg:px-16 pt-24 pb-16 font-roboto" id="home">
            <div className="max-w-6xl w-full">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
                    <div className="flex-1 flex flex-col items-center lg:items-start space-y-6 max-w-xl">
                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center lg:text-left" style={{ color: '#000000' }}>
                                Mieux organiser vos projets
                            </h1>
                            <div className="h-0.5 w-16 bg-boutton rounded-full lg:mx-0 mx-auto"></div>
                        </div>
                        
                        <p className="text-base text-center lg:text-left leading-relaxed" style={{ color: '#000000' }}>
                            Créer votre équipe de projet, communiquer avec vos encadreur, assurer la communication dans l'équipe et bien autre ...
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
                            <Link to='what' spy={true} smooth={true}>
                                <button className="px-6 py-3 bg-white border-2 border-boutton text-boutton rounded-lg font-medium text-sm hover:bg-boutton hover:text-white transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 w-full sm:w-auto">
                                    Lire plus
                                </button>
                            </Link>
                            <a href="../login">
                                <button className="px-6 py-3 bg-boutton text-white rounded-lg font-medium text-sm hover:bg-[#32AFF5] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 w-full sm:w-auto">
                                    Login
                                </button>
                            </a>
                        </div>
                    </div>
                    
                    <div className="flex-1 max-w-lg">
                        <div className="relative">
                            <div className="absolute inset-0 bg-boutton/10 rounded-3xl blur-3xl"></div>
                            <img 
                                src='Acceuil.jpg' 
                                className="relative w-full h-auto object-contain mix-blend-darken" 
                                alt="Project Management"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Acceuil;