import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";


export  interface TeamInvitationListEl {
    id:string;
    description:string;
    senderTeam:{
        id:string;
        nickname:string;
        teamLeader:{
            id:string;
            firstName:string;
            lastName:string;
        }
    }
    

}
export interface accepteInvitationPayload{
    invitationId:string;
    accepte:boolean;
}

export interface InvitationState{
    teamInvitationList:TeamInvitationListEl[];
}
export interface InvitationActions{
    setTeamInvitationList:Action<this,TeamInvitationListEl[]>;
}
export interface InvitationThunks{
    getTeamInvitationListThunk:Thunk<this,undefined,undefined,any>
    accepteRefuseInvitation:Thunk<this,accepteInvitationPayload,undefined,any>
}

export interface InvitationModel extends InvitationState,InvitationActions,InvitationThunks{

}

export const invitationModel:InvitationModel  = {
    teamInvitationList:[],
    setTeamInvitationList:action((state,payload:TeamInvitationListEl[])=>{
        state.teamInvitationList = payload;
    }),
    getTeamInvitationListThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
        try{
            console.log(getStoreState().user.accesToken,'access token')
               const res = await axios.get('http://localhost:8080/getInvitationList',{
                   headers:{
                       'Authorization':'Bearer '+getStoreState().user.accesToken
                   }
               })
               actions.setTeamInvitationList(res.data)

        }catch(err){
           console.log(err)
        }
   }),
   accepteRefuseInvitation:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
       
    const decodedJwt = jwt_decode(getStoreState().user.accesToken);
        const expired = Date.now() >= decodedJwt.exp*1000;
        if(expired){
            const res = await axios.get('http://localhost:8080/refrechtoken',{
            headers:{
                'Authorization':'Bearer '+getStoreState().user.refrechToken
            }
            })
            const tokens = res.data;
            console.log('got new tokens!!!',tokens)
            getStoreActions().user.setUser({...getStoreState().user,...tokens}) 
        }
        let response;
         await axios.post('http://localhost:8080/acceptRefuseTeamInvitation',{
            ...payload
         },{
             headers:{
                 'Authorization':'Bearer '+getStoreState().user.accesToken
             },
             
         },
         )
         .then(res=>{
             console.log(getStoreState(),"nazim khra")
             response ={status:'Success',message:res.data}
             actions.setTeamInvitationList(getStoreState().invitationModel.teamInvitationList.filter(el=>el.id!==payload.invitationId))
         })
         .catch(err=>{  
           
             response =  {status:'Error',message:err?.response?.data?.message}
            console.log(err,'................')

         })
       
         console.log(response,"fsffssfs5fsf5")
         return response
       

  
   })
}