import axios from 'axios';
const baseUrl='https://covid19.mathdro.id/api/'
export const getUsers =async() =>{
    try{

        const data= await axios.get(baseUrl+'countries');
        return data.users;


    }
    
    
    catch(error){
        throw error;
    }
}
export const getData =async() =>{
    try{

        const {data}= await axios.get(baseUrl+'countries');
        return data;


    }
    
    
    catch(error){
        throw error;
    }
}
