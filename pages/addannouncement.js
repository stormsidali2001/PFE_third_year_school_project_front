
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import AjouterAnnouncemnt from "../components/AjouterAnnouncemnt";


const AddAnnouncemnt = ({toastsRef}) => {


    return (
        <>
        <div className="h-[200vh] bg-background min-h-screen items-center flex flex-col">
            <HorisontalNavbar/>
            <StudentVerticalNavbar/>
            <AjouterAnnouncemnt toastsRef={toastsRef}/>
        </div>
        </>
    )
}
export default AddAnnouncemnt;
