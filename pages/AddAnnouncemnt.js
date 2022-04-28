
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import AjouterAnnouncemnt from "../components/AjouterAnnouncemnt";


const AddAnnouncemnt = props => {


    return (
        <>
            <HorisontalNavbar/>
        <div className="h-[200vh] bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8 ">
            <StudentVerticalNavbar/>
            <AjouterAnnouncemnt/>

            

        </div>
        </>
    )
}
export default AddAnnouncemnt;
