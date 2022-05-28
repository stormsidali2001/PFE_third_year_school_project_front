
import { useEffect, useState } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import ModalPortal from "../components/ModalPortal";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import Table from "../components/Table";
import { useStoreState ,useStoreActions} from "../store/hooks";

const StudentList = ({toastsRef})=>{
    const {getNoTeamStudentList,sendTeamInvitation} = useStoreActions(store=>store.noTeamStudentListModel)

    const {students} = useStoreState(store=>store.noTeamStudentListModel)
    const [modalOpen,setModalOpen] = useState(false)
    const [description,setDescription] = useState('');
    const [recieverId,setRecieverId] = useState('')
    const {getUserInfo} = useStoreActions(store=>store.user)
    useEffect(()=>{
        getNoTeamStudentList()
        getUserInfo()
    },[])
    const handleClick = (recieverId)=>{
         
              setModalOpen(!modalOpen)
              setDescription('')
              setRecieverId(recieverId)
            
           
     
    }
    const submitForm = async (e)=>{
        e.preventDefault();
        const res   = await sendTeamInvitation({
            description,
            recieverId


        })
        console.log(res,'///////////////////////////...')
 if(res.status === 'Success'){
   
    toastsRef.current.addMessage({mode:'Alert',text:res.message})
 }else if( res.status === 'Error'){
    toastsRef.current.addMessage({mode:'Error',text:res.message})
 }


    }
    const Column =({onClick})=> (
        <button onClick={onClick} className="bg-[#5375E2]/80 backdrop-blur-[8px]   font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider">
        invite</button>
    )
    return(
        <>
        <ModalPortal
            handleClose={setModalOpen}
            open={modalOpen}
        >
            <form className="w-full h-full flex flex-col items-center space-y-4" onSubmit={submitForm}>
                <h1 className=" text-2xl text-textcolor font-semibold">Description:</h1>
                <div className="w-[90%] text-center text-sm">Please enter an invitation description ...</div>
               <textarea 
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className='shadow-lg  placeholder-black rounded-[5px] px-2 text-black p-1 h-[60px] resize-none scroll-none w-[90%] bg-gray-200'
                    placeholder="description..."
                    
               />
               <button type="submit"  className="bg-[#5375E2]/80 backdrop-blur-[8px]   font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider">Submit</button>
            </form>
        </ModalPortal>
      
        <div  className="bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8">
            <Table
                data={students}
              
                handleClick={handleClick}
                extraColumns = {[{name:'invitation',Column}]}
            />
        </div>
        </>
    )
}

export default StudentList;