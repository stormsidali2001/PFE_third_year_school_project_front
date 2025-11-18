import {useEffect, useState} from 'react'
import Select from 'react-select'
import ModalPortal from '../../../components/ModalPortal'
import {useStoreActions, useStoreState} from '../../../store/hooks'
import { useRouter } from 'next/router'
import ArrowIcon from '../../../icons/ArrowIcon'

const CreateSoutenance = ({toastsRef}) => {
    const router = useRouter()
    const [title , setTitle] = useState(null)
    const [description , setDescription] = useState(null)
    const [date , setDate] = useState(null)
    const [duration , setDuration] = useState(null)
  
    const [choosenSalle , setChoosenSalle] = useState(null)
    const [openPortalModelJury,setOpenPortalModelJury] = useState(false)
    const [openPortalModelTeam,setOpenPortalModelTeam] = useState(false)

    const [chosenPromotion,setChosenPromotion] = useState(null)
    const [selectedTeam,setSelectedTeam] = useState(null)
  

    const {salles} = useStoreState(store=>store.sallesModel)
    const {getSallesThunk} = useStoreActions(store=>store.sallesModel)
    const {promotions} = useStoreState(store=>store.promotionsModel)
    const {getAllPromotionsThunk} = useStoreActions(store=>store.promotionsModel)
    const {getTeamsWithThemes} = useStoreActions(store=>store.teamListModel)
    const {teamsList:teams} = useStoreState(store=>store.teamListModel)
    const {createSoutenance} = useStoreActions(store=>store.soutenanceModel)
    const {getTeachers} = useStoreActions(store=>store.teacherListModel)
    const {teachers} = useStoreState(store=>store.teacherListModel)


    const [selectedTeachers,setSelectedTeachers] = useState({})
  
    useEffect(async()=>{
    
        await getSallesThunk();
        await getAllPromotionsThunk();
        await getTeachers()
    },[])
  

    const handleShowEquipeModel = async e=>{
        e.preventDefault();

        await getTeamsWithThemes(chosenPromotion?.value)
        setOpenPortalModelTeam(true)

    
    }
    const handlePromotionChange = async option =>{
        setChosenPromotion(option)
        await getTeamsWithThemes(option?.value)
    }
    const handleTeamSelection = (team)=>{
    
        setSelectedTeam({label:team.pseudo,value:team.id})
        setOpenPortalModelTeam(false)
    }
    const handleSelectJury = (teacher)=>{
        if(selectedTeachers[teacher.id]){
            setSelectedTeachers(steachers=>{

                const newObj = {...steachers}
                delete newObj[teacher.id]

                return newObj;
            })
            
        }else{
            setSelectedTeachers(steachers=>{
                return {
                    ...steachers,
                    [teacher.id]:teacher
                }
            })
        }
       
    }
    const handleCreateSoutenance = async e=>{
     
            e.preventDefault();

            if(!date || !description || !duration || !selectedTeachers || !selectedTeam){

                toastsRef.current.addMessage({text:'Remplissez tous les champs',mode:'Error'})
                return;
            }

            const arr = duration?.split(':')
            const m = arr[0];
            const h = arr[1];
            const dr =( parseInt(m)*60 + parseInt(h)*60*60)*1000; // in ms
            
           let noError = true;
            await createSoutenance({
                teamId:selectedTeam.value,
                jurysIds:Object.keys(selectedTeachers),
                salleId:choosenSalle.value,
                date,
                title,
                description,
                duration:dr
    
            }).catch(err=>{
            
                toastsRef.current.addMessage({text:err.response.data.message,mode:'Error'})
                noError = false;
            }).then(()=>{

                if(noError){

                    toastsRef.current.addMessage({text:"Soutenance créée avec succès...",mode:'Alert'})
                    setTimeout(()=>{
                        router.reload()
        
                    },2000)
                }
            })
           
            
     
    
    }
    
    return (
        <div className='min-h-screen h-fit py-20 min-w-screen bg-background font-roboto'>
            <div className='flex flex-col max-w-4xl mx-auto px-6 space-y-8'>
                <div className='text-center space-y-3'>
                    <h1 className='text-4xl font-bold' style={{color: '#000000'}}>Créer une soutenance</h1>
                    <div className="h-1 w-24 bg-boutton rounded-full mx-auto"></div>
                </div>
                
                <div className='bg-white shadow-lg rounded-2xl p-8 space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col space-y-2'>
                            <label className='text-sm font-medium' style={{color: '#000000'}}>Titre</label>
                            <input 
                                placeholder='Titre...' 
                                value={title} 
                                className='h-11 rounded-lg border border-gray-300 px-3 text-base focus:border-boutton focus:ring-1 focus:ring-boutton transition-colors'
                                style={{color: '#000000'}}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        
                        <div className='flex flex-col space-y-2'>
                            <label className='text-sm font-medium' style={{color: '#000000'}}>Salle</label>
                            <Select
                                placeholder="Sélectionner une salle..." 
                                onChange={(option)=>{setChoosenSalle(option)}}
                                options={salles.map(el=>{return {value:el.id,label:el.name}})}
                                value={choosenSalle}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: '44px',
                                        borderRadius: '0.5rem',
                                        borderColor: '#e5e7eb',
                                    }),
                                    menuPortal: base => ({...base, zIndex: 500})
                                }}
                            />
                        </div>
                    </div>
                    
                    <div className='flex flex-col space-y-2'>
                        <label className='text-sm font-medium' style={{color: '#000000'}}>Description</label>
                        <textarea 
                            placeholder='Description...' 
                            value={description}
                            className='h-24 w-full bg-white rounded-lg shadow-sm border border-gray-300 resize-none p-3 text-base focus:border-boutton focus:ring-1 focus:ring-boutton transition-colors'
                            style={{color: '#000000'}}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='flex flex-col space-y-2'>
                            <label className='text-sm font-medium' style={{color: '#000000'}}>Date et heure</label>
                            <input 
                                type='datetime-local' 
                                onChange={(e) => setDate(e.target.value)} 
                                value={date}
                                className='h-11 rounded-lg border border-gray-300 px-3 text-base focus:border-boutton focus:ring-1 focus:ring-boutton transition-colors'
                                style={{colorScheme: 'light', color: '#000000'}}
                            />
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-sm font-medium' style={{color: '#000000'}}>Durée</label>
                            <input 
                                type='time' 
                                onChange={(e) => setDuration(e.target.value)} 
                                value={duration}
                                className='h-11 rounded-lg border border-gray-300 px-3 text-base focus:border-boutton focus:ring-1 focus:ring-boutton transition-colors'
                                style={{colorScheme: 'light', color: '#000000'}}
                            />
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-medium' style={{color: '#000000'}}>Équipe</label>
                            <button 
                                type='button'
                                className='px-4 py-2 bg-boutton text-white rounded-lg hover:bg-[#32AFF5] transition-all duration-200 text-sm font-medium'
                                onClick={handleShowEquipeModel}
                            >
                                Sélectionner une équipe
                            </button>
                        </div>
                        {selectedTeam && (
                            <div className='flex items-center space-x-2 p-3 bg-boutton/10 rounded-lg'>
                                <div className='px-3 py-1 bg-boutton text-white rounded-full text-sm font-medium'>
                                    {selectedTeam?.label}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                            <label className='text-sm font-medium' style={{color: '#000000'}}>Jury ({Object.keys(selectedTeachers).length} sélectionné(s))</label>
                            <button 
                                type='button'
                                className='px-4 py-2 bg-boutton text-white rounded-lg hover:bg-[#32AFF5] transition-all duration-200 text-sm font-medium'
                                onClick={(e) => {setOpenPortalModelJury(true)}}
                            >
                                Ajouter des jurés
                            </button>
                        </div>
                        <div className='flex gap-2 flex-wrap'>
                            {Object.keys(selectedTeachers).map(k=>{
                                const teacher = selectedTeachers[k]
                                return(
                                    <div
                                        key={k}
                                        className='bg-boutton/20 border border-boutton px-3 py-1 rounded-full cursor-pointer flex items-center hover:bg-boutton/30 transition-colors text-sm'
                                        onClick={()=>handleSelectJury(teacher)}
                                        style={{color: '#000000'}}
                                    >
                                        <span>{teacher.firstName} {teacher.lastName}</span>
                                        <span className='ml-2 font-bold'>×</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='flex justify-center pt-6'>
                        <button 
                            onClick={handleCreateSoutenance}
                            className='py-3 px-8 bg-boutton text-white font-medium rounded-lg hover:bg-[#32AFF5] transition-all duration-200 shadow-md hover:shadow-lg'
                        >
                            Créer la soutenance
                        </button>
                    </div>
                </div>

                <ModalPortal
                    open={openPortalModelJury}
                    handleClose={setOpenPortalModelJury}
                >
                    <div className='h-fit w-fit max-w-xl px-8 py-6 flex flex-col space-y-6 bg-white rounded-2xl'>
                        <div className='text-2xl font-bold text-center' style={{color: '#000000'}}>Sélectionner les jurés</div>
                        
                        <div className='space-y-3'>
                            <div className='text-sm font-medium' style={{color: '#000000'}}>
                                Jurés sélectionnés: {Object.keys(selectedTeachers).length}
                            </div>
                            <div className='flex gap-2 flex-wrap max-h-32 overflow-y-auto'>
                                {Object.keys(selectedTeachers).map(k=>{
                                    const teacher = selectedTeachers[k]
                                    return(
                                        <div
                                            key={k}
                                            className='bg-boutton text-white px-2 py-1 rounded-full text-sm flex items-center cursor-pointer hover:bg-[#32AFF5] transition-colors'
                                            onClick={()=>handleSelectJury(teacher)}
                                        >
                                            {teacher.firstName} {teacher.lastName}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='space-y-3'>
                            <div className='text-sm font-medium' style={{color: '#000000'}}>Tous les enseignants</div>
                            <div className='flex gap-2 flex-wrap max-h-64 overflow-y-auto'>
                                {teachers.map(teacher=>{
                                    const isSelected = selectedTeachers[teacher.id];
                                    return(
                                        <div
                                            key={teacher.id}
                                            className={`px-3 py-1 rounded-full cursor-pointer text-sm flex items-center space-x-2 transition-all border-2 ${
                                                isSelected 
                                                    ? 'bg-boutton text-white border-boutton' 
                                                    : 'bg-gray-100 border-gray-300 hover:border-boutton'
                                            }`}
                                            style={{color: isSelected ? 'white' : '#000000'}}
                                            onClick={()=>handleSelectJury(teacher)}
                                        >
                                            <span className={`w-3 h-3 rounded-full border-2 ${isSelected ? 'bg-white' : 'bg-gray-300'}`}></span>
                                            <span>{teacher.firstName} {teacher.lastName}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='flex justify-center pt-4'>
                            <button 
                                className='py-2 px-6 bg-boutton text-white font-medium rounded-lg hover:bg-[#32AFF5] transition-all duration-200'
                                onClick={()=>setOpenPortalModelJury(false)}
                            >
                                Confirmer
                            </button>
                        </div>
                    </div>
                </ModalPortal>

                <ModalPortal
                    open={openPortalModelTeam}
                    handleClose={setOpenPortalModelTeam}
                >
                    <div className='h-fit w-fit max-w-2xl px-8 py-6 flex flex-col space-y-6 bg-white rounded-2xl'>
                        <div className='text-2xl font-bold text-center' style={{color: '#000000'}}>Sélectionner une équipe</div>
                        
                        <div className='flex flex-col space-y-2'>
                            <label className='text-sm font-medium' style={{color: '#000000'}}>Promotion</label>
                            <Select
                                placeholder="Sélectionner une promotion..." 
                                onChange={(option)=>{handlePromotionChange(option)}}
                                options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                                value={chosenPromotion}
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        minHeight: '44px',
                                        borderRadius: '0.5rem',
                                        borderColor: '#e5e7eb',
                                    }),
                                    menuPortal: base => ({...base, zIndex: 500})
                                }}
                            />
                        </div>

                        <div className='space-y-3'>
                            <div className='text-sm font-medium' style={{color: '#000000'}}>Équipes disponibles</div>
                            <div className='flex gap-2 flex-wrap max-h-64 overflow-y-auto'>
                                {teams.map(team=>{
                                    return(
                                        <div
                                            key={team.id}
                                            className='bg-boutton/20 border border-boutton px-3 py-2 rounded-lg cursor-pointer hover:bg-boutton/30 transition-all text-sm font-medium'
                                            style={{color: '#000000'}}
                                            onClick={()=>handleTeamSelection(team)}
                                        >
                                            {team.pseudo}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='flex justify-center pt-4'>
                            <button 
                                className='py-2 px-6 bg-boutton text-white font-medium rounded-lg hover:bg-[#32AFF5] transition-all duration-200'
                                onClick={()=>setOpenPortalModelTeam(false)}
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </ModalPortal>
            </div>
        </div>
    )
}
export default CreateSoutenance;