import {Thunk,thunk,action} from 'easy-peasy'
import axios from 'axios';

export interface wishList{
    order:number;
    themeId:string;
}

export interface WishListPayload{
    wishes:wishList[];
}

export interface wishListState{
    
}
export interface WishListActions{
    

}
export interface WishListThunks{
    submitWishList:Thunk<this,WishListPayload,undefined,undefined>;
    sendWishList:Thunk<this,{promotionId:string},undefined,undefined>;
}

export interface WishListModel extends wishListState,WishListActions,WishListThunks {}

export const wishListModel:WishListModel = {
    submitWishList:thunk(async(actions,payload)=>{
                await axios.post('http://localhost:8080/submitWishList',{...payload},{
                  withCredentials:true
              })
              .catch(err=>{
                throw err;
            })
    }),
    sendWishList:thunk(async(actions,{promotionId})=>{
        return  await axios.post('http://localhost:8080/sendWishList',{promotionId},{
            withCredentials:true
        }) 
        .catch(err=>{
            throw err;
        })
})
}