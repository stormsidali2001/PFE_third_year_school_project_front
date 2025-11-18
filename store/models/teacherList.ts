import axios from "axios";
import { Action, Thunk ,thunk,action} from "easy-peasy";


export  interface TeacherPayload{
    email:string;
    firstName:string;
    lastName:string;
    ssn:string;
    speciality:string;
}
export interface Teacher extends TeacherPayload {
    id:string;
}

export interface TeacherListState{
    teachers?:Teacher[],
    teacher:{}
}
export interface TeacherListThunks{
    addSingleTeacher:Thunk<this,TeacherPayload,undefined,undefined>;
    addMultipleTeachers:Thunk<this,TeacherPayload[],undefined,undefined>;
    getTeachers:Thunk<this,undefined,undefined,undefined>;
    deleteTeacher:Thunk<this,string,undefined,undefined>;
    getTeacher:Thunk<this,string,undefined,undefined>;

}
export interface TeacherListActions{
  setTeachers:Action<this,Teacher[]>;
  setTeacher:Action<this,any>;
}

export  interface teacherListModel extends  TeacherListState ,  TeacherListThunks , TeacherListActions{

}

export const teacherListModel:teacherListModel = {
    
    teachers:[],
    teacher:{},
    addSingleTeacher:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        return await axios.post("http://localhost:8080/signup/teacher",payload,{
            withCredentials:true
        })
    }),
    addMultipleTeachers:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        return await axios.post("http://localhost:8080/signup/teachers",payload,{
            withCredentials:true
        })
    }),
    getTeachers:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res =  await axios.get("http://localhost:8080/getTeachers",{
                withCredentials:true
            })
            actions.setTeachers(res.data)

        }catch(err){
            console.log(err)
        }
       
    }),
    setTeachers:action((state,payload)=>{
        state.teachers = payload;
    }),
    setTeacher:action((state,payload)=>{
        state.teacher = payload;
    })
    ,

    deleteTeacher:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
     
             await axios.post("http://localhost:8080/deleteTeacher",{
                 teacherId:payload
             },{
                withCredentials:true
            })

            await actions.getTeachers()
          
       
    }),
    getTeacher:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
     
        try{
            const res =  await axios.get(`http://localhost:8080/getTeacher/${payload}`,{
               withCredentials:true
           })
           actions.setTeacher(res.data)

        }catch(err){
            console.log(err)

        }
  

       
     
  
})
    
}