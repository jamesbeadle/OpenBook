
module Types {

  public type PrincipalId = Text;
  public type ProjectId = Nat16;
  public type Project = {
    id: ProjectId;
    status: ProjectStatus;
    name: Text;
    startDate: ?Int;
    endDate: ?Int;
    members: [ProjectMember];
    linkTree: [ProjectLink];
    stages: [ProjectStage];
    groupChatReference: Text;
    addedBy: PrincipalId;
    added: Int;
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
    principcalId: PrincipalId;
    role: Text;
    addedBy: PrincipalId;
    added: Int;
  };

  public type ProjectLink = {
    url: Text;
    description: Text;
    addedBy: PrincipalId;
    added: Int;
  };

  public type ProjectStage = {
    index: Nat16;
    name: Text;
    startDate: Int;
    endDate: Int;
    added: Int;
    addedBy: PrincipalId;
    milestones: [Milestone];
  };

  public type Milestone = {
    index: Nat16;
    description: Text;
    name: Text;
    startDate: Int;
    endDate: Int;
    tasks: [Task];
    added: Int;
    addedBy: PrincipalId;
  };

  public type Task = {
    index: Nat16;
    title: Text;
    description: Text;
    acceptanceCriteria: Text;
    priority: PriorityLevel;
    status: TaskStatus;
    assignedTo: PrincipalId;
    expectedDuration: Int;
    actualDuration: Int;
    comments: [Text];
    added: Int;
    addedBy: PrincipalId;
  };

  public type TaskComment = {
    comment: Text;
    added: Int;
    addedBy: PrincipalId;
  };

  public type TaskStatus = {
    #Todo;
    #InProgress;
    #InReview;
    #Completed;
    #Blocked;
    #OnHold;
    #Cancelled;
  };

  public type PriorityLevel = {
    #LowPriority;
    #DefaultPriority;
    #HighPriority;
  };


};
