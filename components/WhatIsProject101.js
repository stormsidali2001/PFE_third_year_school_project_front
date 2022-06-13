const WhatIs = props =>{
    return(
        <div className="h-fit pt-32 pb-12 lg:h-screen w-[100vw] bg-background flex lg:flex-row flex-col items-center justify-center gap-32 font-xyz" id='what'>
            <img src='/What.jpg' className="mix-blend-darken object-contain"/>
            <div className="flex flex-col gap-8 px-12  lg:px-24">
                <div className="flex flex-row space-x-1 font-bold text-[32px]"><div className="text-[#c8c8c8]">Quesque</div><div className="text-textcolor">project101 ?</div></div>
                <div className="text-[23px] text-textcolor font-semibold">project 101 est une plateforme dévloppé par les étudiants de l’école supérieur en informatique de Sidi Bel Abbes qui à comme objectif de faciliter la communication et la gestion des projets pluidiciplinaire / fin d’étude.</div>
            </div>
        </div>
    )
}
export default WhatIs;