const ForgotPassword = props => {
    return(
        <div className="flex h-fit py-12 lg:py-0 lg:h-[100vh] w-[100vw] items-center justify-center">
            <div className="w-[80%] flex lg:flex-row flex-col lg:space-x-56 space-y-8 lg:space-y-0 items-center justify-center">
                <img src='Forgotpass.jpg' className="object-contain flex items-center justify-center w-[600px]"/>
                <div className="flex flex-col space-y-8 justify-center items-center">
                    <div className="text-[32px] text-center">Mot de passe oublié ?</div>
                    <div className="text-[23px] text-center">Entrer votre E-mail afin d'y recevoir le lien de recupération de votre compte</div>
                    <div className="text-[25px]">E-mail :</div>
                    <input placeholder="E-mail" className="text-[22px] placeholder-[22px] h-[60px] lg:w-[360px] w-fit rounded-md outline-none border border-1 border-stone-600 px-6"/>
                    <button className="text-[25px] bg-blue-600 rounded-md h-[60px] lg:w-[360px] min-w-[250px]">Envoyer</button>
                </div>
            </div>
        </div>
    )
}
export default ForgotPassword;