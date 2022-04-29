import axios from "axios";
import { Thunk ,thunk} from "easy-peasy";


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
export interface TeamAnnouncementsThunks{
    createAnnouncementThunk:Thunk<this,TeamAnnouncementPayload,undefined,undefined>;
}

export interface TeamAnnouncementsModel extends TeamAnnouncementsThunks{

}


export const teamAnnouncementsModel:TeamAnnouncementsModel = {
    createAnnouncementThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        return  await axios.post('http://localhost:8080/createTeamAnnouncement',payload,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
            withCredentials:true
        
        })
    })
}