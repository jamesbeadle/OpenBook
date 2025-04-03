import MopsBaseTypes "../../mops/mops_base_types";
import AppIds "../../data-types/app-ids";
import Ids "mo:waterway-mops/Ids";
import AppEnums "../../enums/app-enums";

module ProjectCommands {

    public type CreateProject = {
        organisationId: AppIds.OrganisationId;
        name: Text;
        icon: ?Blob;
        description: Text;
        colourPalette: MopsBaseTypes.ColourPalette;
        visibility: AppEnums.VisibilityLevel;
    };

    public type UpdateProject = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        name: Text;
        icon: ?Blob;
        description: Text;
        colourPalette: MopsBaseTypes.ColourPalette;
        visibility: AppEnums.VisibilityLevel;
    };

    public type RemoveProject = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
    };

    public type RecoverProject = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
    };
    
    public type SetProjectManager = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectManagerId: Ids.PrincipalId;
    };
    
    public type RemoveProjectManager = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
    };
    
    public type InviteProjectMember = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectMemberId: Ids.PrincipalId;
    };

    public type RemoveProjectMember = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        projectMemberId: Ids.PrincipalId;
    };
    
    public type CreateProjectLink = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        linkDescription: Text;
        linkURL: Text;
    };

    public type DeleteProjectLink = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        linkId: AppIds.ProjectLinkId;
    };

    public type UploadProjectAttachment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        attachment: Blob;
        attachmentTitle: Text;
        attachmentType: Text;
        description: Text;
    };

    public type DeleteProjectAttachment = {
        organisationId: AppIds.OrganisationId;
        projectId: AppIds.ProjectId;
        attachmentId: AppIds.ProjectAttachmentId;
    };

};
