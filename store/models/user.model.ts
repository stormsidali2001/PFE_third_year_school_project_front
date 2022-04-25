import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";
import { NotificationsServiceModel } from "./notifications.model";

export interface StudentState{
    studentId?:string;
    code?:string;
    firstName?:string;
    lastName?:string;
    dob?:Date;
}
export interface  UserState extends StudentState {
        uuid?:string;
        email?:string;
        accesToken?:string;
        refrechToken?:string;
    
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
    loginThunk:Thunk<this,LoginPayload,undefined,NotificationsServiceModel>;
    logout:Thunk<this,undefined,undefined,undefined>;
}
export interface UserModel extends UserState,UserActions,UserThunks{
  
}

export const userModel:UserModel | null={
    setUser:action((state,payload:UserState)=>{
        state.uuid=payload.uuid;
        state.email=payload.email;
        state.accesToken=payload.accesToken;
        state.refrechToken=payload.refrechToken;
        state.studentId=payload.studentId;
        state.code=payload.code;
        state.firstName=payload.firstName;
        state.lastName=payload.lastName;
        state.dob=payload.dob;
        
    }),
    loginThunk:thunk(async(actions,payload:LoginPayload,{getStoreState,getStoreActions})=>{
          
           
         
            const res = await axios.post("http://localhost:8080/signin",{
               ...payload
            })

            
            actions.setUser(res.data)
           
            
         
      return  res.data;
    }),
    logout:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        actions.setUser(null)
    })
    
}