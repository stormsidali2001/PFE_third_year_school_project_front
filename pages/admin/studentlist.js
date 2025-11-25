import Link from 'next/link'
import { useEffect } from 'react';
import AdminVerticalNavbar from '../../components/AdminVerticalNavbar';
import HorisontalNavbar from "../../components/HorisontalNavbar";
import { useStoreActions, useStoreState } from '../../store/hooks';
import { Edit2, Trash2, Plus, Search } from 'lucide-react';

const studentList = ({toastsRef}) => {
   const {getStudents,deleteStudent} = useStoreActions(store=>store.adminStudentListModel)
   const {students:StudentsData} = useStoreState(store=>store.adminStudentListModel)
   
   const handleDeleteStudent = async (id)=>{
       try{
           await deleteStudent(id);
           toastsRef.current.addMessage({text:"Étudiant supprimé...",mode:'Alert'})
       }catch(err){
           console.log(err);
           toastsRef.current.addMessage({text:"Erreur...",mode:'Error'})
       }
   }
   
   useEffect(async ()=>{
        await getStudents();
   },[])
   
   let students = StudentsData?.map(student=>{  
       return{
           ...student,
           promotion:student.promotion.name,
       }
    })
    
   if(students.length === 0) return <div style={{color: '#000000'}} className="font-roboto text-center mt-32">Aucune donnée</div>
   const columns = [...Object.keys(students[0]).filter(el=>el!=='id')];
   
    return (
        <div>
            <HorisontalNavbar/>
            <AdminVerticalNavbar/>
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto">
                <div className="px-4 sm:px-6 lg:px-8 ml-16 max-w-[calc(100vw-5rem)]">
                    {/* Header */}
                    <div className="mb-8 sm:mb-12 text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{color: '#000000'}}>
                            Liste des Étudiants
                        </h1>
                        <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                    </div>

                    {/* Filters and Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 items-stretch sm:items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0 max-w-md">
                            <Search className="w-5 h-5 flex-shrink-0" style={{color: '#5375E2'}} />
                            <input 
                                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-base focus:border-boutton focus:ring-1 focus:ring-boutton transition-colors" 
                                placeholder="Rechercher une promotion..." 
                                style={{color: '#000000'}}
                            />
                        </div>
                        <Link href="/admin/addstudent">
                            <button className="px-4 sm:px-6 py-3 bg-boutton text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 justify-center whitespace-nowrap flex-shrink-0">
                                <Plus className="w-5 h-5 flex-shrink-0" />
                                <span className="hidden sm:inline text-sm">Ajouter Étudiant</span>
                                <span className="sm:hidden text-sm">Ajouter</span>
                            </button>
                        </Link>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr style={{backgroundColor: '#FFFFFF'}}>
                                        {columns.map(el => (
                                            <th key={el} className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>
                                                {el}
                                            </th>
                                        ))}
                                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>Opérations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {students.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                            {Object.keys(students[0]).filter(el => el !== 'id').map(col => (
                                                <td key={col} className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap" style={{color: '#000000'}}>
                                                    <span className="block truncate">{row[col]}</span>
                                                </td>
                                            ))}
                                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                                <div className='flex flex-row gap-2 sm:gap-3 items-center justify-center'>
                                                    <button 
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                                        onClick={() => handleDeleteStudent(row.id)}
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" style={{color: '#EF4444'}} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default studentList;