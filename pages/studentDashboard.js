import AcceuilStudent from "../components/AcceuilStudent";
import CardsStudent from "../components/CardsStudent";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";

const studentDashboard = props => {
    return (
        <>
            <HorisontalNavbar/>
        <div className="h-[200vh] bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8 ">
            <StudentVerticalNavbar/>
            <AcceuilStudent/>
            <CardsStudent/>
        </div>
        </>
    )
}
export default studentDashboard;