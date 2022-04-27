import Link from 'next/link'
import React, { useState } from "react"

const AjouterEnseignant = props => {
    const [click , setClick] = useState(false);
    const [Nom,setNom] = useState('');
    const [Prenom,seetPrenom] = useState('');
    const [Module,setModule] = useState('');

    const [email , setEmail] = useState('ex: xx.xxxx@esi-sba.dz');
    
    return (

        <form className="h-fit lg:h-[70vh] justify-center flex flex-col space-y-6 min-w-[80vw] text-[#1A2562] bg-[#F8FDFF] font-xyz px-6 lg:px-16 py-12 lg:py-0">
           <div className="text-[30px]"> Ajouter un Enseignant </div>

           <div className='space-y-4 flex flex-col'>
               
           <div className='flex flex-wrap -mx-3 mb-6 '>
                <div className="flex-1  space-x-6">
                    <div> Nom</div>
                    <input placeholder={Nom} className=" border border-primary border-blue-700  rounded-full outline-none h-[50px] w-[350px] px-3" onChange={(e)=>setNom(e.target.value)}/>
                </div>   

                <div className="flex-1  space-x-6">
                    <div>Prenom </div>
                    <input placeholder={Prenom}  className="border border-primary border-blue-700  rounded-full outline-none h-[50px] w-[350px] px-3" onChange={(e)=>seetPrenom(e.target.value)}/>
                </div> 
            </div> 
            <div className='flex flex-wrap -mx-3 mb-6 '>
                <div className="flex-1  space-x-6">
                    <div> email</div>
                    <input placeholder={email} className=" border border-primary border-blue-700  rounded-full outline-none h-[50px] w-[400px] px-3" onChange={(e)=>setEmail(e.target.value)}/>
                </div> 
                <div className="flex-1  space-x-6">
                    <div> Module</div>
                    <input placeholder={Module} className=" border border-primary border-blue-700  rounded-full outline-none h-[50px] w-[350px] px-3" onChange={(e)=>setModule(e.target.value)}/>
                </div>     
            </div> 

           
               
               
            <div className="lg:w-[80vw] w-[95vw] flex justify-end items-end">
                <button type="submit" className="bg-blue-500 h-[50px] w-[200px] rounded-full shadow-lg text-[24px]">Valider</button>
            </div>
            </div>
            </form>
    )
}
export default AjouterEnseignant;
