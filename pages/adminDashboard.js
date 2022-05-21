import { useEffect, useState } from "react";
import AcceuilAdmin from "../components/AcceuilAdmin";
import AdminVerticalNavbar from "../components/AdminVerticalNavbar";
import HorisontalNavbar from "../components/HorisontalNavbar";
import {useStoreActions} from '../store/hooks';

const adminDashboard = ({toastsRef}) => {
    const [ajouteEtudiant , setAjouterEtudiant] = useState (false);
    const [valideEquipe , setValideEquipe] = useState (false);
    const [finProjet , setFinProjet] = useState (false);
    const [soutenance , setSoutenance] = useState (false);
    const {getUserInfo} = useStoreActions(store=>store.user)
    useEffect( async()=>{
        await getUserInfo();
    },[])
   return(
       <div>
            <HorisontalNavbar toastsRef={toastsRef}/>
            <AdminVerticalNavbar/>
            <AcceuilAdmin ajouteEtudiant = {ajouteEtudiant} valideEquipe = {valideEquipe} finProjet = {finProjet} soutenance = {soutenance}/>
       </div>
   )
}
export default adminDashboard;