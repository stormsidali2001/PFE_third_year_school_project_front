import {Thunk,thunk,action, Action} from 'easy-peasy'
import axios from 'axios';

export interface wishList{
    order:number;
    themeId:string;
}

export interface WishListPayload{
    wishes:wishList[];
}

export interface wishListState{
    wishes:[];
}
export interface WishListActions{
    setWhishLists:Action<this,any>;

}
export interface WishListThunks{
    submitWishList:Thunk<this,WishListPayload,undefined,undefined>;
    sendWishList:Thunk<this,{promotionId:string},undefined,undefined>;
    getWishLists:Thunk<this,{promotionId:string},undefined,undefined>;
    
}

export interface WishListModel extends wishListState,WishListActions,WishListThunks {}

export const wishListModel:WishListModel = {
    wishes:[],
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
    }),
   
getWishLists:thunk(async(actions,{promotionId})=>{
      await axios.get(`http://localhost:8080/getWishLists/${promotionId?promotionId:'all'}`,{
        withCredentials:true
    }).then(res=>{
        actions.setWhishLists(res.data)
    })

    .catch(err=>{
        throw err;
    })
}),
setWhishLists:action((state,payload)=>{

    state.wishes = payload;
})
}