import Principal "mo:base/Principal";
import Result "mo:base/Result";
import DTOs "../dtos/recruitment-dtos";
import T "../data-types/types";

actor class _RecruitmentManagementCanister() {

    public shared ({ caller }) func initialise(){

    };

    //Candidates
    
    public shared query ({ caller }) func listCandidates(dto: DTOs.ListCandidates) : async Result.Result<DTOs.ListCandidates, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getCandidate(dto: DTOs.GetCandidate) : async Result.Result<DTOs.GetCandidate, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createCandidate(dto: DTOs.CreateCandidate) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateCandidate(dto: DTOs.UpdateCandidate) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteCandidate(dto: DTOs.DeleteCandidate) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Resumes
    
    public shared query ({ caller }) func listResumes(dto: DTOs.ListResumes) : async Result.Result<DTOs.ListResumes, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getResume(dto: DTOs.GetResume) : async Result.Result<DTOs.GetResume, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createResume(dto: DTOs.CreateResume) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateResume(dto: DTOs.UpdateResume) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteResume(dto: DTOs.DeleteResume) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    //References
    
    public shared query ({ caller }) func listReferences(dto: DTOs.ListReferences) : async Result.Result<DTOs.ListReferences, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getReference(dto: DTOs.GetReference) : async Result.Result<DTOs.GetReference, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createReference(dto: DTOs.CreateReference) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateReference(dto: DTOs.UpdateReference) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteReference(dto: DTOs.DeleteReference) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    //Job Applications
    
    public shared query ({ caller }) func listJobApplications(dto: DTOs.ListJobApplications) : async Result.Result<DTOs.ListJobApplications, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getJobApplication(dto: DTOs.GetJobApplication) : async Result.Result<DTOs.GetJobApplication, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createJobApplication(dto: DTOs.CreateJobApplication) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateJobApplication(dto: DTOs.UpdateJobApplication) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteJobApplication(dto: DTOs.DeleteJobApplication) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    //Recruiters
    
    public shared query ({ caller }) func listRecruiters(dto: DTOs.ListRecruiters) : async Result.Result<DTOs.ListRecruiters, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getRecruiter(dto: DTOs.GetRecruiter) : async Result.Result<DTOs.GetRecruiter, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createRecruiter(dto: DTOs.CreateRecruiter) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateRecruiter(dto: DTOs.UpdateRecruiter) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteRecruiter(dto: DTOs.DeleteRecruiter) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func getRecruiterActivity(dto: DTOs.RecruiterActivity) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    //Job Postings
    
    public shared query ({ caller }) func listJobPostings(dto: DTOs.ListJobPostings) : async Result.Result<DTOs.ListJobPostings, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getJobPosting(dto: DTOs.GetJobPosting) : async Result.Result<DTOs.GetJobPosting, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createJobPosting(dto: DTOs.CreateJobPosting) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateJobPosting(dto: DTOs.UpdateJobPosting) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteJobPosting(dto: DTOs.DeleteJobPosting) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    //Clients
    
    public shared query ({ caller }) func listClients(dto: DTOs.ListClients) : async Result.Result<DTOs.ListClients, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getClient(dto: DTOs.GetClient) : async Result.Result<DTOs.GetClient, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createClient(dto: DTOs.CreateClient) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateClient(dto: DTOs.UpdateClient) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteClient(dto: DTOs.DeleteClient) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Interviews
    
    public shared query ({ caller }) func listInterviews(dto: DTOs.ListInterviews) : async Result.Result<DTOs.ListInterviews, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getInterview(dto: DTOs.GetInterview) : async Result.Result<DTOs.GetInterview, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createInterview(dto: DTOs.CreateInterview) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateInterview(dto: DTOs.UpdateInterview) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteInterview(dto: DTOs.DeleteInterview) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Placements
    
    public shared query ({ caller }) func listPlacements(dto: DTOs.ListPlacements) : async Result.Result<DTOs.ListPlacements, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getPlacement(dto: DTOs.GetPlacement) : async Result.Result<DTOs.GetPlacement, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createPlacement(dto: DTOs.CreatePlacement) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updatePlacement(dto: DTOs.UpdatePlacement) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deletePlacement(dto: DTOs.DeletePlacement) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //search functions

    public shared ({ caller }) func findCandidates(dto: DTOs.FindCandidates) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func findJobs(dto: DTOs.FindJobs) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func findRecruiters(dto: DTOs.FindRecruiters) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
};
