import { useStoreActions } from "../store/hooks";
import { useEffect } from "react";
import AcceuilTeacher from "../components/AcceuilTeacher";
import HorisontalNavbar from "../components/HorisontalNavbar";

const TeacherDashboard = ({toastsRef}) => {
    const {getUserInfo} = useStoreActions(store=>store.user)
    useEffect(async ()=>{
        await getUserInfo();
    },[])
    return (
        <div>
            <HorisontalNavbar/>
            <AcceuilTeacher/>
        </div>
    )
}
export default TeacherDashboard;