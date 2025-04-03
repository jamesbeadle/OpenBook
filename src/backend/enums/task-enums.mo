module TaskEnums {


  public type TaskType = {
    #Incident;
    #Bug;
    #Issue;
    #TechnicalDebt;
    #Maintenance;
    #Chore;
    #Task;
    #Feature;
    #Test;
    #Deployment;
    #Experiment;
  };

  public type DifficultyLevel = {
    #Level3;
    #Level5;
    #Level8;
    #Level13;
    #Level21;
    #Level34;
    #Level55;
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
}