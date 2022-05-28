import { useEffect } from "react"
import { useStoreActions, useStoreState } from "../store/hooks"
const Layout = ({toastsRef,children,HorisontalNavbar,StudentVerticalNavbar,TeacherVerticalNavbar,AdminVerticalNavbar})=>{
    const {getUserInfo} = useStoreActions(store=>store.user)
    const user = useStoreState(store=>store.user)
    const {getLastNotificationsThunk,getNewNotificationThunk} = useStoreActions(store=>store.notificationService)
    const {socket} = useStoreState(store=>store.socketModel)
   
   
  
   
    const {userType} = user;
    console.log(userType,'kakarouto')
    useEffect(async()=>{
        await getUserInfo()
        await getLastNotificationsThunk();
    },[])

    useEffect(async ()=>{
        if(!socket) {
            console.log("socket not initialized yet");
            return;
        }
       
        console.log("zzzzzzzzzzzzzzzzzz",socket)
        await getNewNotificationThunk(toastsRef) 
      
     
    },[socket])

    return (
        <div>
            <HorisontalNavbar toastsRef={toastsRef} HorisontalNavbar={HorisontalNavbar}/>
            <div>
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
            </div>
          
            {children}
        </div>
    )
}

export default Layout;