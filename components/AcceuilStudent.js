import Link  from "next/link";

const AcceuilStudent = props => {
    return (
        <div className="flex lg:flex-row flex-col-reverse pt-[100px] pl-[100px] h-fit w-screen items-center justify-center font-xyz text-textcolor px-[80px]">
            <div className="flex flex-col space-y-10 items-center justify-center">
                <div className="text-[32px]">Bonjours ,</div>
                <div className="text-[20px] px-6 text-center">Nous somme heureux de vous acceuil sur notre plateforme. On espère qu’elle vous serait utile dans le managment du votre projet,</div>
                <div className="text-[22px] px-16 text-center">Cliquer sur l'un des boutons dessous et commencez votre expérience.</div>
                <div className="text-[18px] flex flex-row space-x-6">
                    <Link href='/announcementlist'>
                        <button className="bg-blue-200 rounded-full shadow-xl h-[35px] w-[150px] hover:bg-blue-300">Votre équipe</button>
                    </Link>
                    <Link href='/chat'>
                        <button className="bg-blue-300 rounded-full shadow-xl h-[35px] w-[150px] hover:bg-blue-200">Chat</button>
                    </Link>
                </div>
            </div>
            <img src="AcceuilStudent.png" className="mix-blend-darken object-contain"/>
        </div>
    )
}
export default AcceuilStudent;
