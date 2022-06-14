import React, { useEffect, useState } from "react"
import AttachFileIcon from "../../../icons/AttachFileIcon"
import Select from 'react-select'
import ModalPortal from "../../../components/ModalPortal"

const saisirpvsoutenance = ({toastsRef}) => {
    const promotions = [
        {   
            id : 1,
            name : '2CPI'
        },
        {
            id : 2,
            name : '1CS'
        },
        {
            id : 3,
            name : '2CS'
        },
        {
            id : 4,
            name : '3CS'
        }
    ]
    const [note , setNote] = useState('10')
    const [description , setDescription] = useState('')
    const [files, setFiles] = useState([])
    const [choosenPromotion , setChoosenPromotion] = useState(null)
    const [openPortalModelTeam,setOpenPortalModelTeam] = useState(false)


    function handleChange(event) {
        const { files: fileLst } = event.target;
        console.log(fileLst, [...fileLst].map(({name}) => {return {name}}));
        setFiles(event.target.files)
      };
    const Empty = (elements)=>{
        return elements.some(el=>el === '')
    }
   
    const handleSubmit = async e=>{
        e.preventDefault();
        if(Empty([note])){
            toastsRef.current.addMessage({text:"vous devez ajouter la note",mode:'Error'})
            return;
         }
        }

    return (
        <div className="h-[200vh] bg-background min-h-screen items-center flex flex-col">

            <div 
                className="h-fit  justify-center flex flex-col space-y-6  text-[#1A2562]  font-xyz mt-[100px] mx-auto  items-center bg-white shadow-lg p-2 lg:w-[40vw] w-[1000vw]">
               <div className="text-[26px] flex space-x-4"> 
                        <span className="">Saisir un pv de soutenance</span>      
               </div>

              <div className="flex flex-col items-right space-y-6">

               <div className='flex flex-row items-center space-x-4'>
                    <div >Promotion :</div>
                    <Select
                        placeholder="Promotion..." 
                        className="z-50 h-[40px] w-[230px] rounded-lg bg-slate-200 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                        onChange={(option)=>{setChoosenPromotion(option)}}
                        options={promotions.map(el=>{return {value:el.id,label:el.name}})}

                        value={choosenPromotion}
                        styles = {{menuPortal:base=>({...base,zIndex:500})}}
                    />
                </div>

                <div className='flex flex-row space-x-4 items-center'>
                    <div className="flex flex-col">Equipe: </div>
                    <button 
                        className='text-[18px] text-[#808082] border border-inherit rounded-lg h-[32px] flex items-center justify-center w-[200px] bg-white-300 hover:bg-blue-400 '
                        onClick={(e) => setOpenPortalModelTeam(true)}
                    >
                    choisir une équipe
                    </button>
                </div>
                
                <div className='flex flex-row space-x-4 items-center'>
                    <div>Note </div>
                    <input    className='h-[35px] w-[100px] px-3 bg-slate-200 rounded-md shadow-sm'
                        type="number"
                        min="0"
                        max="20"
                        value={note} 
                        onChange={(e) => setNote(e.target.value)}/>
                </div>

                <div className='flex flex-col space-y-4'>
                    <div>Description </div>
                    <textarea  className='h-[200px] w-[500px] bg-slate-200 rounded-md shadow-sm resize-none p-3' 
                        placeholder='ajouter des remarques de maximum 500 caractères...' 
                        maxLength="500" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        optional/>
                </div>

                <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="flex-1  space-x-6">
                            <label for='file'  className="flex space-x-2 group cursor-pointer">
                                <AttachFileIcon className='w-6 text-[#5375E2]/80 group-hover:text-[#5375E2]/60'/>
                                <div> Joindre des fichiers </div>
                            </label>
                            <input id="file" className="hidden" type="file" multiple onChange={handleChange} optional/>
                        </div>   
                    </div> 
                  
                    <div className="w-full grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 place-content-center content-center p-2 gap-4  rounded-[5px] ">
                     
                        {
                    [...files].map((file,index)=>{
                                return(
                                    <label 
                                    className=" w-fit flex flex-col hover:scale-105 cursor-pointer transition-transform ease-in"
                                    key={index}
                                
                                >
                                <div className=" bg-gray-100 flex justify-center items-center p-4 w-fit">
                                   
                                   <DocumentIcon
                                       className='w-8'
                                   />
                                   
                               </div>
                               <div className="w-full  text-center  break-words text-sm">{file.name}</div>
                           </label>     
                                )
                            })
                        }
                    </div>
                    </div>
                            <button type="submit" className="bg-[#5375E2]/80 backdrop-blur-[8px]   font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider ml-auto">Valider</button>
        
            <ModalPortal
                open={openPortalModelTeam}
                handleClose={setOpenPortalModelTeam}
            >
                <div className='h-fit w-[600px] p-12 rounded-xl shadow-xl bg-white flex flex-col space-y-6'>
                        <div>Liste des équipes</div>
                        <div></div>
                    </div>
            </ModalPortal>     
         </div>
     
        </div>
        )
}

export default saisirpvsoutenance;
