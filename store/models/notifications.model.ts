import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";

export interface  Notification {
       id?:string;
       description?:string;
       seen?:boolean;

}
export interface NotificationsState{
    notifications:Notification[]
}
export interface NotificationsActions{
    setNotifications:Action<this,NotificationsState>;
}
export interface NotificationsThunks{
    getLastNotificationsThunk:Thunk<this,undefined,undefined,NotificationsModel>;
}



export interface NotificationsModel extends NotificationsState,NotificationsActions,NotificationsThunks{
   
}

export const notificationsModel:NotificationsModel={
    notifications:[],
    setNotifications:action((state,payload:NotificationsState)=>{
          state.notifications = payload.notifications;
        
    }),
    getLastNotificationsThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
         try{
                const res = await axios.get('http://localhost:8080/notifications/3',{
                    headers:{
                        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMmFhOTEyNTYtNDlhMS00MDgxLThjNjgtZGFjOTRkNTIxOGU1IiwiZW1haWwiOiJhMi5hc3NvdWxAZXNpLXNiYS5keiIsImlhdCI6MTY0OTI1Mjk0OCwiZXhwIjoxNjQ5MjUzODQ4fQ.XkcfcSLkUbpyF6O_Cpf-2AaG6nqa5DFdUwBjHiv6a-E'
                    }
                })
                actions.setNotifications(res.data)

         }catch(err){
            console.log(err)
         }
    })


}