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
                headers:{
                    'Authorization':'Bearer '+getStoreState().user.accesToken
                }
            })

            actions.setStudentList(res.data);
         }catch(err){
            console.log(err)
         }
    }),
    sendTeamInvitation:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
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
       

            let response;
           let res = await axios.post('http://localhost:8080/sendATeamInvitation',{
               ...payload
            },{
                headers:{
                    'Authorization':'Bearer '+getStoreState().user.accesToken
                },
                
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