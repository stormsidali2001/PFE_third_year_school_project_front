const Teacher = props=>{
    const router = useRouter();
    const {teacherId} = router.query;
    const {getStudent} = useStoreActions(store=>store.adminStudentListModel)
    const {student} = useStoreState(store=>store.adminStudentListModel)
    useEffect(async()=>{
        if(!studentId) return;
        await getStudent(studentId)
    },[teacherId])
   
    return(
        <div>
       
        <div className="bg-background h-screen w-screen relative flex flex-col items-center space-y-16 font-xyz text-textcolor justify-center">
            <img src="/studentProfil.jpg" className="h-[550px] object-contain mix-blend-darken opacity-30"/>
            <div className="text-[20px] h-[500px] w-[600px] shadow-lg rounded-xl bg-white/50 backdrop-blur-sm flex flex-col absolute text-textcolor font-mono px-8 space-y-4">
             { student&& <>
                <div className="font-bold text-[24px] underline mx-auto">Student Profil:</div>
                <div className="flex space-x-2">
                    <div className="font-semibold">promotion:</div>
                    <div>{student.promotion?.name}</div>
               </div>
                <div className="flex space-x-2">
                    <div className="font-semibold">email:</div>
                    <div>{student?.user?.email}</div>
               </div>
             
               <div className="flex space-x-2">
                    <div className="font-semibold">firstName:</div>
                    <div>{student.firstName}</div>
               </div>
               <div className="flex space-x-2">
                    <div className="font-semibold">lastName:</div>
                    <div>{student.lastName}</div>
               </div>
               <div className="flex space-x-2">
                    <div className="font-semibold">moy:</div>
                    <div>{student.moy}</div>
               </div>
               <div className="flex space-x-2">
                    <div className="font-semibold">dob:</div>
                    <div>{student.dob}</div>
               </div>
               
               <div className="flex space-x-2">
                    <div className="font-semibold">team:</div>
                    <>
                        {
                            student.team?(
                                <div className=" w-fit px-2   backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg flex items-center cursor-pointer">
                                    <Link href={`/teams/${student?.team?.id}`}>
                                    {
                                        '#'+student.team.nickName
                                    }
                                    </Link>
                                </div>

                            ):(
                                <div className=" w-fit px-2   backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg flex items-center cursor-pointer">sans equipe</div>
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

export default Teacher;