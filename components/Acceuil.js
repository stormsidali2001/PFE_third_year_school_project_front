import { Link } from "react-scroll/modules";
import Login from "../pages/login";

const Acceuil = props => {
    return(
        <div className="h-fit pt-32 pb-12 lg:h-screen w-[100vw] bg-background flex flex-col items-center justify-center gap-16 font-xyz" id="home">
            <div className="lg:text-[48px] text-[38px] font-bold tracking-wider text-center text-textcolor">Mieux organiser vos projets</div>
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center h-full gap-12 px-10">
                <div className="flex flex-col space-y-16 items-center justify-center">
                    <div className="text-[25px] text-textcolor text-center font-bold">Créer votre équipe de projet, communiquer avec vos encadreur,  assurer la communication dans l’équipe et bien autre ...</div>
                    <div className="flex flex-row space-x-8 text-[20px]">
                       <Link to='what'spy={true} smooth={true}><a className="bg-[#8FD4FB] h-[40px] w-[120px] flex items-center justify-center hover:bg-[#32AFF5] text-textcolor rounded-full">Lire plus</a></Link>
                       <a href = "../login" className="bg-[#32AFF5] h-[40px] w-[140px] hover:bg-[#8FD4FB] hover:text-textcolor text-white rounded-full flex items-center justify-center">Login</a>
                    </div>
                </div>
                <img src='Acceuil.jpg' className="w-[710px] object-contain mix-blend-darken"/>
            </div>
        </div>
    )
}
export default Acceuil;