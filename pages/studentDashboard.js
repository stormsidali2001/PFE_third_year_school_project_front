import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";

const studentDashboard = props => {
    return (
        <div className="h-[200vh] bg-background">
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
           
        </div>
    )
}
export default studentDashboard;