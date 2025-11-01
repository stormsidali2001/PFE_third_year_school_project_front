import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks";

const StudentInfos = props=>{
    const router = useRouter();
    const {studentId} = router.query;
    const {getStudent} = useStoreActions(store=>store.adminStudentListModel)
    const {student} = useStoreState(store=>store.adminStudentListModel)
    useEffect(async()=>{
        if(!studentId) return;
        await getStudent(studentId)
    },[studentId])
   
    return(
        <div>
       
        <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col absolute text-textcolor font-roboto px-8 py-6 space-y-4 w-fit max-w-[1200px]">
             { student&& <>
                <div className="text-2xl font-bold mb-4 pb-4 border-b-2" style={{color: '#1A2562', borderColor: '#5375E2'}}>Profil Étudiant</div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-12">
                    <div className="font-semibold text-sm" style={{color: '#000000'}}>Promotion:</div>
                    <div style={{color: '#000000'}}>{student.promotion?.name || '-'}</div>
               </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-12">
                    <div className="font-semibold text-sm" style={{color: '#000000'}}>Email:</div>
                    <div className="text-sm break-words text-right" style={{color: '#000000'}}>{student?.user?.email || '-'}</div>
               </div>
             
               <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-12">
                    <div className="font-semibold text-sm" style={{color: '#000000'}}>Prénom:</div>
                    <div style={{color: '#000000'}}>{student.firstName || '-'}</div>
               </div>
               <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-12">
                    <div className="font-semibold text-sm" style={{color: '#000000'}}>Nom:</div>
                    <div style={{color: '#000000'}}>{student.lastName || '-'}</div>
               </div>
               <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-12">
                    <div className="font-semibold text-sm" style={{color: '#000000'}}>Moyenne:</div>
                    <div className="font-semibold" style={{color: '#000000'}}>{student.moy || '-'}</div>
               </div>
               <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-12">
                    <div className="font-semibold text-sm" style={{color: '#000000'}}>Date de naissance:</div>
                    <div style={{color: '#000000'}}>{student.dob || '-'}</div>
               </div>
               
               <div className="flex justify-between items-center py-3 gap-12">
                    <div className="font-semibold text-sm" style={{color: '#000000'}}>Équipe:</div>
                    <>
                        {
                            student.team?(
                                <Link href={`/teams/${student?.team?.id}`}>
                                    <a className="px-4 py-2 rounded-lg font-medium text-white transition-all hover:shadow-md" style={{backgroundColor: '#5375E2'}}>
                                        #{student.team.nickName}
                                    </a>
                                </Link>

                            ):(
                                <span style={{color: '#999999'}}>Aucune équipe</span>
                            )
                        }
                    </>
                   
                  
               </div>
            
               </>}
            </div>
        </div>
    </div>
    )
}

export default StudentInfos;