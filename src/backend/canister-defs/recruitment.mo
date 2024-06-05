
    
    //Recruitment Management Endpoints
      //create profile
      //upload cv
      //upload references
      //search
      //arrangeInterview
      //get interviews
      //update interview
      //place candidate




  //recruitment
    //add cv
    //add job
    //
actor class _RecruitmentCanister() {

    //roles
    //requirements
    

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

Candidates

GET /api/candidates - Retrieve a list of all candidates.
POST /api/candidates - Create a new candidate profile.
GET /api/candidates/{id} - Retrieve details of a specific candidate.
PUT /api/candidates/{id} - Update details of a specific candidate.
DELETE /api/candidates/{id} - Delete a specific candidate.
Candidate Resumes

GET /api/candidates/{id}/resumes - Retrieve a list of resumes for a specific candidate.
POST /api/candidates/{id}/resumes - Upload a new resume for a specific candidate.
GET /api/resumes/{resume_id} - Retrieve details of a specific resume.
PUT /api/resumes/{resume_id} - Update details of a specific resume.
DELETE /api/resumes/{resume_id} - Delete a specific resume.
Candidate Interviews

GET /api/candidates/{id}/interviews - Retrieve a list of all interviews for a specific candidate.
POST /api/candidates/{id}/interviews - Schedule a new interview for a specific candidate.
GET /api/interviews/{interview_id} - Retrieve details of a specific interview.
PUT /api/interviews/{interview_id} - Update details of a specific interview.
DELETE /api/interviews/{interview_id} - Delete a specific interview.
Candidate Applications

GET /api/candidates/{id}/applications - Retrieve a list of all job applications by a specific candidate.
POST /api/candidates/{id}/applications - Submit a new job application for a specific candidate.
GET /api/applications/{application_id} - Retrieve details of a specific job application.
PUT /api/applications/{application_id} - Update details of a specific job application.
DELETE /api/applications/{application_id} - Delete a specific job application.
Recruiters
Recruiters

GET /api/recruiters - Retrieve a list of all recruiters.
POST /api/recruiters - Create a new recruiter profile.
GET /api/recruiters/{id} - Retrieve details of a specific recruiter.
PUT /api/recruiters/{id} - Update details of a specific recruiter.
DELETE /api/recruiters/{id} - Delete a specific recruiter.
Recruiter Activities

GET /api/recruiters/{id}/activities - Retrieve a list of all activities by a specific recruiter.
POST /api/recruiters/{id}/activities - Log a new activity for a specific recruiter.
GET /api/activities/{activity_id} - Retrieve details of a specific activity.
PUT /api/activities/{activity_id} - Update details of a specific activity.
DELETE /api/activities/{activity_id} - Delete a specific activity.
Job Postings
Job Postings

GET /api/job-postings - Retrieve a list of all job postings.
POST /api/job-postings - Create a new job posting.
GET /api/job-postings/{id} - Retrieve details of a specific job posting.
PUT /api/job-postings/{id} - Update details of a specific job posting.
DELETE /api/job-postings/{id} - Delete a specific job posting.
Job Applications

GET /api/job-postings/{id}/applications - Retrieve a list of all applications for a specific job posting.
POST /api/job-postings/{id}/applications - Submit a new application for a specific job posting.
GET /api/applications/{application_id} - Retrieve details of a specific job application.
PUT /api/applications/{application_id} - Update details of a specific job application.
DELETE /api/applications/{application_id} - Delete a specific job application.
Interview Management
Interviews

GET /api/interviews - Retrieve a list of all interviews.
POST /api/interviews - Schedule a new interview.
GET /api/interviews/{id} - Retrieve details of a specific interview.
PUT /api/interviews/{id} - Update details of a specific interview.
DELETE /api/interviews/{id} - Cancel a specific interview.
Interview Feedback

GET /api/interviews/{id}/feedback - Retrieve a list of all feedback for a specific interview.
POST /api/interviews/{id}/feedback - Submit new feedback for a specific interview.
GET /api/feedback/{feedback_id} - Retrieve details of a specific feedback.
PUT /api/feedback/{feedback_id} - Update details of a specific feedback.
DELETE /api/feedback/{feedback_id} - Delete a specific feedback.
Notes and Attachments
Candidate Notes

GET /api/candidates/{id}/notes - Retrieve a list of all notes for a specific candidate.
POST /api/candidates/{id}/notes - Create a new note for a specific candidate.
GET /api/notes/{note_id} - Retrieve details of a specific note.
PUT /api/notes/{note_id} - Update details of a specific note.
DELETE /api/notes/{note_id} - Delete a specific note.
Attachments

GET /api/candidates/{id}/attachments - Retrieve a list of all attachments for a specific candidate.
POST /api/candidates/{id}/attachments - Upload a new attachment for a specific candidate.
GET /api/attachments/{attachment_id} - Retrieve details of a specific attachment.
DELETE /api/attachments/{attachment_id} - Delete a specific attachment.
Reporting
Reports
GET /api/reports/candidates - Retrieve candidate-related reports.
GET /api/reports/recruiters - Retrieve recruiter-related reports.
GET /api/reports/job-postings - Retrieve job posting-related reports.
GET /api/reports/applications - Retrieve job application-related reports.
GET /api/reports/interviews - Retrieve interview-related reports.
User and Team Management (Optional for Recruitment)
Users

GET /api/users - Retrieve a list of all users.
POST /api/users - Create a new user.
GET /api/users/{id} - Retrieve details of a specific user.
PUT /api/users/{id} - Update details of a specific user.
DELETE /api/users/{id} - Delete a specific user.
Teams

GET /api/teams - Retrieve a list of all teams.
POST /api/teams - Create a new team.
GET /api/teams/{id} - Retrieve details of a specific team.
PUT /api/teams/{id} - Update details of a specific team.
DELETE /api/teams/{id} - Delete a specific team.
Team Members

GET /api/teams/{team_id}/members - Retrieve a list of all members of a specific team.
POST /api/teams/{team_id}/members - Add a new member to a specific team.
DELETE /api/teams/{team_id}/members/{member_id} - Remove a member from a specific team.

*/