import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import { useStoreActions, useStoreState } from "../store/hooks"
const Layout = ({toastsRef,children,HorisontalNavbar,StudentVerticalNavbar,TeacherVerticalNavbar,AdminVerticalNavbar})=>{
    const {getUserInfo} = useStoreActions(store=>store.user)
    const user = useStoreState(store=>store.user)
    const {getLastNotificationsThunk,getNewNotificationThunk,setNotification} = useStoreActions(store=>store.notificationService)
    const {socket} = useStoreState(store=>store.socketModel)
    const router = useRouter();

    const [runOnce,setRunOnce] = useState(false)

   
    const currentRoute = router?.route?.split('/')?.slice(1);
  
    const partOne = currentRoute?.length >0?currentRoute[0]:undefined

   
  
   
    const {userType} = user;
  
    useEffect(async()=>{
        await getUserInfo()
        await getLastNotificationsThunk();
    },[])

    useEffect(async ()=>{
        if(!socket ) {
            console.log("zzzzzzzzzzz socket not initialized yet");
            return;
        }
       
       
  
   if(!socket.hasListeners("new_notification") && runOnce ===false)  {
    setRunOnce(true)
    console.log("zzzzzzzzzzz",socket,socket.hasListeners("new_notification"))

    socket.on("new_notification", notfication =>{
                  
        toastsRef.current.addMessage({text:notfication.description,mode:'Alert'})
        setNotification(notfication)
    })

    return ()=>{
        socket.removeAllListeners("new_notification");
    }
}   

    
      
     
    },[socket])

   
   

    return (
        <div>
           { partOne !== ''&&partOne !== 'login' &&<HorisontalNavbar toastsRef={toastsRef} HorisontalNavbar={HorisontalNavbar}/>}
           {  partOne !== ''&&partOne !== 'login' &&<div>
            {
                userType === 'admin'?(
                    <AdminVerticalNavbar/>

                ):(

                    userType === 'student'?(
                        <StudentVerticalNavbar/>
                        
                    ):(
                        userType === 'teacher'?(
                            <TeacherVerticalNavbar/>
                        ):<></>
                    )
                )
            }
            </div>}
          
            {children}
        </div>
    )
}

export default Layout;