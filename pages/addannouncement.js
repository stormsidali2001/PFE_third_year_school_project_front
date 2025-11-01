
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import AjouterAnnouncemnt from "../components/AjouterAnnouncemnt";

const AddAnnouncemnt = ({toastsRef}) => {


    return (
        <>
        <HorisontalNavbar />
        <StudentVerticalNavbar />
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <AjouterAnnouncemnt toastsRef={toastsRef}/>
        </div>
        </>
    )
}
export default AddAnnouncemnt;
