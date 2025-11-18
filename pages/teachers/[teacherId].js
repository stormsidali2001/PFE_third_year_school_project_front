import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import TeacherVerticalNavbar from "../../components/TeacherVerticalNavbar";
import { ArrowLeft } from 'lucide-react';
import axios from "axios";

const Teacher = props => {
    const router = useRouter();
    const { teacherId } = router.query;
    const [teacherData, setTeacherData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!teacherId) return;
        
        const fetchTeacher = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:8080/getTeacher/${teacherId}`, {
                    withCredentials: true
                })
                console.log("Teacher data:", res.data)
                setTeacherData(res.data)
            } catch (err) {
                console.log("Error fetching teacher:", err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchTeacher()
    }, [teacherId])

    return (
        <div>
            <HorisontalNavbar />
            <div className="flex min-h-screen" style={{ backgroundColor: '#F4FCFF' }}>
                <TeacherVerticalNavbar />

                <div className="flex-1 p-8 md:p-12 mt-24 flex flex-col items-center justify-center">
                    {loading ? (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                            <p style={{ color: '#000000' }}>Chargement des données...</p>
                        </div>
                    ) : teacherData ? (
                        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col text-textcolor font-roboto px-12 py-10 space-y-6 w-fit max-w-[1400px]">
                            {/* Back Button */}
                            <button
                                onClick={() => router.back()}
                                className="absolute top-6 left-6 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                style={{ color: '#5375E2' }}
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>

                            <div className="text-3xl font-bold pb-6 border-b-2 pt-2" style={{ color: '#000000', borderColor: '#5375E2' }}>Profil Enseignant</div>

                            <div className="flex justify-between items-center py-4 border-b border-gray-200 gap-16 hover:bg-gray-50 px-2 rounded transition-colors">
                                <div className="font-semibold text-base" style={{ color: '#000000' }}>Email:</div>
                                <div className="text-base break-words text-right max-w-md" style={{ color: '#000000' }}>{teacherData?.user?.email || '-'}</div>
                            </div>

                            <div className="flex justify-between items-center py-4 border-b border-gray-200 gap-16 hover:bg-gray-50 px-2 rounded transition-colors">
                                <div className="font-semibold text-base" style={{ color: '#000000' }}>Prénom:</div>
                                <div className="text-base" style={{ color: '#000000' }}>{teacherData?.firstName || '-'}</div>
                            </div>

                            <div className="flex justify-between items-center py-4 border-b border-gray-200 gap-16 hover:bg-gray-50 px-2 rounded transition-colors">
                                <div className="font-semibold text-base" style={{ color: '#000000' }}>Nom:</div>
                                <div className="text-base" style={{ color: '#000000' }}>{teacherData?.lastName || '-'}</div>
                            </div>

                            <div className="flex justify-between items-center py-4 gap-16 hover:bg-gray-50 px-2 rounded transition-colors">
                                <div className="font-semibold text-base" style={{ color: '#000000' }}>Spécialité:</div>
                                <div className="text-base font-medium px-4 py-2 rounded-lg" style={{ backgroundColor: '#F4FCFF', color: '#5375E2' }}>{teacherData?.speciality || '-'}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                            <p style={{ color: '#000000' }}>Aucune donnée trouvée</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Teacher;