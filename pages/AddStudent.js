import { useStoreActions, useStoreState } from "../store/hooks";
import { useEffect, useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import ArrowIcon from "../icons/ArrowIcon";
import AttachFileIcon from "../icons/AttachFileIcon";
import readXlsxFile from 'read-excel-file'
import Select from 'react-select'

const addStudent = ({toastsRef}) => {

    const [oneclick , setOneClick] = useState(false)
    const [manyClick , setManyClick] = useState(false)
    const [matricule , setMatricule] = useState("")
    const [email , setEmail] = useState("")
    const [firstName , setFirstName] = useState("")
    const [lastName , setLastName] = useState("")
    const [dob , setDob] = useState("20-04-2001")
    const [file,setFile] = useState({})
    const {addSingleStudent,addMultipleStudents} = useStoreActions(store=>store.adminStudentListModel)
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const [loading,setLoading] = useState(false)
    const [chosenPromotion,setChoosenPromotion] = useState(null)
    useEffect(async()=>{
        await getAllPromotionsThunk();
    },[])
    const handleAddSingleStudent = async e=>{
        e.preventDefault();
        if(!chosenPromotion    ||  email === '' || firstName === '' || lastName === '' || dob === '' ){
            toastsRef.current.addMessage({text:"remplir tout les champs",mode:'Error'})
            return;
        }
      
        try{
            
            setLoading(true)
            await addSingleStudent({
                firstName,
                lastName,
                email,
                code:matricule,
                dob:dob,
                promotionId:chosenPromotion.value
            })
            toastsRef.current.addMessage({text:"Etudiant ajouté...",mode:'Alert'})
            setLoading(false)
            
        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"Ops...erreur",mode:'Error'})
            setLoading(false)
        }
        
    }
    const handleAddMultipleStudents = async e=>{
        e.preventDefault();
        try{
            setLoading(true)
            await addMultipleStudents(
                file
               )
            toastsRef.current.addMessage({text:"Etudiants ajouté...",mode:'Alert'})
            setLoading(false)
            
        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"Ops...erreur",mode:'Error'})
            setLoading(false)
        }
        
    }
  
    const extension = "csv";
    const convertToArrayOfObjects = rows=>{
        const headerColsExist = new Set();
        if(rows.length ===0){
            toastsRef.current.addMessage({text:"le document est vide",mode:'Error'})
            return []
        }
        rows[0].forEach(col=>{
            headerColsExist.add(col)
            
        })

        if(!headerColsExist.has('firstName') || !headerColsExist.has('lastName') || !headerColsExist.has('code') || !headerColsExist.has('email') || !headerColsExist.has('dob')){
            toastsRef.current.addMessage({text:"un attribut est absent dans a tete de document excel",mode:'Error'})
            return []

        }
      return   rows.slice(1).map(row=>{
            const obj = {};
            row.forEach((col,index)=>{
                obj[rows[0][index]] =col 
            })
            return obj;
        })
    }
    const handleFileChange = async e=>{
        const file = e.target.files[0];
       
         const rows = await readXlsxFile(file);
         setFile(convertToArrayOfObjects(rows).map(el=>{return {...el,dob:new Date(el.dob).toJSON().slice(0,10)}}));


    
    }
    return (
       <div>
           <StudentVerticalNavbar/>
           <HorisontalNavbar toastsRef={toastsRef}/>
            <div className="bg-background h-screen w-screen relative flex items-center justify-center font-xyz text-textcolor">
                <img src="addStudent.jpg" className="h-full w-full object-contain mix-blend-darken absolute"/>
                <div className={`h-[200px] w-[450px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex-col space-y-6 items-center justify-center text-[18px] ${oneclick || manyClick === true ? "hidden" : "flex"}`}>
                    <div className="text-[23px] text-center px-10">Vous voulez ajouter un ou plusieur étudiant ?</div>
                    <div className="space-x-6">
                        <button className="h-[35px] w-[160px] rounded-full bg-[#32AFF5] text-white" onClick={()=> setOneClick(true)}>Un seul</button>
                        <button className="h-[35px] w-[160px] rounded-full bg-[#8FD4FB]" onClick={()=> setManyClick(true)}>Plusieurs</button>
                    </div>
                </div>
                <form className = {`h-[550px] w-[650px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex-col space-y-10 items-center justify-center relative text-[23px] ${oneclick === true ? "flex" : "hidden"}`} onSubmit={handleAddSingleStudent}>
                    <div className="text-[35px]">Ajouter un étudiant</div>
                    <table>
                        <tr className="">
                            <td className="py-2">Matricule :</td>
                            <td>
                                <input
                                     className="h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none px-3 text-[18px] font-thin" placeholder="Matricule..." 
                                     onChange={(e)=>{setMatricule(e.target.value)}}
                                     value={matricule}
                                />
                            </td>
                        </tr>
                        <tr className="">
                            <td className="py-2">Promotion :</td>
                            <td>
                                <Select
                                     className=" z-50 h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none px-3 text-[18px] font-thin" placeholder="Matricule..." 
                                     onChange={(option)=>{setChoosenPromotion(option)}}
                                     options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                                     isLoading = {!promotions}
                                     value={chosenPromotion}
                                     styles = {{menuPortal:base=>({...base,zIndex:100})}}
                                    

                                />
                            </td>
                        </tr>
                        <tr className="">
                            <td className="py-2">Email :</td>
                            <td>
                                <input className="h-[40px] w-[230px] rounded-lg bg-white/10 backdrop-blur-sm shadow-md outline-none px-3 text-[18px] font-thin" placeholder="E-mail..." onChange={(e)=>{setEmail(e.target.value)}}
                                 value={email}
                                />
                            </td>
                        </tr>
                        <tr className="">
                            <td className="py-2">Nom :</td>
                            <td>
                                <input className="h-[40px] w-[230px] rounded-lg bg-white/10 backdrop-blur-sm shadow-md outline-none px-3 text-[18px] font-thin" placeholder="Nom..." onChange={(e)=>{setFirstName(e.target.value)}}
                                value={firstName}
                                />
                            </td>
                        </tr>
                       <tr className="">
                            <td className="py-2">Prénom :</td>
                           <td>
                                <input className="h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none px-3 text-[18px] font-thin" placeholder="Prénom..." onChange={(e)=>{setLastName(e.target.value)}}
                                value={lastName}
                                />
                           </td>
                        </tr>
                        <tr className="">
                            <td className="py-2 pr-12">Date de naissance:</td>
                            <td>
                                <input type='date' className="h-[40px] w-[230px] rounded-lg bg-white/10 shadow-md backdrop-blur-sm outline-none px-3 text-[18px] font-thin"  onChange={(e)=>{setDob(e.target.value)}}
                                value={dob}
                                />
                            </td>
                        </tr>
                    </table>
                    {
                         loading?(
                            <svg role="status" class="h-[60px] lg:w-[360px] min-w-[250px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
                        ):(
                            <button className="h-[40px] w-[120px] text-[20px] bg-blue-300 hover:bg-blue-400 rounded-full">Valider</button>
                        )
                    }
                   
                    <button className="absolute bottom-[35px] left-[20px]" onClick = {(e)=>{setOneClick(false);e.preventDefault()}}>
                        <ArrowIcon/>
                    </button>
                </form>
                <form 
                    className = {`h-[500px] w-[550px] bg-white/70 backdrop-blur-sm shadow-lg rounded-xl flex-col space-y-10 items-center justify-center relative text-[20px] text-center px-12 ${manyClick === true ? "flex" : "hidden"}`}
                    onSubmit={handleAddMultipleStudents}
                
                >
                    <div className="text-[30px]">Ajouter plusieurs étudiant</div>
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
                     <input id="file" className="hidden" type="file" multiple onChange={handleFileChange} optional/>
                    <button className="h-[40px] w-[120px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full" type="submit">Valider</button>
                    <button className="absolute bottom-[35px] left-[20px]" onClick = {(e)=>{setManyClick(false);e.preventDefault()}}>
                        <ArrowIcon/>
                    </button>
                </form>
            </div>
       </div>
    )
}
export default addStudent;