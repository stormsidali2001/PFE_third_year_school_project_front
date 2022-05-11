import { useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import Send from "../icons/Send";

const chat = props => {

    const userId = 1
    const [idDiscussion , setIdDiscussion] = useState(0);
    const [discussionOuverte , setDiscussionOuverte] = useState(false);
    const [newMessage , setNewMessage] = useState ("")
    const [discussion , setDiscussion] = useState(
        [
            {
                id : 1 ,
                chatId : 1,
                createdAt : new Date().toLocaleDateString(),
                proprietaire : 1 ,
                message : "Bonjour1",
            },
            {
                id : 2 ,
                chatId : 1,
                createdAt : new Date().toLocaleDateString(),
                proprietaire : 2 ,
                message : "Bonjour2",
            },
            {
                id : 3 ,
                chatId : 1,
                createdAt : new Date().toLocaleDateString(),
                proprietaire : 2 ,
                message : "Bonjour3",
            },
            {
                id : 4 ,
                chatId : 1,
                createdAt : new Date().toLocaleDateString(),
                proprietaire : 1 ,
                message : "Bonjour4",
            },
            {
                id : 5 ,
                chatId : 1,
                createdAt : new Date().toLocaleDateString(),
                proprietaire : 2 ,
                message : "Bonjour5ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp",
            },
            {
                id : 6 ,
                chatId : 1,
                createdAt : new Date().toLocaleDateString(),
                proprietaire : 1 ,
                message : "Bonjour6 jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
            },
            {
                id : 7 ,
                chatId : 1,
                createdAt : new Date().toLocaleDateString(),
                proprietaire : 1 ,
                message : "Bonjour7",
            },
        ],
    )
    const data = [
        {
            id : 1,
            nomGroupe : "Team Chat",
            url : "favicon.ico",
        },
    ]

    const handleSubmitMessage = () => {
        if (newMessage !== "") {
            setDiscussion([...discussion,{id : 1 , chatId : idDiscussion , createdAt : new Date().toLocaleDateString(), proprietaire : userId, message : newMessage}]);
            setNewMessage('')
        }
    }

    return (
        <div className="bg-background h-full w-screen relative">
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <div className="flex flex-row space-x-10 font-xyz text-textcolor p-28">
                <div className="h-[80vh] w-[350px] pt-6 rounded-xl bg-white flex flex-col space-y-4 text-center shadow-md">
                    <div className="pb-4 text-[18px] px-4">Cliquez sur un groupe pour démarrer une discussion</div>
                    {
                        data.map((el , index) => {
                            return (
                                <div className="flex flex-row items-center space-x-4 px-8 cursor-pointer" onClick={()=>{setDiscussionOuverte(true) ; setIdDiscussion(el.id)}}>
                                    <img src={el.url} className="h-[40px] w-[40px] object-contain rounded-full"/>
                                    <div>{el.nomGroupe}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`h-[80vh] w-[90vw] flex items-center justify-center relative ${discussionOuverte === true ? "" : "mix-blend-darken"}`}>
                <img src="chat.jpg" className={`h-[70vh] w-fit object-contain mix-blend-darken ${discussionOuverte === true ? "opacity-10" : ""}`}/>
                    <div className={`flex flex-col min-h-full w-full space-y-10 items-center justify-center absolute z-50 ${discussionOuverte === true ? "p-12 bg-white shadow-md rounded-xl backdrop-blur-lg overflow-y-scroll overflow-x-hidden" : ""}`}>
                        <img src="chat.jpg" className={`h-[70vh] w-fit object-contain mix-blend-darken absolute ${discussionOuverte === true ? "opacity-10" : ""}`}/>
                        <div className={`text-[25px] font-thin absolute bottom-4 ${discussionOuverte === true ? "hidden" : "flex"}`}>Cliquer sur un groupe pour afficher les messages</div>
                        <div className={`flex-col h-full w-full space-y-10`}>
                            <div>
                                {
                                    discussion.map((element) => {
                                        return (
                                            <div className={`flex-col flex h-full w-full space-y-10 ${userId === element.proprietaire ? "items-end" : "items-start"}`}>
                                                {idDiscussion === element.chatId ? 
                                                    <div className={`z-50 rounded-2xl py-1 px-4 my-[2px] space-y-2 break-all max-w-[300px] ${userId === element.proprietaire ? "bg-[#36b5ff] text-white" : " bg-[#8FD4FB] "}`}>{element.message}
                                                </div> : ""}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className= {`pb-8 fixed flex h-fit w-full flex-row justify-start ${discussionOuverte === true ? "flex" : "hidden"} z-50`}>
                                <input value={newMessage} className={`bg-zinc-100 h-[45px] w-10/12 rounded-2xl shadow-md px-4`} onChange={(e)=> {setNewMessage(e.target.value)}} placeholder = "Ecrivez un message ..."/>
                                <button onClick={() => handleSubmitMessage()}><Send/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default chat;