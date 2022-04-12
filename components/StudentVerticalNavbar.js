import Document from "../icons/Document";
import Invitation from "../icons/Invitation";
import Menu from "../icons/Menu";
import MenuIcon from "../icons/MenuIcon";
import Student from "../icons/Student";
import Team from "../icons/Team";

const StudentVerticalNavbar = props => {
    return (
        <div className="fixed left-0 z-50  ">
            <div className="relative h-[100vh] ">
                <div className="absolute h-full border-l-white border-l-[60px] rounded-b-3xl border-t-[100px] border-t-transparent border-b-[100px] border-b-transparent"></div>
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