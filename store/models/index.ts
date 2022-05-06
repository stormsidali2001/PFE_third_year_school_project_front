import { UserModel, userModel } from "./user.model";
import { persist } from "easy-peasy";
import { NotificationsServiceModel, notificationsServiceModel } from "./notifications.model";
import { NoTeamStudentListModel, noTeamStudentListModel } from "./noTeamStudentList";
import { invitationModel, InvitationModel } from "./invitationList";
import { socketModel, SocketModel } from "./socket.model";
import { surveysModel, SurveysModel } from "./surveys.model";
import { teamAnnouncementsModel, TeamAnnouncementsModel } from "./teamAnnouncements.model";
import { teamDocumentModel, TeamDocumentModel } from "./teamDocuments.model";
export interface Model{
    user:UserModel;
    notificationService:NotificationsServiceModel;
    noTeamStudentListModel:NoTeamStudentListModel;
    invitationModel:InvitationModel;
    socketModel:SocketModel;
    surveysModel:SurveysModel;
    teamAnnouncementsModel:TeamAnnouncementsModel;
    teamDocumentModel:TeamDocumentModel;
}

export const model:Model={
    user:userModel,
    notificationService:persist(notificationsServiceModel),
    noTeamStudentListModel:persist(noTeamStudentListModel),
    invitationModel:invitationModel,
    socketModel:socketModel,
    surveysModel:surveysModel,
    teamAnnouncementsModel:teamAnnouncementsModel,
    teamDocumentModel:teamDocumentModel
    
}