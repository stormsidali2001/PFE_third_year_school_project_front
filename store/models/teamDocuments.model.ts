import {Thunk,thunk,Action,action} from 'easy-peasy';
import axios from 'axios'
export interface TeamDocumentPayload{
    name:string;
    url:string;
    description:string;
    ownerId:string;
}
export interface DeleteDocumentPayload{
    docsIds:string[];
}
export interface TeamDocument extends TeamDocumentPayload{
    id:string;
}

export interface TeamDocumentsState{
    documents:TeamDocument[];
}

export interface TeamDocumentsActions{
    setDocuments:Action<this,TeamDocument[]>;
}
export interface TeamDocumentsThunks{
    createTeamDocument:Thunk<this,TeamDocumentPayload,undefined,undefined>;
    getTeamDocuments:Thunk<this,undefined,undefined,undefined>;
    deleteTeamDocs:Thunk<this,DeleteDocumentPayload,undefined,undefined>;
}

export interface TeamDocumentModel extends TeamDocumentsState,TeamDocumentsActions,TeamDocumentsThunks{

}

export const teamDocumentModel:TeamDocumentModel = {
    documents:[],
    setDocuments:action((state,payload)=>{
        state.documents = payload;
    }),
    createTeamDocument:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
      return   await axios.post('http://localhost:8080/addTeamDocument',{
            ...payload
        },{
            withCredentials:true
        })
    }),
    getTeamDocuments:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
      const res =    await axios.get('http://localhost:8080/getTeamDocuments',{
              withCredentials:true
          })
          actions.setDocuments(res.data)
      }),
    deleteTeamDocs:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
      return   await axios.post('http://localhost:8080/deleteTeamDocs',{
          ...payload
      },{
                withCredentials:true
            })
           
        })
      
}