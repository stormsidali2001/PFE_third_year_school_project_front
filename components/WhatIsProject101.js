const WhatIs = props =>{
    return(
        <div className="min-h-screen w-full bg-background flex items-center justify-center py-16 px-6 lg:px-16 font-roboto" id='what'>
            <div className="max-w-6xl w-full flex lg:flex-row flex-col items-center justify-center gap-10 lg:gap-16">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#8FD4FB]/20 rounded-2xl blur-2xl"></div>
                        <img 
                            src='/What.jpg' 
                            className="relative w-full h-auto mix-blend-darken object-contain"
                            alt="What is Project101"
                        />
                    </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-6 max-w-xl">
                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-textcolor">
                            Quesque project101 ?
                        </h2>
                        <div className="h-0.5 w-16 bg-boutton rounded-full"></div>
                    </div>
                    
                    <p className="text-base text-textcolor leading-relaxed">
                        project 101 est une plateforme dévloppé par les étudiants de l'école supérieur en informatique de Sidi Bel Abbes qui à comme objectif de faciliter la communication et la gestion des projets pluidiciplinaire / fin d'étude.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default WhatIs;