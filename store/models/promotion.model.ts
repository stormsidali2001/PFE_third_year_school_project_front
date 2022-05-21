import {Action,action,thunk,Thunk} from 'easy-peasy'
import axios from 'axios'
export interface Promotion{
    id:string;
    name:string;
}
export interface PromotionsState{
        promotions:Promotion[];
}

export interface PromotionActions{
    setPromotions:Action<this,Promotion[]>
}

export interface PromtionThunks{
    getAllPromotionsThunk:Thunk<this,undefined,undefined,undefined>;
}

export interface PromotionsModel extends PromotionsState,PromotionActions,PromtionThunks{}

export const promotionsModel:PromotionsModel = {
    promotions:[],
    setPromotions:action((state,payload)=>{
        state.promotions = payload;
    }),
    getAllPromotionsThunk:thunk(async (actions,payload)=>{
        try{
            const res = await axios.get("http://localhost:8080/getAllPromotions",{
                withCredentials:true
            })
            actions.setPromotions(res.data)
        }catch(err){
            console.log(err)
        }
        
    })
}