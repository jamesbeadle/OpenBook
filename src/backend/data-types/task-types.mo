import Ids "mo:waterway-mops/Ids";
import TaskEnums "../enums/task-enums";
import AppEnums "../enums/app-enums";
import AppTypes "app-types";

module TaskTypes {

  public type Task = {
    id: Nat16;
    index: Nat16;
    title: Text;
    description: Text;
    acceptanceCriteria: Text;
    priority: TaskEnums.PriorityLevel;
    status: TaskEnums.TaskStatus;
    visibility: AppEnums.VisibilityLevel;
    assignedTo: Ids.PrincipalId;
    comments: [Text];
    targetDates: ?AppTypes.TargetDates;
    metaData: AppTypes.Metadata;
    tasks: [Task];
  };

  public type TaskComment = {
    comment: Text;
    timestamp: Int;
    addedBy: Ids.PrincipalId;
  };


};
