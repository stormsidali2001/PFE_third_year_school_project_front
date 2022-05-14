import { useState } from "react";
import AttachFileIcon from "../icons/AttachFileIcon";

const SuggestTheme = ({toastsRef}) => {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [keywords, setkeywords]=useState([]);

    return (

        <form 
            className="h-fit  justify-center flex flex-col space-y-6  text-[#1A2562]  font-xyz mt-[100px] mx-auto  items-center bg-white/60 backdrop-blur-sm rounded-lg shadow-xl relative p-2 lg:w-[40vw] w-[80vw]">
                
           <div className="text-[30px] flex space-x-4"> 
                <span className="">Suggerer un theme</span>      
           </div>
           <div className='space-y-3 flex flex-col w-[95%]  px-8'>
                <div className='flex flex-wrap -mx-3 mb-6  '>
                    <div className="flex-1  space-x-6">
                        <div> Titre</div>
                        <input 
                            value={title}
                            className=" border   rounded-[5px]  outline-none h-[40px] w-[80%] px-3 bg-gray-200/30 backdrop-blur-sm text-black" 
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                     </div>   
                </div> 
                </div>

                <div className='space-y-3 flex flex-col w-[95%]  px-8'>
               
               
                    <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="flex-1  space-x-6">
                            <div> Description</div> 
                                <textarea 
                                    placeholder='ajouter une description de maximum 1000 caracteres'
                                    value={description}
                                    maxLength="1000" 
                                    className=" resize-none border   outline-none rounded-2xl h-[300px] w-[80%] px-3 bg-gray-200/30 backdrop-blur-sm text-black" 
                                    onChange={(e)=>setDescription(e.target.value)}
                                />
                        </div>   
                    </div> 
            
                    <div className='flex flex-wrap -mx-3 mb-6 '>
                        <div className="flex-1  space-x-6">
                            <label for='file'  className="flex space-x-2 group cursor-pointer">
                                <AttachFileIcon className='w-6 text-[#5375E2]/80 group-hover:text-[#5375E2]/60'/>
                                <div> Joindre des fichiers </div>
                            </label>
                           
                            <input id="file" className="hidden" type="file" optional/>
                        </div>   
                    </div> 
                    <div className="w-full grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2 place-content-center content-center p-2 gap-4  rounded-[5px] ">
                     
                        {
                    [...files].map((file,index)=>{
                                return(
                                    <label 
                                    className=" w-fit flex flex-col hover:scale-105 cursor-pointer transition-transform ease-in"
                                    key={index}                                >
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
                    {
                        
                            <button type="submit" className="bg-[#5375E2]/80 backdrop-blur-[8px]   font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider ml-auto">Valider</button>   
                    } 
            </div>
     </form>
    )
                }
export default SuggestTheme;
