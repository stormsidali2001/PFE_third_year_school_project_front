import { useState } from "react";
import AcceuilTeacher from "../components/AcceuilTeacher";
import HorisontalNavbar from "../components/HorisontalNavbar";

const teacherDashboard = props => {
    const [possedeEquipe , setPossedeEquipe] = useState(true);
    const [validationEquipes , setValidationEquipe] = useState(false)
    return (
        <div>
            <HorisontalNavbar/>
            <AcceuilTeacher possedeEquipe={possedeEquipe} validationEquipes ={validationEquipes}/>
        </div>
    )
}
export default teacherDashboard;