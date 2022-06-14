import {useEffect, useState} from 'react'
import Select from 'react-select'
import ModalPortal from '../../../components/ModalPortal'
import {useStoreActions, useStoreState} from '../../../store/hooks'
import { useRouter } from 'next/router'
const creerSoutenance = ({toastsRef}) => {
    const router = useRouter()
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [date , setDate] = useState('')
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
        try{
            e.preventDefault();

            const arr = duration?.split(':')
            const m = arr[0];
            const h = arr[1];
            const dr =( parseInt(m)*60 + parseInt(h)*60*60)*1000; // in ms
            

            await createSoutenance({
                teamId:selectedTeam.value,
                jurysIds:Object.keys(selectedTeachers),
                salleId:choosenSalle.value,
                date,
                title,
                description,
                duration:dr
    
            })
            toastsRef.current.addMessage({text:"c'est fait...",mode:'Alert'})
            setTimeout(()=>{
                router.reload()

            },2000)
           
            
        }catch(err){
            console.log(err)
            toastsRef.current.addMessage({text:'Ops...',mode:'error'})


        }
    
    }
    console.log(teachers,'pssssssssssss')
    return (
        <div className='min-h-screen h-fit py-12 min-w-screen bg-background'>
            <div className=' flex relative flex-col space-y-6  pt-[100px] pl-[100px] items-center justify-start font-xyz text-black text-[17px]'>
                <div className='text-[26px] underline italic'>Créer une soutenace</div>
                <img src='/createSoutenace.webp' className='absolute h-[500px] opacity-80 mix-blend-darken object-contain'/>
                <div className='h-fit py-6 px-12 w-[600px] bg-white/50 backdrop-blur-sm shadow-lg rounded-xl flex flex-col space-y-2'>
                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Titre </div>
                        <input 
                            placeholder='Titre...' 
                            value={title} 
                            className='h-[35px] w-[430px] px-3 bg-white/50 border-2 border-slate-200 rounded-md shadow-md' onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <div>Description </div>
                        <textarea 
                            placeholder='Description...' 
                            value={description} className='h-[60px] w-[500px] bg-white/50 rounded-md shadow-md border-2 border-slate-200 resize-none p-3' 
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                
                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Date :</div>
                        <input 
                            type='datetime-local' 
                            onChange={(e) => setDate(e.target.value)} 
                            value={date}
                            className = 'bg-transparent outline-none'
                        />
                    </div>

                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Duration :</div>
                        <input 
                            type='time' 
                            onChange={(e) => setDuration(e.target.value)} 
                            value={duration}
                            className = 'bg-transparent outline-none'
                        />
                    </div>
               
                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Equipe : 
                           { selectedTeam&&<span  className='bg-blue-200 px-2 py-1 rounded-[10px] cursor-pointer'>
                            {selectedTeam?.label?'#'+selectedTeam.label:''}
                            </span>}
                        </div>
                        <button 
                            className='text-[28px] shadow-md backdrop-blur-sm rounded-full h-[32px] flex items-center justify-center w-[32px] bg-white/20 border-2 border-slate-200 hover:border-slate-400'
                            onClick={handleShowEquipeModel}
                        >
                            +
                        </button>
                    </div>
                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Jury :</div>
                        <button 
                            className='text-[28px] backdrop-blur-sm shadow-md rounded-full h-[32px] flex items-center justify-center w-[32px] bg-white/20 border-2 border-slate-200 hover:border-slate-400'
                            onClick={(e) => {setOpenPortalModelJury(true)}}
                        >
                            +
                        </button>
                        
                    </div>
                    <div className='flex gap-2 flex-wrap w-full p-2'>
                                      
                                      {Object.keys(selectedTeachers).map(k=>{
                                          const teacher = selectedTeachers[k]
                                          return(
                                              <div
                                              className='bg-blue-300 px-2 py-1 rounded-[10px] cursor-pointer flex  items-center'
                                              onClick={()=>handleSelectJury(teacher)}
                                            
                                          >
                                              <span>#{teacher.firstName+' '+teacher.lastName}</span>
  
                                             
                                          </div>
  
                                          )
                                         
                                      })}
  
                                      </div>
                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Salle :</div>
                        <Select
                            placeholder="Salle..." 
                            className="z-50 h-[40px] w-[420px] rounded-md border-2 border-slate-200 bg-white/50 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                            onChange={(option)=>{setChoosenSalle(option)}}
                            options={salles.map(el=>{return {value:el.id,label:el.name}})}
                            value={choosenSalle}
                            styles = {{menuPortal:base=>({...base,zIndex:500})}}
                        />
                    </div>
                    <div className='w-full flex items-center justify-center pt-3'>
                        <button onClick={handleCreateSoutenance} className='h-[35px] w-[150px]  backdrop-blur-sm bg-white/20 border-2 border-slate-300 hover:border-slate-400  rounded-full shadow-lg text-center'>Créer</button>
                    </div>
                </div>
                <ModalPortal
                    open={openPortalModelJury}
                    handleClose={setOpenPortalModelJury}
                >
                    <div className='h-fit w-[600px] px-12 py-6  flex flex-col space-y-6'>
                            <div>Liste des Jury</div>
                              <div className='flex flex-col '>
                                    <div>jurys : {Object.keys(selectedTeachers).length} selected</div>
                                    <div className='flex gap-2 flex-wrap w-full p-2'>
                                      
                                    {teachers.map(teacher=>{
                                        return(
                                            <div
                                            className='bg-blue-50 px-2 py-1 rounded-[10px] cursor-pointer flex space-x-2 items-center'
                                            onClick={()=>handleSelectJury(teacher)}
                                          
                                        >
                                            <span className={`${selectedTeachers[teacher.id]?'bg-blue-300':'bg-blue-200'} w-[15px] h-[15px] rounded-full border-2 `}></span>
                                            <span>#{teacher.firstName+' '+teacher.lastName}</span>

                                           
                                        </div>

                                        )
                                       
                                    })}

                                    </div>
                                  
                                    <div className='bg-blue-200 px-2 py-1 rounded-[5px] w-fit mx-auto mt-2 cursor-pointer' onClick={()=>setOpenPortalModelJury(false)}>Ok</div>
                             </div>
                        </div>
                </ModalPortal>
                <ModalPortal
                    open={openPortalModelTeam}
                    handleClose={setOpenPortalModelTeam}
                >
                    <div className='h-fit w-[600px] p-12  flex flex-col space-y-6'>
                            <div className='text-center'>Liste des équipes</div>
                            <div className='flex space-x-2 items-center'>
                               <div className=''>Promotion:</div>
                                <Select
                                    placeholder="Poromotion..." 
                                    className="z-50 h-[40px] w-[420px] rounded-md border-2 border-slate-200 bg-white/50 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                                    onChange={(option)=>{handlePromotionChange(option)}}
                                    options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                                    value={chosenPromotion}
                                    styles = {{menuPortal:base=>({...base,zIndex:500})}}
                                />
                            </div>

                            <div className='flex gap-2 flex-wrap'>
                                    {
                                        teams.map(team=>{
                                            return(
                                                <div
                                                    className='bg-blue-200 px-2 py-1 rounded-[10px] cursor-pointer'
                                                    onClick={()=>handleTeamSelection(team)}
                                                >
                                                    #{team.pseudo}
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                </ModalPortal>
            </div>
        </div>
    )
}
export default creerSoutenance;