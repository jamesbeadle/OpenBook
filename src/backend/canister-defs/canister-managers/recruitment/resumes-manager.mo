import T "../../../data-types/types";
import DTOs "../../../dtos/job-dtos";
import Result "mo:base/Result";

module {

  public class ResumesManager() {

    
    public func listResumes(dto: DTOs.ListResumes) : Result.Result<DTOs.ListResumes, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func getResume(dto: DTOs.GetResume) : Result.Result<DTOs.GetResume, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createResume(dto: DTOs.CreateResume) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateResume(dto: DTOs.UpdateResume) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteResume(dto: DTOs.DeleteResume) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };
  }
};