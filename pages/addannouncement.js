
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import AjouterAnnouncemnt from "../components/AjouterAnnouncemnt";

const AddAnnouncemnt = ({toastsRef}) => {


    return (
        <>
        <div className=" bg-background min-h-screen items-center flex flex-col justify-center relative">
            <img src='/announcement-background.jpg' className="h-[500px] object-contain mix-blend-darken "/>
            <AjouterAnnouncemnt toastsRef={toastsRef}/>
        </div>
        </>
    )
}
export default AddAnnouncemnt;
