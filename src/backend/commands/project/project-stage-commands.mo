import AppIds "../../data-types/app-ids";

module ProjectStageCommands {

    public type CreateProjectStage = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageName: Text;
        projectStageDescription: Text;
        listPosition: AppIds.ProjectStageId;
        targetStartDate: ?Int;
        targetEndDate: ?Int;
    };

    public type UpdateProjectStage = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
        projectStageName: Text;
        projectStageDescription: Text;
        listPosition: AppIds.ProjectStageId;
        targetStartDate: ?Int;
        targetEndDate: ?Int;
    };

    public type SetStageStartEndDates = {
        actualStartDate: ?Int;
        actualEndDate: ?Int;
    };

    public type RemoveProjectStage = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
    };

    public type RecoverProjectStage = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
    };

    public type UploadProjectStageAttachment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
        attachment: Blob;
        attachmentTitle: Text;
        attachmentType: Text;
        description: Text;
    };

    public type DeleteProjectStageAttachment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
        attachmentId: AppIds.ProjectAttachmentId;
    };

};
