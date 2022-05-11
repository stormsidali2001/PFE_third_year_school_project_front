import axios from "axios";
import { Action, Thunk ,thunk} from "easy-peasy";


export  interface StudentPayload{
    email:string;
    firstName:string;
    lastName:string;
    dob:string;
    code:string;
}

export interface AdminStudentListState{
    
}
export interface AdminStudentListThunks{
    addSingleStudent:Thunk<this,StudentPayload,undefined,undefined>;

}
export interface AdminStudentListActions{
  
    
}

export  interface AdminStudentListModel extends AdminStudentListState , AdminStudentListThunks ,AdminStudentListActions{

}

export const adminStudentListModel:AdminStudentListModel = {
    addSingleStudent:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        return await axios.post("http://localhost:8080/signup/student",payload,{
            withCredentials:true
        })
    })
}