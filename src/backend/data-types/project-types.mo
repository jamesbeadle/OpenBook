import T "types";
import Base "mo:waterway-mops/BaseTypes";

module ProjectTypes {

  public type Project = {
    id: T.ProjectId;
    status: ProjectStatus;
    name: Text;
    startDate: ?Int;
    endDate: ?Int;
    members: [ProjectMember];
    linkTree: [ProjectLink];
    stages: [ProjectStage];
    references: [ProjectReference];
    addedBy: Base.PrincipalId;
    timestamp: Int;
  };

  public type ProjectStatus = {
    #Idea;
    #Proposed;
    #Approved;
    #NotStarted;
    #InProgress;
    #Paused;
    #Cancelled;
    #Completed;
  };

  public type ProjectMember = {
    principcalId: Base.PrincipalId;
    role: Text;
    addedBy: Base.PrincipalId;
    timestamp: Int;
  };

  public type ProjectLink = {
    url: Text;
    description: Text;
    addedBy: Base.PrincipalId;
    timestamp: Int;
  };

  public type ProjectStage = {
    index: Nat16;
    name: Text;
    startDate: Int;
    endDate: Int;
    timestamp: Int;
    addedBy: Base.PrincipalId;
    milestones: [Milestone];
  };

  public type ProjectReference = {
    description: Text;
    icon: Blob;
    link: Text;
    addedBy: Base.PrincipalId;
    timestamp: Int;
  };  

  public type Milestone = {
    index: Nat16;
    description: Text;
    name: Text;
    startDate: Int;
    endDate: Int;
    tasks: [Task];
    timestamp: Int;
    addedBy: Base.PrincipalId;
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
    assignedTo: Base.PrincipalId;
    expectedDuration: Int;
    actualDuration: Int;
    comments: [Text];
    timestamp: Int;
    addedBy: Base.PrincipalId;
  };

  public type Visibility = {
      #Private;
      #Protected;
      #Public;
  };

  public type TaskComment = {
    comment: Text;
    timestamp: Int;
    addedBy: Base.PrincipalId;
  };

  public type TaskStatus = {
    #Idea;
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
