import T "../../../data-types/types";
import DTOs "../../../dtos/recruitment-dtos";
import Result "mo:base/Result";

module {

  public class CandidatesManager() {

    
    public func listCandidates(dto: DTOs.ListCandidates) : Result.Result<DTOs.ListCandidates, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func getCandidate(dto: DTOs.GetCandidate) : Result.Result<DTOs.GetCandidate, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createCandidate(dto: DTOs.CreateCandidate) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateCandidate(dto: DTOs.UpdateCandidate) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteCandidate(dto: DTOs.DeleteCandidate) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };
  }
};