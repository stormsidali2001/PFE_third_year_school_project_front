import { action, Action } from "easy-peasy";
import { Socket } from "socket.io-client";



export interface SocketState{
    socket?:Socket;
}
export interface SocketActions{
    setSocket:Action<this,Socket>
}


export interface SocketModel extends SocketActions,SocketState{
     
}
export const socketModel:SocketModel = {
    setSocket:action((state,payload)=>{
        state.socket = payload;
    })
}