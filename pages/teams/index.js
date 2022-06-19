import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Select from "react-select"
import { useStoreActions, useStoreState } from "../../store/hooks"

const TeamList = props => {
    const router = useRouter();
     const {promotion} = router.query;
     console.log("kkkkkk",promotion)

    const {getTeamsList} = useStoreActions(store=>store.teamListModel)
    const {teamsList:teamsData} =useStoreState(store=>store.teamListModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)   
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)         
    const [choosenPromotion,setChoosenPromotion]  = useState(null)             
  
   useEffect(async()=>{
      
        
        
    if(promotions?.length === 0) await getAllPromotionsThunk()
    
  
  
        if(!promotion || promotion?.length === 0) {
           console.log('kkkk',"1")
           promotions?.length > 0 && await getTeamsList();
            return;
        }
        const label = promotions.find(el=>el.id=== promotion)?.name
        if(!label) {
            console.log('kkkk',"1")
           
            return ;
        }
        console.log('kkkk',"1")
        setChoosenPromotion({value:promotion,label})
          await getTeamsList(promotion);

    
    

},[promotion,promotions])

 
   let teamsList = teamsData.map(el=>{
       return {
           ...el,
           theme:el?.theme?.title
       }
   })
   console.log(teamsList,'******')
   
   const handleChange =  option=>{
      
    router.push(`/teams?promotion=${option.value}`)
   
}

   
    const columns = [...Object.keys(teamsList.length >0 &&teamsList[0])?.filter(el=>el !=='id')];
    return (
        <div>
           
            <div className="bg-background h-fit py-4 w-screen relative flex flex-col items-center space-y-6 font-xyz text-textcolor">
            
            <img src="themeStudent.png"  className="object-contain mix-blend-darken absolute inset-1/4"/>
                
                <div className="text-[30px] pt-10">Liste des Equipes</div>
                <div className="bg-white/60 backdrop-blur-[2px] shadow-lg w-fit px-6 h-fit py-4 flex flex-col pl-4">
                   <div className=" font-semibold">Les promotion dont tout les equipes sont validées:</div>
                   <div className="flex space-x-4 w-full">
                           {
                                promotions.map(p=>{
                                    return(
                                        <div className="flex space-x-4 ">
                                            {p.allTeamsValidated&& p.name}
                                        </div>
                                    ) 
                                })
                            }
                   </div>
                   <div className=" font-semibold">Les promotion dont tout les equipes sont non validées:</div>
                   <div className="flex space-x-4">
                           {
                                promotions.map(p=>{
                                    return(
                                        <div className="flex space-x-4">
                                            {!p.allTeamsValidated&& p.name}
                                        </div>
                                    ) 
                                })
                            }
                   </div>
                  
                </div>
                <div className="w-[300px]">
                    <Select
                                        placeholder="Promotion" 
                                            onChange={(option)=>{handleChange(option)}}
                                            options={promotions?.map(el=>{return {value:el.id,label:el.name}})}
                                            isLoading = {!promotions}
                                            value={choosenPromotion}
                                            styles = {{menuPortal:base=>({...base,zIndex:100,width:'80%',height:'30px',borderRadius:'5px',color:'black',outline:'none'})}}
                                            

                                        />

                </div>
              
                    
             { teamsList.length >0&&  <table className="bg-[#282873]/10 backdrop-blur-[8px] shadow-lg leading-normal h-fit p-4 w-[80vw]">
                    <thead>
                        <tr  className="bg-white  rounded-[10px] h-[36px]  border-b-2 ">
                            {
                               
                                columns.map(el=>{
                                    return(
                                        <th className={`text-center`}>{el}</th>
                                    )
                                })
                               
                               
                            }    
                             <th className="text-center">Options</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {
                            teamsList.map(row=>{
                              
                                return(
                                    <tr  className=" bg-white/60  rounded-[10px] border-red  border-b-2 hover:opacity-80 cursor-pointer">
                                        {
                                            Object.keys(teamsList[0]).filter(el=>el!=='id').map(col=>{
                                                let value = "";
                                                if(col === 'complete' ||  col === 'peut_soutenir'){
                                                    value = row[col]?'oui':'non';
                                                }else {
                                                    value = row[col]?row[col]:'___'
                
                                                }
                                                return(
                                                    <td className="text-center truncate h-[36px] ">
                                                        {
                                                          value
                                                        
                                                        }
                                                    </td>
                                                    
                                                )
                                            })
                                        }
                                         
                                      <td className="flex items-center space-x-4 justify-center">
                                            <Link href={`/teams/${row.id}`}><button className="shadow-lg h-[25px] mt-1 w-[100px] text-[15px] bg-blue-300 hover:bg-blue-400 rounded-full">Voir plus</button></Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>}
            </div>
       </div>
    )
}
export default TeamList