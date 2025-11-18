import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../../store/hooks";
import {useRouter}  from 'next/router'
import DocumentIcon from "../../icons/documentIcon";
import HorisontalNavbar from "../../components/HorisontalNavbar";
import TeacherVerticalNavbar from "../../components/TeacherVerticalNavbar";
import { FileText, CheckCircle, ArrowLeft, Download } from 'lucide-react';

const TeamId = ({toastsRef}) => {
    const router = useRouter()
    const {teamId} = router.query;
    const [selectedFiles,setSelectedFiles] = useState({})
    const {getAllCommitsDocs,validatedDocument} = useStoreActions(store=>store.teacherTeamCommitDocsModel)
    const {documents} = useStoreState(store=>store.teacherTeamCommitDocsModel)

   
    const handleSelectFiles = file=>{
        if(selectedFiles[file.id]){
            setSelectedFiles(files=>{
                const newFiles = {...files}
                delete newFiles[file.id]
                return newFiles;
            })
        }else{

            setSelectedFiles(files=>{
                return{...files,[file.id]:file}
            })
        }
       
    }
    useEffect(async()=>{
        if(!teamId) return;
        await getAllCommitsDocs({teamId})
        


    },[teamId])

    const showValidateButton = ()=>{
        const arr = Object.keys(selectedFiles);
       return arr.length >0 ?  Object.keys(selectedFiles).every(k=>{
            const selectedFile = selectedFiles[k];
            return !selectedFile.validated
        }) : false
    }
    const handleValidateDocuments = async e=>{
        e.preventDefault();
        try{
            await validatedDocument({
                documentIds:Object.keys(selectedFiles) 
            })
            toastsRef.current.addMessage({
                text:"c'est fait ...",
                mode:'Alert'
            })
            await getAllCommitsDocs({teamId})
            setSelectedFiles({})

        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({
                text:'Ops...Erreur',
                mode:'Error'
            })
            setSelectedFiles({})
        }
    }

    return (
        <div>
            <HorisontalNavbar />
            <TeacherVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto ml-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            style={{ color: '#5375E2' }}
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-bold mb-2" style={{ color: '#000000' }}>Documents de l'équipe</h1>
                            <div className="h-1 w-20 rounded-full" style={{ backgroundColor: '#5375E2' }}></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Content - Documents Grid */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                <h2 className="text-xl font-bold mb-6" style={{ color: '#000000' }}>Documents</h2>
                                
                                {documents && documents.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {documents.map((doc) => (
                                            <div
                                                key={doc.id}
                                                onClick={() => handleSelectFiles(doc)}
                                                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                                                    selectedFiles[doc.id]
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                                                }`}
                                            >
                                                {doc.validated && (
                                                    <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor: '#5375E2' }}>
                                                        Validé
                                                    </div>
                                                )}
                                                <div className="flex flex-col items-center gap-2">
                                                    <FileText className="w-8 h-8" style={{ color: '#5375E2' }} />
                                                    <p className="text-xs text-center truncate w-full" style={{ color: '#000000' }} title={doc.name}>
                                                        {doc.name}
                                                    </p>
                                                </div>
                                                {selectedFiles[doc.id] && (
                                                    <div className="absolute bottom-2 right-2 p-1 rounded-full" style={{ backgroundColor: '#5375E2' }}>
                                                        <CheckCircle className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-30" style={{ color: '#5375E2' }} />
                                        <p style={{ color: '#000000' }}>Aucun document trouvé</p>
                                    </div>
                                )}
                            </div>

                            {/* Validate Button */}
                            {showValidateButton() && (
                                <div className="mt-6">
                                    <button
                                        onClick={handleValidateDocuments}
                                        className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                                        style={{ backgroundColor: '#5375E2' }}
                                    >
                                        Valider les documents sélectionnés
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sidebar - Document Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24 max-h-[calc(100vh-150px)] overflow-y-auto">
                                <h3 className="text-lg font-bold mb-4" style={{ color: '#000000' }}>Infos Document</h3>
                                
                                {Object.keys(selectedFiles).length > 0 ? (
                                    <div className="space-y-4">
                                        {Object.keys(selectedFiles).map((k) => {
                                            const selectedFile = selectedFiles[k];
                                            return (
                                                <div key={k} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                                    <div>
                                                        <p className="text-xs font-semibold" style={{ color: '#5375E2' }}>NOM</p>
                                                        <p className="text-sm truncate" style={{ color: '#000000' }}>{selectedFile.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold" style={{ color: '#5375E2' }}>TYPE</p>
                                                        <p className="text-sm" style={{ color: '#000000' }}>{selectedFile.type?.name || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs font-semibold" style={{ color: '#5375E2' }}>STATUT</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className={`w-3 h-3 rounded-full ${selectedFile.validated ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                            <p className="text-sm" style={{ color: '#000000' }}>
                                                                {selectedFile.validated ? 'Validé' : 'Non validé'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => window.open('http://localhost:8080/' + selectedFile.url?.slice(2), '_blank')}
                                                        className="w-full mt-3 py-2 rounded-lg font-semibold text-white text-sm transition-all hover:shadow-md flex items-center justify-center gap-2"
                                                        style={{ backgroundColor: '#5375E2' }}
                                                    >
                                                        <Download className="w-4 h-4" />
                                                        Télécharger
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p style={{ color: '#000000' }} className="text-sm">Sélectionnez un document pour voir ses détails</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TeamId;