import Link from "next/link";

const Login = props => {
    return(
        <div className="flex h-fit py-12 lg:py-0 lg:h-[100vh] w-[100vw] items-center justify-center">
            <div className="w-[80%] flex lg:flex-row flex-col lg:space-x-56 space-y-8 lg:space-y-0 items-center justify-center">
                <img src='Login.jpg' className="object-contain flex items-center justify-center"/>
                <div className="flex flex-col space-y-6">
                    <div className="text-[35px]">Bienvenu !</div>
                    <div className="text-[25px]">E-mail :</div>
                    <input placeholder="E-mail..."  className="h-[60px] lg:w-[360px] w-fit placeholder-[22px] text-[22px] outline-none border border-1 border-zinc-500 rounded-md px-6"/>
                    <div className="text-[25px]">Mot de passe :</div>
                    <input placeholder="Mot de passe..." type='password' className="h-[60px] lg:w-[360px] w-fit placeholder-[22px] text-[22px] outline-none border border-1 border-zinc-500 rounded-md px-6"/>
                   <span className="text-cyan-700 text-[20px] hover:underline hover:underline-offset-1  hover:cursor-pointer    transition-all w-fit ease-in"> <Link href='/forgotpassword'>Mot de passe oublié ?</Link></span>
                    <button className="text-[25px] bg-blue-600 rounded-md h-[60px] lg:w-[360px] min-w-[250px]">Se connecter</button>
                </div>
            </div>
        </div>
    )
}
export default Login;