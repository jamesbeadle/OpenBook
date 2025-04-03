import Ids "mo:waterway-mops/Ids";
import AppIds "app-ids";
import ProjectEnums "../enums/project-enums";
import TaskTypes "task-types";
import AppDefinitions "app-definitions";
import MopsBaseTypes "../mops/mops_base_types";
import AppEnums "../enums/app-enums";
import AppTypes "app-types";

module ProjectTypes {

  public type Project = {
    id: AppIds.ProjectId;
    organisationId: AppIds.OrganisationId;
    name: Text;
    icon: ?Blob;
    description: Text;
    colourPalette: MopsBaseTypes.ColourPalette;
    visibility: AppEnums.VisibilityLevel;
    position: AppDefinitions.ListPosition;
    status: ProjectEnums.ProjectStatus;
    stages: [ProjectStage];
    milestones: [Milestone];
    tasks: [TaskTypes.Task];
    members: [ProjectMember];
    links: [ProjectLink];
    targetDates: ?AppTypes.TargetDates;
    metaData: AppTypes.Metadata;
  };

  public type ProjectStage = {
    id: AppIds.ProjectStageId;
    projectId: AppIds.ProjectId;
    position: Nat16;
    name: Text;
    tasks: [TaskTypes.Task];
    targetDates: ?AppTypes.TargetDates;
    metaData: AppTypes.Metadata;
  };

  public type Milestone = {
    index: Nat16;
    description: Text;
    name: Text;
    tasks: [TaskTypes.Task];
    
    targetDates: ?AppTypes.TargetDates;
    metaData: AppTypes.Metadata;
  };

  public type ProjectMember = {
    principcalId: Ids.PrincipalId;
    role: Text;
    addedBy: Ids.PrincipalId;
    timestamp: Int;
  };

  public type ProjectLink = {
    url: Text;
    description: Text;
    addedBy: Ids.PrincipalId;
    timestamp: Int;
  };


};
