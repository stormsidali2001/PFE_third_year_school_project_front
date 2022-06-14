import axios from "axios";
import { Action, Thunk ,thunk,action} from "easy-peasy";


interface AnnouncementDoc{
    id?:string;
    name:string;
    url:string;
}
export interface TeamAnnouncementPayload{
    title:string;
    description:string;
    documents:AnnouncementDoc[];
}
export interface TeamAnnouncementState{
    announcements:TeamAnnouncementPayload[];
}
export interface TeamAnnouncementActions{
    setAnnouncements:Action<this,TeamAnnouncementPayload[]>
}
export interface TeamAnnouncementsThunks{
    createAnnouncementThunk:Thunk<this,TeamAnnouncementPayload,undefined,undefined>;
    getAnnouncementsThunk:Thunk<this,undefined,undefined,undefined>;
}

export interface TeamAnnouncementsModel extends TeamAnnouncementsThunks,TeamAnnouncementState,TeamAnnouncementActions{

}


export const teamAnnouncementsModel:TeamAnnouncementsModel = {
    announcements:[],
    setAnnouncements:action( (state,payload)=>{
        state.announcements = payload;
    }),
    createAnnouncementThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        console.log(payload,'kkkkkkkkkkkkkkkkkkkkkkkkkk');
        return  await axios.post('http://localhost:8080/createTeamAnnouncement',{...payload},{
           
            withCredentials:true
        
        })
    }),
    getAnnouncementsThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
   
        try{
           const res =  await axios.get('http://localhost:8080/getAnnouncements',{
           
                withCredentials:true
            
            })
            actions.setAnnouncements(res.data)

        }catch(err){
            console.log(err)
        }
     
        
    })
}