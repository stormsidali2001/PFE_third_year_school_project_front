import { action, Action, Thunk } from "easy-peasy";

export interface StudentState{
    studentId?:string;
    code?:string;
    firstName?:string;
    lastName?:string;
    dob?:Date;
}
export interface  UserState extends StudentState{
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
}
export interface UserModel extends UserState,UserActions,UserThunks{
   
}

export const userModel:UserModel={
   
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
        
    })

}