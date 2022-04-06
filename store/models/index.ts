import { UserModel, userModel } from "./user.model";
import { persist } from "easy-peasy";
export interface Model{
    user:UserModel;
}

export const model:Model={
    user:persist(userModel)
}