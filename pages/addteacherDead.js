
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import AjouterEnseignant from "../components/AjouterEnseignant";


const AddTeacher = props => {


    return (
        <>
            <HorisontalNavbar/>
        <div className="h-[200vh] bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8 ">
            <StudentVerticalNavbar/>
            <AjouterEnseignant/>

        </div>
        </>
    )
}
export default AddTeacher;
