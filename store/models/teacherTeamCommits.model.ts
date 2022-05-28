import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy"

export interface TeacherTeamCommitDocsState{
    documents:[];
    teams:[];
}
export interface TeacherTeamCommitDocsActions{
    setDocuments:Action<this,[]>;
    setTeams:Action<this,[]>;
}
export interface TeacherTeamCommitsThunks{
    getAllCommitsDocs:Thunk<this,{teamId:string},undefined,undefined>;
    validatedDocument:Thunk<this,{documentIds:string[]}>;
    getTeamsTeacherResponsibleForWithMembers:Thunk<this,string,undefined,undefined>;
}


export interface TeacherTeamCommitDocsModel extends TeacherTeamCommitDocsState,TeacherTeamCommitDocsActions,TeacherTeamCommitsThunks{}


export const teacherTeamCommitDocsModel:TeacherTeamCommitDocsModel = {
    documents:[],
    teams:[],
    getAllCommitsDocs:thunk(async(actions,{teamId})=>{
        const res = await axios.get(`http://localhost:8080/getAllCommitsDocs/${teamId}`,
        {
            withCredentials:true
        })
        actions.setDocuments(res.data)
    }),
    setDocuments:action((state,payload)=>{
        state.documents = payload;
    }),
    validatedDocument:thunk(async(actions,{documentIds})=>{
        const res = await axios.post('http://localhost:8080/validatedDocument',
        {
            documentIds
        },
        {
            withCredentials:true
        })
       
    }),
    getTeamsTeacherResponsibleForWithMembers:thunk(async(actions,payload)=>{
        let res;
        if(payload){
            res = await axios.get('http://localhost:8080/getTeamsTeacherResponsibleForWithMembers/'+payload,
            {
                withCredentials:true,
            })
        }else{
            res = await axios.get('http://localhost:8080/getTeamsTeacherResponsibleForWithMembers/'+'all',
            {
                withCredentials:true,
            })

        }
        
       
        actions.setTeams(res.data)
    }),
    setTeams:action((state,payload)=>{
        state.teams = payload;
    })

}
