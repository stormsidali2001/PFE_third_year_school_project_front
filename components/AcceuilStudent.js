import Link from "next/link";
import HorisontalNavbar from "./HorisontalNavbar";
import StudentVerticalNavbar from "./StudentVerticalNavbar";

const AcceuilStudent = props => {
    return (
        <div>
            <HorisontalNavbar />
            <StudentVerticalNavbar />
            <div className="fixed left-20 right-0 top-0 bottom-0 bg-gradient-to-br from-background via-background to-blue-50 font-roboto flex flex-col items-center justify-center pt-24">
                {/* Title - Centered on entire page */}
                <h1 className="text-5xl sm:text-6xl font-bold mb-20" style={{color: '#000000'}}>
                    Bienvenue
                </h1>

                {/* Content - Below title */}
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-12">
                        {/* Text Section */}
                        <div className="flex flex-col space-y-6 items-center justify-center text-center flex-1">
                            <p className="text-base sm:text-lg leading-relaxed" style={{color: '#000000'}}>
                                Nous sommes heureux de vous accueillir sur notre plateforme. Cette dernière est conçue pour faciliter votre collaboration en équipe et vous aider dans la gestion de vos projets.
                            </p>
                            <p className="text-base sm:text-lg leading-relaxed" style={{color: '#000000'}}>
                                Cliquez sur l'un des boutons ci-dessous pour commencer votre expérience.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href='/myteams'>
                                    <button className="px-8 py-3 bg-boutton text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
                                        Mon équipe
                                    </button>
                                </Link>
                                <Link href='/chat'>
                                    <button className="px-8 py-3 bg-boutton text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
                                        Chat
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="flex-1 flex justify-center">
                            <img 
                                src="AcceuilStudent.png" 
                                className="h-64 sm:h-80 lg:h-96 w-auto object-contain opacity-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AcceuilStudent;
