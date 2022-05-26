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
      
        
        
        if(promotions?.length === 0) await getAllPromotionsThunk()
        
      
      
            if(!promotion || promotion?.length === 0) {
               
                promotions?.length > 0 && await getThemesThunk()
                return;
            }
            const label = promotions.find(el=>el.id=== promotion)?.name
            if(!label) {
               
                return ;
            }
          
            setChoosenPromotion({value:promotion,label})
            await getThemesThunk(promotion)

        
        

    },[promotion,promotions])
   
   
    const handleChange = async option=>{
      
        router.push(`/themes?promotion=${option.value}`)
       
    }


 
   

    
   
   
   

    let suggestedBy;
    let themes = themesData.map(th=>{
        const newObj = {...th};
        if(th.promotion){
            newObj.promotion = th.promotion.name;
        }
        if(th.suggestedByTeacher){
            suggestedBy = 'teacher'
            newObj.suggestedByTeacher = th.suggestedByTeacher.firstName+' '+th.suggestedByTeacher.lastName;
            delete newObj.suggestedByEntreprise;
            
        }else if(th.suggestedByEntreprise){
            suggestedBy = 'entreprise'
            newObj.suggestedByEntreprise = th.suggestedByEntreprise.name;
            delete newObj.suggestedByTeacher;
        }


        return newObj;

    });
    console.log(themes,'**** th')


    if(!themes  ) return 'loading'
  

  


    return (
        <div>
       <HorisontalNavbar/>
       <StudentVerticalNavbar/>
        <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor">
            <img src="themeStudent.png"  className="object-contain mix-blend-darken absolute inset-1/4"/>
            <div className="flex flex-row space-x-72 items-center justify-center pt-10">
            <div className="text-[30px]">Liste des Themes </div>
                
            
               
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
           { themes?.length !== 0 &&  <div className="  h-fit p-4   w-[80vw] flex flex-wrap gap-4">
                    {
                        themes?.map(({title,description,suggestedByTeacher,suggestedByEntreprise,promotion,id})=>{
                            return (
                               <div 
                        className="h-[300px]  w-[250px]  flex flex-col items-center bg-gradient-to-b from-blue-100 to-blue-300 hover:from-blue-100 hover:to-blue-200   rounded-lg shadow-lg relative text-textcolor cursor-pointer group"
                        onClick={()=>id&&router.push(`/themes/${id}`)}
                        
                        
                        >
                    <div className="  h-full w-full"> 
                        <img src ="vote.jpg" className="object-contain h-full w-full mix-blend-darken opacity-50"/>
                    </div>
                    <div className="absolute space-y-4  flex items-center justify-center flex-col w-full h-full">
                        {
                            promotion&&(
                                <div className="text-[22px] w-[90%] mx-2  text-center">
                                     {promotion}
                                 </div>

                            )
                        }
                   
                    <div className="text-[22px] w-[90%] mx-2  text-center">
                        {title}
                    </div>
                        <div className="text-[14px] break-all   px-2 mx-2 bg-background/10 transition-all ease-in group-hover:bg-background/30 backdrop-blur-sm w-[90%]   py-1 h-[20%] flex flex-col">
                            <span className="font-[500] font-mono text-[15px]">Par{ suggestedBy === 'teacher'?" Enseignant":" Entreprise"}:</span>
                        {

                            suggestedBy === 'teacher'?(
                                <span className="text-center">{suggestedByTeacher}</span>
                            ):(

                                <span className="text-center">{suggestedByEntreprise}</span>

                            )
                        }
                        
                        </div>
                      
                        <div className="text-[14px] break-all   px-2 mx-2 bg-background/10 transition-all ease-in group-hover:bg-background/30 backdrop-blur-sm w-[90%]   py-1 h-[30%] flex flex-col">
                            <span className="font-[500] font-mono text-[15px]">Description:</span>
                            <span className=" h-[100%] break-all px-2 overflow-hidden ">{description}fsakfsjlfsajlfasj;lfasjl;fasjfsafsjfsfsj;fsaj;asfjfsajsfajkasfljsafkjsfakjlfsjklfaskjlasfkjsfjklfsaljksfajfsajfsakjllfksfajjfsfasjklfslakjfsjlksfjalkasfjlsafkjlkfslkljfsajksfalkjfsakjsfajlkfslkjfsakjsafjklfasjl;fsaj;</span>
                        
                        </div>
                       
                            
                       
                    </div>
                </div>
                
                            )
                            
                        })
                    }
            </div>   }
        
       
        </div>
   </div>
    )
}
export default Themes;