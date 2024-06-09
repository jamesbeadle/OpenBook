import T "../../../data-types/types";
import DTOs "../../../dtos/recruitment-dtos";
import Result "mo:base/Result";

module {

  public class JobPostingsManager() {
    
    public func listJobPostings(dto: DTOs.ListJobPostings) : Result.Result<DTOs.ListJobPostings, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func getJobPosting(dto: DTOs.GetJobPosting) : Result.Result<DTOs.GetJobPosting, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createJobPosting(dto: DTOs.CreateJobPosting) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateJobPosting(dto: DTOs.UpdateJobPosting) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteJobPosting(dto: DTOs.DeleteJobPosting) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func findJobs(dto: DTOs.FindJobs) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

  }
};