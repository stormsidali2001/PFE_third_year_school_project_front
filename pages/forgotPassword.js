import {useState} from 'react';
import axios from 'axios';
const ForgotPassword = props => {
    const [email,setEmail] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{
            const data = await axios.post("http://localhost:8080/forgotpassword",{
                email
            })
            
            console.log(data)

        }catch(err){
            console.log(err)
           
            
           
        }
    }
    return(
        <div className="flex h-fit py-12 lg:py-0 lg:h-[100vh] w-[100vw] items-center justify-center">
            <div className="w-[80%] flex lg:flex-row flex-col lg:space-x-56 space-y-8 lg:space-y-0 items-center justify-center">
                <img src='Forgotpass.jpg' className="object-contain flex items-center justify-center w-[600px]"/>
                <form 
                    className="flex flex-col space-y-8 justify-center items-center"
                    onSubmit={handleSubmit}
                >
                   
                        <div className="text-[32px] text-center">Mot de passe oublié ?</div>
                        <div className="text-[23px] text-center">Entrer votre E-mail afin d'y recevoir le lien de recupération de votre compte</div>
                        <div className="text-[25px]">E-mail :</div>
                        <input 
                            placeholder="E-mail" 
                            className="text-[22px] placeholder-[22px] h-[60px] lg:w-[360px] w-fit rounded-md outline-none border border-1 border-stone-600 px-6"
                            value = {email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        <button type='submit' className="text-[25px] bg-blue-600 rounded-md h-[60px] lg:w-[360px] min-w-[250px] hover:opacity-90">Envoyer</button>

                      
                </form>
            </div>
        </div>
    )
}
export default ForgotPassword;