import Document from "../icons/Document";
import Invitation from "../icons/Invitation";
import Menu from "../icons/Menu";
import MenuIcon from "../icons/MenuIcon";
import Student from "../icons/Student";
import Team from "../icons/Team";


//
const StudentVerticalNavbar = props => {
    return (
        <div className="fixed left-0 z-50 top-[50%] -translate-y-1/2 ">
            <div className="relative h-[80vh] ">
                <div className="absolute h-full border-l-white border-l-[60px] drop-shadow-[8px_8px_8px_rgba(0,0,0,0.25)] rounded-r-[500px]"></div>
                <div className="absolute space-y-10 my-32 px-2">
                    <Menu/>
                    <Team/>
                    <Student/>
                    <Document/>
                    <Invitation/>
                </div>
             </div>
        </div>
    )
}
export default StudentVerticalNavbar;