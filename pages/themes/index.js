import Link from "next/link"
import { useEffect, useState,useRef } from "react"
import HorisontalNavbar from "../../components/HorisontalNavbar"
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar"
import { useStoreActions, useStoreState } from "../../store/hooks"
import Select from 'react-select'
import { useRouter } from "next/router";



const Themes = ({toastsRef}) => {
    const renders = useRef(null)
    const router = useRouter();
    console.log(router.query,'********')
    const {promotion} = router.query;
    renders?.current++

   
    const {getThemesThunk} = useStoreActions(store=>store.themesModel)
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const {themes:themesData} = useStoreState(store=>store.themesModel)
      const [chosenPromotion,setChoosenPromotion] = useState(null)
    useEffect(async()=>{
       await getAllPromotionsThunk();
       await getThemesThunk()
       
    
       
       
    },[])
    
   
    const handleChange = async option=>{
        setChoosenPromotion(option)
        router.push(`/suggestions?promotion=${option.value}`)
         await getThemesThunk(option.value)
    }

 
   

    
   
    return "sssssssssss"
   


    let themes = themesData.map(th=>{
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
    console.log(themes,'**** th')
    //  if(themes.length === 0) return <div>Aucune donnée</div>
     const columns = themes.length !== 0?[...Object.keys(themes[0]).filter(el=>el!=='id')]:[];


   
  

  


    return (
        <div>
       <HorisontalNavbar/>
       <StudentVerticalNavbar/>
        <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor">
            <img src="themeStudent.png"  className="object-contain mix-blend-darken absolute inset-1/4"/>
            <div className="flex flex-row space-x-72 items-center justify-center pt-10">
            <div className="text-[30px]">Liste des Themes </div>
                
            
                {/* <Link href="/addstudent1"><button className={`shadow-lg h-[40px] w-[220px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full items-center justify-center ${typeUtilisateur === "admin" ? "flex" : "hidden"}`}>+ Ajouter suggestion </button></Link> */}
             </div>
             <div className="w-[300px]">
                 {/* {renders?.current} */}
                <Select
                                    placeholder="Promotion" 
                                        onChange={(option)=>{handleChange(option)}}
                                        options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                                        isLoading = {!promotions}
                                        value={chosenPromotion}
                                        styles = {{menuPortal:base=>({...base,zIndex:100,width:'80%',height:'30px',borderRadius:'5px',color:'black',outline:'none'})}}
                                        

                                    />

                </div>
           { themes.length !== 0 &&  <div className="bg-[#282873]/10 backdrop-blur-[8px] shadow-lg  leading-normal h-fit p-4   w-[80vw]">
               
            </div>   }
        
       
        </div>
   </div>
    )
}
export default Themes;