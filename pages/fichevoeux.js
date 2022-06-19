import { useEffect, useState ,useRef} from "react";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import HorisontalNavbar from "../components/HorisontalNavbar";
import { useStoreActions } from "../store/hooks";

import SortAscIcon from "../icons/SortAsc";
import AdminVerticalNavbar from "../components/AdminVerticalNavbar";
import { useStoreState } from "easy-peasy";
const FicheVoeux = ({toastsRef}) => {
  const {getThemesThunk} = useStoreActions(store=>store.themesModel)
  const {themes} = useStoreState(store=>store.themesModel)

   const listeRef = useRef(null);
    const user = useStoreState(store=>store.user)
    const promotionId = user?.student?.promotion?.id
    const [themeList,setThemeList] = useState(themes);
    const [dragging,setDragging] = useState(false);
    const currentNode = useRef();
    const dragNode = useRef()
    const {submitWishList} = useStoreActions(store=>store.wishListModel)
    useEffect(async ()=>{
      if(!promotionId) return;
     const data =  await getThemesThunk(promotionId)
     setThemeList(data)
    },[promotionId])
   
    const handleDragEnd = e =>{
      console.log("handleDragEnd :")
   

       setDragging(false)
       dragNode.current.removeEventListener("dragend",handleDragEnd)
       dragNode.current = null;
       currentNode.current = null;
  

     
    
    }
    const handleDragStart = (e,index)=>{
      console.log("handleDragStart index:",index,e.target)
     
      currentNode.current = index;
      dragNode.current = e.target;
       dragNode.current.addEventListener("dragend",handleDragEnd)
       setTimeout(()=>{

         setDragging(true)
       },0)

    

    }
    const handleDragEnter = (e,index) =>{
      console.log(e.target,"handleDragEnter")
      if(index === currentNode.current) {
        console.log("same node")
        return;
      }
        const startIndex = currentNode.current;
        const endIndex = index;
        if(!Number.isInteger(index)){
          return;
        }
        console.log("start index",startIndex,"end index ",endIndex)

        setThemeList(themeList=>{
          const newThemeList= [...themeList]
          const tmp ={...newThemeList[startIndex]}
          newThemeList[startIndex] = {...newThemeList[endIndex]}
          newThemeList[endIndex] = tmp;
          currentNode.current = endIndex;
          return newThemeList;
        })
      


    }
    const handleSubmitWishList = async(e)=>{
      e.preventDefault();
      try{
        await submitWishList({
          wishes:themeList.map(({id},index)=>{
            return {
              order:index,
              themeId:id
            }
          })
        })
        toastsRef.current.addMessage({mode:'Alert',text:"c'est fait!!"})

      }catch(err){
        console.log(err)
        toastsRef.current.addMessage({text:err.response.data.message,mode:'Error'})
      }
     
      
    }
    return (
        <div >
            <HorisontalNavbar/>
            <div className="h-[200vh] bg-background min-h-screen items-center px-4 pt-[100px] flex flex-col  py-8 ">
             
                <div className="flex flex-col h-screen w-[90%] bg-white  text-textcolor  font-mono"> {/* list wrapper */}
                    <div className="w-full text-center text-[26px]">La fiche des voeux</div>
                
    
            <div
              className = 'w-[90%]  bg-[#282873]/10  px-[30px] mx-auto py-2 flex flex-col space-y-2'
          
            >
                
              {themeList.map((item, index) => (
              
                
                    <div
                  
                      className ={ `text-black bg-white cursor-pointer h-[30px] px-4 rounded-[3px]  justify-between flex ${dragging&&(index === currentNode.current)?'invisible':'visible'}`}
                      onDragStart={(e)=>handleDragStart(e,index)}
                      onDragEnter={(e)=>dragging?handleDragEnter(e,index):null}
                    
                      draggable = {true}
                  
                      
                    >
                        <div className="flex space-x-2 items-center">
                            <span className="flex items-center justify-center bg-blue-400 rounded-full w-[15px] h-[15px] text-[12px] text-white p-2"> {index+1}</span>
                           <span>{item.title}</span>
          
                        </div>
                       
                     <SortAscIcon
                        className = 'w-6 text-blue-400 ml-6'
                     />
                   
                    </div>
                
              ))}
            
              </div>
              <div className="w-[90%] mx-auto flex items-center justify-end ">
                  <button
                  onClick = {handleSubmitWishList}
                    className="bg-blue-300 px-2 py-1 rounded-[10px] mt-2"
                  >Envoyer</button>
              </div>
      
                       
                </div>
            </div>
        </div>
    )
}
export default FicheVoeux;