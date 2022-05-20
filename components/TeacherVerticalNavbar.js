import Link from "next/link";
import Document from "../icons/Document";
import Menu from "../icons/Menu";
import TeamIcon from "../icons/TeamIcon";
import Theme from "../icons/Theme"

const TeacherVerticalNavbar = props => {
    return (
        <div className="fixed h-[70vh] left-0 z-50 top-[50%] -translate-y-1/2  drop-shadow-[8px_8px_8px_rgba(0,0,0,0.25)]  flex flex-col justify-center space-y-8 border-2 bg-white rounded-tr-[100px]  rounded-br-[100px] w-[60px]">
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Dashboard</div>
                <Link href="/teacherDashboard">
                    <button><Menu className='hover:cursor-pointer' /></button>
                </Link>
            </div>
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Theme</div>
                <Link href="/theme">
                    <button><Document className='hover:cursor-pointer'/></button>
                </Link>
            </div>
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Equipes</div>
                <Link href="/team">
                    <button><TeamIcon className='hover:cursor-pointer'/></button>
                </Link>
            </div>
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Document</div>
                <Link href="/">
                    <button><Theme className='hover:cursor-pointer'/></button>
                </Link>
            </div>
        </div>
    )
}
export default TeacherVerticalNavbar;