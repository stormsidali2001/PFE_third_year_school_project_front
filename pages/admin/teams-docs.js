import { useEffect, useState } from "react";

import {useRouter}  from 'next/router'
import { useStoreActions, useStoreState } from "../../store/hooks";
import Select from "react-select";
import DocumentIcon from "../../icons/documentIcon";


const TeamsDocs = ({toastsRef}) => {
    const router = useRouter()
    const {team,promotion} = router.query;
    const [selectedFiles,setSelectedFiles] = useState({})
  
    const [chosenPromotion,setChoosenPromotion] = useState(null)
    const [chosenTeam,setChosenTeam] = useState(null)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const {teamsList:teams} = useStoreState(store=>store.teamListModel)

    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const {getTeamsList} = useStoreActions(store=>store.teamListModel)

    const {getAllDocsAdmin} = useStoreActions(store=>store.adminTeamsDocsModel)
    const {documents} = useStoreState(store=>store.adminTeamsDocsModel)





   
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
   

   
    const handleChangePromotion = (option)=>{
        router.push(`/admin/teams-docs?promotion=${option.value}&team=all`)
    }

    const handleChangeTeam = (option)=>{
        router.push(`/admin/teams-docs?promotion=${chosenPromotion?.value?chosenPromotion?.value:'all'}&team=${option.value}`)
        
    }

   

    useEffect(async()=>{
      
        
        
        if(promotions?.length === 0 ) {
            await getAllPromotionsThunk()
            return;
        
        }
       
            await getTeamsList(promotion)       
                      
                const label = promotions.find(el=>el.id=== promotion)?.name
                if(label){   
                    setChoosenPromotion({value:promotion,label})
                    setChosenTeam(null)
        
                  
                }
            
              
               
                  

                   await getAllDocsAdmin({teamId:team,promotionId:promotion})
           

          
       

          
           
           
        
        

    },[promotion,promotions])

    useEffect(async()=>{
        if(teams.length ===0 )return
        const label1 = teams.find(el=>el.id=== team)?.pseudo
        if(label1 ) setChosenTeam({value:team,label:label1})
        
        await getAllDocsAdmin({teamId:team,promotionId:promotion})

    },[team])

  

    //  return JSON.stringify(documents.map(doc=>{return {id:doc.id,name:doc.name}}))
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
                             
                 <div 
                                       className="h-full border-2 border-gray-200 w-1/4 justify-center flex items-center cursor-pointer"
                                     
                               >
                                                 <Select
                                    placeholder="Promotion" 
                                        onChange={(option)=>{handleChangePromotion(option)}}
                                        options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                                        isLoading = {!promotions}
                                        value={chosenPromotion}
                                        styles = {{menuPortal:base=>({...base,zIndex:100,width:'80%',height:'30px',borderRadius:'5px',color:'black',outline:'none'})}}
                                        

                                    />
                </div>
                <div 
                                       className="h-full border-2 border-gray-200 w-1/4 justify-center flex items-center cursor-pointer"
                                     
                               >
                                                 <Select
                                        placeholder="team" 
                                        onChange={(option)=>{handleChangeTeam(option)}}
                                        options={teams.map(el=>{return {value:el.id,label:el.pseudo}})}
                                        isLoading = {!teams}
                                        value={chosenTeam}
                                        styles = {{menuPortal:base=>({...base,zIndex:100,width:'80%',height:'30px',borderRadius:'5px',color:'black',outline:'none'})}}
                                        

                                    />
                </div>
                          
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
                                            <div>Team: <span className="text-sm">{ selectedFile.commit.team.nickName}</span></div>
                                            <div>Promotion: <span className="text-sm">{ selectedFile.commit.team.promotion.name}</span></div>

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
export default TeamsDocs;