import { useState } from "react";

const TeamId = props => {
    const [selectedFiles,setSelectedFiles] = useState({})
    const documents = []
    const handleSelectFiles = file=>{
        if(selectedFiles[file.id]){
            setSelectedFiles(files=>{
                const newFiles = {...files}
                delete newFiles[file.id]
                return newFiles;
            })
        }else{

            setSelectedFiles(files=>{
                return{...files,[file.id]:file}
            })
        }
       
    }
    return (
        <div className="h-[200vh] bg-background min-h-screen      border-2  pl-[60px]">
       
        <div  className="h-[80vh]   flex lg:flex-row flex-col-reverse    text-[#1A2562]  font-xyz mt-[120px]    bg-white shadow-lg p-4 mx-[50px] ">
            <div className="lg:w-[80%] w-full h-full flex flex-col ">
                   <div 
                   className="w-full h-full   grid  grid-cols-[repeat(auto-fit,minmax(100px,_1fr))] gap-[20px] px-4 py-4 justify-items-center  items-center overflow-y-auto"> {/*The team docs lays here */}
                        { 
                               documents.map(doc=>{
                                   return (
                                    
                                          <div 
                                            className="relative w-[100px] h-[100px] flex flex-col   cursor-pointer "
                                            onClick={(e)=>handleSelectFiles(doc)}
   
                                           
                                      
                                      >
                                          <div className={`absolute bottom-[40px] right-[40px] w-[15px] h-[15px] rounded-full ${selectedFiles[doc.id]?'bg-blue-400':'bg-blue-200'}  border-2`}></div>
                                      <div 
                                        className=" bg-gray-100 flex justify-center items-center p-4 w-fit"
                                      >
                                         
                                         <DocumentIcon
                                             className='w-8'
                                         />
                                         
                                     </div>
                                     <div className="w-full   break-words text-sm">{doc.name}</div>
                                 </div>
                                   )
                               })
                         }
                   </div>
                   <div className="flex w-[95%] justify-between h-[60px] bg-white   shadow-lg mx-auto"> {/* options menu */}
                             
                              { Object.keys(selectedFiles).length ===1  &&<div 
                                       className="h-full border-2 border-gray-200 w-1/4 justify-center flex items-center cursor-pointer"
                               >
                                           Valider
                               </div>}
                           
                          
                   </div>
             </div>
             <div className=" lg:w-[20%] overflow-auto w-full lg:h-full h-[20%] flex flex-col shadow-lg px-2"> {/*document information */}
                   {
                       <>
                           
                          { Object.keys(selectedFiles).length=== 1 &&(
                              <>
                               <div className="w-full  text-center font-medium text-xl">Document Infos:</div>
                               <div className="text-textcolor/90 "><span className="">Name: </span><span className="text-sm">{selectedFiles[Object.keys(selectedFiles)[0]].name}</span></div>
                               <div>Type: <span className="text-sm">{ selectedFiles[Object.keys(selectedFiles)[0]].type.name}</span></div>
                               <div  onClick={()=>router.push('http://localhost:8080/'+selectedFiles[Object.keys(selectedFiles)[0]].url?.slice(2))}  className="text-textcolor/90 cursor-pointer hover:underline">Url: <span className="text-sm">{selectedFiles[Object.keys(selectedFiles)[0]].url}</span> </div>
                               <div  className="text-textcolor/90">Owner: </div>
                               <div className="flex w-full flex-col pl-5 text-textcolor/90">
                               <div>Name: <span className="text-sm">{selectedFiles[Object.keys(selectedFiles)[0]].owner.firstName+' '+selectedFiles[Object.keys(selectedFiles)[0]].owner.lastName}</span></div>
                              
                               
                              
                              
                              
                               </div>
                               <div  className="text-textcolor/90">Description: </div>
                               <div className="w-full py-1 px-2 text-textcolor/90 bg-gray-200/30 text-justify backdrop-blur-md break-words">
                                   {selectedFiles[Object.keys(selectedFiles)[0]].description}
                               </div>
                              
                              </>
                           )}
                       </>
                   }
                   
             </div>
               
           </div>
  
           
   
   </div>
    )
}
export default TeamId;