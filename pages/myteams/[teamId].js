import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks";
import {useRouter}  from 'next/router'
import DocumentIcon from "../../icons/documentIcon";

const TeamId = ({toastsRef}) => {
    const router = useRouter()
    const {teamId} = router.query;
    const [selectedFiles,setSelectedFiles] = useState({})
    const {getAllCommitsDocs,validatedDocument} = useStoreActions(store=>store.teacherTeamCommitDocsModel)
    const {documents} = useStoreState(store=>store.teacherTeamCommitDocsModel)

   
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
    useEffect(async()=>{
        if(!teamId) return;
        await getAllCommitsDocs({teamId})
        


    },[teamId])

    const showValidateButton = ()=>{
        const arr = Object.keys(selectedFiles);
       return arr.length >0 ?  Object.keys(selectedFiles).every(k=>{
            const selectedFile = selectedFiles[k];
            return !selectedFile.validated
        }) : false
    }
    const handleValidateDocuments = async e=>{
        e.preventDefault();
        try{
            await validatedDocument({
                documentIds:Object.keys(selectedFiles) 
            })
            toastsRef.current.addMessage({
                text:"c'est fait ...",
                mode:'Alert'
            })
            await getAllCommitsDocs({teamId})
            setSelectedFiles({})

        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({
                text:'Ops...Erreur',
                mode:'Error'
            })
            setSelectedFiles({})
        }
    }

    // return JSON.stringify(documents.map(doc=>{return {id:doc.id,name:doc.name}}))
    return (
        <div className="h-[200vh] bg-background min-h-screen      border-2  pl-[60px]">
       
        <div  className="h-[80vh]   flex lg:flex-row flex-col-reverse    text-[#1A2562]  font-xyz mt-[120px]    bg-white shadow-lg p-4 mx-[50px] ">
            <div className="lg:w-[80%] w-full h-full flex flex-col ">
                   <div 
                   className="w-full h-full   grid  grid-cols-[repeat(auto-fit,minmax(100px,_1fr))] gap-[20px] px-4 py-4 justify-items-center  items-center overflow-y-auto"> {/*The team docs lays here */}
                        { 
                               documents?.map(doc=>{
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
                                     <div className="w-full   break-words text-sm">{doc?.name}</div>
                                 </div>
                                   )
                               
                               })
                         }
                   </div>
                   <div className="flex w-[95%] justify-between h-[60px] bg-white   shadow-lg mx-auto"> {/* options menu */}
                             
                              { showValidateButton()  &&<div 
                                       className="h-full border-2 border-gray-200 w-1/4 justify-center flex items-center cursor-pointer"
                                       onClick={handleValidateDocuments}
                               >
                                           Valider
                               </div>}
                           
                          
                   </div>
             </div>
             <div className=" lg:w-[20%]  w-full lg:h-full h-[20%] flex flex-col shadow-lg px-2 overflow-y-scroll space-y-4"> {/*document information */}
                 {
                       <>
                           
                          { Object.keys(selectedFiles).length > 0 &&(
                              <>
                                   <div className="w-full  text-center font-medium text-xl">Document Infos:</div>
                              {
                                  Object.keys(selectedFiles).map(
                                      k =>{
                                          const selectedFile = selectedFiles[k];

                                          return (
                                              <div className=" border-2 break-all flex flex-col px-2 ">
                           
                                            <div className="text-textcolor/90 "><span className="">Name: </span><span className="text-sm">{selectedFile.name}</span></div>
                                            <div>Type: <span className="text-sm">{selectedFile.type.name}</span></div>
                                            
                                            <div  onClick={()=>router.push('http://localhost:8080/'+selectedFile.url?.slice(2))}  className="text-textcolor/90 cursor-pointer hover:underline">Url: <span className="text-sm">{selectedFile.url}</span> </div>
                                            <div>Validé: <span className="text-sm">{ selectedFile.validated=== true?'oui':'non'}</span></div>

                                              </div>
                                           
                                          )
                                      }
                                  )
                              }
                             
                           
                              
                              
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