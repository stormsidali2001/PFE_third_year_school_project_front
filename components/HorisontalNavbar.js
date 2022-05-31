import Image from "next/image";
import { useRef ,useEffect} from "react";
import { useOutSideContainer } from "../custom hooks/useOutSideContainer";
import MessageIcon from "../icons/MessageIcon";
import NotificationIcon from "../icons/NotificationIcon";
import Profil from "../icons/Profil";
import LastMessages from "./LastMessages";
import Notification from "./Notification";
import {useStoreActions, useStoreState} from '../store/hooks';
import Link from 'next/link'
import { useRouter } from "next/router";


const HorisontalNavbar = ({toastsRef}) => {
    const router = useRouter()
    const countRef = useRef(null)
  
    const notificationRef =useRef(null);
    const lastMessagesRef = useRef(null);
    const user = useStoreState(store=>store.user)
    const{userType,student,teacher,entreprise,admin} = user;
    const entity =  user[userType] ;
    
  
    const {open:openNotifications,setOpen:setOpenNotifications} = useOutSideContainer({ref:notificationRef});
    const {open:openlastMessages,setOpen:setOpenLastMessages} = useOutSideContainer({ref:notificationRef});

    const {totalNotificationCount} = useStoreState(store=>store.notificationService)

    const {logoutThunk} = useStoreActions(store=>store.user)

    
    return ( 
        <div className="fixed z-50 w-[80vw] left-[50%] -translate-x-1/2  ">
            <div className="w-[100%] rounded-b-[500px] relative text-[24px] font-xyz text-textcolor bg-white h-[60px] flex flex-row   justify-between px-8 items-center drop-shadow-[8px_8px_8px_rgba(0,0,0,0.25)] ">

          <Notification
            open={openNotifications}
            ref={notificationRef}
            toastsRef = {toastsRef}
          />
          <LastMessages
            open={openlastMessages}
            ref={lastMessagesRef}
          />

                        <div className="flex flex-row space-x-2">
                            
                                <Profil
                                            className='cursor-pointer'
                                            onClick={async()=>{await logoutThunk();router.push('/login')}}
                                    />
                              
                               {
                                   userType === 'entreprise' ?(
                                    <div>{entity?.name}</div>
                                   ):(
                                       <>
                                          <div>{entity?.firstName}</div>
                                          <div>{entity?.lastName}</div>
                                       </>
                                    
                                   )
                               }
                                
                        </div>
                        <div className="flex flex-row space-x-8">
                            <MessageIcon
                                className='cursor-pointer' 
                                onMouseDown={()=>setOpenLastMessages(!openlastMessages)}
                            />
                            <div className="relative ">
                            <NotificationIcon 
                                className='hover:cursor-pointer' 
                                onMouseDown={()=>setOpenNotifications(!openNotifications)}
                            /> 
                            <div  className="absolute w-4 h-4 rounded-full bg-blue-400 -right-2 -top-2 text-white text-[8px] flex justify-center items-center font-bold">{totalNotificationCount}</div>


                            </div>
                          
                        </div>
             
            </div>
        </div> 
    )
}
export default HorisontalNavbar;