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
            text:"L'échange entre étudiants-étudiants /étudiants-encadreur."
        },
        {
            url:'/org.png',
            text:"L'organisation des réunions."
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
        <div className="min-h-screen py-16 bg-background w-full flex flex-col space-y-12 items-center justify-center px-6 lg:px-16 font-roboto" id="service">
                <div className="text-center space-y-3 max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: '#000000' }}>
                        Quesque  project101  vous apporterait de plus dans vos projets ?
                    </h2>
                    <div className="h-0.5 w-16 bg-boutton rounded-full mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
                    {data.map((el , index)=>{
                        return(
                            <div 
                                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center text-center space-y-4 hover:-translate-y-1 border border-gray-100" 
                                key={index}
                            >
                                <div className="w-full h-36 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-background to-blue-50">
                                    <img 
                                        src={el.url} 
                                        className='h-full w-full object-contain mix-blend-darken p-3 group-hover:scale-110 transition-transform duration-300'
                                        alt={`Service ${index + 1}`}
                                    />
                                </div>
                                <p className="text-textcolor text-base font-medium leading-relaxed">{el.text}</p>
                            </div>
                        )
                    })}
                </div>
                
                <div className="text-center space-y-4 mt-6">
                    <p className="text-base text-textcolor max-w-2xl">
                        Et beaucoup d'autre , connectez-vous rapidement pour y profiter de toutes les options.
                    </p>
                </div>
        </div>
    )
}
export default Offer;