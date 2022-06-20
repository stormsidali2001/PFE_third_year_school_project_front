import Link from "next/link";
import { useState } from "react";
import Document from "../icons/Document";
import Menu from "../icons/Menu";
import TeamIcon from "../icons/TeamIcon";
import Theme from "../icons/Theme"
import ThemesIcon from "../icons/ThemesIcon";
import ModalPortal from "./ModalPortal";

const TeacherVerticalNavbar = props => {
    const [open,setOpen] = useState(false);
    return (
        <>
         <ModalPortal
                open={open}
                handleClose = {setOpen}
            >
                 <div className="flex flex-col text-textcolor space-y-4">
            <div className="text-semibold text-[20px]"> Suggestion de theme:</div>
            <div className="px-4">
                Vous voulez consulter la liste des themes ou bien vous voulez creer une nouvelle suggestion?
            </div>
            <div className="flex space-x-4 w-fit mx-auto">
                <div className="bg-blue-400 text-white px-2 py-1 rounded-[5px]  cursor-pointer hover:bg-blue-300"><Link href='/createthemesuggestion'>creer</Link></div>
                <div className="bg-blue-400 text-white px-2 py-1 rounded-[5px] cursor-pointer hover:bg-blue-300"><Link href='/suggestions'>naviguer</Link></div>
            </div>
        </div>

            </ModalPortal>
     
        <div className="fixed h-[70vh] left-0 z-50 top-[50%] -translate-y-1/2  drop-shadow-[8px_8px_8px_rgba(0,0,0,0.25)]  flex flex-col justify-center space-y-8 border-2 bg-white rounded-tr-[100px]  rounded-br-[100px] w-[60px]">
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Dashboard</div>
                <Link href="/teacherdashboard">
                    <button><Menu className='hover:cursor-pointer' /></button>
                </Link>
            </div>
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Suggestion themes</div>
               
                    <button onClick={()=>setOpen(o=>!o)}><Document className='hover:cursor-pointer'/></button>
               
            </div>
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Themes</div>
                <Link href="/themes">
                    <button><ThemesIcon className='hover:cursor-pointer w-[40px] h-[39px] text-textcolor'/></button>
                </Link>
            </div>
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Equipes</div>
                <Link href="/myteams">
                    <button><TeamIcon className='hover:cursor-pointer'/></button>
                </Link>
            </div> 
            <div className='relative cursor-pointer group'>
                <div className='absolute right-0 translate-x-[100%] top-0 text-textcolor bg-white rounded-80 font-semibold w-fit px-2 hidden group-hover:flex rounded-[10px] shadow-lg'>Commits</div>
                <Link href="/commits">
                    <button><Theme className='hover:cursor-pointer'/></button>
                </Link>
            </div>
          
           
        </div>
        </>
    )
}
export default TeacherVerticalNavbar;