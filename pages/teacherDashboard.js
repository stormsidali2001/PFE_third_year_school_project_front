import { useStoreActions } from "../store/hooks";
import { useEffect, useState } from "react";
import AcceuilTeacher from "../components/AcceuilTeacher";
import HorisontalNavbar from "../components/HorisontalNavbar";

const teacherDashboard = ({toastsRef}) => {
    const [possedeEquipe , setPossedeEquipe] = useState(true);
    const [validationEquipes , setValidationEquipe] = useState(false)
    const {getUserInfo} = useStoreActions(store=>store.user)
    useEffect(async ()=>{
        await getUserInfo();
    },[])
    return (
        <div>
            <HorisontalNavbar toastsRef={toastsRef}/>
            <AcceuilTeacher possedeEquipe={possedeEquipe} validationEquipes ={validationEquipes}/>
        </div>
    )
}
export default teacherDashboard;