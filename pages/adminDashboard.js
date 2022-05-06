import AcceuilAdmin from "../components/AcceuilAdmin";
import HorisontalNavbar from "../components/HorisontalNavbar";

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