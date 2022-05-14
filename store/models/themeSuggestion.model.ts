import axios from "axios";
import { Action, Thunk ,thunk,action} from "easy-peasy";


interface ThemeSuggestionDoc{
    id?:string;
    name:string;
    url:string;
}
export interface ThemeSuggestionPayload{
    title:string;
    description:string;
    documents:ThemeSuggestionDoc[];
}
export interface ThemeSuggestionState{
    themeSuggestions:ThemeSuggestionPayload[];
}
export interface ThemeSuggestionActions{
    setThemeSuggestions:Action<this,ThemeSuggestionPayload[]>
}
export interface ThemeSuggestionThunks{
    createThemeSuggestionThunk:Thunk<this,ThemeSuggestionPayload,undefined,undefined>;
    getThemeSuggestionsThunk:Thunk<this,undefined,undefined,undefined>;
}

export interface ThemeSuggestionsModel extends ThemeSuggestionThunks,ThemeSuggestionState,ThemeSuggestionActions{

}


export const themeSuggestionsModel:ThemeSuggestionsModel = {
    themeSuggestions:[],
    setThemeSuggestions:action( (state,payload)=>{
        state.themeSuggestions = payload;
    }),
    createThemeSuggestionThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        console.log(payload,'kkkkkkkkkkkkkkkkkkkkkkkkkk');
        return  await axios.post('http://localhost:8080/createThemeSuggestion',{...payload},{
           
            withCredentials:true
        
        })
    }),
    getThemeSuggestionsThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
   
        try{
           const res =  await axios.get('http://localhost:8080/getAnnouncement',{
           
                withCredentials:true
            
            })
            actions.setThemeSuggestions(res.data)

        }catch(err){
            console.log(err)
        }
     
        
    })
}