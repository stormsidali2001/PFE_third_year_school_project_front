import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";

const addStudent = props => {
    return (
       <div>
           <StudentVerticalNavbar/>
           <HorisontalNavbar/>
            <div className="bg-background h-screen w-screen relative flex items-center justify-center font-xyz">
                <img src="addStudent.jpg" className="h-full w-full object-contain mix-blend-darken absolute"/>
                <div className="h-[200px] w-[450px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex flex-col space-y-6 items-center justify-center text-[18px]">
                    <div className="text-[23px] text-center px-10">Vous voulez ajouter un ou plusieur étudiant ?</div>
                    <div className="space-x-6">
                        <button className="h-[35px] w-[160px] rounded-full bg-[#32AFF5] text-white*">Un seul</button>
                        <button className="h-[35px] w-[160px] rounded-full bg-[#8FD4FB]">Plusieurs</button>
                    </div>
                </div>
            </div>
       </div>
    )
}
export default addStudent;