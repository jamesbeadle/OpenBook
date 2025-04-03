module ProjectEnums {
    

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

  public type VisibilityLevel = {
    #Private;
    #Internal;
    #Public;
  };
}