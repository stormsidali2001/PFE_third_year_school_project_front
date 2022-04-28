import React, { useState } from "react"
import axios from 'axios';


const AjouterAnnouncemnt = props => {
    const [Title,setTitle] = useState('');
    const [Description,setDescription] = useState('ajouter un description de maximum 250 caracteres');
    const [file, setFile] = useState();

    function handleChange(event) {
        setFile(event.target.files[0])
      };
      
    return (

        <form className="h-fit lg:h-[95vh] justify-center flex flex-col space-y-6 min-w-[80vw] text-[#1A2562] bg-[#F8FDFF] font-xyz px-6 lg:px-16 py-12 lg:py-0">
           <div className="text-[30px]"> Ajouter un Announcemnt </div>

           <div className='space-y-3 flex flex-col'>
               
           <div className='flex flex-wrap -mx-3 mb-6 '>
                <div className="flex-1  space-x-6">
                    <div> Title</div>
                    <input placeholder={Title} className=" border border-primary border-blue-700  rounded-full outline-none h-[50px] w-[500px] px-3" onChange={(e)=>setTitle(e.target.value)}/>
                </div>   
            </div> 

            <div className='flex flex-wrap -mx-3 mb-6 '>
                <div className="flex-1  space-x-6">
                    <div> Description</div> 
                    <textarea placeholder={Description}   maxLength="250" className=" resize-none border border-primary border-blue-700  outline-none rounded-2xl h-[200px] w-[800px] px-3" onChange={(e)=>setDescription(e.target.value)}/>
                </div>   
            </div> 
            
            <div className='flex flex-wrap -mx-3 mb-6 '>
                <div className="flex-1  space-x-6">
                    <div> Associer un document </div>
                    <input type="file" onChange={handleChange} optional/>
                </div>   
            </div> 
               
            <div className="lg:w-[80vw] w-[95vw] flex justify-end items-end">
                <button type="submit" className="bg-blue-500 h-[50px] w-[200px] rounded-full shadow-lg text-[24px]">Valider</button>
            </div>
            </div>
            </form>
    )
}
export default AjouterAnnouncemnt;
