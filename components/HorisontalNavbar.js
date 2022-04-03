import Image from "next/image";
import Notification from "../icons/Notification";
import Profil from "../icons/Profil";

const HorisontalNavbar = ({FirstName='Houda' , LastName = 'Debza'}) => {
    return ( 
        <div className="fixed z-50">
            <div className="w-[100vw] relative text-[24px] font-xyz text-textcolor">
                <div className="absolute w-full border-t-white border-t-[60px] rounded-b-3xl border-r-[100px] border-r-transparent  border-l-[100px] border-l-transparent"></div>
                    <div className="absolute flex flex-row pt-8 h-full w-full items-center justify-center space-x-[700px]">
                    <div className="flex flex-row space-x-2">
                        <Profil/>
                        <div>{LastName}</div>
                        <div>{FirstName}</div>
                    </div>
                    <div className="flex flex-row space-x-8">
                        <Profil/>
                        <Notification/> 
                    </div>
                </div>
            </div>
        </div> 
    )
}
export default HorisontalNavbar;