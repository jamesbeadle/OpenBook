import T "types";
import OB "openbook-types";

module ProjectTypes {

  public type Project = {
    id: OB.ProjectId;
    status: ProjectStatus;
    name: Text;
    startDate: ?Int;
    endDate: ?Int;
    members: [ProjectMember];
    linkTree: [ProjectLink];
    stages: [ProjectStage];
    groupChatReference: Text;
    addedBy: T.PrincipalId;
    timestamp: Int;
  };

  public type ProjectStatus = {
    #Proposed;
    #Approved;
    #NotStarted;
    #InProgress;
    #Paused;
    #Cancelled;
    #Completed;
  };

  public type ProjectMember = {
    principcalId: T.PrincipalId;
    role: Text;
    addedBy: T.PrincipalId;
    timestamp: Int;
  };

  public type ProjectLink = {
    url: Text;
    description: Text;
    addedBy: T.PrincipalId;
    timestamp: Int;
  };

  public type ProjectStage = {
    index: Nat16;
    name: Text;
    startDate: Int;
    endDate: Int;
    timestamp: Int;
    addedBy: T.PrincipalId;
    milestones: [Milestone];
  };

  public type Milestone = {
    index: Nat16;
    description: Text;
    name: Text;
    startDate: Int;
    endDate: Int;
    tasks: [Task];
    timestamp: Int;
    addedBy: T.PrincipalId;
  };

  public type Task = {
    id: Nat16;
    index: Nat16;
    title: Text;
    description: Text;
    acceptanceCriteria: Text;
    priority: PriorityLevel;
    status: TaskStatus;
    visibility: Visibility;
    assignedTo: T.PrincipalId;
    expectedDuration: Int;
    actualDuration: Int;
    comments: [Text];
    timestamp: Int;
    addedBy: T.PrincipalId;
  };

  public type Visibility = {
      #Private;
      #Protected;
      #Public;
  };

  public type TaskComment = {
    comment: Text;
    timestamp: Int;
    addedBy: T.PrincipalId;
  };

  public type TaskStatus = {
    #New;
    #Draft;
    #Todo;
    #InProgress;
    #InReview;
    #Completed;
    #Blocked;
    #OnHold;
    #Testing;
    #Cancelled;
  };

  public type PriorityLevel = {
    #LowPriority;
    #DefaultPriority;
    #HighPriority;
  };


};
