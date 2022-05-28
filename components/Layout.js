import { useEffect } from "react"
import { useStoreActions, useStoreState } from "../store/hooks"
const Layout = ({toastsRef,children,HorisontalNavbar,StudentVerticalNavbar,TeacherVerticalNavbar,AdminVerticalNavbar})=>{
    const {getUserInfo} = useStoreActions(store=>store.user)
    const user = useStoreState(store=>store.user)
    const {userType} = user;
    console.log(userType,'kakarouto')
    useEffect(async()=>{
        await getUserInfo()
    },[])

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