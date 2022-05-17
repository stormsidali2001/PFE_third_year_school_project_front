import axios from 'axios';
import {Action,action,Thunk,thunk} from 'easy-peasy';
export interface TeamMessagePayload{
    sender:string;
    txt:string;
}
export interface TeamMessage extends TeamMessagePayload{
    id:string;
  
}



export interface TeamMessagesState{
    messages:TeamMessage[];

}

export interface TeamMessagesActions{
    setMessages:Action<this,TeamMessage[]>;
}

export interface TeamMessagesThunk{
    sendMessage:Thunk<this,TeamMessagePayload,any,any>;
    getMessages:Thunk<this,undefined,undefined,undefined>
}

export interface TeamMessagesModel extends TeamMessagesState, TeamMessagesActions , TeamMessagesThunk{

}

export const teamMessagesModel:TeamMessagesModel = {
    messages:[],
    setMessages:action((state,payload)=>{
        state.messages = payload;

    }),
    sendMessage:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        const {socket} = getStoreState().socketModel;

        socket?.emit("teamMessageToServer",payload)

       
    }),
    getMessages:thunk(async(actions,payload,{getStoreState,getStoreActions})=>{
        try{
            const res =    await axios.get("http://localhost:8080/getTeamMessages",{
                withCredentials:true
            })
            actions.setMessages(res.data)
            return res.data;
        }catch(err){
            console.log(err)
        }

   
    })
}