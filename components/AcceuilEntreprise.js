import StudentVerticalNavbar from "./StudentVerticalNavbar";

const AcceuilEntreprise = props => {
    return (
        <div className="text-[#1A2562] bg-[#F8FDFF] font-xyz px-12 flex flex-row space-y-3 py-10 lg:h-[100vh] h-fit w-[100vw] items-center justify-center">
            <StudentVerticalNavbar/>
            <div className="flex flex-col space-y-8 px-12 items-center justify-center text-center">
                <div className="text-[40px] font-bold">Bonjour ,</div>
                <div className="text-[27px] font-semibold">Nous somme heureux de vous acceuil sur notre plateforme. On espère qul'elle vous aiderait à réaliser des projets que vous aviez toujour eu envie de réaliser et à faire connaissance avec des etudiants ambicieux et des enseignts professionnels.</div>
                <div className="text-[25px] font-light">Accédez a la listes des thèmes proposés , puis proposez un !</div>
                <div className="flex flex-row space-x-10 text-[21px] font-extralight">
                    <button className="h-[40px] w-[230px] text-white bg-[#32AFF5] rounded-full">Proposer un thème</button>
                    <button className="h-[40px] w-[230px] bg-[#8FD4FB] rounded-full">Voir les thèmes</button>
                </div>
            </div>
            <img src="AcceuilEntreprise.jpg" className="h-[500px] object-contain mix-blend-darken"/>
        </div>
    )
}
export default AcceuilEntreprise;