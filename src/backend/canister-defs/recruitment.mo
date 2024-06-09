import Principal "mo:base/Principal";
import Result "mo:base/Result";
import DTOs "../dtos/recruitment-dtos";
import T "../data-types/types";
import RecruitmentPermissions "../permissions/recruitment-permissions";
import PermissionsManager "canister-managers/recruitment/permissions-manager";
import CandidatesManager "canister-managers/recruitment/candidates-manager";
import ResumesManager "canister-managers/recruitment/resumes-manager";

actor class _RecruitmentManagementCanister() {

    private let candidatesManager = CandidatesManager.CandidatesManager();
    private let resumesManager = ResumesManager.ResumesManager();
    private let permissionsManager = PermissionsManager.PermissionsManager();

    public shared ({ caller }) func initialise(){};

    //Candidates
    
    public shared query ({ caller }) func listCandidates(dto: DTOs.ListCandidates) : async Result.Result<DTOs.ListCandidates, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListCandidates);
        return candidatesManager.listCandidates(dto);
    };

    public shared query ({ caller }) func getCandidate(dto: DTOs.GetCandidate) : async Result.Result<DTOs.GetCandidate, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetCandidate);
        return candidatesManager.getCandidate(dto);
    };

    public shared ({ caller }) func createCandidate(dto: DTOs.CreateCandidate) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateCandidate);
        return candidatesManager.createCandidate(dto);
    };

    public shared ({ caller }) func updateCandidate(dto: DTOs.UpdateCandidate) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateCandidate);
        return candidatesManager.updateCandidate(dto);
    };

    public shared ({ caller }) func deleteCandidate(dto: DTOs.DeleteCandidate) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteCandidate);
        return candidatesManager.deleteCandidate(dto);
    };

    //Resumes
    
    public shared query ({ caller }) func listResumes(dto: DTOs.ListResumes) : async Result.Result<DTOs.ListResumes, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListResumes);
        return resumesManager.listResumes(dto);
    };

    public shared query ({ caller }) func getResume(dto: DTOs.GetResume) : async Result.Result<DTOs.GetResume, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetResume);
        return resumesManager.getResume(dto);
    };

    public shared ({ caller }) func createResume(dto: DTOs.CreateResume) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateResume);
        return resumesManager.createResume(dto);
    };

    public shared ({ caller }) func updateResume(dto: DTOs.UpdateResume) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateResume);
        return resumesManager.updateResume(dto);
    };

    public shared ({ caller }) func deleteResume(dto: DTOs.DeleteResume) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteResume);
        return resumesManager.deleteResume(dto);
    };
    
    //References
    
    public shared query ({ caller }) func listReferences(dto: DTOs.ListReferences) : async Result.Result<DTOs.ListReferences, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListReferences);
        return referencesManager.listReferences(dto);
    };

    public shared query ({ caller }) func getReference(dto: DTOs.GetReference) : async Result.Result<DTOs.GetReference, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetReference);
        return referencesManager.getReference(dto);
    };

    public shared ({ caller }) func createReference(dto: DTOs.CreateReference) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateReference);
        return referencesManager.createReference(dto);
    };

    public shared ({ caller }) func updateReference(dto: DTOs.UpdateReference) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateReference);
        return referencesManager.updateReference(dto);
    };

    public shared ({ caller }) func deleteReference(dto: DTOs.DeleteReference) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteReference);
        return referencesManager.deleteReference(dto);
    };
    
    //Job Applications
    
    public shared query ({ caller }) func listJobApplications(dto: DTOs.ListJobApplications) : async Result.Result<DTOs.ListJobApplications, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListJobApplications);
        return jobApplicationsManager.listJobApplications(dto);
    };

    public shared query ({ caller }) func getJobApplication(dto: DTOs.GetJobApplication) : async Result.Result<DTOs.GetJobApplication, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetJobApplication);
        return jobApplicationsManager.getJobApplication(dto);
    };

    public shared ({ caller }) func createJobApplication(dto: DTOs.CreateJobApplication) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateJobApplication);
        return jobApplicationsManager.createJobApplication(dto);
    };

    public shared ({ caller }) func updateJobApplication(dto: DTOs.UpdateJobApplication) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateJobApplication);
        return jobApplicationsManager.updateJobApplication(dto);
    };

    public shared ({ caller }) func deleteJobApplication(dto: DTOs.DeleteJobApplication) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteJobApplication);
        return jobApplicationsManager.deleteJobApplication(dto);
    };
    
    //Recruiters
    
    public shared query ({ caller }) func listRecruiters(dto: DTOs.ListRecruiters) : async Result.Result<DTOs.ListRecruiters, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListRecruiters);
        return recruiterManager.listRecruiters(dto);
    };

    public shared query ({ caller }) func getRecruiter(dto: DTOs.GetRecruiter) : async Result.Result<DTOs.GetRecruiter, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetRecruiter);
        return recruiterManager.getRecruiter(dto);
    };

    public shared ({ caller }) func createRecruiter(dto: DTOs.CreateRecruiter) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateRecruiter);
        return recruiterManager.createRecruiter(dto);
    };

    public shared ({ caller }) func updateRecruiter(dto: DTOs.UpdateRecruiter) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateRecruiter);
        return recruiterManager.updateRecruiter(dto);
    };

    public shared ({ caller }) func deleteRecruiter(dto: DTOs.DeleteRecruiter) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteRecruiter);
        return recruiterManager.deleteRecruiter(dto);
    };

    public shared ({ caller }) func getRecruiterActivity(dto: DTOs.RecruiterActivity) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #RecruiterActivity);
        return recruiterManager.getRecruiterActivity(dto);
    };
    
    //Job Postings
    
    public shared query ({ caller }) func listJobPostings(dto: DTOs.ListJobPostings) : async Result.Result<DTOs.ListJobPostings, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListJobPostings);
        return recruiterManager.listJobPostings(dto);
    };

    public shared query ({ caller }) func getJobPosting(dto: DTOs.GetJobPosting) : async Result.Result<DTOs.GetJobPosting, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetJobPosting);
        return recruiterManager.getJobPosting(dto);
    };

    public shared ({ caller }) func createJobPosting(dto: DTOs.CreateJobPosting) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateJobPosting);
        return recruiterManager.createJobPosting(dto);
    };

    public shared ({ caller }) func updateJobPosting(dto: DTOs.UpdateJobPosting) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateJobPosting);
        return recruiterManager.updateJobPosting(dto);
    };

    public shared ({ caller }) func deleteJobPosting(dto: DTOs.DeleteJobPosting) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteJobPosting);
        return recruiterManager.deleteJobPosting(dto);
    };
    
    //Clients
    
    public shared query ({ caller }) func listClients(dto: DTOs.ListClients) : async Result.Result<DTOs.ListClients, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListClients);
        return clientsManager.listClients(dto);
    };

    public shared query ({ caller }) func getClient(dto: DTOs.GetClient) : async Result.Result<DTOs.GetClient, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetClient);
        return clientsManager.getClient(dto);
    };

    public shared ({ caller }) func createClient(dto: DTOs.CreateClient) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateClient);
        return clientsManager.createClient(dto);
    };

    public shared ({ caller }) func updateClient(dto: DTOs.UpdateClient) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateClient);
        return clientsManager.updateClient(dto);
    };

    public shared ({ caller }) func deleteClient(dto: DTOs.DeleteClient) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteClient);
        return clientsManager.deleteClient(dto);
    };

    //Interviews
    
    public shared query ({ caller }) func listInterviews(dto: DTOs.ListInterviews) : async Result.Result<DTOs.ListInterviews, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListInterviews);
        return interviewsManager.deleteClient(dto);
    };

    public shared query ({ caller }) func getInterview(dto: DTOs.GetInterview) : async Result.Result<DTOs.GetInterview, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetInterview);
        return interviewsManager.getInterview(dto);
    };

    public shared ({ caller }) func createInterview(dto: DTOs.CreateInterview) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateInterview);
        return interviewsManager.createInterview(dto);
    };

    public shared ({ caller }) func updateInterview(dto: DTOs.UpdateInterview) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateInterview);
        return interviewsManager.updateInterview(dto);
    };

    public shared ({ caller }) func deleteInterview(dto: DTOs.DeleteInterview) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteInterview);
        return interviewsManager.deleteInterview(dto);
    };

    //Placements
    
    public shared query ({ caller }) func listPlacements(dto: DTOs.ListPlacements) : async Result.Result<DTOs.ListPlacements, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListPlacements);
        return placementsManager.listPlacements(dto);
    };

    public shared query ({ caller }) func getPlacement(dto: DTOs.GetPlacement) : async Result.Result<DTOs.GetPlacement, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetPlacement);
        return placementsManager.getPlacement(dto);
    };

    public shared ({ caller }) func createPlacement(dto: DTOs.CreatePlacement) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreatePlacement);
        return placementsManager.createPlacement(dto);
    };

    public shared ({ caller }) func updatePlacement(dto: DTOs.UpdatePlacement) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdatePlacement);
        return placementsManager.updatePlacement(dto);
    };

    public shared ({ caller }) func deletePlacement(dto: DTOs.DeletePlacement) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeletePlacement);
        return placementsManager.deletePlacement(dto);
    };

    //search functions

    public shared ({ caller }) func findCandidates(dto: DTOs.FindCandidates) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #FindCandidates);
        return candidatesManager.findCandidates(dto);
    };

    public shared ({ caller }) func findJobs(dto: DTOs.FindJobs) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #FindJobs);
        return jobPositingsManager.findJobs(dto);
    };

    public shared ({ caller }) func findRecruiters(dto: DTOs.FindRecruiters) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #FindRecruiters);
        return recruitersManager.findRecruiters(dto);
    };

    private func hasPermission(principalId: T.PrincipalId, permission: RecruitmentPermissions.RecruitmentPermission) : Bool {
        return permissionsManager.hasPermission(principalId, permission);
    };
    
};
