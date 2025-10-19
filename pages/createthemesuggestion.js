import HorisontalNavbar from "../components/HorisontalNavbar";
import TeacherVerticalNavbar from "../components/TeacherVerticalNavbar";
import SuggestTheme from "../components/SuggestTheme";

const ProposerUnTheme = ({toastsRef}) => {
    return (
        <div>
            <HorisontalNavbar />
            <TeacherVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 max-w-[calc(100vw-5rem)]">
                <div className="px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: '#1A2562'}}>
                            Suggérer un Thème
                        </h1>
                        <p className="text-lg mb-6" style={{color: '#000000'}}>
                            Partagez vos idées de thèmes pour les projets pluridisciplinaires
                        </p>
                        <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                    </div>

                    {/* Content */}
                    <div className="flex justify-center">
                        <SuggestTheme toastsRef={toastsRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProposerUnTheme;
