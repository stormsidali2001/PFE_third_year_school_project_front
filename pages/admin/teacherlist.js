import Link from 'next/link'
import { useEffect } from 'react';
import AdminVerticalNavbar from '../../components/AdminVerticalNavbar';
import HorisontalNavbar from "../../components/HorisontalNavbar";
import StudentVerticalNavbar from "../../components/StudentVerticalNavbar";
import ModificationIcon from '../../icons/modificationIcon';
import Trash from '../../icons/Trash';
import { useStoreActions, useStoreState } from '../../store/hooks';

const TeacherList = ({toastsRef}) => {
 
   const {getTeachers,deleteTeacher} = useStoreActions(store=>store.teacherListModel)
   const {teachers} = useStoreState(store=>store.teacherListModel)
   const handleDeleteTeacher = async (id)=>{
       try{


           await deleteTeacher(id);
           toastsRef.current.addMessage({text:"Ensiegnant spprimé...",mode:'Alert'})
       }catch(err){
           console.log(err);
           toastsRef.current.addMessage({text:"Ops...Probleme",mode:'Error'})
       }
    
}
   useEffect(async ()=>{
        await getTeachers();
   },[])
  
   const columns = [...Object.keys(teachers.length >=1 &&teachers[0])?.filter(el=>el!=='id')];
    return (
        <div >
            <HorisontalNavbar/>
            <AdminVerticalNavbar/>
             <div className="w-full h-full  relative flex flex-col space-y-16 items-center justify-center font-xyz text-textcolor py-[100px] ">
                <div className="text-[30px] mt-10">Liste des enseignants</div>
                <div className="flex flex-row space-x-24">
                     <div className="flex flex-rox space-x-4 items-center justify-center">
                         <div className='text-[18px]'>Choisir une promotion :</div>
                         <input className='h-[40px] w-[250px] rounded-full shadow-sm px-3' placeholder='Choisir une promotion ...'/>
                    </div>
                    <Link href="/addteacher"><button className="shadow-lg h-[40px] w-[220px] text-[18px] bg-blue-300 hover:bg-blue-400 rounded-full">+ Ajouter Enseignant </button></Link>
                 </div>
                 {
                     (teachers.length === 0)?(
                        <div>aucune donnée</div>
                     ):(
                        <table className="bg-[#282873]/10 backdrop-blur-[8px] shadow-lg  leading-normal h-fit p-4   w-[80vw]">
                        <thead>
                            <tr  className="bg-white  rounded-[10px] h-[36px]  border-b-2 ">
                                {
                                   
                                    columns.map(el=>{
                                        return(
                                            <th className="text-center">{el}</th>
                                        )
                                    })
                                   
                                   
                                }     
                                 <th className="text-center">Opérations</th>
                            </tr>
                        </thead>
                        <tbody className=" ">
                            {
                                teachers.map(row=>{
                                    return(
                                        <tr  className=" bg-white/60  rounded-[10px] border-red  border-b-2">
                                            {
                                                Object.keys(teachers[0]).filter(el=>el!=='id').map(col=>{
                                                    return(
                                                        <td className="text-center  h-[36px] ">
                                                            {row[col]}
                                                        </td>
                                                    )
                                                })
                                            }
                                            <td>
                                               <div className='flex flex-row space-x-10 items-center justify-center'>
                                                    <ModificationIcon/>
                                                    <Trash
                                                        onClick={e=>handleDeleteTeacher(row.id)}
                                                        className = 'cursor-pointer'
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                     )
                 }
              
            </div>
        </div>
    )
}
export default TeacherList;