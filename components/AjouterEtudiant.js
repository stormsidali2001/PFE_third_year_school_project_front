import Link from 'next/link'
import React, { useState } from "react"
import Select from 'react-select'

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white",
     border:"1px solid blue",
     width:"300px",
     height:'50px',
     borderRadius:'20px',
    }),
    
  };

const options = [
    { value: '2CPI', label: '2CPI' },
    { value: '1CS', label: '1CS' },
    { value: '2CS ISI', label: '2 CS ISI' },
    { value: '2CS SIW', label: '2 CS SIW' },
    { value: '3CS ISI', label: '3 CS ISI' },
    { value: '3CS SIW', label: '3CS SIW' },
  ]



const AjouterEtudiant = props => {
    const [click , setClick] = useState(false);
    const [selected, setSelected] = useState([]);
    const [Nom,setNom] = useState('');
    const [Prenom,seetPrenom] = useState('');
    const [Promotion,setPromotion] = useState('');

    const [email , setEmail] = useState('ex: xx.xxxx@esi-sba.dz');
    const [moyen , setMoyen] = useState('');
    

    return (

        <form className="h-fit lg:h-[70vh] justify-center flex flex-col space-y-6 min-w-[80vw] text-[#1A2562] bg-[#F8FDFF] font-xyz px-6 lg:px-16 py-12 lg:py-0">
           <div className="text-[30px]"> Ajouter un Etudiant </div>


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

               <div className="flex flex-wrap -mx-3 mb-6 ">
               <div className="flex-1  space-x-6">
                    <div>email </div>
                    <input placeholder={email} className="border border-primary border-blue-700 rounded-full outline-none h-[50px] w-[500px] px-3" onChange={(e)=>setEmail    (e.target.value)}/>
                </div> 
                </div>
                
                <div className='flex flex-wrap -mx-3 mb-6'>
                <div className="flex-1  space-x-6">
                    <div> Promotion </div>
                    <Select placeholder={selected} options={options} styles={colourStyles}  />
              </div> 
                <div className="flex-1  space-x-6">
                    <div>moyen general</div>
                    <input placeholder={moyen} className="border border-primary border-blue-700 rounded-full outline-none h-[50px] w-[150px] px-3" onChange={(e)=>setMoyen(e.target.value)}/>
                </div> 
            </div>
            </div>
            <div className="lg:w-[80vw] w-[95vw] flex justify-end items-end">
                <button type="submit" className="bg-blue-500 h-[50px] w-[200px] rounded-full shadow-lg text-[24px]">Valider</button>
            </div>
            </form>
    )
}
export default AjouterEtudiant;
