import Image from "next/image";
import { useRef ,useEffect} from "react";
import { useOutSideContainer } from "../custom hooks/useOutSideContainer";
import MessageIcon from "../icons/MessageIcon";
import NotificationIcon from "../icons/NotificationIcon";
import Profil from "../icons/Profil";
import LastMessages from "./LastMessages";
import Notification from "./Notification";
import {useStoreState} from '../store/hooks';


const HorisontalNavbar = () => {
  
    const notificationRef =useRef(null);
    const lastMessagesRef = useRef(null);
    const {student} = useStoreState(store=>store.user)
  
    console.log(student,"//*//*//")
    const {open:openNotifications,setOpen:setOpenNotifications} = useOutSideContainer({ref:notificationRef});
    const {open:openlastMessages,setOpen:setOpenLastMessages} = useOutSideContainer({ref:notificationRef});


    return ( 
        <div className="fixed z-50 w-[80vw] left-[50%] -translate-x-1/2  ">
            <div className="w-[100%] rounded-b-[500px]  relative text-[24px] font-xyz text-textcolor bg-white h-[60px] flex flex-row   justify-between px-8 items-center drop-shadow-[8px_8px_8px_rgba(0,0,0,0.25)] ">

          <Notification
            open={openNotifications}
            ref={notificationRef}
          />
          <LastMessages
            open={openlastMessages}
            ref={lastMessagesRef}
          />

                        <div className="flex flex-row space-x-2">
                                <Profil/>
                                <div>{student?.firstName}</div>
                                <div>{student?.lastName}</div>
                        </div>
                        <div className="flex flex-row space-x-8">
                            <MessageIcon
                                className='hover:cursor-pointer' 
                                onMouseDown={()=>setOpenLastMessages(!openlastMessages)}
                            />
                            <NotificationIcon 
                                className='hover:cursor-pointer' 
                                onMouseDown={()=>setOpenNotifications(!openNotifications)}
                            /> 
                        </div>
             
            </div>
        </div> 
    )
}
export default HorisontalNavbar;