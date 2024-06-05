
    //Timesheet Management Endpoints
      //CRUD timesheet
      //approve timesheet
      //calculate payroll
      //pay staff members


  //timesheet management
    //add time sheet
    //add employee

actor class _TimesheetManagementCanister() {

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
Timesheet Management Module
Timesheets
Timesheets

GET /api/timesheets - Retrieve a list of all timesheets.
POST /api/timesheets - Create a new timesheet.
GET /api/timesheets/{id} - Retrieve details of a specific timesheet.
PUT /api/timesheets/{id} - Update details of a specific timesheet.
DELETE /api/timesheets/{id} - Delete a specific timesheet.
Timesheet Statuses

GET /api/timesheet-statuses - Retrieve a list of all timesheet statuses.
POST /api/timesheet-statuses - Create a new timesheet status.
GET /api/timesheet-statuses/{id} - Retrieve details of a specific timesheet status.
PUT /api/timesheet-statuses/{id} - Update details of a specific timesheet status.
DELETE /api/timesheet-statuses/{id} - Delete a specific timesheet status.
Time Entries
Time Entries
GET /api/timesheets/{timesheet_id}/entries - Retrieve a list of all time entries for a specific timesheet.
POST /api/timesheets/{timesheet_id}/entries - Create a new time entry for a specific timesheet.
GET /api/time-entries/{entry_id} - Retrieve details of a specific time entry.
PUT /api/time-entries/{entry_id} - Update details of a specific time entry.
DELETE /api/time-entries/{entry_id} - Delete a specific time entry.
Projects (Related to Timesheets)
Projects

GET /api/projects - Retrieve a list of all projects.
POST /api/projects - Create a new project.
GET /api/projects/{id} - Retrieve details of a specific project.
PUT /api/projects/{id} - Update details of a specific project.
DELETE /api/projects/{id} - Delete a specific project.
Project Tasks

GET /api/projects/{project_id}/tasks - Retrieve a list of all tasks for a specific project.
POST /api/projects/{project_id}/tasks - Create a new task for a specific project.
GET /api/tasks/{task_id} - Retrieve details of a specific task.
PUT /api/tasks/{task_id} - Update details of a specific task.
DELETE /api/tasks/{task_id} - Delete a specific task.
Users and Roles
Users

GET /api/users - Retrieve a list of all users.
POST /api/users - Create a new user.
GET /api/users/{id} - Retrieve details of a specific user.
PUT /api/users/{id} - Update details of a specific user.
DELETE /api/users/{id} - Delete a specific user.
Roles

GET /api/roles - Retrieve a list of all roles.
POST /api/roles - Create a new role.
GET /api/roles/{id} - Retrieve details of a specific role.
PUT /api/roles/{id} - Update details of a specific role.
DELETE /api/roles/{id} - Delete a specific role.
User Roles

GET /api/users/{user_id}/roles - Retrieve a list of roles for a specific user.
POST /api/users/{user_id}/roles - Assign a new role to a specific user.
DELETE /api/users/{user_id}/roles/{role_id} - Remove a role from a specific user.
Reporting
Timesheet Reports

GET /api/reports/timesheets - Retrieve timesheet reports.
GET /api/reports/timesheets/{id} - Retrieve a specific timesheet report.
Project Reports

GET /api/reports/projects - Retrieve project reports.
GET /api/reports/projects/{id} - Retrieve a specific project report.
User Reports

GET /api/reports/users - Retrieve user reports.
GET /api/reports/users/{id} - Retrieve a specific user report.
Notifications (Optional)
Notifications
GET /api/notifications - Retrieve a list of all notifications.
POST /api/notifications - Create a new notification.
GET /api/notifications/{id} - Retrieve details of a specific notification.
PUT /api/notifications/{id} - Update details of a specific notification.
DELETE /api/notifications/{id} - Delete a specific notification.
Approval Workflow (Optional)
Timesheet Approvals

GET /api/timesheet-approvals - Retrieve a list of all timesheet approvals.
POST /api/timesheet-approvals - Create a new timesheet approval.
GET /api/timesheet-approvals/{id} - Retrieve details of a specific timesheet approval.
PUT /api/timesheet-approvals/{id} - Update details of a specific timesheet approval.
DELETE /api/timesheet-approvals/{id} - Delete a specific timesheet approval.
Approval Statuses

GET /api/approval-statuses - Retrieve a list of all approval statuses.
POST /api/approval-statuses - Create a new approval status.
GET /api/approval-statuses/{id} - Retrieve details of a specific approval status.
PUT /api/approval-statuses/{id} - Update details of a specific approval status.
DELETE /api/approval-statuses/{id} - Delete a specific approval status.
*/