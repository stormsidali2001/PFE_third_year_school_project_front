import axios from "axios";
import { Thunk ,thunk} from "easy-peasy";

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

export interface SurveysThunks{
    createSurveyThunk:Thunk<this,SurveyPayload,undefined,undefined>
}
export interface SurveysModel extends SurveysThunks{
   
}

export const surveysModel:SurveysModel={
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
    })
}