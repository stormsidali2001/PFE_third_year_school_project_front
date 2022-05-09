import { useEffect, useState } from "react";
import AcceuilStudent from "../components/AcceuilStudent";
import CardsStudent from "../components/CardsStudent";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import { useStoreActions } from "../store/hooks";

const studentDashboard = props => {
    const [possedeEquipe , setPossedeEquipe] = useState(true)
    const [debutProjet , setDebutProjet] = useState(true)
    const {getUserInfo} = useStoreActions(store=>store.user)
    useEffect(()=>{
        getUserInfo();
    },[])
    return (
        <div>
            <HorisontalNavbar/>
            <div className="h-[200vh] bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8 ">
                <StudentVerticalNavbar possedeEquipe = {possedeEquipe} debutProjet = {debutProjet}/>
                <AcceuilStudent possedeEquipe = {possedeEquipe} debutProjet = {debutProjet}/>
                <CardsStudent/>
            </div>
        </div>
    )
}
export default studentDashboard;