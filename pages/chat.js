import { useEffect, useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import ArrowIcon from "../icons/ArrowIcon";
import Send from "../icons/Send";
import { useStoreActions, useStoreState } from "../store/hooks";

const chat = props => {

    const userId = 1
    const [idDiscussion , setIdDiscussion] = useState(0);
    const [discussionOuverte , setDiscussionOuverte] = useState(false);
    const [newMessage , setNewMessage] = useState ("")
    const [discussion , setDiscussion] = useState(
        [
           
         
        ],
    )
    const data = [
        {
            id : 1,
            nomGroupe : "Team Chat",
            url : "favicon.ico",
        },
    ]
    const {sendMessage,getMessages} = useStoreActions(store=>store.teamMessagesModel)
    const user = useStoreState(store=>store.user)
    const {messages} = useStoreState(store=>store.teamMessagesModel)
    const {socket} = useStoreState(store=>store.socketModel)
    const {userType } = user;
   
    const {student} = user;
 
    useEffect(async()=>{
        await getMessages();
       
    },[])
    useEffect(async=>{
        setDiscussion(messages.map(msg=>{

            return {
                id:msg.id,
                chatId:1,
                createdAt:msg.createdAt,
                message:msg.message,
                sender:msg.owner,

            }
        }))
    },[messages])
    useEffect(async()=>{
    

        socket?.on("teamMessageToClient",payload=>{
          
            setDiscussion(discussion=>[...discussion,{id : 1 , chatId : 1 , createdAt : new Date().toLocaleDateString(), sender : payload.sender, message : payload.txt}]);
        })
        
       
    },[socket])
     if(userType !== 'student'){
        return "not a student";
    }

    const handleSubmitMessage = async() => {
        if (newMessage !== "") {
            await sendMessage({
                txt:newMessage,
                sender:student
            })
            setNewMessage('')
         

        }
    }

    return (
        <div className="bg-background min-h-screen w-screen relative">
         
            <div className="flex flex-row md:space-x-10 font-xyz text-textcolor pr-4 pb-4 pt-[100px] md:pl-[100px] pl-4">
                <div className={`md:h-fit min-h-[80vh] md:min-h-[400px] min-w-full  md:min-w-[250px] pt-6 rounded-xl bg-white flex flex-col space-y-4 text-center shadow-md ${discussionOuverte === true ? 'md:flex hidden'  : 'flex'}`}>
                    <div className={`pb-4 text-[15px] md:text-[18px] px-4`}>Cliquez sur un groupe pour démarrer une discussion</div>
                    {
                        data.map((el , index) => {
                            return (
                                <div className="flex flex-row items-center space-x-1 md:space-x-4 px-8 cursor-pointer" onClick={()=>{setDiscussionOuverte(true) ; setIdDiscussion(el.id)}}>
                                    <img src={el.url} className="md:h-[40px] w-[25px] h-[25px] md:w-[40px] object-contain rounded-full "/>
                                    <div className="text-[12px] md:text-[16px]">{el.nomGroupe}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`h-[450px] min-w-[90vw] md:min-w-[70vw] flex items-center justify-center relative ${discussionOuverte === true ? "" : "mix-blend-darken hidden md:flex"}`}
                style={{
                    backgroundImage:"url('./chat.jpg')",
                    backgroundSize:'contain',
                    backgroundRepeat:'no-repeat',
                    backgroundAttachment:'fixed',
                    backgroundPositionX:'50%',
                    transform:'scale(1)',
                }}
                >
                    <div className={`flex flex-col h-[450px] w-full space-y-10 items-center justify-center absolute top-0 z-40 ${discussionOuverte === true ? " p-2 md:p-12 bg-white/90 backdrop-blur-sm shadow-xl rounded-xl scrollbar-width-[2px] scrollbar scrollbar-thumb-blue-500 py-4 hover:scrollbar-track-blue-200 overflow-x-hidden" : ""}`}
                   
                    >
                    
                        <div className={`text-[25px] font-thin absolute bottom-4 ${discussionOuverte === true ? "hidden" : "md:flex hidden "}`}>Cliquer sur un groupe pour afficher les messages</div>
                        <div className={`flex-col h-full w-full space-y-10`}>
                            
                                <div>
                                {
                                    discussion.map((element) => {
                                        console.log(element,student)
                                        return (
                                            <div className={`flex-col  flex h-full w-full space-y-10 ${student?.id === element?.sender?.id ? "items-end" : "items-start"}`}
                                           >
                                                {idDiscussion === element.chatId ? 
                                                    <div className={`z-40 rounded-2xl py-1 px-4 my-[2px] space-y-2 break-all max-w-[60vw] md:max-w-[300px] ${student?.id === element?.sender?.id ? "bg-[#36b5ff] text-white" : " bg-[#8FD4FB] "} flex flex-col`}>
                                                         <div className="text-[12px] ">par: {element?.sender?.firstName+' '+element?.sender?.lastName}</div>
                                                        <div>{element.message}</div>
                                                       
                                                </div> : ""}
                                              
                                            </div>
                                        )
                                    })
                                } </div>         
                        </div>
                       
                    </div>
                {discussionOuverte &&  <button 
                        className={`absolute top-2 left-2 z-50 `}
                        onClick={(e) => {setDiscussionOuverte(false)}}
                    >
                        <ArrowIcon/>
                    </button>}
                    <form onSubmit={(e) => {e.preventDefault();handleSubmitMessage();}} className= {`items-center justify-center  -bottom-16 absolute flex  h-fit w-full flex-row  ${discussionOuverte === true ? "flex" : "hidden"} z-40`}>
                        <input value={newMessage}  className={`bg-zinc-100 h-[30px] md:h-[45px] w-2/3 md:w-10/12 rounded-2xl shadow-xl px-4`} onChange={(e)=> {setNewMessage(e.target.value)}} placeholder = "Ecrivez un message ..."/>
                        <button><Send/></button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default chat;