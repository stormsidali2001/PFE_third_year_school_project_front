import axios from "axios";
import { Action, Thunk ,thunk,action} from "easy-peasy";


interface ThemeDoc{
    id?:string;
    name:string;
    url:string;
}
export interface ThemePayload{
    title?:string;
    description?:string;
    documents?:ThemeDoc[];
    promotionId?:string;
}
export interface EncadrerThemePayload{
    themeId:string;
    teacherId:string;
}
export interface ThemeState{
    themes:ThemePayload[];
    theme:ThemePayload;
}
export interface ThemesActions{
    setThemes:Action<this,ThemePayload[]>
    setTheme:Action<this,ThemePayload>

}
export interface ThemesThunks{
    
    getThemesThunk:Thunk<this,string|undefined,undefined,undefined>;
    getThemeThunk:Thunk<this,string,undefined,undefined>;
    encadrerThemeThunk:Thunk<this,EncadrerThemePayload,undefined,undefined>;
}

export interface ThemesModel extends ThemesThunks,ThemeState,ThemesActions{

}


export const themesModel:ThemesModel = {
    themes:[],
    theme:{},
    setThemes:action( (state,payload)=>{
        state.themes= payload;
    }),
  
    setTheme:action( (state,payload)=>{
        state.theme = payload;
    }),
  
    getThemesThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
   
        try{
            let res;
            if(payload){
                res =  await axios.get(`http://localhost:8080/getThemes/${payload}`,{
           
                    withCredentials:true
                
                })

            }else{
                res =  await axios.get('http://localhost:8080/getThemes',{
           
                    withCredentials:true
                
                })

            }
          
            actions.setThemes(res.data)
            return res.data

        }catch(err){
            console.log(err)
        }
     
        
    }),
    getThemeThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
   
        try{
           
                const res =  await axios.get(`http://localhost:8080/getTheme/${payload}`,{
           
                    withCredentials:true
                
                })

            actions.setTheme(res.data)
            return res.data

        }catch(err){
            console.log(err)
        }
     
        
    }),
    encadrerThemeThunk:thunk(async (actions,payload,{getStoreState,getStoreActions})=>{
   
      
           
                const res =  await axios.post(`http://localhost:8080/encadrerTheme`,{...payload},{
           
                    withCredentials:true
                
                })

        
           

      
     
        
    })
  
   

}