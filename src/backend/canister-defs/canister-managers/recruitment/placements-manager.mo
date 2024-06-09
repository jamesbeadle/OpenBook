import T "../../../data-types/types";
import DTOs "../../../dtos/recruitment-dtos";
import Result "mo:base/Result";

module {

  public class PlacementsManager() {
    
    public func listPlacements(dto: DTOs.ListPlacements) : Result.Result<DTOs.ListPlacements, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func getPlacement(dto: DTOs.GetPlacement) : Result.Result<DTOs.GetPlacement, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createPlacement(dto: DTOs.CreatePlacement) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updatePlacement(dto: DTOs.UpdatePlacement) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deletePlacement(dto: DTOs.DeletePlacement) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };
  }
};