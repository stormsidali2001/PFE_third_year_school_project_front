import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";


export interface TeamInfos{
    pseudo?:string;
    nombre?:string;
    lois?:string;
    Theme?:string;
    description?:string;
}
export interface TeamListState{
    teamsList:TeamInfos[];
    team:TeamInfos;

}
export interface TeamListActions{
    setTeamsList:Action<this,TeamInfos[]>;
    setTeam:Action<this,TeamInfos>;

}

export interface TeamListThunks{
    getTeamsList:Thunk<this,string,undefined,undefined>;
    getTeam:Thunk<this,string,undefined,undefined>;
}

export interface TeamListModel extends TeamListState , TeamListActions , TeamListThunks{

}

export const teamListModel:TeamListModel = {
    teamsList:[],
    team:{},
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
}

