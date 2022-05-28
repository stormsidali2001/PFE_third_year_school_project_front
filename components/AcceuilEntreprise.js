import StudentVerticalNavbar from "./StudentVerticalNavbar";

const AcceuilEntreprise = props => {
    return (
        <div className="text-[#1A2562] pt-[100px] pl-[100px] bg-[#F8FDFF] font-xyz px-12 flex flex-col-reverse lg:flex-row space-y-3 py-10 lg:h-screen h-fit w-[100vw] items-center justify-center">
            <div className="flex flex-col space-y-8 px-12 items-center justify-center text-center">
                <div className="text-[28px] font-bold">Bonjour ,</div>
                <div className="text-[20px] font-semibold">Nous somme heureux de vous acceuil sur notre plateforme. On espère qul'elle vous aiderait à réaliser des projets que vous aviez toujour eu envie de réaliser et à faire connaissance avec des etudiants ambicieux et des enseignts professionnels.</div>
                <div className="text-[22px] font-light">Accédez a la listes des thèmes proposés , puis proposez un !</div>
                <div className="flex flex-row space-x-10 text-[18px] font-extralight">
                    <button className="h-[40px] w-[180px] text-white bg-[#32AFF5] rounded-full">Proposer un thème</button>
                    <button className="h-[40px] w-[180px] bg-[#8FD4FB] rounded-full">Voir les thèmes</button>
                </div>
            </div>
            <img src="AcceuilEntreprise.jpg" className="lg:h-[400px] w-full object-contain mix-blend-darken"/>
        </div>
    )
}
export default AcceuilEntreprise;