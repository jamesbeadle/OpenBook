import T "../../../data-types/types";
import DTOs "../../../dtos/recruitment-dtos";
import Result "mo:base/Result";

module {

  public class ReferencesManager() {

    
    public func listReferences(dto: DTOs.ListReferences) : Result.Result<DTOs.ListReferences, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func getReference(dto: DTOs.GetReference) : Result.Result<DTOs.GetReference, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createReference(dto: DTOs.CreateReference) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateReference(dto: DTOs.UpdateReference) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteReference(dto: DTOs.DeleteReference) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };
  }
};