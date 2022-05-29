import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import SuggestTheme from "../components/SuggestTheme";

const ProposerUnTheme = ({toastsRef}) => {
    return (
        <>
          
        <div className="h-screen bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8 relative">
            <img src="createsuggestion.webp" className="h-[550px] object-contain mix-blend-darken opacity-50"/> 
            <SuggestTheme toastsRef={toastsRef}/>
        </div>
        </>
    )
}
export default ProposerUnTheme;
