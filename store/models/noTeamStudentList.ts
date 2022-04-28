import  jwt_decode from "jwt-decode";

import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";
import { UserModel } from "./user.model";
export interface  Student {
        studentId?:string;
        code?:string;
        firstName?:string;
        lastName?:string;
        dob?:Date;
}
export interface InvitationPayload{
    receiverId:string;
    description:string;
}
export interface NoTeamStudentListState {
    students:Student[];
}
export interface NoTeamStudentListActions{
    setStudentList:Action<this,Student[]>;
}
export interface NoTeamStudentListThunks{
    getNoTeamStudentList:Thunk<this,undefined,undefined,any>;
    sendTeamInvitation:Thunk<this,InvitationPayload,undefined,any>;
}



export interface NoTeamStudentListModel extends NoTeamStudentListState,NoTeamStudentListActions,NoTeamStudentListThunks{
   
}

export const noTeamStudentListModel:NoTeamStudentListModel={
    students:[],
    setStudentList:action((state,payload:Student[])=>{
          state.students = payload;
        
    }),
    getNoTeamStudentList:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
         try{
            const res = await axios.get('http://localhost:8080/getStudentsWithoutTeam',{
               withCredentials:true
            })

            actions.setStudentList(res.data);
         }catch(err){
            console.log(err)
         }
    }),
    sendTeamInvitation:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
    
       

            let response;
           let res = await axios.post('http://localhost:8080/sendATeamInvitation',{
               ...payload
            },{
               withCredentials:true
                
            },
            )
            .then(res=>{
                response ={status:'Success',message:res.data}
            })
            .catch(err=>{  
              
                response =  {status:'Error',message:err.response.data.message}
               

            })
          
       
            return response
       
        
    })


}