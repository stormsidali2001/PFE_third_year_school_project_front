import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy"

export interface AdminTeamsDocsState{
    documents:[];
    teams:[];
}
export interface AdminTeamsDocsActions{
    setDocuments:Action<this,[]>;
    setTeams:Action<this,[]>;
}
export interface AdminTeamsDocsThunks{
    getAllDocsAdmin:Thunk<this,{teamId:string,promotionId:string},undefined,undefined>;
}


export interface AdminTeamsDocsModel extends AdminTeamsDocsState,AdminTeamsDocsActions,AdminTeamsDocsThunks{}


export const adminTeamsDocsModel:AdminTeamsDocsModel = {
    documents:[],
    teams:[],
    setTeams:action((state,payload)=>{
        state.teams = payload;
    }),
    setDocuments:action((state,payload)=>{
        state.documents = payload;
    }),
    getAllDocsAdmin:thunk(async(actions,{teamId,promotionId})=>{
        const res = await axios.get(`http://localhost:8080/getAllDocsAdmin/${promotionId?promotionId:'all'}/${teamId?teamId:'all'}`,{
            withCredentials:true
        })
        actions.setDocuments(res.data)
    })



}
