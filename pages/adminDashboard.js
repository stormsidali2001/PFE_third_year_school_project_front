import { useState } from "react";
import AcceuilAdmin from "../components/AcceuilAdmin";
import HorisontalNavbar from "../components/HorisontalNavbar";

const adminDashboard = props => {
    const [ajouteEtudiant , setAjouterEtudiant] = useState (true);
    const [valideEquipe , setValideEquipe] = useState (true);
    const [finProjet , setFinProjet] = useState (true);
    const [soutenance , setSoutenance] = useState (true);
   return(
       <div>
            <HorisontalNavbar/>
            <AcceuilAdmin ajouteEtudiant = {ajouteEtudiant} valideEquipe = {valideEquipe} finProjet = {finProjet} soutenance = {soutenance}/>
       </div>
   )
}
export default adminDashboard;