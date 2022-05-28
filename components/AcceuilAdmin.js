import Link from "next/link";


const AcceuilAdmin = props => {
    return (
        <div className="text-[#1A2562] bg-[#F8FDFF] pt-[100px] pl-[100px] font-xyz px-12 flex flex-col-reverse md:flex-row space-y-3 py-10 lg:h-[100vh] h-fit w-[100vw] items-center justify-center">
            <div className="flex flex-col space-y-8 px-12 items-center justify-center text-center">
                <div className="text-[28px] font-bold">Bonjour ,</div>
                <div className="text-[20px] font-semibold">Nous somme heureux de vous acceuil sur notre plateforme. On espère qu’elle vous serait utile dans le managment des projets pluridiciplinaires.</div>
                <div className="text-[22px] font-light">Rediregez vous vers le centre de contrôl pour manager les projets</div>
                <div className="text-[18px] flex flex-row space-x-6">
                    <Link href='/admin/config'><button className="bg-blue-200 rounded-full shadow-xl h-[35px] w-[250px] hover:bg-blue-300">Centre de control</button></Link>

                </div>
            </div>
            <img src="AceeuilAdmin.jpg" className="md:h-[500px] w-full object-contain mix-blend-darken"/>
        </div>
    )
}
export default AcceuilAdmin;