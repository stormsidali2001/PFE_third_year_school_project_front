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

export interface OptionDataPaylaod{
    surveyId:string;
    optionId:string;
}

export interface SurveysState{
    surveys:SurveyPayload[];
    survey?:SurveyPayload | {};
    surveyParticipantsArguments:[];

}
export interface SurveysActions{
    setSurveys:Action<this,SurveyPayload[]>;
    setSurvey:Action<this,SurveyPayload>;
    setSurveyParticipantsArguments:Action<this,[]>;
}

export interface SurveysThunks{
    createSurveyThunk:Thunk<this,SurveyPayload,undefined,undefined>;
    getSurveysThunk:Thunk<this,undefined,undefined,undefined>;
    getSurveyThunk:Thunk<this,string,undefined,undefined>;
    submitAnswerThunk:Thunk<this,SubmitAnswerPayload,undefined,undefined>;
    getSurveyParticipantsArguments:Thunk<this,OptionDataPaylaod,undefined,undefined>;
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
    surveyParticipantsArguments:[]
    ,
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
       
            return await axios.post('http://localhost:8080/submitSurveyAnswer',payload,{
               withCredentials:true
            })

        
        
    })
    ,
    setSurveys:action((state,payload)=>{
        state.surveys = payload;
    }),
    setSurvey:action((state,payload)=>{
        state.survey = payload;
    }),
    setSurveyParticipantsArguments:action((state,payload)=>{
        state.surveyParticipantsArguments = payload;
    }),
    getSurveyParticipantsArguments:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
       const {surveyId,optionId} = payload;
        try{
            const res = await axios.get(`http://localhost:8080/getSurveyParticipantsArguments/${surveyId}/${optionId}`,{
               withCredentials:true
            })

            actions.setSurveyParticipantsArguments(res.data);
            return res.data;
         }catch(err){
            console.log(err)
         }

    
    
})

  

}