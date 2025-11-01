import { useStoreActions, useStoreState } from "../store/hooks";
import { useEffect, useState } from "react";
import Document from "../components/Document";
import HorisontalNavbar from "../components/HorisontalNavbar";
import ModalPortal from "../components/ModalPortal";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import AttachFileIcon from "../icons/AttachFileIcon";
import DocumentIcon from "../icons/documentIcon";
import Select from "react-select";
import { useRouter } from "next/router";
import AddDocumentIcon from "../icons/AddDocumentIcon";
import EditIcon from "../icons/EditIcon";
import TrashIcon from "../icons/TrashIcon";
import CommitIcon from "../icons/CommitIcon";
import { Plus, Edit2, Trash2, Share2 } from 'lucide-react';

const TeamDocs = ({toastsRef})=>{
    const router = useRouter()
    const [newDocModal,setNewDocModal] = useState(false)
    const [description,setDescription] = useState('');
    const [file,setFile] = useState(null);
    const [selectedFiles,setSelectedFiles] = useState({})
    const {createTeamDocument,getTeamDocuments,deleteTeamDocs,getPromotionDocumentTypes,commitDocs,updateTeamDocument} = useStoreActions(store=>store.teamDocumentModel)
    const {documents,documentTypes} = useStoreState(store=>store.teamDocumentModel)
    const {socket} = useStoreState(store=>store.socketModel)
    const [chosenDocType,setChosenDocType] = useState(null)
    
    const  {uploadFileThunk} = useStoreActions(store=>store.user)
    const [openCommitModal,setOpenCommitModel] = useState(false)
    const [openModificationModal,setOpenModificationModal] = useState(false)
    const [commitTitle,setCommitTitle] = useState('')
    const [commitDescription,setCommitDescription] = useState('')
    const [name,setName] = useState('');
    const [runOnce,setRunOnce] = useState(false)
    const user = useStoreState(store=>store.user);
  

    useEffect(async()=>{
        try{

            await getTeamDocuments();
            await getPromotionDocumentTypes();

        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"Probleme",mode:'Error'})

        }
    },[])

    useEffect(()=>{
        if(!socket) return;
        console.log(socket,"teamDocs")
        if(!runOnce){
         socket?.on("team-documents-alltered",async()=>{
                    await getTeamDocuments();
                 
            })
            setRunOnce(true)
        }

        return ()=>{
            socket?.removeAllListeners("team-documents-alltered");
        }
    },[socket])
    const handleNewDoc = async e =>{
        e.preventDefault();
        try{
            if(!file ){
                toastsRef.current.addMessage({text:"inserez un fichier !!",mode:'Error'})
                return;
            }
            if(!chosenDocType){
                toastsRef.current.addMessage({text:"selectionez le type de document",mode:'Error'})
                return;
            }


           
            const formData = new FormData()
            formData.append("file",file)
            const res = await uploadFileThunk(formData)
            const {filename,destination,originalname} = res.data;
            console.log(res.data)
            const url = destination+'/'+filename;
            await createTeamDocument({name,url,description,typeDocId:chosenDocType.value})
            await getTeamDocuments()
            toastsRef.current.addMessage({text:"document ajouté avec success",mode:'Alert'})
            setDescription('')
            setFile(null)
            setNewDocModal(false)
         

          
           

            

        }catch(err){
            toastsRef.current.addMessage({text:err.response.data.message,mode:'Error'})
            console.log(err)
        }




    }
    const handleDeleteDocs = async e=>{
        e.preventDefault();
        try{
            await deleteTeamDocs({
                docsIds:Object.keys(selectedFiles)
            })
            toastsRef.current.addMessage({text:"document(s) supprimés",mode:'Alert'})
            setSelectedFiles({})
         
                await getTeamDocuments()
                
         

        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:err.response.data.message,mode:'Error'})
        }
       

    }
    const handleCommitDocs = async e=>{
        e.preventDefault();
        try{
            await commitDocs({
                title:commitTitle,
                description:commitDescription,
                docsIds:Object.keys(selectedFiles)
            })
            toastsRef.current.addMessage({text:"c'est fait",mode:'Alert'})
            setOpenCommitModel(false)
        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:err.response.data.message,mode:'Error'})
            setOpenCommitModel(false)
        }
    }
    function handleChange(e) {
        setFile(e.target.files[0])
        const getNameWithoutExtension = (name)=>{
           return name.substring(0,name.lastIndexOf("."))
        }
        setName(getNameWithoutExtension(e.target.files[0].name))
      };
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

    const handleShowModificationModal = ()=>{
        const sFiles = Object.keys(selectedFiles);
        if(Object.keys(selectedFiles).length !== 1 && documentTypes.length!==0 ) return;
        const selectedFile = selectedFiles[sFiles[0]];
        setDescription(selectedFile.description)
        const chosenType = documentTypes.find(el=>el.id === selectedFile.type.id)
        setChosenDocType({label:chosenType.name,value:chosenType.id});
        setName(selectedFile.name)
        setOpenModificationModal(true)

    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const droppedFile = droppedFiles[0];
            setFile(droppedFile);
            const getNameWithoutExtension = (name) => {
                return name.substring(0, name.lastIndexOf("."));
            };
            setName(getNameWithoutExtension(droppedFile.name));
            setNewDocModal(true);
        }
    };
    const handleUpdateDocument = async e=>{
        try{
            e.preventDefault();
            const selected = Object.keys(selectedFiles);
            if(selected.length !==1) return;
            console.log(selected)
            await updateTeamDocument({
                name,
                description,
                documentId:selectedFiles[selected[0]].id,
                documentTypeId:selectedFiles[selected[0]].type.id
            })
            await getTeamDocuments()
            toastsRef.current.addMessage({text:"C'est fait!!!",mode:"Alert"})
            setOpenModificationModal(false)
        }catch(err){
            toastsRef.current.addMessage({text:err.response.data.message,mode:"Error"})
            setOpenModificationModal(false)
            console.log(err)
        }
   
    }
    if(user.userType !== 'student'){
        return "permission denied"
    }
  
    const hasTeam = user.student.team;
    if(!hasTeam){
        return "permission denied"
    }
    const isTeamLeader =hasTeam &&( user.student?.team?.teamLeader?.id === user.student?.id);
    const canModifyDoc = ()=>{
        const selected = Object.keys(selectedFiles);
      
        if(selected.length !==1) return false;
      
        const owner = selectedFiles[selected[0]].owner;
        

        return !!isTeamLeader || owner.id === user.student.id;
        
    }
    return(
        <div>
            <HorisontalNavbar />
            <StudentVerticalNavbar />
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 pt-24 pb-12 font-roboto">
                <div className="ml-16 px-4 sm:px-6 lg:px-8" onDragOver={handleDragOver} onDrop={handleDrop}>
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{color: '#1A2562'}}>
                            Documents de l'Équipe
                        </h1>
                        <p className="text-lg mb-6" style={{color: '#000000'}}>
                            Gérez les documents de votre équipe
                        </p>
                        <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Documents Grid */}
                        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-6" style={{color: '#1A2562'}}>
                                    {documents.length > 0 ? `Fichiers (${documents.length})` : 'Fichiers'}
                                </h2>
                                {documents.length === 0 ? (
                                    <div className="border-2 border-dashed border-boutton/30 rounded-xl p-12 text-center bg-blue-50/50">
                                        <div className="mb-4">
                                            <svg className="w-16 h-16 mx-auto text-boutton/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2" style={{color: '#1A2562'}}>Aucun fichier</h3>
                                        <p className="mb-4" style={{color: '#000000'}}>Glissez-déposez des fichiers ici ou cliquez pour en sélectionner</p>
                                        <button
                                            onClick={() => setNewDocModal(true)}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-boutton text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
                                        >
                                            <Plus className="w-5 h-5" /> Ajouter un fichier
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {documents.map(doc=>(
                                            <div 
                                                key={doc.id}
                                                className="relative group cursor-pointer"
                                                onClick={() => handleSelectFiles(doc)}
                                            >
                                                <div className={`p-4 rounded-xl border-2 transition-all ${selectedFiles[doc.id] ? 'border-boutton bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                    <div className="flex justify-center mb-2">
                                                        <DocumentIcon className='w-8' style={{color: '#5375E2'}} />
                                                    </div>
                                                    <p className="text-xs text-center truncate" style={{color: '#000000'}}>
                                                        {doc.name}
                                                    </p>
                                                </div>
                                                {selectedFiles[doc.id] && (
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-boutton rounded-full flex items-center justify-center">
                                                        <span className="text-white text-sm">✓</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {documents.length > 0 && (
                                <>
                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 pt-6 border-t">
                                        <button 
                                            onClick={() => setNewDocModal(true)}
                                            className="px-4 py-2 bg-boutton text-white rounded-lg font-medium hover:bg-blue-600 transition-all flex items-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" /> Ajouter
                                        </button>
                                        {canModifyDoc() && Object.keys(selectedFiles).length === 1 && (
                                            <button 
                                                onClick={() => handleShowModificationModal()}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all flex items-center gap-2"
                                            >
                                                <Edit2 className="w-4 h-4" /> Modifier
                                            </button>
                                        )}
                                        {canModifyDoc() && Object.keys(selectedFiles).length >= 1 && (
                                            <button 
                                                onClick={handleDeleteDocs}
                                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" /> Supprimer
                                            </button>
                                        )}
                                        {isTeamLeader && Object.keys(selectedFiles).length >= 1 && (
                                            <button 
                                                onClick={() => setOpenCommitModel(true)}
                                                className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-all flex items-center gap-2"
                                            >
                                                <Share2 className="w-4 h-4" /> Commit
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Document Info Sidebar */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-fit">
                            <h3 className="text-lg font-bold mb-4" style={{color: '#1A2562'}}>
                                Informations
                            </h3>
                            {Object.keys(selectedFiles).length === 1 ? (
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <p className="font-semibold" style={{color: '#1A2562'}}>Nom:</p>
                                        <p style={{color: '#000000'}}>{selectedFiles[Object.keys(selectedFiles)[0]].name}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold" style={{color: '#1A2562'}}>Type:</p>
                                        <p style={{color: '#000000'}}>{selectedFiles[Object.keys(selectedFiles)[0]].type.name}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold" style={{color: '#1A2562'}}>Propriétaire:</p>
                                        <p style={{color: '#000000'}}>{selectedFiles[Object.keys(selectedFiles)[0]].owner.firstName} {selectedFiles[Object.keys(selectedFiles)[0]].owner.lastName}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2" style={{color: '#1A2562'}}>Description:</p>
                                        <p className="text-xs bg-gray-50 rounded p-2 break-words" style={{color: '#000000'}}>
                                            {selectedFiles[Object.keys(selectedFiles)[0]].description}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-8">Sélectionnez un fichier pour voir ses infos</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ModalPortal handleClose={setNewDocModal} open={newDocModal}>
                <div className="w-full max-w-2xl p-6">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold" style={{color: '#1A2562'}}>Nouveau fichier</h2>
                        <div className="h-1 w-16 bg-boutton rounded-full mt-2"></div>
                    </div>
                    <form className="space-y-4" onSubmit={handleNewDoc}>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Type de document *</label>
                            <Select
                                placeholder="Sélectionnez un type..." 
                                onChange={(option) => setChosenDocType(option)}
                                options={documentTypes.map(el => ({value: el.id, label: el.name}))}
                                isLoading={!documentTypes}
                                value={chosenDocType}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: 'white',
                                        borderColor: '#e5e7eb',
                                        borderRadius: '0.5rem',
                                        boxShadow: 'none',
                                        '&:hover': { borderColor: '#5375E2' },
                                        minHeight: '42px'
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected ? '#5375E2' : state.isFocused ? '#f0f0f0' : 'white',
                                        color: state.isSelected ? 'white' : '#000000'
                                    })
                                }}
                            />
                        </div>
                        {file && (
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Nom du fichier *</label>
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-boutton focus:ring-1 focus:ring-blue-200"
                                    placeholder="Nom du fichier"
                                    style={{color: '#000000'}}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium mb-3" style={{color: '#1A2562'}}>Fichier *</label>
                            {file ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-green-800">{file.name}</p>
                                        <p className="text-xs text-green-700">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                </div>
                            ) : (
                                <label className="block">
                                    <div className="border-2 border-dashed border-boutton/30 rounded-lg p-8 text-center cursor-pointer hover:border-boutton hover:bg-blue-50/50 transition-all">
                                        <svg className="w-10 h-10 mx-auto mb-2 text-boutton/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <p className="font-medium mb-1" style={{color: '#1A2562'}}>Déposez votre fichier ici</p>
                                        <p className="text-sm" style={{color: '#000000'}}>ou cliquez pour en sélectionner un</p>
                                    </div>
                                    <input id="modalFile" className="hidden" type="file" onChange={handleChange} />
                                </label>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Description</label>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-16 resize-none focus:border-boutton focus:ring-1 focus:ring-blue-200"
                                placeholder="Décrivez le contenu du fichier..."
                                style={{color: '#000000'}}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button 
                                type="button"
                                onClick={() => {setNewDocModal(false); setFile(null); setDescription(''); setChosenDocType(null);}}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm"
                                style={{color: '#1A2562'}}
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit"  
                                className="flex-1 py-2 px-4 bg-boutton text-white rounded-lg font-semibold hover:bg-blue-600 transition-all text-sm"
                            >
                                Ajouter le fichier
                            </button>
                        </div>
                    </form>
                </div>
            </ModalPortal>

            <ModalPortal open={openCommitModal} handleClose={setOpenCommitModel}>
                <div className="w-full max-w-2xl p-6">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <Share2 className="w-5 h-5" style={{color: '#5375E2'}} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold" style={{color: '#1A2562'}}>Créer un Commit</h2>
                            <p className="text-xs mt-0.5" style={{color: '#000000'}}>Publiez vos modifications</p>
                        </div>
                    </div>
                    <form className="space-y-4" onSubmit={handleCommitDocs}>
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <p className="text-sm font-medium" style={{color: '#1A2562'}}>
                                {Object.keys(selectedFiles).length} fichier{Object.keys(selectedFiles).length > 1 ? 's' : ''} sélectionné{Object.keys(selectedFiles).length > 1 ? 's' : ''}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Titre du commit *</label>
                            <input 
                                placeholder="Ex: Mise à jour des documents..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-boutton focus:ring-1 focus:ring-blue-200"
                                value={commitTitle}
                                onChange={(e) => setCommitTitle(e.target.value)}
                                style={{color: '#000000'}}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Description</label>
                            <textarea 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-16 resize-none focus:border-boutton focus:ring-1 focus:ring-blue-200"
                                placeholder="Décrivez les changements..."
                                value={commitDescription}
                                onChange={(e) => setCommitDescription(e.target.value)}
                                style={{color: '#000000'}}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button 
                                type="button"
                                onClick={() => setOpenCommitModel(false)}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm"
                                style={{color: '#1A2562'}}
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit"  
                                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm"
                            >
                                Confirmer le commit
                            </button>
                        </div>
                    </form>
                </div>
            </ModalPortal>

            <ModalPortal handleClose={setOpenModificationModal} open={openModificationModal}>
                <div className="w-full max-w-2xl p-6">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <Edit2 className="w-5 h-5" style={{color: '#5375E2'}} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold" style={{color: '#1A2562'}}>Modifier le document</h2>
                            <p className="text-xs mt-0.5" style={{color: '#000000'}}>Mettez à jour les informations</p>
                        </div>
                    </div>
                    <form className="space-y-4" onSubmit={handleUpdateDocument}>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Nom du fichier *</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-boutton focus:ring-1 focus:ring-blue-200"
                                placeholder="Nom du fichier"
                                style={{color: '#000000'}}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Type de document *</label>
                            <Select
                                placeholder="Sélectionnez un type..." 
                                onChange={(option) => setChosenDocType(option)}
                                options={documentTypes.map(el => ({value: el.id, label: el.name}))}
                                isLoading={!documentTypes}
                                value={chosenDocType}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: 'white',
                                        borderColor: '#e5e7eb',
                                        borderRadius: '0.5rem',
                                        boxShadow: 'none',
                                        '&:hover': { borderColor: '#5375E2' },
                                        minHeight: '42px'
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isSelected ? '#5375E2' : state.isFocused ? '#f0f0f0' : 'white',
                                        color: state.isSelected ? 'white' : '#000000'
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{color: '#1A2562'}}>Description</label>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-16 resize-none focus:border-boutton focus:ring-1 focus:ring-blue-200"
                                placeholder="Description..."
                                style={{color: '#000000'}}
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button 
                                type="button"
                                onClick={() => setOpenModificationModal(false)}
                                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all text-sm"
                                style={{color: '#1A2562'}}
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit"  
                                className="flex-1 py-2 px-4 bg-boutton text-white rounded-lg font-semibold hover:bg-blue-600 transition-all text-sm"
                            >
                                Enregistrer les modifications
                            </button>
                        </div>
                    </form>
                </div>
            </ModalPortal>
        </div>
    )
}

export default TeamDocs;