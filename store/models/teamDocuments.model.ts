import {Thunk,thunk,Action,action} from 'easy-peasy';
import axios from 'axios'
export interface TeamDocumentPayload{
    name:string;
    url:string;
    description:string;
    ownerId:string;
    typeDocId:string;
}

export interface CommitPaylaod{
    title:string;
    description:string;
    docsIds:string[];

}
export interface DeleteDocumentPayload{
    docsIds:string[];
}
export interface TeamDocument extends TeamDocumentPayload{
    id:string;
}

export interface TeamDocumentsState{
    documents:TeamDocument[];
    documentTypes:string[];
}

export interface TeamDocumentsActions{
    setDocuments:Action<this,TeamDocument[]>;
    setDocumentTypes:Action<this,string[]>;
}
export interface TeamDocumentsThunks{
    createTeamDocument:Thunk<this,TeamDocumentPayload,undefined,undefined>;
    getTeamDocuments:Thunk<this,undefined,undefined,undefined>;
    deleteTeamDocs:Thunk<this,DeleteDocumentPayload,undefined,undefined>;
    getPromotionDocumentTypes:Thunk<this,undefined,undefined,undefined>;
    commitDocs:Thunk<this,CommitPaylaod,undefined,undefined>;
}

export interface TeamDocumentModel extends TeamDocumentsState,TeamDocumentsActions,TeamDocumentsThunks{

}

export const teamDocumentModel:TeamDocumentModel = {
    documents:[],
    documentTypes:[],
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
           
        }),

    getPromotionDocumentTypes:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        const res =    await axios.get('http://localhost:8080/getPromotionDocumentTypes',{
                withCredentials:true
            })
            actions.setDocumentTypes(res.data)
        }),
        setDocumentTypes:action((state,payload)=>{
            state.documentTypes = payload;
        }),

    commitDocs:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
           await axios.post('http://localhost:8080/commitDocs',
           {
               ...payload
           }
           , 
            {
                withCredentials:true
            })
           
        }),
     
      
}