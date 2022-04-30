import AcceuilEntreprise from "../components/AcceuilEntreprise";
import HorisontalNavbar from "../components/HorisontalNavbar";

const adminDashboard = props => {
   return(
       <div>
            <HorisontalNavbar/>
            <div>
                <AcceuilEntreprise/>
            </div>
       </div>
   )
}
export default adminDashboard;