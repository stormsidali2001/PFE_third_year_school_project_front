import { UserModel, userModel } from "./user.model";
import { persist } from "easy-peasy";
import { NotificationsServiceModel, notificationsServiceModel } from "./notifications.model";
import { NoTeamStudentListModel, noTeamStudentListModel } from "./noTeamStudentList";
import { invitationModel, InvitationModel } from "./invitationList";
import { socketModel, SocketModel } from "./socket.model";
export interface Model{
    user:UserModel;
    notificationService:NotificationsServiceModel;
    noTeamStudentListModel:NoTeamStudentListModel;
    invitationModel:InvitationModel;
    socketModel:SocketModel;
}

export const model:Model={
    user:userModel,
    notificationService:persist(notificationsServiceModel),
    noTeamStudentListModel:persist(noTeamStudentListModel),
    invitationModel:invitationModel,
    socketModel:socketModel
    
}