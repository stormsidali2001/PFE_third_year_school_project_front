import { useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";

const chat = props => {

    const data = [
        {
            id : 1,
            nomGroupe : "Team Chat",
            url : "favicon.ico",
            messageEnvoyé : [
                {
                    id : 1 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Bonjour",
                },
                {
                    id : 2 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Je voudrais connaitre votre avis a propo ..."
                },
            ],
            messageRecu : [
                    {
                        id : 3 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Bonjour",
                    },
                    {
                        id : 4 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 5 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 6 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
            ]
        },
        {
            id : 2,
            nomGroupe : "Team Chat",
            url : "favicon.ico", messageEnvoyé : [
                {
                    id : 1 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Bonjour",
                },
                {
                    id : 2 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Je voudrais connaitre votre avis a propo ..."
                },
            ],
            messageRecu : [
                    {
                        id : 3 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Bonjour",
                    },
                    {
                        id : 4 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 5 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 6 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
            ]
        },
        {
            id : 3,
            nomGroupe : "Team Chat",
            url : "favicon.ico",
            messageEnvoyé : [
                {
                    id : 1 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Bonjour",
                },
                {
                    id : 2 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Je voudrais connaitre votre avis a propo ..."
                },
            ],
            messageRecu : [
                    {
                        id : 3 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Bonjour",
                    },
                    {
                        id : 4 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 5 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 6 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
            ]
            
        },
        {
            id : 4,
            nomGroupe : "Team Chat",
            url : "favicon.ico",
            messageEnvoyé : [
                {
                    id : 1 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Bonjour",
                },
                {
                    id : 2 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Je voudrais connaitre votre avis a propo ..."
                },
            ],
            messageRecu : [
                    {
                        id : 3 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Bonjour",
                    },
                    {
                        id : 4 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 5 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 6 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
            ]
        },
        {
            id : 5,
            nomGroupe : "Team Chat",
            url : "favicon.ico",
            messageEnvoyé : [
                {
                    id : 1 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Bonjour",
                },
                {
                    id : 2 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Je voudrais connaitre votre avis a propo ..."
                },
            ],
            messageRecu : [
                    {
                        id : 3 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Bonjour",
                    },
                    {
                        id : 4 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 5 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 6 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
            ]
        },
        {
            id : 6,
            nomGroupe : "Team Chat",
            url : "favicon.ico",
            messageEnvoyé : [
                {
                    id : 1 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Bonjour",
                },
                {
                    id : 3 ,
                    createdAt : new Date().toLocaleDateString(),
                    message : "Je voudrais connaitre votre avis a propo ..."
                },
            ],
            messageRecu : [
                    {
                        id : 2 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Bonjour",
                    },
                    {
                        id : 4 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 5 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
                    {
                        id : 6 ,
                        createdAt : new Date().toLocaleDateString(),
                        message : "Je voudrais connaitre votre avis a propo ..."
                    },
            ]
        },
    ]

    const [idDiscussion , setIdDiscussion] = useState(0);
    const [discussionOuverte , setDiscussionOuverte] = useState(false)

    return (
        <div className="bg-background h-full w-screen relative">
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <div className="flex flex-row space-x-10 font-xyz text-textcolor p-28">
                <div className="h-[80vh] w-[300px] pt-6 rounded-xl bg-white flex flex-col space-y-4 text-center shadow-md">
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
                <div className="h-[80vh] w-[90vw] flex items-center justify-center">
                    <div className={`flex flex-col h-full w-full space-y-10 items-center justify-center ${discussionOuverte === true ? "opacity-30 bg-white/50 shadow-md rounded-xl backdrop-blur-sm" : ""} relative`}>
                        <img src="chat.jpg" className="h-[70vh] w-fit object-contain mix-blend-darken"/>
                        <div className={`text-[25px] font-thin ${discussionOuverte === true ? "hidden" : "flex"}`}>Cliquer sur un groupe pour afficher les messages</div>
                        <div className={`flex-col h-full w-full space-y-10 items-center justify-center absolute ${discussionOuverte === true ? "" : ""}`}>
                            {
                                data.map((el,index) => {
                                   return (
                                       <div>
                                            {
                                                el.messageEnvoyé.map((element) => {
                                                   return (
                                                       <div>
                                                            {idDiscussion === el.id ? <div>{element.message}</div> : ""}
                                                       </div>
                                                   )
                                                })
                                           }
                                           {
                                                el.messageRecu.map((element) => {
                                                    return (
                                                        <div>
                                                            {idDiscussion === el.id ? <div>{element.message}</div> : ""}
                                                        </div>
                                                    )
                                                }) 
                                           }
                                       </div>
                                   )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default chat;