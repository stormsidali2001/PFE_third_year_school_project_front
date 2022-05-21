import Link from "next/link"
import { useEffect, useState } from "react"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import { useStoreActions, useStoreState } from "../../store/hooks"
import Select from 'react-select'
import { useRouter } from "next/router";



const Suggestions = ({toastsRef}) => {

    const router = useRouter();
    console.log(router.query,'********')
    const {promotion} = router.query;

   
    const {getThemeSuggestionsThunk,validateThemeSuggestionThunk} = useStoreActions(store=>store.themeSuggestionsModel)
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const {themeSuggestions:themeSuggestionsData} = useStoreState(store=>store.themeSuggestionsModel)
      const [chosenPromotion,setChoosenPromotion] = useState(null)
    useEffect(async()=>{
       await getAllPromotionsThunk();
       await getThemeSuggestionsThunk()
        if(promotion){

            setChoosenPromotion({value:promotion,label:promotions.find(el=>el.id === promotion)})
        }
       
    },[])
    useEffect(async()=>{
       
        if(!chosenPromotion) return
        router.push(`/suggestions?promotion=${chosenPromotion.value}`)
        
        await getThemeSuggestionsThunk(chosenPromotion.value)

    },[chosenPromotion])

    const hanldeValidateThemeSuggestion = async(themeId)=>{
        try{
            await validateThemeSuggestionThunk(themeId)
            toastsRef.current.addMessage({text:"c'est fait !!",mode:'Alert'})
            await getThemeSuggestionsThunk(chosenPromotion.value)
        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"ops... Erreur",mode:'Error'})
        }
    }
   

    
   
  
   


    let themeSuggestions = themeSuggestionsData.map(th=>{
        const newObj = {...th};
        if(th.promotion){
            newObj.promotion = th.promotion.name;
        }
        if(th.suggestedByTeacher){
            newObj.suggestedByTeacher = th.suggestedByTeacher.firstName+' '+th.suggestedByTeacher.lastName;
            delete newObj.suggestedByEntreprise;
            
        }else if(th.suggestedByEntreprise){
            newObj.suggestedByEntreprise = th.suggestedByEntreprise.name;
            delete newObj.suggestedByTeacher;
        }


        return newObj;

    });
    console.log(themeSuggestions,'**** th')
    //  if(themeSuggestions.length === 0) return <div>Aucune donnée</div>
     const columns = themeSuggestions.length !== 0?[...Object.keys(themeSuggestions[0]).filter(el=>el!=='id')]:[];


   
    

  


    return (
        <div>
       <HorisontalNavbar/>
       <StudentVerticalNavbar/>
        <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor">
            <img src="themeStudent.png"  className="object-contain mix-blend-darken absolute inset-1/4"/>
            <div className="flex flex-row space-x-72 items-center justify-center pt-10">
            <div className="text-[30px]">Liste des suggestions</div>
                
            
                {/* <Link href="/addstudent1"><button className={`shadow-lg h-[40px] w-[220px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full items-center justify-center ${typeUtilisateur === "admin" ? "flex" : "hidden"}`}>+ Ajouter suggestion </button></Link> */}
             </div>
             <div className="w-[300px]">
                <Select
                                    placeholder="Promotion" 
                                        onChange={(option)=>{setChoosenPromotion(option)}}
                                        options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                                        isLoading = {!promotions}
                                        value={chosenPromotion}
                                        styles = {{menuPortal:base=>({...base,zIndex:100,width:'80%',height:'30px',borderRadius:'5px',color:'black',outline:'none'})}}
                                        

                                    />

                </div>
           { themeSuggestions.length !== 0 &&  <table className="bg-[#282873]/10 backdrop-blur-[8px] shadow-lg  leading-normal h-fit p-4   w-[80vw]">
                <thead>
                    <tr   className="bg-white  rounded-[10px] h-[36px]  border-b-2 ">
                        {
                           
                            columns.map(el=>{
                                return(
                                    <th className="text-center">{el}</th>
                                )
                            })
                           
                           
                        }     
                         <th className="text-center">Options</th>
                    </tr>
                </thead>
                <tbody className="">
                    {

                        themeSuggestions.map((row,rindex)=>{
                            console.log(row,'777')
                           
                            return(
                                <tr key={`${rindex}`}  className=" bg-white/60  rounded-[10px] border-red  border-b-2">
                                    {
                                        
                                       columns.map((col,cindex)=>{
                                           const value = row[col];
                                           console.log(col,value,'777')
                                        
                                        if(value === true){
                                            value = 'true'
                                        }else if(value === false){
                                            value = 'false'
                                        }
                                  
                                            return(
                                                <td 
                                                className="text-center truncate h-[36px] "
                                                key={`${rindex} ${cindex}`}
                                                >
                                                    {value}
                                                </td>
                                            )
                                        })
                                    }
                                    <td className="flex items-center justify-center space-x-4">
                                         <Link href={`/`}><button className="shadow-lg h-[25px] mt-1 w-[100px] text-[15px] bg-blue-300 hover:bg-blue-400 rounded-full">Voir plus</button></Link> 
                                      {  !row['validated']&& <button 
                                            className="shadow-lg h-[25px] mt-1 w-[100px] text-[15px] bg-blue-300 hover:bg-blue-400 rounded-full"
                                            onClick={(e)=>{e.preventDefault();hanldeValidateThemeSuggestion(row['id'])}}
                                        >Valider
                                        </button>}
                                    </td> 
                                 
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>   }
        
       
        </div>
   </div>
    )
}
export default Suggestions;