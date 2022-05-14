import { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SortAscIcon from "../../icons/SortAsc";
const FicheVoeux = props => {
   
    const {getUserInfo} = useStoreActions(store=>store.user)
    const [themeList,setThemeList] = useState(Array.from({ length: 10 }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `PFE projet fin d'etude ${k}`
      })));
  
    useEffect(()=>{
        getUserInfo();
    },[])
   
    const handleOnDragEnd = result=>{
        if(!result.destination){
            return;
        }
        const items = [...themeList];
        const [reorderedItem] = items.splice(result.source.index,1);
        items.splice(result.destination.index,0,reorderedItem);
        setThemeList(items)
    }
    return (
        <div>
            <HorisontalNavbar/>
            <div className="h-[200vh] bg-background min-h-screen items-center px-4 pt-[100px] flex flex-col  py-8 ">
                <StudentVerticalNavbar/>
                <div className="flex flex-col h-screen w-[90%] bg-white  text-textcolor  font-mono"> {/* list wrapper */}
                    <div className="w-full text-center text-[26px]">La fiche des voeux</div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className = 'w-[90%]  bg-[#282873]/10  px-[30px] mx-auto py-2 flex flex-col space-y-2'
          
            >
                
              {themeList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className = 'text-black bg-white shadow-lg h-[30px] px-4 rounded-[3px] flex justify-between'
                     
                    >
                        <div className="flex space-x-2 items-center">
                            <span className="flex items-center justify-center bg-blue-400 rounded-full w-[15px] h-[15px] text-[12px] text-white p-2"> {index+1}</span>
                           <span>{item.content}</span>

                        </div>
                       
                     <SortAscIcon
                        className = 'w-6 text-blue-400 ml-6'
                     />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              </div>
           
         
          )}
        </Droppable>
      </DragDropContext>
                  
                </div>
            </div>
        </div>
    )
}
export default FicheVoeux;