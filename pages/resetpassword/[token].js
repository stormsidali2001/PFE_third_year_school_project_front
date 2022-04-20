import axios from 'axios';
import {useRouter} from 'next/router'
import { useState } from 'react';

const ResetPasword = ({toastsRef}) => {
    const router = useRouter();
    const {token,uid} = router.query;
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [loading,setLoading] = useState(false);
    if(!token || !uid){
        
    }
    const handleRessetPassword = async(e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            toastsRef.current.addMessage({text:"mots de passes non identiques",mode:'Error'})
            return;
           
        }
        // const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        // if(password.match(regex)==null){
            
        //     toastsRef.current.addMessage({text:"Password must contain at least a special character,at least a capital letter,at least a number and at least 8 characters",mode:'Error'})
        //     return;
        // }
       

        try{
            setLoading(true)
            const data = await axios.post(`http://localhost:8080/resetpassword`,{
                password,
                token,
                userId:uid
            })
            
            
            console.log(data)
            setLoading(false)
            toastsRef.current.addMessage({text:"le mot de passe a ete reinitialiser avec success",mode:'Alert'})
            setTimeout(()=>{
                router.push("/login");
            },3000)
            

        }catch(err){
            setLoading(false)
            console.log( error?.response)
             

                  toastsRef.current.addMessage({text:err.message,mode:'Error'})
              
           
            
           
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
                    {
                        loading?(
                            <svg role="status" class="h-[60px] lg:w-[360px] min-w-[250px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        ):(
                            <button type='submit' className="text-[25px] bg-blue-600 rounded-md h-[60px] lg:w-[360px] min-w-[250px]">Confirmer</button>
                        )
                    }
                 
                </form>
            </div>
        </div>
    )
}
export default ResetPasword;