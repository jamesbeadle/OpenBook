import T "../data-types/project-types";

    //Project Management Endpoints
      //crud project
      //crud project member
      //crud project link
      //crud project stage
      //crud project stage milestone
      //crud milestone task
      //crud task comment
      //update task visibility
      //update task status
      //update task priority

  //Task Management

  public shared ({ caller }) func sendInvite(dto: DTOs.SendInviteDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func unsendInvite(dto: DTOs.UnsendInviteDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectMember(dto: DTOs.RemoveMemberDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addProjectLink(dto: DTOs.AddProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectLink(dto: DTOs.UpdateProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectLink(dto: DTOs.RemoveProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addProjectStage(dto: DTOs.AddProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectStage(dto: DTOs.AddProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectStage(dto: DTOs.RemoveProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectDetails(dto: DTOs.UpdateProjectDetailsDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectStatus(dto: DTOs.UpdateProjectStatusDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addStageMilestone(dto: DTOs.AddStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateStageMilestone(dto: DTOs.UpdateStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeStageMilestone(dto: DTOs.AddStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addMilestoneTask(dto: DTOs.AddMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateMilestoneTask(dto: DTOs.UpdateMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeMilestoneTask(dto: DTOs.RemoveMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addTaskComment(dto: DTOs.AddTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateTaskComment(dto: DTOs.AddTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func deleteTaskComment(dto: DTOs.DeleteTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };


  //Create a project
  //Add a project stage
  //Invite a member to a project 
  //Add a link to a project
  //Add a milestone to a project stage
  //Add a task to a project milestone
  //Add a comment to a task
  //Update the project status if allowed
  //Update the project priority if allowed

actor class _ProjectManagementCanister() {

  private let projects: [T.Project] = [];


  //crud project
  //crud milestone
  //crud task


  //data stored in here
    //all projects
      //all milestones
        //all tasks

    public shared ({ caller }) func initialise(){

    };



    system func preupgrade() {
  
    };

  system func postupgrade() {
    switch (cyclesCheckTimerId) {
      case (null) {};
      case (?id) {
        Timer.cancelTimer(id);
        cyclesCheckTimerId := null;
      };
    };
    cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);
  };

  private func checkCanisterCycles() : async () {

    let balance = Cycles.balance();

    if (balance < 2_000_000_000_000) {
      let backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
        requestCanisterTopup : () -> async ();
      };
      await backend_canister.requestCanisterTopup();
    };
    await setCheckCyclesTimer();
  };

  private func setCheckCyclesTimer() : async () {
    switch (cyclesCheckTimerId) {
      case (null) {};
      case (?id) {
        Timer.cancelTimer(id);
        cyclesCheckTimerId := null;
      };
    };
    cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);
  };

  public func topupCanister() : async () {
    let amount = Cycles.available();
    let _ = Cycles.accept<system>(amount);
  };

  public func getCyclesBalance() : async Nat {
    return Cycles.balance();
  };
};

/*
Projects

GET /api/projects - Retrieve a list of all projects.
POST /api/projects - Create a new project.
GET /api/projects/{id} - Retrieve details of a specific project.
PUT /api/projects/{id} - Update details of a specific project.
DELETE /api/projects/{id} - Delete a specific project.
Project Milestones

GET /api/projects/{id}/milestones - Retrieve a list of all milestones for a specific project.
POST /api/projects/{id}/milestones - Create a new milestone for a specific project.
GET /api/milestones/{milestone_id} - Retrieve details of a specific milestone.
PUT /api/milestones/{milestone_id} - Update details of a specific milestone.
DELETE /api/milestones/{milestone_id} - Delete a specific milestone.
Tasks

GET /api/milestones/{milestone_id}/tasks - Retrieve a list of all tasks for a specific milestone.
POST /api/milestones/{milestone_id}/tasks - Create a new task for a specific milestone.
GET /api/tasks/{task_id} - Retrieve details of a specific task.
PUT /api/tasks/{task_id} - Update details of a specific task.
DELETE /api/tasks/{task_id} - Delete a specific task.
Task Management
Task Assignments

GET /api/tasks/{task_id}/assignments - Retrieve a list of all assignments for a specific task.
POST /api/tasks/{task_id}/assignments - Assign a user to a specific task.
DELETE /api/tasks/{task_id}/assignments/{assignment_id} - Remove an assignment from a specific task.
Task Comments

GET /api/tasks/{task_id}/comments - Retrieve a list of all comments on a specific task.
POST /api/tasks/{task_id}/comments - Add a comment to a specific task.
PUT /api/tasks/{task_id}/comments/{comment_id} - Update a comment on a specific task.
DELETE /api/tasks/{task_id}/comments/{comment_id} - Delete a comment from a specific task.
Task Statuses

GET /api/task-statuses - Retrieve a list of all task statuses.
POST /api/task-statuses - Create a new task status.
GET /api/task-statuses/{status_id} - Retrieve details of a specific task status.
PUT /api/task-statuses/{status_id} - Update details of a specific task status.
DELETE /api/task-statuses/{status_id} - Delete a specific task status.
Task Priorities

GET /api/task-priorities - Retrieve a list of all task priorities.
POST /api/task-priorities - Create a new task priority.
GET /api/task-priorities/{priority_id} - Retrieve details of a specific task priority.
PUT /api/task-priorities/{priority_id} - Update details of a specific task priority.
DELETE /api/task-priorities/{priority_id} - Delete a specific task priority.
Task Categories

GET /api/task-categories - Retrieve a list of all task categories.
POST /api/task-categories - Create a new task category.
GET /api/task-categories/{category_id} - Retrieve details of a specific task category.
PUT /api/task-categories/{category_id} - Update details of a specific task category.
DELETE /api/task-categories/{category_id} - Delete a specific task category.
Task Attachments

GET /api/tasks/{task_id}/attachments - Retrieve a list of all attachments on a specific task.
POST /api/tasks/{task_id}/attachments - Add an attachment to a specific task.
DELETE /api/tasks/{task_id}/attachments/{attachment_id} - Delete an attachment from a specific task.
Subtasks

GET /api/tasks/{task_id}/subtasks - Retrieve a list of all subtasks for a specific task.
POST /api/tasks/{task_id}/subtasks - Create a new subtask for a specific task.
GET /api/subtasks/{subtask_id} - Retrieve details of a specific subtask.
PUT /api/subtasks/{subtask_id} - Update details of a specific subtask.
DELETE /api/subtasks/{subtask_id} - Delete a specific subtask.
Task Dependencies

GET /api/tasks/{task_id}/dependencies - Retrieve a list of all dependencies for a specific task.
POST /api/tasks/{task_id}/dependencies - Add a dependency to a specific task.
DELETE /api/tasks/{task_id}/dependencies/{dependency_id} - Remove a dependency from a specific task.
Task Reminders

GET /api/tasks/{task_id}/reminders - Retrieve a list of all reminders for a specific task.
POST /api/tasks/{task_id}/reminders - Create a new reminder for a specific task.
GET /api/reminders/{reminder_id} - Retrieve details of a specific reminder.
PUT /api/reminders/{reminder_id} - Update details of a specific reminder.
DELETE /api/reminders/{reminder_id} - Delete a specific reminder.
User and Team Management (Optional for Project Management)
Users

GET /api/users - Retrieve a list of all users.
POST /api/users - Create a new user.
GET /api/users/{user_id} - Retrieve details of a specific user.
PUT /api/users/{user_id} - Update details of a specific user.
DELETE /api/users/{user_id} - Delete a specific user.
Teams

GET /api/teams - Retrieve a list of all teams.
POST /api/teams - Create a new team.
GET /api/teams/{team_id} - Retrieve details of a specific team.
PUT /api/teams/{team_id} - Update details of a specific team.
DELETE /api/teams/{team_id} - Delete a specific team.
Team Members

GET /api/teams/{team_id}/members - Retrieve a list of all members of a specific team.
POST /api/teams/{team_id}/members - Add a new member to a specific team.
DELETE /api/teams/{team_id}/members/{member_id} - Remove a member from a specific team.
*/