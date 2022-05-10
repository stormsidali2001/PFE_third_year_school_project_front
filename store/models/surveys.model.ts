import axios from "axios";
import { Thunk ,thunk,Action,action} from "easy-peasy";

interface OptionPayload{
    description:string;
}
export interface SurveyPayload{
    survey:{
        title:string;
        description:string;
        period:number;
        options:OptionPayload[];

    }
   

}

export interface SurveysState{
    surveys:SurveyPayload[];
    survey?:SurveyPayload | {};
}
export interface SurveysActions{
    setSurveys:Action<this,SurveyPayload[]>;
    setSurvey:Action<this,SurveyPayload>;
}
export interface SurveysThunks{
    createSurveyThunk:Thunk<this,SurveyPayload,undefined,undefined>;
    getSurveysThunk:Thunk<this,undefined,undefined,undefined>;
    getSurveyThunk:Thunk<this,string,undefined,undefined>;
    submitAnswerThunk:Thunk<this,SubmitAnswerPayload,undefined,undefined>;
}
export interface SurveysModel extends SurveysThunks,SurveysActions,SurveysState{
   
}

export interface SubmitAnswerPayload{
    surveyId:string;
    optionId:string;
    argument:string;
}

export const surveysModel:SurveysModel={
    surveys:[],
    survey:{},
    createSurveyThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res = await axios.post("http://localhost:8080/createSurvey",{
                    ...payload
            },{
                withCredentials:true
            })

        }catch(err){
            throw new  Error("surveyModel/createSurvey",err)
        }
    }),
    getSurveysThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res = await axios.get('http://localhost:8080/surveys',{
               withCredentials:true
            })

            actions.setSurveys(res.data);
         }catch(err){
            console.log(err)
         }
    }),
    getSurveyThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res = await axios.get(`http://localhost:8080/surveys/${payload}`,{
               withCredentials:true
            })

            actions.setSurvey(res.data);
            return res.data;
         }catch(err){
            console.log(err)
         }
    }),
    submitAnswerThunk:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res = await axios.post('http://localhost:8080/submitSurveyAnswer',payload,{
               withCredentials:true
            })

           console.log(res)
         }catch(err){
            console.log(err)
         }
    })
    ,
    setSurveys:action((state,payload)=>{
        state.surveys = payload;
    }),
    setSurvey:action((state,payload)=>{
        state.survey = payload;
    })
  

}