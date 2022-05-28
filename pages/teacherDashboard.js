import { useStoreActions } from "../store/hooks";
import { useEffect, useState } from "react";
import AcceuilTeacher from "../components/AcceuilTeacher";
import HorisontalNavbar from "../components/HorisontalNavbar";

const teacherDashboard = ({toastsRef}) => {
    const {getUserInfo} = useStoreActions(store=>store.user)
    useEffect(async ()=>{
        await getUserInfo();
    },[])
    return (
        <div>
        <div className="lg:h-screen h-fit min-w-screen bg-background min-h-screen items-center">
            <AcceuilTeacher/>
        </div>
    </div>
    )
}
export default teacherDashboard;