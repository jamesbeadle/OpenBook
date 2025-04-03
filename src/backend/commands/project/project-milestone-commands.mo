import AppIds "../../data-types/app-ids";

module ProjectMilestoneCommands {
    
    public type CreateProjectMilestone = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
        milestoneName: Text;
        milestoneDescription: Text;
        listPosition: AppIds.ProjectMilestoneId;
        targetStartDate: ?Int;
        targetEndDate: ?Int;
    };

    public type UpdateProjectMilestone = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
        projectMilestoneId: AppIds.ProjectMilestoneId;
        milestoneName: Text;
        milestoneDescription: Text;
        listPosition: AppIds.ProjectMilestoneId;
        targetStartDate: ?Int;
        targetEndDate: ?Int;
    };

    public type SetMilestoneStartEndDates = {
        actualStartDate: ?Int;
        actualEndDate: ?Int;
    };

    public type DeleteProjectMilestone = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
        projectMilestoneId: AppIds.ProjectMilestoneId;
    };

    public type UploadMilestoneAttachment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
        projectMilestoneId: AppIds.ProjectMilestoneId;
        attachment: Blob;
        attachmentTitle: Text;
        attachmentType: Text;
        description: Text;
    };

    public type DeleteMilestoneAttachment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectStageId: AppIds.ProjectStageId;
        projectMilestoneId: AppIds.ProjectMilestoneId;
        attachmentId: AppIds.ProjectAttachmentId;
    };

};
