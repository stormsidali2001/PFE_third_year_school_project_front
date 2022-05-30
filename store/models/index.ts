import { UserModel, userModel } from "./user.model";
import { persist } from "easy-peasy";
import { NotificationsServiceModel, notificationsServiceModel } from "./notifications.model";
import { NoTeamStudentListModel, noTeamStudentListModel } from "./noTeamStudentList";
import { invitationModel, InvitationModel } from "./invitationList";
import { socketModel, SocketModel } from "./socket.model";
import { surveysModel, SurveysModel } from "./surveys.model";
import { teamAnnouncementsModel, TeamAnnouncementsModel } from "./teamAnnouncements.model";
import { teamDocumentModel, TeamDocumentModel } from "./teamDocuments.model";
import { adminStudentListModel, AdminStudentListModel } from "./adminStudentList";
import { teacherListModel } from "./teacherList";
import { themeSuggestionsModel, ThemeSuggestionsModel } from "./themeSuggestion.model";
import { teamListModel, TeamListModel } from "./teamsList.model";
import { teamMessagesModel, TeamMessagesModel } from "./teamMessages.model";
import { promotionsModel, PromotionsModel } from "./promotion.model";
import { themesModel, ThemesModel } from "./theme.model";
import { WishListModel, wishListModel } from "./wishList.entity";
import {  adminAsignTeamsToThemesModel, AdminAsignTeamsToThemesModel } from "./adminAsignTeamToThemes";
import { commitsModel, CommitsModel } from "./commits.model";
import { TeacherTeamCommitDocsModel, teacherTeamCommitDocsModel,  } from "./teacherTeamCommits.model";
import { AdminTeamsDocsModel, adminTeamsDocsModel } from "./admin-teams-docs.model";
import { soutenanceModel, SoutenanceModel } from "./soutenance.model";
import { sallesModel, SallesModel } from "./salle.model";
export interface Model{
    user:UserModel;
    notificationService:NotificationsServiceModel;
    noTeamStudentListModel:NoTeamStudentListModel;
    invitationModel:InvitationModel;
    socketModel:SocketModel;
    surveysModel:SurveysModel;
    teamAnnouncementsModel:TeamAnnouncementsModel;
    teamDocumentModel:TeamDocumentModel;
    adminStudentListModel:AdminStudentListModel;
    teacherListModel:teacherListModel;
    themeSuggestionsModel:ThemeSuggestionsModel;
    teamListModel:TeamListModel;
    teamMessagesModel:TeamMessagesModel;
    promotionsModel:PromotionsModel;
    themesModel:ThemesModel;
    wishListModel:WishListModel
    adminAsignTeamsToThemesModel:AdminAsignTeamsToThemesModel;
    commitsModel:CommitsModel;
    teacherTeamCommitDocsModel:TeacherTeamCommitDocsModel;
    adminTeamsDocsModel:AdminTeamsDocsModel
    soutenanceModel:SoutenanceModel;
    sallesModel:SallesModel
}

export const model:Model={
    user:userModel,
    notificationService:persist(notificationsServiceModel),
    noTeamStudentListModel:persist(noTeamStudentListModel),
    invitationModel:invitationModel,
    socketModel:socketModel,
    surveysModel:surveysModel,
    teamAnnouncementsModel:teamAnnouncementsModel,
    teamDocumentModel:teamDocumentModel,
    adminStudentListModel:adminStudentListModel,
    teacherListModel:teacherListModel,
    themeSuggestionsModel:themeSuggestionsModel,
    teamListModel:teamListModel,
    teamMessagesModel:teamMessagesModel,
    promotionsModel:promotionsModel,
    themesModel:themesModel,
    wishListModel:wishListModel,
    adminAsignTeamsToThemesModel:adminAsignTeamsToThemesModel,
    commitsModel:commitsModel,
    teacherTeamCommitDocsModel:teacherTeamCommitDocsModel,
    adminTeamsDocsModel:adminTeamsDocsModel,
    soutenanceModel:soutenanceModel,
    sallesModel:sallesModel

    
}