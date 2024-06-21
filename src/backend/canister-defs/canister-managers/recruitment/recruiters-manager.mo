import T "../../../data-types/types";
import DTOs "../../../dtos/job-dtos";
import Result "mo:base/Result";

module {
 
  public class RecruitersManager() {
    
    public func listRecruiters(dto: DTOs.ListRecruiters) : Result.Result<DTOs.ListRecruiters, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func getRecruiter(dto: DTOs.GetRecruiter) : Result.Result<DTOs.GetRecruiter, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createRecruiter(dto: DTOs.CreateRecruiter) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateRecruiter(dto: DTOs.UpdateRecruiter) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteRecruiter(dto: DTOs.DeleteRecruiter) : Result.Result<(), T.Error>{ 
            return #err(#NotFound); //TODO
    };

    public func getRecruiterActivity(dto: DTOs.RecruiterActivity) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func findRecruiters(dto: DTOs.FindRecruiters) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };
  }
};