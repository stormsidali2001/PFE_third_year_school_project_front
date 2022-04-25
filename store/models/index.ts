import { UserModel, userModel } from "./user.model";
import { persist } from "easy-peasy";
import { NotificationsServiceModel, notificationsServiceModel } from "./notifications.model";
import { NoTeamStudentListModel, noTeamStudentListModel } from "./noTeamStudentList";
import { invitationModel, InvitationModel } from "./invitationList";
export interface Model{
    user:UserModel;
    notificationService:NotificationsServiceModel;
    noTeamStudentListModel:NoTeamStudentListModel;
    invitationModel:InvitationModel;
}

export const model:Model={
    user:persist(userModel),
    notificationService:persist(notificationsServiceModel),
    noTeamStudentListModel:persist(noTeamStudentListModel),
    invitationModel:invitationModel
    
}