import { Link } from "react-scroll/modules";

const Footer = props => {
    return(
        <div className="h-fit w-[100vw] bg-[#8FD4FB]/70 flex md:flex-row flex-col lg:space-x-64 md:space-x-16 md:space-y-0 space-y-16 md:items-start md:justify-center justify-start pl-6 py-6 font-xyz text-textcolor font-light text-[20px]">
            <div className="flex md:flex-row flex-col md:space-x-10">
                <a>BP 73, Bureau de poste EL WIAM <br/> Sidi Bel Abbés 22016, Algérie</a>
                <div className="flex flex-col">
                    <Link><a>+213-48-74-94-52</a></Link>
                    <Link><a>contact@esi-sba.dz</a></Link>
                </div>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-10">
                <div className="flex flex-col">
                    <Link to='home' spy={true} smooth={true}><a className="cursor-pointer">Home</a></Link>
                    <Link to='service' spy={true} smooth={true}><a className="cursor-pointer">Services</a></Link>
                </div>
                <div className="flex flex-col">
                    <Link to='what' spy={true} smooth={true}><a className="cursor-pointer">Quesque project101</a></Link>
                    <Link to='why' spy={true} smooth={true}><a className="cursor-pointer">Pourquoi utiliser project101</a></Link>
                </div>
            </div>
        </div>
    )
}
export default Footer;