import { useStoreActions } from "../../store/hooks";
import { useState } from "react";
import ArrowIcon from "../../icons/ArrowIcon";
import AttachFileIcon from "../../icons/AttachFileIcon";
import readXlsxFile from 'read-excel-file'

const AddEntreprise = ({toastsRef}) => {
    const [oneclick , setOneClick] = useState(false)
    const [manyClick , setManyClick] = useState(false)
    const [code , setCode] = useState("")
    const [email , setEmail] = useState("")
    const [entrepriseName , setEntrepriseName] = useState("")
    const [file,setFile] = useState({})
    const [loading,setLoading] = useState(false)
    const extension = "csv"
    const {addSingleEntreprise,addMultipleEntreprises} = useStoreActions(store=>store.adminStudentListModel)
    
    const clear = () => {
        setCode('')
        setEmail('')
        setEntrepriseName('')
    }
    
    const handleAddSingleEntreprise = async e=>{
        e.preventDefault();
        if([code,email,entrepriseName].some(el=>el.length === 0)){
            toastsRef.current.addMessage({text:"Tous les champs sont obligatoires...",mode:'Error'})
            return;
        }
        try{
            setLoading(true)
            await addSingleEntreprise({code,email,entrepriseName})
            toastsRef.current.addMessage({text:"Entreprise ajoutée...",mode:'Alert'})
            setLoading(false)
            clear();
        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"Erreur...",mode:'Error'})
            setLoading(false)
            clear();
        }
    }
    
    const handleAddMultipleEntreprises = async e=>{
        e.preventDefault();
        try{
            setLoading(true)
            await addMultipleEntreprises(file)
            toastsRef.current.addMessage({text:"Entreprises ajoutées...",mode:'Alert'})
            setLoading(false)
        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:"Erreur...",mode:'Error'})
            setLoading(false)
        }
    }

    const convertToArrayOfObjects = rows=>{
        const headerColsExist = new Set();
        if(rows.length ===0){
            toastsRef.current.addMessage({text:"Le document est vide",mode:'Error'})
            return []
        }
        rows[0].forEach(col=>{
            headerColsExist.add(col)
        })
        if(!headerColsExist.has('code') || !headerColsExist.has('email') || !headerColsExist.has('entrepriseName')){
            toastsRef.current.addMessage({text:"Un attribut est absent dans l'en-tête du document excel",mode:'Error'})
            return []
        }
        return rows.slice(1).map(row=>{
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
        setFile(convertToArrayOfObjects(rows));
    }
    
    return (
       <div className="bg-background min-h-screen w-full font-roboto">
            <div className="bg-background min-h-screen w-full pt-24 pb-12 px-6 flex items-center justify-center">
                <div className={`max-w-md w-full bg-white shadow-lg rounded-2xl p-8 flex-col space-y-8 items-center justify-center ${oneclick || manyClick === true ? "hidden" : "flex"}`}>
                    <div className="text-2xl font-bold text-center" style={{color: '#000000'}}>Ajouter des entreprises</div>
                    <div className="text-base text-center" style={{color: '#000000'}}>Voulez-vous ajouter une ou plusieurs entreprises ?</div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button 
                            className="flex-1 py-3 rounded-lg bg-boutton text-white font-medium hover:bg-[#32AFF5] transition-all duration-200 shadow-md hover:shadow-lg" 
                            onClick={()=> setOneClick(true)}
                        >
                            Une seule entreprise
                        </button>
                        <button 
                            className="flex-1 py-3 rounded-lg bg-white border-2 border-boutton text-boutton font-medium hover:bg-boutton hover:text-white transition-all duration-200" 
                            onClick={()=> setManyClick(true)}
                        >
                            Plusieurs entreprises
                        </button>
                    </div>
                </div>
                <form className={`max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 flex-col space-y-6 ${oneclick === true ? "flex" : "hidden"}`} onSubmit={handleAddSingleEntreprise}>
                    <div className="flex items-center justify-between">
                        <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => {setOneClick(false)}}>
                            <ArrowIcon/>
                        </button>
                        <div className="text-2xl font-bold" style={{color: '#000000'}}>Ajouter une entreprise</div>
                        <div className="w-10"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium" style={{color: '#000000'}}>Code</label>
                            <input
                                className="h-11 rounded-lg border border-gray-300 px-3 text-base focus:border-boutton focus:ring-1 focus:ring-boutton transition-colors" 
                                placeholder="Code..." 
                                style={{color: '#000000'}}
                                onChange={(e)=>{setCode(e.target.value)}}
                                value={code}
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium" style={{color: '#000000'}}>Email</label>
                            <input 
                                type="email"
                                className="h-11 rounded-lg border border-gray-300 px-3 text-base focus:border-boutton focus:ring-1 focus:ring-boutton transition-colors" 
                                placeholder="exemple@email.com..." 
                                style={{color: '#000000'}}
                                onChange={(e)=>{setEmail(e.target.value)}}
                                value={email}
                            />
                        </div>
                        
                        <div className="flex flex-col space-y-2 md:col-span-2">
                            <label className="text-sm font-medium" style={{color: '#000000'}}>Nom de l'entreprise</label>
                            <input 
                                className="h-11 rounded-lg border border-gray-300 px-3 text-base focus:border-boutton focus:ring-1 focus:ring-boutton transition-colors" 
                                placeholder="Nom de l'entreprise..." 
                                style={{color: '#000000'}}
                                onChange={(e)=>{setEntrepriseName(e.target.value)}}
                                value={entrepriseName}
                            />
                        </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-3 px-8">
                                <svg className="h-6 w-6 animate-spin text-boutton" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                            </div>
                        ) : (
                            <button 
                                type="submit"
                                className="py-3 px-8 bg-boutton text-white font-medium rounded-lg hover:bg-[#32AFF5] transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                Ajouter l'entreprise
                            </button>
                        )}
                    </div>
                </form>
                <form 
                    className={`max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 flex-col space-y-6 ${manyClick === true ? "flex" : "hidden"}`}
                    onSubmit={handleAddMultipleEntreprises}
                >
                    <div className="flex items-center justify-between">
                        <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={(e) => {setManyClick(false); e.preventDefault()}}>
                            <ArrowIcon/>
                        </button>
                        <div className="text-2xl font-bold" style={{color: '#000000'}}>Ajouter plusieurs entreprises</div>
                        <div className="w-10"></div>
                    </div>
                    
                    <div className="text-base text-center" style={{color: '#000000'}}>
                        Importez un fichier Excel contenant les informations des entreprises
                    </div>
                    
                    <label 
                        htmlFor="file" 
                        className="flex flex-col items-center justify-center w-full p-12 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-boutton hover:bg-background/50 transition-all duration-200"
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="p-4 bg-boutton/10 rounded-full">
                                <AttachFileIcon className='w-8 h-8 text-boutton'/>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="text-base font-medium" style={{color: '#000000'}}>
                                    Cliquez pour sélectionner un fichier
                                </div>
                                <div className="text-sm" style={{color: '#000000'}}>
                                    Excel (.xlsx) ou CSV (.csv)
                                </div>
                            </div>
                            {file && file.length > 0 && (
                                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                                    <img 
                                        src={extension === "csv" ? "/csv.jpg" : "/excel.png"} 
                                        className="h-10 w-10 object-contain"
                                        alt="file icon"
                                    />
                                    <div className="text-sm font-medium" style={{color: '#000000'}}>
                                        {file.length} entreprise(s) détectée(s)
                                    </div>
                                </div>
                            )}
                        </div>
                    </label>
                    <input 
                        id="file" 
                        className="hidden" 
                        type="file" 
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                    />
                    
                    <div className="flex justify-end pt-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-3 px-8">
                                <svg className="h-6 w-6 animate-spin text-boutton" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                            </div>
                        ) : (
                            <button 
                                type="submit"
                                disabled={!file || file.length === 0}
                                className="py-3 px-8 bg-boutton text-white font-medium rounded-lg hover:bg-[#32AFF5] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Ajouter les entreprises
                            </button>
                        )}
                    </div>
                </form>
            </div>
       </div>
    )
}
export default AddEntreprise;
