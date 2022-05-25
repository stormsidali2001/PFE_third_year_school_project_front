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
}

export interface WishListModel extends wishListState,WishListActions,WishListThunks {}

export const wishListModel:WishListModel = {
    submitWishList:thunk(async(actions,payload)=>{
              return  await axios.post('http://localhost:8080/submitWishList',{...payload},{
                  withCredentials:true
              })
    })
}