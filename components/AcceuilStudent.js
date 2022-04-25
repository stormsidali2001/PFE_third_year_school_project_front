import Link from 'next/link'
const AcceuilStudent = props => {
    return (
        <div className="flex flex-row lg:h-[100vh] items-center justify-center font-xyz text-textcolor p-[80px]">
            <div className="flex flex-col space-y-16 items-center justify-center">
                <div className="text-[40px]">Bonjours ,</div>
                <div className="text-[26px] px-6 text-center">Nous somme heureux de vous acceuil sur notre plateforme. On espère qu’elle vous serait utile dans le managment du votre projet,</div>
                <div className="text-[30px] px-16 text-center">Vous n’avez pas une équipe cliquer sur l’un de ces bouton qui va vous aider à créer ou joindre une.</div>
                <div className="flex flex-row space-x-10">
                    <button className="h-[40px] w-[120px] text-white bg-[#32AFF5] rounded-full"><Link href='/studentlist'>Inviter</Link ></button>
                    <button className="h-[40px] w-[120px] bg-[#8FD4FB] rounded-full"><Link  href='/teamInvitation'>Joindre</Link ></button>
                </div>
            </div>
            <img src="AcceuilStudent.png" className="mix-blend-darken object-contain"/>
        </div>
    )
}
export default AcceuilStudent;