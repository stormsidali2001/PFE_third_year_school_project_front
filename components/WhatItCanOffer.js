const Offer = props => {
    const data = [
        {
            url:'/faciliter.png',
            text:'Faciliter le partage des document entre équipe enseignants et administration.'
        },
        {
            url:'/consulter.jpg',
            text:'La facilité de consulter les documents de son groupes.'
        },
        {
            url:'/communication.png',
            text:'L’échange entre étudiants-étudiants /étudiants-encadreur.'
        },
        {
            url:'/org.png',
            text:'L’organisation des réunions.'
        },
        {
            url:'/compétition.png',
            text:'Créer un environnement compétitive entre les étudiants.'
        },
        {
            url:'/classement.png',
            text:'Bien noter chaque étudiant.'
        },
    ]
    return(
        <div className="h-fit py-12 bg-background w-[100vw] flex flex-col space-y-16 items-center justify-center text-center sm:px-10 " id="service">
                <div className="flex flex-row space-x-1 text-[32px] font-bold text-textcolor"> Quesque  project101  vous apporterait de plus dans vos projets ?</div>
                <div className="flex flex-row gap-24 flex-wrap items-center justify-center lg:w-[90vw]">
                    {data.map((el , index)=>{
                        return(
                            <div className="h-[380px] w-[340px] border-4 rounded-lg border-[#5C616E] text-center flex flex-col space-y-12 px-2" key={index}>
                                <img src={el.url} className='h-[200px] object-contain flex items-center mix-blend-darken'/>
                                <div className="text-textcolor text-[22px] text-xyz font-bold">{el.text}</div>
                            </div>
                        )
                    })}
                </div>
                <div className="text-[20px] text-textcolor font-bold">Et beaucoup d’autre , connectez-vous rapidement pour y profiter de toutes les options.</div>
        </div>
    )
}
export default Offer;