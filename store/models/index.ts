import { UserModel, userModel } from "./user.model";
import { persist } from "easy-peasy";
import { NotificationsModel, notificationsModel } from "./notifications.model";
export interface Model{
    user:UserModel;
    notifications:NotificationsModel;
}

export const model:Model={
    user:persist(userModel),
    notifications:persist(notificationsModel)
    
}