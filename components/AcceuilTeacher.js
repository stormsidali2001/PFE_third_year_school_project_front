import Link from "next/link";
import TeacherVerticalNavbar from "./TeacherVerticalNavbar";

const AcceuilTeacher = ({possedeEquipe , validationEquipes}) => {
    return (
        <div className="pl-[100px] pt-[100px] text-[#1A2562] font-xyz px-12 flex flex-col-reverse md:flex-row space-y-3 py-10 h-fit w-[100vw] items-center justify-center">
            <div className="flex flex-col space-y-8 items-center justify-center text-center">
                <div className="text-[26px] font-bold">Bonjour ,</div>
                <div className="text-[22px] font-semibold">Nous somme heureux de vous acceuil sur notre plateforme. On espère qul'elle vous aiderait a communiquer avec les équipes que vous encadrez et qu'elle vous faciliterait ce dernier.</div>
                <div className="text-[22px] font-light">Cliquer sur l'un des boutons dessous et commencez votre expérience.</div>
                <div className="text-[18px] flex flex-row space-x-6">
                    <Link href='/myteams'><button className="bg-blue-200 rounded-full shadow-xl h-[35px] w-[150px] hover:bg-blue-300">Vos équipes</button></Link>
                    <Link href='/chat'><button className="bg-blue-300 rounded-full shadow-xl h-[35px] w-[150px] hover:bg-blue-200">Chat</button></Link>
                </div>
            </div>
            <img src="AcceuilTeacher.jpg" className="md:h-[400px] w-full  object-contain mix-blend-darken"/>
        </div>
    )
}
export default AcceuilTeacher;