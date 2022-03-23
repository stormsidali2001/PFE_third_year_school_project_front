import Link from "next/link";
import {useState} from 'react';
import axios from 'axios';
import { useRouter } from "next/router";

const Login = ({toastsRef}) => {
    const router = useRouter();
    const [email,setEmail] = useState('email');
    const [password,setPassword] = useState('sadhasf');
    
 

    const handleSubmit = async e=>{
        e.preventDefault();
        const service = email.split('@')[1].split('.')[0];
        const domain = email.split('@')[1].split('.')[1];
        
        if(service!== 'esi-sba' && domain !='dz'){
            toastsRef.current.addMessage({text:"le mail doit etre un mail scholaire!",mode:'Error'})
            return;
        }
        
        try{
            const data = await axios.post("http://localhost:8080/signin",{
                email,
                password
            })
           
            console.log(data)
            toastsRef.current.addMessage({text:"Bienvenue! redirection...",mode:'Alert'})
            setTimeout(()=>{
                router.push("/");
            },3000)
            

        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"email ou mot de passe incorrect.",mode:'Error'})
           
            
           
        }
    }
    return(
        <div className="flex h-fit py-12 lg:py-0 lg:h-[100vh] w-[100vw] items-center justify-center" id="login">
            <div className="w-[80%] flex lg:flex-row flex-col lg:space-x-56 space-y-8 lg:space-y-0 items-center justify-center">
                <img src='Login.jpg' className="object-contain flex items-center justify-center"/>
                <form 
                    className="flex flex-col space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="text-[35px]">Bienvenu !</div>
                    <div className="text-[25px]">E-mail :</div>
                    <input 
                        placeholder="E-mail..."  
                        className="h-[60px] lg:w-[360px] w-fit placeholder-[22px] text-[22px] outline-none border border-1 border-zinc-500 rounded-md px-6"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <div className="text-[25px]">Mot de passe :</div>
                    <input 
                        placeholder="Mot de passe..." 
                        type='password' 
                        className="h-[60px] lg:w-[360px] w-fit placeholder-[22px] text-[22px] outline-none border border-1 border-zinc-500 rounded-md px-6"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                   <span className="text-cyan-700 text-[20px] hover:underline hover:underline-offset-1  hover:cursor-pointer    transition-all w-fit ease-in"> <Link href='/forgotpassword'>Mot de passe oublié ?</Link></span>
                    <button type='submit' className="hover:cursor-pointer text-[25px] bg-blue-600 rounded-md h-[60px] lg:w-[360px] min-w-[250px]">Se connecter</button>
                </form>
            </div>
        </div>
    )
}
export default Login;