import Invitation from "../icons/Invitation";
import Menu from "../icons/Menu";
import Student from "../icons/Student";
import Team from "../icons/Team";
import Theme from "../icons/Theme";
import Link from 'next/link'
import { ScrollLink } from "react-scroll/modules";


const StudentVerticalNavbar = ({possedeEquipe , debutProjet}) => {
  return (
    <div className="fixed left-0 z-50 top-[50%] -translate-y-1/2 ">
        <div className="relative h-[80vh] ">
            <div className="absolute h-full border-l-white border-l-[60px] drop-shadow-[8px_8px_8px_rgba(0,0,0,0.25)] rounded-r-[500px]"/>
            {possedeEquipe === true ? 
            (debutProjet === true ?
            <div>
                <Link href="/login">
                    <button> <Team className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/login">
                    <button><Student className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/login">
                    <button><Theme className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/login">
                   <button> <Invitation className='hover:cursor-pointer' /></button>
                </Link>
            </div>
            :
            <div>
                <Link href="/login">
                    <button> <Team className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/login">
                    <button><Student className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/login">
                    <button><Theme className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/login">
                   <button> <Invitation className='hover:cursor-pointer' /></button>
                </Link>
            </div>
            )
             : 
            <div className="absolute space-y-10 my-32 px-2">
                <Link href="/listEquipe">
                    <button> <Team className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/studentlist">
                    <button><Student className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/themes">
                    <button><Theme className='hover:cursor-pointer' /></button>
                </Link>
                <Link href="/teamInvitation">
                   <button> <Invitation className='hover:cursor-pointer' /></button>
                </Link>
            </div>}
         </div>
    </div>
  )
}
export default StudentVerticalNavbar;