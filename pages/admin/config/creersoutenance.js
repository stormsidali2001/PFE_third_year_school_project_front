import {useState} from 'react'
import Select from 'react-select'
import ModalPortal from '../../../components/ModalPortal'

const creerSoutenance = props => {

    const [title , setTitle] = useState(null)
    const [description , setDescription] = useState(null)
    const [date , setDate] = useState(null)
    const [team , setTeam] = useState(null)
    const [jury , setJury] = useState([])
    const [choosenSalle , setChoosenSalle] = useState(null)
    const [created , setCreated] = useState(false)
    const [choosenPromotion , setChoosenPromotion] = useState(null)
    const [openPortalModelJury,setOpenPortalModelJury] = useState(false)
    const [openPortalModelTeam,setOpenPortalModelTeam] = useState(false)

    
    const promotions = [
        {
            id : 1,
            name : '1CPI'
        },
        {
            id : 1,
            name : '2CPI'
        },
        {
            id : 1,
            name : '1CS'
        },
        {
            id : 1,
            name : '2CS'
        },
        {
            id : 1,
            name : '3CS'
        }
    ]

    const salles = [
        {
            id : 1,
            name : 'Amphi A'
        },
        {
            id : 2,
            name : 'Amphi B'
        },
        {
            id : 3,
            name : 'Amphi C'
        },
        {
            id : 4,
            name : 'Amphi D'
        },
    ]

    

    return (
        <div className='h-screen w-screen bg-background'>
            <div className=' flex relative flex-col space-y-6  pt-[100px] pl-[100px] items-center justify-start font-xyz text-black text-[17px]'>
                <div className='text-[26px] underline italic'>Créer une soutenace</div>
                <img src='/createSoutenace.webp' className='absolute h-[500px] opacity-80 mix-blend-darken object-contain'/>
                <div className='h-[440px] py-6 px-12 w-[600px] bg-white/50 backdrop-blur-sm shadow-lg rounded-xl flex flex-col space-y-2'>
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
                    <div className='flex flex-row items-center space-x-4'>
                        <div>Promotion :</div>
                        <Select
                            placeholder="Promotion..." 
                            className="z-50 h-[40px] w-[380px] border-2 border-slate-200 rounded-md bg-slate-200 shadow-md backdrop-blur-sm outline-none  text-[18px] font-thin" 
                            onChange={(option)=>{setChoosenPromotion(option)}}
                            options={promotions.map(el=>{return {value:el.id,label:el.name}})}
                            value={choosenPromotion}
                            styles = {{menuPortal:base=>({...base,zIndex:500})}}
                        />
                    </div>
                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Date :</div>
                        <input 
                            type='date' 
                            onChange={(e) => setDate(e.target.value)} 
                            value={date}
                            className = 'bg-transparent outline-none'
                        />
                    </div>
                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Equipe :</div>
                        <button 
                            className='text-[28px] rounded-full h-[32px] flex items-center justify-center w-[32px] bg-blue-300 hover:bg-blue-400'
                            onClick={(e) => setOpenPortalModelTeam(true)}
                        >
                            +
                        </button>
                    </div>
                    <div className='flex flex-row space-x-4 items-center'>
                        <div>Jury :</div>
                        <button 
                            className='text-[28px] rounded-full h-[32px] flex items-center justify-center w-[32px] bg-blue-300 hover:bg-blue-400'
                            onClick={(e) => {setOpenPortalModelJury(true)}}
                        >
                            +
                        </button>
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
                        <button className='h-[35px] w-[150px] bg-blue-300 hover:bg-blue-400 rounded-full shadow-lg text-center'>Créer</button>
                    </div>
                </div>
                <ModalPortal
                    open={openPortalModelJury}
                    handleClose={setOpenPortalModelJury}
                >
                    <div className='h-fit w-[600px] p-12 rounded-xl shadow-xl bg-white flex flex-col space-y-6'>
                            <div>Liste des Jury</div>
                            <div>Vous avez choisi {jury.length} jury</div>
                        </div>
                </ModalPortal>
                <ModalPortal
                    open={openPortalModelTeam}
                    handleClose={setOpenPortalModelTeam}
                >
                    <div className='h-fit w-[600px] p-12 rounded-xl shadow-xl bg-white flex flex-col space-y-6'>
                            <div>Liste des équipes</div>
                            <div></div>
                        </div>
                </ModalPortal>
            </div>
        </div>
    )
}
export default creerSoutenance;