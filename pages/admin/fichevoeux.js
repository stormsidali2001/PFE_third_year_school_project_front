import { useEffect, useState ,useRef} from "react";
import { useStoreActions } from "easy-peasy";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import SortAscIcon from "../../icons/SortAsc";
const FicheVoeux = props => {
   const listeRef = useRef(null);
    const {getUserInfo} = useStoreActions(store=>store.user)
    const [themeList,setThemeList] = useState(Array.from({ length: 10 }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `PFE projet fin d'etude ${k}`
      })));
  const [dragging,setDragging] = useState(false);
  const currentNode = useRef();
    useEffect(()=>{
        getUserInfo();
    },[])
   
    const handleDragEnd = e =>{
      console.log(e.target,"handleDragEnd")
     

        currentNode.current.style.visibility = ''
        setDragging(false)
     
    
    }
    const handleDragStart = e=>{
      console.log(e.target,"handleDragStart")
     
      currentNode.current = e.target;
      setTimeout(()=>{
        setDragging(true)

        currentNode.current.style.visibility = 'hidden'
      },0)
      console.log(e.target.getAttribute("data-item-id"))
    

    }
    const handleDragEnter = e =>{
      console.log(e.target,"handleDragEnter")
      if(e.target === currentNode.current) {
        console.log("same node")
        return;
      }
        const startIndex = currentNode.current.getAttribute('data-item-id')
        const endIndex = e.target.getAttribute('data-item-id')
        console.log("start index",startIndex,"end index ",endIndex)
        const newThemeList = [...themeList];
        const tmp = {...newThemeList[endIndex]};
        newThemeList[endIndex] = {...newThemeList[startIndex]};
        newThemeList[startIndex] = tmp;
        console.log(newThemeList)
        setThemeList(newThemeList)



    }
    
    return (
        <div >
            <HorisontalNavbar/>
            <div className="h-[200vh] bg-background min-h-screen items-center px-4 pt-[100px] flex flex-col  py-8 ">
                <StudentVerticalNavbar/>
                <div className="flex flex-col h-screen w-[90%] bg-white  text-textcolor  font-mono"> {/* list wrapper */}
                    <div className="w-full text-center text-[26px]">La fiche des voeux</div>
                
    
            <div
              className = 'w-[90%]  bg-[#282873]/10  px-[30px] mx-auto py-2 flex flex-col space-y-2'
          
            >
                
              {themeList.map((item, index) => (
              
                
                    <div
                  
                      className = 'text-black bg-white cursor-pointer h-[30px] px-4 rounded-[3px] flex justify-between'
                      onDragStart={handleDragStart}
                      onDragEnter = {dragging&&handleDragEnter}
                      onDragEnd = {dragging&&handleDragEnd}
                      draggable
                      data-item-id = {index}
                      
                    >
                        <div className="flex space-x-2 items-center">
                            <span className="flex items-center justify-center bg-blue-400 rounded-full w-[15px] h-[15px] text-[12px] text-white p-2"> {index+1}</span>
                           <span>{item.content}</span>
          
                        </div>
                       
                     <SortAscIcon
                        className = 'w-6 text-blue-400 ml-6'
                     />
                   
                    </div>
                
              ))}
            
              </div>
      
                       
                </div>
            </div>
        </div>
    )
}
export default FicheVoeux;