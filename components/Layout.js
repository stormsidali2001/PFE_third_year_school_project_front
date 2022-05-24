import { useEffect } from "react"
import { useStoreActions, useStoreState } from "../store/hooks"
import {HorisontalNavbar} from './HorisontalNavbar'

const Layout = ({toastsRef,children})=>{
    const {getUserInfo} = useStoreActions(store=>store.user)
    const user = useStoreState(store=>store.user)
    const {userType} = user;
    useEffect(async()=>{
        await getUserInfo()
    },[])

    return (
        <div>
            {/* <HorisontalNavbar toastsRef={toastsRef}/> */}
            
            {/* {
                userType === 'admin'?(
                    <AdminVerticalNavbar/>

                ):(

                    userType === 'student'?(
                        <StudentVerticalNavbar/>
                        
                    ):''
                )
            }
            */}
            {children}
        </div>
    )
}

export default Layout;