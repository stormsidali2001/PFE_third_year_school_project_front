import AcceuilAdmin from "../components/AcceuilAdmin";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";

const adminDashboard = props => {
   return(
       <div>
            <HorisontalNavbar/>
            <div>
                <AcceuilAdmin/>
            </div>
       </div>
   )
}
export default adminDashboard;