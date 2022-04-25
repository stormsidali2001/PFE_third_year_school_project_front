import  jwt_decode from "jwt-decode";
import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";
import { UserModel } from "./user.model";
export interface  Notification {
       id?:string;
       description?:string;
       seen?:boolean;
       createdAt?:Date;
}
export interface NotificationsServiceState{
    notifications:Notification[];
    totalNotificationCount:number;
}
export interface NotificationsServiceActions{
    setNotifications:Action<this,Notification[]>;
    setTotalNotificationsCount:Action<this,number>;
}
export interface NotificationsServiceThunks{
    getLastNotificationsThunk:Thunk<this,undefined,undefined,any>;

}



export interface NotificationsServiceModel extends NotificationsServiceState,NotificationsServiceActions,NotificationsServiceThunks{
   
}

export const notificationsServiceModel:NotificationsServiceModel={
    notifications:[],
    totalNotificationCount:0,
    setNotifications:action((state,payload:Notification[])=>{
          state.notifications = payload;
        
    }),
    setTotalNotificationsCount:action((state,payload:number)=>{
        state.totalNotificationCount = payload;
      
  })
    ,
    getLastNotificationsThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
         try{

             console.log(getStoreState().user.accesToken,'access token')
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
                console.log(decodedJwt,'***********************')
                const res = await axios.get('http://localhost:8080/notifications/3',{
                    headers:{
                        'Authorization':'Bearer '+getStoreState().user.accesToken
                    }
                })
                actions.setTotalNotificationsCount(res.data.totalNotificationCount)
                actions.setNotifications(res.data.notifications)

         }catch(err){
            console.log(err)
         }
    })


}