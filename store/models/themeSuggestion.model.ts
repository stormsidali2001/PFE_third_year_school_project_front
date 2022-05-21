import axios from "axios";
import { Action, Thunk ,thunk,action} from "easy-peasy";


interface ThemeSuggestionDoc{
    id?:string;
    name:string;
    url:string;
}
export interface ThemeSuggestionPayload{
    title?:string;
    description?:string;
    documents?:ThemeSuggestionDoc[];
    promotionId?:string;
}
export interface ThemeSuggestionState{
    themeSuggestions:ThemeSuggestionPayload[];
    themeSuggestion:ThemeSuggestionPayload;
}
export interface ThemeSuggestionActions{
    setThemeSuggestions:Action<this,ThemeSuggestionPayload[]>
    setThemeSuggestion:Action<this,ThemeSuggestionPayload>

}
export interface ThemeSuggestionThunks{
    createThemeSuggestionThunk:Thunk<this,ThemeSuggestionPayload,undefined,undefined>;
    
    getThemeSuggestionsThunk:Thunk<this,string|undefined,undefined,undefined>;
    getThemeSuggestionThunk:Thunk<this,string,undefined,undefined>;
    validateThemeSuggestionThunk:Thunk<this,string,undefined,undefined>;
}

export interface ThemeSuggestionsModel extends ThemeSuggestionThunks,ThemeSuggestionState,ThemeSuggestionActions{

}


export const themeSuggestionsModel:ThemeSuggestionsModel = {
    themeSuggestions:[],
    themeSuggestion:{},
    setThemeSuggestions:action( (state,payload)=>{
        state.themeSuggestions = payload;
    }),
  
    setThemeSuggestion:action( (state,payload)=>{
        state.themeSuggestion = payload;
    }),
    createThemeSuggestionThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        console.log(payload,'kkkkkkkkkkkkkkkkkkkkkkkkkk');
        return  await axios.post('http://localhost:8080/createThemeSuggestion',{...payload},{
           
            withCredentials:true
        
        })
    }),
    getThemeSuggestionsThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
   
        try{
            let res;
            if(payload){
                res =  await axios.get(`http://localhost:8080/getThemeSuggestions/${payload}`,{
           
                    withCredentials:true
                
                })

            }else{
                res =  await axios.get('http://localhost:8080/getThemeSuggestions',{
           
                    withCredentials:true
                
                })

            }
          
            actions.setThemeSuggestions(res.data)

        }catch(err){
            console.log(err)
        }
     
        
    }),
    getThemeSuggestionThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
   
        try{
           const res =  await axios.get(`http://localhost:8080/getThemeSuggestions/${payload}`,{
           
                withCredentials:true
            
            })
            actions.setThemeSuggestion(res.data)
            return res.data;

        }catch(err){
            console.log(err)
        }
     
        
    }),
    validateThemeSuggestionThunk:thunk(async (actions,payload)=>{
        try{
                await axios.post('http://localhost:8080/validateThemeSuggestion',{
                themeId:payload
            },{
            
                 withCredentials:true
             
             })

            
          
 
         }catch(err){
             console.log(err)
         }

    })
    

}