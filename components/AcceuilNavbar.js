import MenuIcon from "../icons/MenuIcon";

const Navbar = props => {
    return (
        <div className="w-[100vw] h-fit py-8 flex items-center justify-center font-xyz fixed">
            <div className="lg:w-[55vw] lg:min-w-[800px]  md:w-[80vw] h-[60px] bg-white/80 rounded-md md:flex flex-row px-6 backdrop-blur-sm justify-center lg:space-x-48 md:space-x-32 hidden">
                <div className="flex flex-row space-x-2 items-center justify-start">
                    <img src = 'Resetpass.jpg' className='object-contain rounded-full h-[50px] w-[50px]'/>
                    <div className="text-[20px] font-bold text-textcolor">PROJECT101</div>
                </div>
                <div className="flex-row flex space-x-4 text-textcolor font-semibold items-center">
                    <div>Sercices</div>
                    <div>Contact</div>
                    <div>Se connecter</div>
                </div>
            </div>
            <div className="flex md:hidden w-[90vw] bg-white/80 rounded-md backdrop-blur-sm h-[60px] px-6 flex-row space-x-6 items-center">
                <MenuIcon className='h-[40px] w-[40px]'/>
                <div className="flex flex-row space-x-4 items-center justify-start">
                    <img src = 'Resetpass.jpg' className='object-contain rounded-full h-[50px] w-[50px]'/>
                    <div className="text-[20px] font-bold text-textcolor">PROJECT101</div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;