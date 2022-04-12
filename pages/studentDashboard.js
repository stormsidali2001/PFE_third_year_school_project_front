import AcceuilStudent from "../components/AcceuilStudent";
import CardsStudent from "../components/CardsStudent";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";

const studentDashboard = props => {
    return (
        <div className="h-full bg-background">
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <AcceuilStudent/>
            <CardsStudent/>
        </div>
    )
}
export default studentDashboard;