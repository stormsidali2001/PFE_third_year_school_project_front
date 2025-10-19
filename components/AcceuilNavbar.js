
import { useState } from "react";
import { Link as scrollLink } from "react-scroll/modules";
import MenuIcon from "../icons/MenuIcon";
import Login from "../pages/login";
import Link  from 'next/link'



const Navbar = ({open,setOpen}) => {
    return (
        
        <div className="w-full h-fit py-4 flex items-center justify-center font-roboto fixed z-50 top-0">
            <div className="lg:w-[55vw] lg:min-w-[800px] md:w-[80vw] h-[60px] shadow-md bg-white/90 rounded-xl md:flex flex-row px-6 backdrop-blur-md justify-between items-center hidden border border-gray-100/50">
                <div className="flex flex-row space-x-2 items-center justify-start">
                    <div className="relative">
                        <img src='Resetpass.jpg' className='object-cover rounded-full h-10 w-10 ring-2 ring-boutton/20'/>
                    </div>
                    <div className="text-lg font-bold text-textcolor tracking-tight">PROJECT101</div>
                </div>
                <div className="flex flex-row space-x-2 text-textcolor text-sm font-medium items-center">
                   <scrollLink to="service" spy={true} smooth={true}>
                       <button className="hover:bg-[#8FD4FB]/20 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200">
                           Services
                       </button>
                   </scrollLink>
                    <a href="../login">
                        <button className="bg-boutton text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-[#32AFF5] transition-all duration-200 shadow-sm hover:shadow-md">
                            Login
                        </button>
                    </a>
                </div>
            </div>
            <div className="flex md:hidden w-[90vw] shadow-md bg-white/90 rounded-xl backdrop-blur-md h-[60px] px-4 flex-row items-center relative border border-gray-100/50">
                <MenuIcon className='h-7 w-7 cursor-pointer text-textcolor' onClick={()=>setOpen(!open)}/>
                <div className="flex flex-row space-x-2 items-center justify-center flex-1">
                    <img src='Resetpass.jpg' className='object-cover rounded-full h-10 w-10 ring-2 ring-boutton/20'/>
                    <div className="text-base font-bold text-textcolor tracking-tight">PROJECT101</div>
                </div>
                <div className={`flex-col bg-white/95 h-fit py-5 w-[220px] items-start justify-center backdrop-blur-md space-y-1 left-0 absolute text-textcolor text-sm font-medium top-[60px] rounded-b-xl shadow-xl px-3 border border-gray-100 ${open===true ?'flex':'hidden'}`}>
                    <scrollLink to='what' spy={true} smooth={true}>
                        <button className="hover:bg-[#8FD4FB]/20 py-2 px-3 w-full text-left rounded-lg cursor-pointer transition-all duration-200" onClick={()=>setOpen(false)}>
                            Qu'est-ce que Project101
                        </button>
                    </scrollLink>
                    <scrollLink to='whyuse' spy={true} smooth={true}>
                        <button className="hover:bg-[#8FD4FB]/20 py-2 px-3 w-full text-left rounded-lg cursor-pointer transition-all duration-200" onClick={()=>setOpen(false)}>
                            Pourquoi l'utiliser
                        </button>
                    </scrollLink>
                    <scrollLink to='service' spy={true} smooth={true}>
                        <button className="hover:bg-[#8FD4FB]/20 py-2 px-3 w-full text-left rounded-lg cursor-pointer transition-all duration-200" onClick={()=>setOpen(false)}>
                            Services
                        </button>
                    </scrollLink>
                    <Link href="/login">
                        <button className="bg-boutton text-white py-2 px-3 w-full text-left rounded-lg cursor-pointer hover:bg-[#32AFF5] transition-all duration-200 mt-1">
                            Se connecter
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar;