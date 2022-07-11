import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks";

const Teacher = props=>{
    const router = useRouter();
    const {teacherId} = router.query;
    const {getTeacher} = useStoreActions(store=>store.teacherListModel)
    const {teacher} = useStoreState(store=>store.teacherListModel)

    useEffect(async()=>{
        if(!teacherId) return;
        await getTeacher(teacherId)
    },[teacherId])
   
    return(
        <div>
       
        <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
            <img src="/studentProfil.jpg" className="h-[550px] object-contain mix-blend-darken opacity-30"/>
            <div className="text-[20px] h-[500px] w-[600px] shadow-lg rounded-xl bg-white/50 backdrop-blur-sm flex flex-col absolute text-textcolor font-mono px-8 space-y-4">
             { teacher&& <>
                <div className="font-bold text-[24px] underline mx-auto">Student Profil:</div>
               
                <div className="flex space-x-2">
                    <div className="font-semibold">email:</div>
                    <div>{teacher?.user?.email}</div>
               </div>
             
               <div className="flex space-x-2">
                    <div className="font-semibold">firstName:</div>
                    <div>{teacher?.firstName}</div>
               </div>
               <div className="flex space-x-2">
                    <div className="font-semibold">lastName:</div>
                    <div>{teacher?.lastName}</div>
               </div>
               <div className="flex space-x-2">
                    <div className="font-semibold">moy:</div>
                    <div>{teacher?.ssn}</div>
               </div>        
               </>}
            </div>
        </div>
    </div>
    )
}

export default Teacher;