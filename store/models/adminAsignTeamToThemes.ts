import axios from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";

export interface AdminAsignTeamsToThemesPayload{
        promotionId:string;
        method:string;
}
export interface ThemeToTeamEntry {
    idTheme:string;
    teamIds:string[]
 }
 export interface ThemeToTeamPayload{
     themeToTeam:ThemeToTeamEntry[]
 }
export interface AdminAsignTeamsToThemesState{
    results:[];
}

export interface  AdminAsignTeamsToThemesActions{
    setResults:Action<this,[]>;
}
export interface AdminAsignTeamsToThemesThunks{
    asignThemesToTeams:Thunk<this,AdminAsignTeamsToThemesPayload,undefined,undefined>;
    applyThemesToTeamsAssignements:Thunk<this,ThemeToTeamPayload,undefined,undefined>;
}

export interface AdminAsignTeamsToThemesModel extends AdminAsignTeamsToThemesState,AdminAsignTeamsToThemesActions,AdminAsignTeamsToThemesThunks {}


export const adminAsignTeamsToThemesModel:AdminAsignTeamsToThemesModel = {
    results:[],
    setResults:action((state,payload)=>{
        state.results = payload
    }),
    asignThemesToTeams:thunk(async (actions,payload)=>{
  
            const res =  await axios.post('http://localhost:8080/asignThemesToTeams',{
            ...payload
            },
            {
                withCredentials:true,
            },
           
            ).catch(err=>{
                throw err;
            })
    
            actions.setResults(res.data)
            return res.data;

    
     
    }),
    applyThemesToTeamsAssignements:thunk(async (actions,payload)=>{
       
            const res =  await axios.post('http://localhost:8080/applyThemesToTeamsAssignements',{
            ...payload
            },
            {
                withCredentials:true,
            },
           
            ).catch(err=>{
                throw err;
            })
    
            return res.data;

     
    })
}