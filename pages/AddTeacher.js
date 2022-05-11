import { useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import ArrowIcon from "../icons/ArrowIcon";
import AttachFileIcon from "../icons/AttachFileIcon";

const addTeacher = ({toastsRef}) => {
    const [oneclick , setOneClick] = useState(true)
    const [manyClick , setManyClick] = useState(false)
    const [ssn , setSsn] = useState("")
    const [email , setEmail] = useState("")
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [promotion , setPromotion] = useState("")
    const [file,setFile] = useState({})
    const extension = "csv"
    return (
       <div>
           <StudentVerticalNavbar/>
           <HorisontalNavbar/>
            <div className="bg-background h-screen w-screen relative flex items-center justify-center font-xyz text-textcolor">
                <img src="addStudent.jpg" className="h-full w-full object-contain mix-blend-darken absolute"/>
                <div className={`h-[200px] w-[450px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex-col space-y-6 items-center justify-center text-[18px] ${oneclick || manyClick === true ? "hidden" : "flex"}`}>
                    <div className="text-[23px] text-center px-10">Vous voulez ajouter un ou plusieur enseignants ?</div>
                    <div className="space-x-6">
                        <button className="h-[35px] w-[160px] rounded-full bg-[#32AFF5] text-white" onClick={()=> setOneClick(true)}>Un seul</button>
                        <button className="h-[35px] w-[160px] rounded-full bg-[#8FD4FB]" onClick={()=> setManyClick(true)}>Plusieurs</button>
                    </div>
                </div>
                <form className = {`h-[550px] w-[650px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex-col space-y-10 items-center justify-center relative text-[23px] ${oneclick === true ? "flex" : "hidden"}`}>
                    <div className="text-[35px]">Ajouter un enseignant</div>
                    <table>
                        <tr className="">
                            <td className="py-2">SSN :</td>
                            <td>
                                <input className="h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none px-3 text-[18px] font-thin" placeholder="SSN..." onChange={(e)=>{setSsn(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="py-2">Email :</td>
                            <td>
                                <input className="h-[40px] w-[230px] rounded-lg bg-white/10 backdrop-blur-sm shadow-md outline-none px-3 text-[18px] font-thin" placeholder="E-mail..." onChange={(e)=>{setEmail(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr className="">
                            <td className="py-2">Nom :</td>
                            <td>
                                <input className="h-[40px] w-[230px] rounded-lg bg-white/10 backdrop-blur-sm shadow-md outline-none px-3 text-[18px] font-thin" placeholder="Nom..." onChange={(e)=>{setFirstName(e.target.value)}}/>
                            </td>
                        </tr>
                       <tr className="">
                            <td className="py-2">Prénom :</td>
                           <td>
                                <input className="h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none px-3 text-[18px] font-thin" placeholder="Prénom..." onChange={(e)=>{setLastName(e.target.value)}}/>
                           </td>
                        </tr>
                        <tr className="">
                            <td className="py-2 pr-12">Spécialité :</td>
                            <td>
                                <input className="h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none px-3 text-[18px] font-thin" placeholder="Spécialité..." onChange={(e)=>{setPromotion(e.target.value)}}/>
                            </td>
                        </tr>
                    </table>
                    <button className="h-[40px] w-[120px] text-[20px] bg-blue-300 hover:bg-blue-400 rounded-full">Valider</button>
                    <button className="absolute bottom-[35px] left-[20px]" onClick = {(e)=>{setOneClick(false);e.preventDefault()}}>
                        <ArrowIcon/>
                    </button>
                </form>
                <form className = {`h-[500px] w-[550px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex-col space-y-10 items-center justify-center relative text-[20px] text-center px-12 ${manyClick === true ? "flex" : "hidden"}`}>
                    <div className="text-[30px]">Ajouter plusieurs enseignants</div>
                    <div className="text-[17px] font-thin">Ajouter un ficher contenant plusieurs étudiant en cliquant sur le lien ci dessous.</div>
                    <label className=" w-fit p-8 flex items-center justify-center flex-col cursor-pointer transition-transform ease-in bg-white/10 backdrop-blur-3xl rounded-3xl" for = "file">
                        <div className=" flex justify-center items-center p-4 w-fit">         
                        <label for='file'  className="flex space-x-2 group cursor-pointer">
                                <AttachFileIcon className='w-6 text-[#5375E2]/80 group-hover:text-[#5375E2]/60'/>
                                <div> Joindre des fichiers </div>
                            </label>
                        </div>
                        <img src = {extension === "csv" ? "csv.jpg" : "excel.png"} className={`h-[80px] w-[80px] object-contain opacity-40 ${file ? "flex" : "hidden"}`}/>
                        <div className="w-full text-center break-words text-sm">{file?.name}</div>
                     </label>
                     <input id="file" className="hidden" type="file" multiple onChange={(e) => {setFile(e.target.files[0])}} optional/>
                    <button className="h-[40px] w-[120px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full" type="submit">Valider</button>
                    <button className="absolute bottom-[35px] left-[20px]" onClick = {(e)=>{setManyClick(false);e.preventDefault()}}>
                        <ArrowIcon/>
                    </button>
                </form>
            </div>
       </div>
    )
}
export default addTeacher;