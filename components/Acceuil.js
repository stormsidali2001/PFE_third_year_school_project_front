const Acceuil = props => {
    return(
        <div className="lg:h-[100vh] h-fit w-[100vw] bg-background">
            <div className="text-[35px] text-center">Mieux organiser vos projets</div>
            <div className="flex flex-row w-[95%] items-center justify-center h-full space-x-32">
                <div className="flex flex-col space-y-16">
                    <div>Créer votre équipe de projet, communiquer avec vos encadreur,  assurer la communication dans l’équipe et bien autre ...</div>
                    <div className="flex flex-row space-x-8 text-[20px]">
                        <button>Lire plus</button>
                        <button>Se connecter</button>
                    </div>
                </div>
                <img src='Acceuil.jpg' className="w-[710px] object-contain mix-blend-darken"/>
            </div>
        </div>
    )
}
export default Acceuil;