const WhyUse = props =>{
    return(
        <div className="h-fit pt-32 pb-12 lg:h-screen w-[100vw] bg-background flex lg:flex-row flex-col items-center justify-center gap-32 font-xyz">
            <div className="flex flex-col gap- px-12">
                <div className="flex flex-row space-x-1 font-bold text-[32px]"><div className="text-[#c8c8c8]">Quesque</div><div className="text-textcolor">project101 ?</div></div>
                <div className="text-[23px] text-textcolor font-semibold">Project101 est le premier de son genre qui assure au étudiants , enseignants et administration de collaborer dans des projet scolaire avec une tel efficacité car il a été  proposé par l’administration d’ESI-SBA fait grâce à des étudiants ambicieux encadré par des enseignants expérimentés dans le but de facilité la gestion au future étudiants et enseignants.
            </div>
            </div>
            <img src='/Why.jpg' className="mix-blend-darken object-contain px-6"/>
        </div>
    )
}
export default WhyUse;