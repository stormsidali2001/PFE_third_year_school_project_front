import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy"


export interface SoutenanceStates{
    soutenances:[],
    soutenance:{}
}
export interface SoutenanceActions{
    setSoutenances:Action<this,[]>
    setSoutenance:Action<this,{}>

}

export interface SoutenancePayload{
    teamId:string;
    title:string;
    description:string;
    date:Date;
    jurysIds:string[];
    salleId:string;
}
export interface SoutenanceThunks{
    createSoutenance:Thunk<this,SoutenancePayload,undefined,undefined>;
    canSoutenir:Thunk<this,{teamId:string},undefined,undefined>;
    getSoutenances:Thunk<this,string,undefined,undefined>;
    getSoutenance:Thunk<this,string,undefined,undefined>;
    
}

export interface SoutenanceModel extends SoutenanceStates,SoutenanceActions,SoutenanceThunks{

}


export const soutenanceModel:SoutenanceModel = {
    soutenances:[],
    soutenance:{},
    setSoutenances:action((state,payload)=>{
        state.soutenances = payload;
    }),
    setSoutenance:action((state,payload)=>{
        state.soutenance = payload;
    }),
    createSoutenance:thunk(async(actions,payload)=>{
      

       await axios.post('http://localhost:8080/createSoutenance',payload,{
            withCredentials:true
        })
    }),
    canSoutenir:thunk(async(actions,{teamId})=>{
      await  axios.post('http://localhost:8080/canSoutenir',{teamId},{
            withCredentials:true
        })
    }),
    getSoutenances:thunk(async(actions,payload)=>{
        const res = await  axios.get(`http://localhost:8080/getSoutenances/${payload?payload:'all'}`,{
              withCredentials:true
          })
          console.log("test" ,res.data,'res.data')
          actions.setSoutenances(res.data)
      }),
    getSoutenance:thunk(async(actions,payload)=>{
        const res = await  axios.get(`http://localhost:8080/getSoutenance/${payload}`,{
              withCredentials:true
          })
          actions.setSoutenance(res.data)
    })
      

}