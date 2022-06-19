import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";




export interface CommitsStates {
    teamsInResponsability:[];
    documents:[];
    commits:[];


}
export interface CommitsActions {
    setTeamsInResponsability:Action<this,[]>;
    setCommits:Action<this,[]>;
    

}
export interface CommitsThunks {
    getTeamsTeacherResponsibleFor:Thunk<this,string,undefined,undefined>;
    getTeamCommits:Thunk<this,{teamId:string},undefined,undefined>;

}
export interface CommitsModel extends CommitsStates,CommitsActions,CommitsThunks{}


export const commitsModel:CommitsModel = {
    teamsInResponsability:[],
    documents:[],
    commits:[],
    setTeamsInResponsability:action( (state,payload)=>{
        state.teamsInResponsability = payload;
    }),
    setCommits:action((state,payload)=>{
        state.commits = payload
    }),
    getTeamsTeacherResponsibleFor:thunk(async (actions,payload)=>{
        const res = await axios.get(`http://localhost:8080/getTeamsTeacherResponsibleFor/${payload?payload:'all'}`,{
            withCredentials:true
        })

        actions.setTeamsInResponsability(res.data)

        return res.data;
    }),
    getTeamCommits:thunk(async (actions,{teamId})=>{
        const res = await axios.get('http://localhost:8080/getTeamCommits'+'/'+teamId,{
            withCredentials:true
        })

        actions.setCommits(res.data)

        return res.data;
    })



}