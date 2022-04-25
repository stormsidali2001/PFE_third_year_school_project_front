import { forwardRef,useEffect } from "react";
import DotsIcon from "../icons/DotsIcon";
import ErrorIcon from "../icons/ErrorIcon";
import { useStoreActions, useStoreState } from "../store/hooks";


const Notification = forwardRef(({open},ref)=>{
    const {getLastNotificationsThunk} = useStoreActions(store=>store.notificationService)
    const {notifications,totalNotificationCount} = useStoreState(store=>store.notificationService)
    useEffect(()=>{
        getLastNotificationsThunk();
    },[])
  
    return(
        <div ref={ref} className={`absolute font-roboto bg-white rounded-[10px] w-[400px] h-fit pt-2 pb-2 drop-shadow-[2px_5px_4px_rgba(0,0,0,0.25)] flex flex-col right-0 bottom-0 translate-y-[102%]  items-center space-y-2 ${open?'scale-100':'scale-0'} `}>

        <div className="absolute right-2 top-2 w-fit p-1 aspect-square rounded-full bg-[#CAEAFE] text-[12px] flex justify-center items-center font-medium">
                +<span className="">{totalNotificationCount}</span>
        </div>

        <div className="text-[#1A2562] text-[24px] font-[400] flex space-x-2 items-center"><ErrorIcon className='w-[40px] text-[#1A2562]/20'/><span>Notifications:</span></div>
        <div className="w-[100%] flex flex-col space-y-2 overflow-scroll max-h-[300px]">

            {
                notifications.map(({description,id,createdAt})=>{
                    return(
                        <div key={id} className="h-[60px] mx-auto w-[90%] rounded-[5px] bg-[#E4F1F9] text-[14px] px-2 py-2  font-normal flex flex-col ">
                        <div className="h-[50px]"> {description}</div>      
                        <div className="h-[10px] mb-[1px] text-[12px] text-[#1A2562]/60 ml-auto mb-0">at: {createdAt.toLocaleString()}</div>
                        </div>

                    )
                })
            }
        </div>
        <div className="flex text-[13px] items-center space-x-1 group">
            <DotsIcon 
                className='w-[28px] text-[#1A2562]/60 font-medium cursor-pointer group-hover:text-[#1A2562]/30 transition-all ease-in'

            />
           <span className="cursor-pointer group-hover:underline underline-offset-1 transition-all ease-in decoration-[#1A2562]/60">See all Notifications</span> 
        </div>
      
       

    </div>
    )
}
)
export default Notification;