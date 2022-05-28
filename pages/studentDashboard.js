import { useEffect, useState } from "react";
import AcceuilStudent from "../components/AcceuilStudent";
import CardsStudent from "../components/CardsStudent";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import { useStoreActions } from "../store/hooks";

const studentDashboard = ({toastsRef}) => {

    const {getUserInfo} = useStoreActions(store=>store.user)
    useEffect(async ()=>{
        await getUserInfo();
        console.log('useEffect')
    },[])
    return (
        <div>
            <div className="lg:h-screen h-fit min-w-screen bg-background min-h-screen items-center flex flex-col ">
                <AcceuilStudent/>
            </div>
        </div>
    )
}
export default studentDashboard;