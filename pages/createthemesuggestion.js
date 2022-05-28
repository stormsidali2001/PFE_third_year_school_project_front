import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import SuggestTheme from "../components/SuggestTheme";

const ProposerUnTheme = ({toastsRef}) => {
    return (
        <>
          
            <div className="h-[200vh] bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8 ">
           
            <SuggestTheme toastsRef={toastsRef}/>

        </div>
        </>
    )
}
export default ProposerUnTheme;
