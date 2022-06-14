import  jwt_decode from "jwt-decode";
import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";
import { UserModel } from "./user.model";
import { Socket } from "socket.io-client";
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
    setNotification:Action<this,Notification>;
}
export interface NotificationsServiceThunks{
    getLastNotificationsThunk:Thunk<this,undefined,undefined,any>;
    getNewNotificationThunk:Thunk<this,any,any,any>;

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

            
              
               
               
                const res = await axios.get('http://localhost:8080/notifications/3',{
                   
                    withCredentials:true
                })
                actions.setTotalNotificationsCount(res.data.totalNotificationCount)
                actions.setNotifications(res.data.notifications)
                const socket = getStoreState().socketModel.socket as Socket;
              
                // socket.on('new-notification',async()=>{
                //     const res = await axios.get('http://localhost:8080/notifications/3',{
                   
                //         withCredentials:true
                //     })
                //     actions.setTotalNotificationsCount(res.data.totalNotificationCount)
                //     actions.setNotifications(res.data.notifications)
                // })

         }catch(err){
            console.log(err)
         }
    }),
    setNotification:action((state,payload:Notification)=>{
        state.notifications = [payload,...state.notifications]
        state.totalNotificationCount++;
        console.log(state.notifications,"new notifications")
      
  }),
    getNewNotificationThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        const socket = getStoreState().socketModel.socket as Socket;
        socket.on("new_notification", notfication =>{
                    
                    actions.setNotification(notfication)
                   payload?.current?.addMessage({text:notfication.description,mode:'Alert'})
    })
    })


}