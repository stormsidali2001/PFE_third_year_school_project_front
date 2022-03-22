import Link from "next/link";
import { useState } from "react";
import MenuIcon from "../icons/MenuIcon";
import Login from "../pages/login";



const Navbar = ({open,setOpen}) => {
    return (
        <div className="w-[100vw] h-fit py-8 flex items-center justify-center font-xyz fixed z-50">
            <div className="lg:w-[55vw] lg:min-w-[800px]  md:w-[80vw] h-[60px] shadow-md bg-white/80 rounded-md md:flex flex-row px-6 backdrop-blur-sm justify-center lg:space-x-72 md:space-x-32 hidden">
                <div className="flex flex-row space-x-2 items-center justify-start">
                    <img src = 'Resetpass.jpg' className='object-contain rounded-full h-[50px] w-[50px]'/>
                    <div className="text-[20px] font-bold text-textcolor">PROJECT101</div>
                </div>
                <div className="flex-row flex space-x-6 text-textcolor font-semibold items-center">
                    <a className="hover:bg-blue-100 h-[60%] px-2 w-full flex items-center justify-center rounded-full">Services</a>
                    <a className="hover:bg-blue-100 h-[60%] px-2 w-full flex items-center justify-center rounded-full">Contact</a>
                    <a className="hover:bg-blue-100 h-[60%] px-2 w-full flex items-center justify-center rounded-full flex-nowrap" href = "../login">Login</a>
                </div>
            </div>
            <div className="flex md:hidden w-[90vw] shadow-md bg-white/80 rounded-md backdrop-blur-sm h-[60px] px-6 flex-row space-x-6 items-center relative">
                <MenuIcon className='h-[40px] w-[40px]' onClick={()=>setOpen(!open)}/>
                <div className="flex flex-row space-x-4 items-center justify-start">
                    <img src = 'Resetpass.jpg' className='object-contain rounded-full h-[50px] w-[50px]'/>
                    <div className="text-[20px] font-bold text-textcolor">PROJECT101</div>
                    <div className= {`flex-col bg-white/90 h-fit py-6 w-[200px] items-start justify-center backdrop-blur-sm space-y-4 left-0 absolute text-textcolor font-semibold top-[60px] rounded-b-xl shadow-lg pl-2 ${open===true ?'flex':'hidden'}`}>
                        <a className="hover:bg-blue-100 h-full w-full">Quesque project101</a>
                        <a className="hover:bg-blue-100 h-full w-full">Pourquoi l'utiliser</a>
                        <a className="hover:bg-blue-100 h-full w-full">Services</a>
                        <a className="hover:bg-blue-100 h-full w-full">Contact</a>
                        <a className="hover:bg-blue-100 h-full w-full" href = "../login">Se connecter</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;