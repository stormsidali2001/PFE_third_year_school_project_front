import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy"

export interface TeacherTeamCommitDocsState{
    documents:[]
}
export interface TeacherTeamCommitDocsActions{
    setDocuments:Action<this,[]>;
}
export interface TeacherTeamCommitsThunks{
    getAllCommitsDocs:Thunk<this,{teamId:string},undefined,undefined>;
    validatedDocument:Thunk<this,{documentIds:string[]}>;
}


export interface TeacherTeamCommitDocsModel extends TeacherTeamCommitDocsState,TeacherTeamCommitDocsActions,TeacherTeamCommitsThunks{}


export const teacherTeamCommitDocsModel:TeacherTeamCommitDocsModel = {
    documents:[],
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

}
