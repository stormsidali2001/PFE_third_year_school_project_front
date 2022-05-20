import { useState } from "react";
import AcceuilAdmin from "../components/AcceuilAdmin";
import AdminVerticalNavbar from "../components/AdminVerticalNavbar";
import HorisontalNavbar from "../components/HorisontalNavbar";

const adminDashboard = props => {
    const [ajouteEtudiant , setAjouterEtudiant] = useState (false);
    const [valideEquipe , setValideEquipe] = useState (false);
    const [finProjet , setFinProjet] = useState (false);
    const [soutenance , setSoutenance] = useState (false);
   return(
       <div>
            <HorisontalNavbar/>
            <AdminVerticalNavbar/>
            <AcceuilAdmin ajouteEtudiant = {ajouteEtudiant} valideEquipe = {valideEquipe} finProjet = {finProjet} soutenance = {soutenance}/>
       </div>
   )
}
export default adminDashboard;