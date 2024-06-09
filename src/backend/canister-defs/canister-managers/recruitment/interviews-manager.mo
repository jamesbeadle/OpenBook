import T "../../../data-types/types";
import DTOs "../../../dtos/recruitment-dtos";
import Result "mo:base/Result";

module {

  public class InterviewsManager() {
    
    public func listInterviews(dto: DTOs.ListInterviews) : Result.Result<DTOs.ListInterviews, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func getInterview(dto: DTOs.GetInterview) : Result.Result<DTOs.GetInterview, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createInterview(dto: DTOs.CreateInterview) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updateInterview(dto: DTOs.UpdateInterview) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deleteInterview(dto: DTOs.DeleteInterview) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };
  }
};