
import { useEffect } from "react";
import HorisontalNavbar from "../components/HorisontalNavbar";
import StudentVerticalNavbar from "../components/StudentVerticalNavbar";
import Table from "../components/Table";
import { useStoreState ,useStoreActions} from "../store/hooks";

const TeamInvitation = ({toastsRef})=>{
    const {getTeamInvitationListThunk,accepteRefuseInvitation} = useStoreActions(store=>store.invitationModel)

    const {teamInvitationList} = useStoreState(store=>store.invitationModel)
    const {getUserInfo} = useStoreActions(store=>store.user)
    console.log(formatData(teamInvitationList))
    
    useEffect(async ()=>{
        await getTeamInvitationListThunk()
        await getUserInfo()

       
    },[])
    const handleClick = async(accepted,id)=>{
           const res =  await accepteRefuseInvitation({invitationId:id,accepted})
           
            
            if(res.status === 'Success'){
              
                    toastsRef.current.addMessage({mode:'Alert',text:res.message})
              
               
             }else if( res.status === 'Error'){
                toastsRef.current.addMessage({mode:'Error',text:res.message})
             }
           
     
    }
 
    const Column =({id})=> (
        <div>

        <button onClick={()=>handleClick(true,id)} className="bg-[#5375E2]/80 backdrop-blur-[8px]   font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider">
        accepter</button>
        <button onClick={()=>handleClick(false,id)} className="bg-[#5375E2]/80 backdrop-blur-[8px]   font-semibold  px-4 border-2 border-white hover:bg-[#5375E2]/60 rounded-full text-white ease-in transition-colors tracking-wider">
        refuser</button>
        </div>

    )
    function formatData(teamInvitationList){
        return teamInvitationList?.map(el=>{
            const {id,description,senderTeam,student} = el;
            if(senderTeam && !student){
                 const {teamLeader:{firstname,lastName}} = senderTeam;

                 return {id,description,teamName:senderTeam.nickname,leader:firstname+' '+lastName}

            }else if(!senderTeam && student){
                const {firstname,lastName} = student;

                 return {id,description,student:`${firstname} ${lastName}`}
            }
           
        })
       

    }
    return(
        <>
   
        <div  className="bg-background min-h-screen items-center pt-[100px] flex flex-col  py-8">
            <Table
                data={formatData(teamInvitationList)}
               
              
               
                 extraColumns = {[{name:'accepter/refuser',Column}]}
            />
        
           
        </div>
        </>
    )
}

export default TeamInvitation;