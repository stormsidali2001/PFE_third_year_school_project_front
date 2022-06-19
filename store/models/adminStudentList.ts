import axios from "axios";
import { Action, Thunk ,thunk,action} from "easy-peasy";


export  interface StudentPayload{
    email:string;
    firstName:string;
    lastName:string;
    dob:string;
    code:string;
    promotionId:string;
    moy:string;
}
export interface Student extends StudentPayload {
    id:string;
}

export interface AdminStudentListState{
    students?:Student[],
    student:{},
}
export interface AdminStudentListThunks{
    addSingleStudent:Thunk<this,StudentPayload,undefined,undefined>;
    addMultipleStudents:Thunk<this,StudentPayload[],undefined,undefined>;
    getStudents:Thunk<this,undefined,undefined,undefined>;
    deleteStudent:Thunk<this,string,undefined,undefined>;
    getStudent:Thunk<this,string,undefined,undefined>;
    

}
export interface AdminStudentListActions{
  setStudents:Action<this,Student[]>;
  setStudent:Action<this,any>;
    
}

export  interface AdminStudentListModel extends AdminStudentListState , AdminStudentListThunks ,AdminStudentListActions{

}

export const adminStudentListModel:AdminStudentListModel = {
    
    students:[],
    student:{},
    addSingleStudent:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        return await axios.post("http://localhost:8080/signup/student",payload,{
            withCredentials:true
        })
    }),
    addMultipleStudents:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        return await axios.post("http://localhost:8080/signup/students",payload,{
            withCredentials:true
        })
    }),
    getStudents:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res =  await axios.get("http://localhost:8080/getStudents",{
                withCredentials:true
            })
            actions.setStudents(res.data)

        }catch(err){
            console.log(err)
        }
       
    }),
    setStudents:action((state,payload)=>{
        state.students = payload;
    }),
    setStudent:action((state,payload)=>{
        state.student = payload;
    }),
    deleteStudent:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
     
             await axios.post("http://localhost:8080/deleteStudent",{
                 studentId:payload
             },{
                withCredentials:true
            })

            await actions.getStudents()
          
       
    }),
    getStudent:thunk(async(actions,payload,{getStoreActions})=>{
        try{

            const res =  await axios.get(`http://localhost:8080/studentsInfo/${payload}`,{withCredentials:true})
              .catch(err=>{
                  throw err;
              })
              actions.setStudent(res.data)
        }catch(err){
            console.log(err)
        }
        
    }),
    
}