const WhyUse = props =>{
    return(
        <div className="min-h-screen w-full bg-gradient-to-br from-white via-background to-blue-50 flex items-center justify-center py-16 px-6 lg:px-16 font-roboto" id="whyuse">
            <div className="max-w-6xl w-full flex lg:flex-row flex-col items-center justify-center gap-10 lg:gap-16">
                <div className="flex-1 flex flex-col gap-6 max-w-xl">
                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-textcolor">
                            Quesque project101 ?
                        </h2>
                        <div className="h-0.5 w-16 bg-boutton rounded-full"></div>
                    </div>
                    
                    <p className="text-base text-textcolor leading-relaxed">
                        Project101 est le premier de son genre qui assure au étudiants , enseignants et administration de collaborer dans des projet scolaire avec une tel efficacité car il a été  proposé par l'administration d'ESI-SBA fait grâce à des étudiants ambicieux encadré par des enseignants expérimentés dans le but de facilité la gestion au future étudiants et enseignants.
                    </p>
                </div>
                
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <div className="absolute inset-0 bg-boutton/10 rounded-2xl blur-2xl"></div>
                        <img 
                            src='/Why.jpg' 
                            className="relative w-full h-auto mix-blend-darken object-contain"
                            alt="Why use Project101"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WhyUse;