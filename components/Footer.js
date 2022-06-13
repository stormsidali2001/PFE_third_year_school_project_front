import  Link  from "next/link";

const Footer = props => {
    return(
        <div className="w-[100vw] flex justify-center pb-3">
            <div className="h-fit  text-center w-[100%] pb-2 flex flex-row space-x-[30%]  bg-[#8FD4FB]/50 pl-6 py-1 justify-center font-mono font-thin text-black  text-[18px]">
            
            <Link href="https://it-experts.vercel.app/">
            <button className="text-[16px] flex flex-row space-x-1">
                <div>&copy; Tous les droits réservé à</div>
                <div className="underline hover:text-blue-600">IT-Expert 2022</div>
            </button>
            </Link>
        </div>
        </div>
    )
}
export default Footer;