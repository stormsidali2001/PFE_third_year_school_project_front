import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";


export interface TeamInfos{
    pseudo?:string;
    nombre?:string;
    lois?:string;
    Theme?:string;
    description?:string;
}
export interface ApplyTeamsCompletionPayload{
    addedStudents:{studentId:string,teamId:string}[];
    deletedStudents:{studentId:string,teamId:string}[];
    newTeams:{students:{studentId:string}}[];
    promotionId:string;
}
export interface TeamListState{
    teamsList:TeamInfos[];
    team:TeamInfos;
    teamsStats:{};

}
export interface TeamListActions{
    setTeamsList:Action<this,TeamInfos[]>;
    setTeam:Action<this,TeamInfos>;
 

}

export interface TeamListThunks{
    getTeamsList:Thunk<this,string,undefined,undefined>;
    getTeam:Thunk<this,string,undefined,undefined>;
    getTeamsWithThemes:Thunk<this,string,undefined,undefined>;
    getTeamsStats:Thunk<this,{promotionId:string},undefined,undefined>;
    completeTeams:Thunk<this,{promotionId:string},undefined,undefined>;
    applyTeamsCompletion:Thunk<this,ApplyTeamsCompletionPayload,undefined,undefined>;
}

export interface TeamListModel extends TeamListState , TeamListActions , TeamListThunks{

}

export const teamListModel:TeamListModel = {
    teamsList:[],
    team:null,
    teamsStats:{},
    setTeamsList:action((state,payload)=>{
            state.teamsList = payload
    }),
    setTeam:action((state,payload)=>{
        state.team = payload
    }),
    getTeamsList:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res =   await axios.get(`http://localhost:8080/getAllTeams/${payload?payload:'all'}`,{
                withCredentials:true,
            })
            
            actions.setTeamsList(res.data)

        }catch(err){
            console.log(err);
        }
  
    }),
    getTeamsWithThemes:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res =   await axios.get(`http://localhost:8080/getTeamsWithThemes/${payload?payload:'all'}`,{
                withCredentials:true,
            })
            actions.setTeamsList(res.data)

        }catch(err){
            console.log(err);
        }
  
    })
    ,
    getTeam:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res =   await axios.get(`http://localhost:8080/getTeams/${payload}`,{
                withCredentials:true,
            })
            actions.setTeam(res.data)
          return res.data;

        }catch(err){
            console.log(err);
        }
  
    }),
    getTeamsStats:thunk(async (actions,{promotionId},{getStoreState,getStoreActions})=>{
        try{
            const res =   await axios.get(`http://localhost:8080/getTeamsStats/${promotionId}`,{
                withCredentials:true,
            })
        
            return res.data;
        }catch(err){
            console.log(err);
        }
  
    }),
    completeTeams:thunk(async (actions,{promotionId},{getStoreState,getStoreActions})=>{
       
            const res =   await axios.post(`http://localhost:8080/completeTeams`,{
                promotionId,
            },{
                withCredentials:true,
            })
            .catch(err=>{
                throw err;
            })
        
            return res.data;
      
  
    }),
    applyTeamsCompletion:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
       
        const res =   await axios.post(`http://localhost:8080/applyTeamsCompletion`,payload,{
            withCredentials:true,
        })
    
        return res.data;
  

}),
    
   
}

