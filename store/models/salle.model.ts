import {Action,action,thunk,Thunk} from 'easy-peasy'
import axios from 'axios'
export interface Salle{
    id:string;
    name:string;
}
export interface SallesState{
        salles:Salle[];
}

export interface SallesActions{
    setSalles:Action<this,Salle[]>
}

export interface SallesThunks{
    getSallesThunk:Thunk<this,undefined,undefined,undefined>;
}

export interface SallesModel extends SallesState,SallesActions,SallesThunks{}

export const sallesModel:SallesModel = {
    salles:[],
    setSalles:action((state,payload)=>{
        state.salles = payload;
    }),
    getSallesThunk:thunk(async (actions,payload)=>{
            const res = await axios.get("http://localhost:8080/getSalles",{
                withCredentials:true
            })
            actions.setSalles(res.data)
            return res.data;
       
        
    })
}