import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
import { NotificationsServiceModel } from "./notifications.model";
import { SocketModel } from "./socket.model";
import {io, Socket} from 'socket.io-client';



export interface  UserState  {
       userType?:string;
       student?:{
           id:string;
           firstName:string;
           lastName:string;
           dob:string;
           code:string;
           team:{
               id:string;
               nickName:string;
               teamLeader:{
                id:string;
                firstName:string;
                lastName:string;
                dob:string;
                code:string;
               }

           }
       }
    
    
}
export interface UserActions{
    setUser:Action<this,UserState>;
  
}
export interface LoginPayload{
    email:string;
    password:string;
}
export interface UserThunks{
    // signin:Thunk<this,LoginPayload,undefined,Model>;
    loginThunk:Thunk<this,LoginPayload,undefined,any>;
    getUserInfo:Thunk<this,undefined,undefined,any>;
    logout:Thunk<this,undefined,undefined,undefined>;
    uploadFileThunk:Thunk<this,any,undefined,any>;
    uploadFilesThunk:Thunk<this,any,undefined,any>;
    getFileThunk:Thunk<this,string,undefined,undefined>;


}
export interface UserModel extends UserState,UserActions,UserThunks{
  
}

export const userModel:UserModel | null={
    setUser:action((state,payload)=>{
            console.log(state,payload)
            state.userType = payload.userType
            state[payload.userType] = payload[payload.userType];

        
    }),
    loginThunk:thunk(async(actions,payload:LoginPayload,{getStoreState,getStoreActions})=>{
          
           
         
            const res = await axios.post("http://localhost:8080/signin",{
               ...payload
            },
            {
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
            }
            )
         const user = await actions.getUserInfo();
      
            console.log(res,user)
         
      return  user;
    }),
    getUserInfo:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const user = (await axios.get("http://localhost:8080/getUserInfo",{
                withCredentials:true,
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*'
                },
               
                
               
            })).data
            
            actions.setUser(user)
             const socket = await io("http://localhost:8080",
             {withCredentials:true}) as Socket;
             socket.emit("joinTeamRoom")
             //@ts-ignore
             getStoreActions().socketModel.setSocket(socket);
            //  socket.emit('user-online',{user})
            // socket.on('test',(data)=>{
            //     alert('fsfsf'+data)
            //     console.log('fssffsff')
            // })
            return user;

        }catch(err){
            console.log(err,"userModel/getUseInfo")
            return {}
        }
       
    })
    ,
    logout:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        actions.setUser(null)
    }),
    uploadFileThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
       return  await axios.post('http://localhost:8080/uploadFile',payload,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
            withCredentials:true
        
        })
    }),
    uploadFilesThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
      return  await axios.post('http://localhost:8080/uploadFiles',payload,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
            withCredentials:true
        
        })
    }),
    getFileThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        window.open(`http://localhost:8080/getFile/${payload}`)
        return  await axios.get(`http://localhost:8080/getFile/${payload}`,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
            withCredentials:true
        
        })
       
    })

    
}