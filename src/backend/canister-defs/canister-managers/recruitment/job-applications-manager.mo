import T "../../../data-types/types";
import DTOs "../../../dtos/job-dtos";
import Result "mo:base/Result";

module {

  public class JobApplicationsManager() {

    
    public func listJobApplications(dto: DTOs.ListJobApplications) : Result.Result<DTOs.ListJobApplications, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func getJobApplication(dto: DTOs.GetJobApplication) : Result.Result<DTOs.GetJobApplication, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createJobApplication(dto: DTOs.CreateJobApplication) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateJobApplication(dto: DTOs.UpdateJobApplication) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteJobApplication(dto: DTOs.DeleteJobApplication) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };
  }
};