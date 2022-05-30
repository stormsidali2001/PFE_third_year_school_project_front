import axios from "axios";
import { thunk, Thunk } from "easy-peasy"


export interface SoutenanceStates{}
export interface SoutenanceActions{

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
}

export interface SoutenanceModel extends SoutenanceStates,SoutenanceActions,SoutenanceThunks{

}


export const soutenanceModel:SoutenanceModel = {
    createSoutenance:thunk(async(actions,payload)=>{
        axios.post('http://localhost:8080/createSoutenance',payload,{
            withCredentials:true
        })
    })

}