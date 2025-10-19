import { useEffect, useState } from "react";
import AcceuilAdmin from "../components/AcceuilAdmin";


const AdminDashboard = ({toastsRef}) => {
   
    
   return(
    <div>
        <div className="lg:h-screen h-fit min-w-screen bg-background min-h-screen items-center">
            <AcceuilAdmin/>
        </div> 
    </div>
   )
}
export default AdminDashboard;