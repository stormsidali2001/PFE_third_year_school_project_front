import { useEffect, useState } from "react";
import AcceuilStudent from "../components/AcceuilStudent";
import CardsStudent from "../components/CardsStudent";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import { useStoreActions } from "../store/hooks";

const studentDashboard = ({toastsRef}) => {
    const [possedeEquipe , setPossedeEquipe] = useState(false)
    const [debutProjet , setDebutProjet] = useState(false)
    const {getUserInfo} = useStoreActions(store=>store.user)
    useEffect(async ()=>{
        await getUserInfo();
        console.log('useEffect')
    },[])
    return (
        <div>
          
            <div className="h-[200vh] pl-[100px] bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8 ">
                <AcceuilStudent possedeEquipe = {possedeEquipe} debutProjet = {debutProjet}/>
                <CardsStudent/>
            </div>
        </div>
    )
}
export default studentDashboard;