import axios from 'axios';
import {useRouter} from 'next/router'
import { useState } from 'react';

const ResetPasword = ({toastsRef}) => {
    const router = useRouter();
    const {token,uid} = router.query;
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    if(!token || !uid){
        
    }
    const handleRessetPassword = async(e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            toastsRef.current.addMessage({text:"mots de passes non identiques",mode:'Error'})
            return;
           
        }
        if(password.length<=6){
            toastsRef.current.addMessage({text:"le minimum de caractere dans um mot de passe doit etre 6",mode:'Error'})
            return;
        }
        try{
            const data = await axios.post(`http://localhost:8080/resetpassword`,{
                password,
                token,
                userId:uid
            })
            
            console.log(data)
            toastsRef.current.addMessage({text:data,mode:'Alert'})
            setTimeout(()=>{
                router.push("/login");
            },3000)
            

        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"soit le lien est expere ou  erronee",mode:'Error'})
           
            
           
        }
    }
    console.log(router.query);
    return(
        <div className="flex h-fit py-12 lg:py-0 lg:h-[100vh] w-[100vw] items-center justify-center">
            <div className="w-[80%] flex lg:flex-row flex-col lg:space-x-56 space-y-8 lg:space-y-0 items-center justify-center">
                <img src='Resetpass.jpg' className="object-contain flex items-center justify-center w-[700px]"/>
                <form 
                    className="flex flex-col space-y-8"
                    onSubmit={handleRessetPassword}
                >
                    <div className="text-[35px]">Nouveau Mot de passe</div>
                    <div className="text-[25px]">Mot de passe :</div>
                    <input 
                        placeholder="Mot de passe..." 
                        type = 'password'  
                        className="h-[60px] lg:w-[360px] w-fit placeholder-[22px] text-[22px] outline-none border border-1 border-zinc-500 rounded-md px-6"
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                    />
                    <div className="text-[25px]">Confirmer le mot de passe :</div>
                    <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Mot de passe..." type='password' className="h-[60px] lg:w-[360px] w-fit placeholder-[22px] text-[22px] outline-none border border-1 border-zinc-500 rounded-md px-6"/>
                    <button type='submit' className="text-[25px] bg-blue-600 rounded-md h-[60px] lg:w-[360px] min-w-[250px]">Confirmer</button>
                </form>
            </div>
        </div>
    )
}
export default ResetPasword;