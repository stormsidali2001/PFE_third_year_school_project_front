import { useEffect, useRef, useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import { useStoreActions, useStoreState } from "../store/hooks";
import { Send, ArrowLeft } from "lucide-react";

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
    const [runOnce,setRunOnce] = useState(false)
    const messageBoxRef = useRef()
    

    useEffect(async()=>{
        await getMessages();
       
    },[])
    useEffect(async()=>{
       if(!socket) return;

       if(!runOnce){
        socket?.on("teamMessageToClient",payload=>{
          
            setDiscussion(discussion=>[...discussion,{id : 1 , chatId : 1 , createdAt : new Date().toLocaleDateString(), sender : payload.sender, message : payload.txt}]);
           
        })
        setRunOnce(true)

       }
       
    },[socket])
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
  
     if(userType !== 'student'){
        return "not a student";
    }

    const handleSubmitMessage = async() => {
        
        if (newMessage !== "") {
             socket?.emit("teamMessageToServer",{
                txt:newMessage,
                sender:student
            })
            setNewMessage('')
           
            const msgBox =   messageBoxRef.current
            console.log(msgBox,messageBoxRef)
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight-300;
         

        }
    }

    return (
        <div>
            <HorisontalNavbar />
            <StudentVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex gap-0">
                    
                    {/* Sidebar - Conversations List */}
                    <div className={`w-full md:w-72 bg-white flex flex-col border-r border-gray-200 ${discussionOuverte ? 'hidden md:flex' : 'flex'}`}>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="text-2xl font-bold" style={{color: '#1A2562'}}>Messages</h2>
                        </div>
                        
                        {/* Conversations */}
                        <div className="flex-1 overflow-y-auto">
                            {data.map((el, index) => (
                                <div 
                                    key={index}
                                    className="p-3 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50"
                                    style={{
                                        backgroundColor: idDiscussion === el.id ? '#F4FCFF' : 'white'
                                    }}
                                    onClick={() => {
                                        setDiscussionOuverte(true);
                                        setIdDiscussion(el.id);
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={el.url} 
                                            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                            alt="group"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm truncate" style={{color: '#1A2562'}}>
                                                {el.nomGroupe}
                                            </h3>
                                            <p className="text-xs text-gray-500 truncate">
                                                {discussion.length > 0 ? discussion[discussion.length - 1].message : 'No messages yet'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className={`flex-1 flex flex-col bg-white ${discussionOuverte ? 'flex' : 'hidden md:flex'}`}>
                        
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                            <div className="flex items-center gap-3">
                                {discussionOuverte && (
                                    <button
                                        onClick={() => setDiscussionOuverte(false)}
                                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <ArrowLeft className="w-5 h-5" style={{color: '#1A2562'}} />
                                    </button>
                                )}
                                <img 
                                    src={data.find(d => d.id === idDiscussion)?.url} 
                                    className="w-10 h-10 rounded-full object-cover"
                                    alt="group"
                                />
                                <h2 className="text-base font-semibold" style={{color: '#1A2562'}}>
                                    {data.find(d => d.id === idDiscussion)?.nomGroupe || 'Team Chat'}
                                </h2>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div 
                            ref={messageBoxRef}
                            className="flex-1 overflow-y-auto p-4 space-y-3"
                            style={{backgroundColor: '#ffffff'}}
                        >
                            {discussion.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-center">
                                    <div>
                                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{backgroundColor: '#F4FCFF'}}>
                                            <svg className="w-8 h-8" style={{color: '#5375E2'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium">No messages yet</p>
                                        <p className="text-gray-300 text-xs mt-1">Start a conversation!</p>
                                    </div>
                                </div>
                            ) : (
                                discussion.map((element, index) => {
                                    const isCurrentUser = student?.id === element?.sender?.id;
                                    const prevMessage = index > 0 ? discussion[index - 1] : null;
                                    const showAvatar = !prevMessage || prevMessage?.sender?.id !== element?.sender?.id;
                                    
                                    return (
                                        idDiscussion === element.chatId ? (
                                            <div key={index} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} gap-2`}>
                                                {!isCurrentUser && showAvatar && (
                                                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor: '#5375E2'}}>
                                                        {element?.sender?.firstName?.charAt(0)}{element?.sender?.lastName?.charAt(0)}
                                                    </div>
                                                )}
                                                {!isCurrentUser && !showAvatar && (
                                                    <div className="w-8 flex-shrink-0"></div>
                                                )}
                                                
                                                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                                                    {!isCurrentUser && showAvatar && (
                                                        <p className="text-xs font-semibold mb-1 px-3" style={{color: '#1A2562'}}>
                                                            {element?.sender?.firstName}
                                                        </p>
                                                    )}
                                                    <div 
                                                        className="max-w-xs md:max-w-sm rounded-2xl px-4 py-2 break-words shadow-sm"
                                                        style={{
                                                            backgroundColor: isCurrentUser ? '#5375E2' : '#E5E7EB',
                                                            color: isCurrentUser ? 'white' : '#000000'
                                                        }}
                                                    >
                                                        <p className="text-sm">{element.message}</p>
                                                    </div>
                                                    <p className={`text-xs mt-1 px-3 ${isCurrentUser ? 'text-gray-500' : 'text-gray-400'}`}>
                                                        {new Date(element.createdAt).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : null
                                    );
                                })
                            )}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 border-t border-gray-100 bg-white">
                            <form onSubmit={(e) => {e.preventDefault(); handleSubmitMessage();}} className="flex gap-2 items-end">
                                <input 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Aa"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:border-boutton focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none"
                                    style={{color: '#000000'}}
                                />
                                <button 
                                    type="submit"
                                    className="p-3 rounded-full transition-all hover:scale-110 flex-shrink-0"
                                    style={{backgroundColor: '#5375E2'}}
                                >
                                    <Send className="w-5 h-5 text-white" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default chat;