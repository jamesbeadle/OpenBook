import AppEnums "../../data-types/app-enums";
import Ids "mo:waterway-mops/Ids";
import AppIds "../../data-types/app-ids";

module ProjectTaskCommands {

    public type CreateTask = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskType: AppEnums.TaskType;
        assignedTo: Ids.PrincipalId;
        difficulty: AppEnums.DifficultyLevel;
        status: AppEnums.TaskStatus;
        priority: AppEnums.PriorityLevel;
        title: Text;
        description: Text;
        completeCriteria: Text;
    };

    public type UpdateTask = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
        taskType: AppEnums.TaskType;
        title: Text;
        assignedTo: Ids.PrincipalId;
        difficulty: AppEnums.DifficultyLevel;
        status: AppEnums.TaskStatus;
        priority: AppEnums.PriorityLevel;
    };

    public type CreateSubtask = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
        taskType: AppEnums.TaskType;
        title: Text;
        assignedTo: Ids.PrincipalId;
        difficulty: AppEnums.DifficultyLevel;
        status: AppEnums.TaskStatus;
        priority: AppEnums.PriorityLevel;
    };

    public type AssignTask = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
        assignedTo: Ids.PrincipalId;
    };

    public type UnassignTask = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
    };

    public type RemoveTask = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
    };

    public type RecoverTask = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
    };

    public type UploadTaskAttachment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
        attachment: Blob;
        attachmentTitle: Text;
        attachmentType: Text;
        description: Text;

    };

    public type DeleteTaskAttachment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
        attachmentId: AppIds.ProjectAttachmentId;
    };

    public type AddTaskComment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
        comment: Text;
        commentedBy: Ids.PrincipalId;
    };

    public type RemoveTaskComment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        stageId: ?AppIds.ProjectStageId;
        milestoneId: ?AppIds.ProjectMilestoneId;
        taskId: AppIds.TaskId;
        commentId: AppIds.CommentId;
    };

};
