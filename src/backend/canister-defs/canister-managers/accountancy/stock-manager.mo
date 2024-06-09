import T "../../../data-types/types";
import DTOs "../../../dtos/accountancy-dtos";
import Result "mo:base/Result";

module {

  public class StockManager() {


    
    public func listStockItems(dto: DTOs.ListStockItems) : Result.Result<DTOs.ListStockItems, T.Error>{
            return #err(#NotFound); //TODO
    };
    
    public func getStockItem(dto: DTOs.GetStockItem) : Result.Result<DTOs.GetStockItem, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createStockItem(dto: DTOs.CreateStockItem) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateStockItem(dto: DTOs.UpdateStockItem) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteStockItem(dto: DTOs.DeleteStockItem) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };
    
    public func listStockMovement(dto: DTOs.ListStockMovement) : Result.Result<DTOs.ListStockMovement, T.Error>{
            return #err(#NotFound); //TODO
    };
    
    public func getStockMovement(dto: DTOs.GetStockMovement) : Result.Result<DTOs.GetStockMovement, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createStockMovement(dto: DTOs.CreateStockMovement) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateStockMovement(dto: DTOs.UpdateStockMovement) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteStockMovement(dto: DTOs.DeleteStockMovement) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };
    
    public func listStockOrder(dto: DTOs.ListStockOrder) : Result.Result<DTOs.ListStockOrder, T.Error>{
            return #err(#NotFound); //TODO
    };
    
    public func getStockOrder(dto: DTOs.GetStockOrder) : Result.Result<DTOs.GetStockOrder, T.Error>{
            return #err(#NotFound); //TODO
    };

    public func createStockOrder(dto: DTOs.CreateStockOrder) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func updateStockOrder(dto: DTOs.UpdateStockOrder) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };

    public func deleteStockOrder(dto: DTOs.DeleteStockOrder) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
    };
    
    public func getStockLevelsReport(dto: DTOs.GetStockLevelsReport) : Result.Result<DTOs.GetStockLevelsReport, T.Error>{
        //KEY OUTPUT
            return #err(#NotFound); //TODO
    };
    
    public func getStockValuationReport(dto: DTOs.GetStockValuationReport) : Result.Result<DTOs.GetStockValuationReport, T.Error>{
        //KEY OUTPUT
            return #err(#NotFound); //TODO
    };
    
    public func getStockMovementReport(dto: DTOs.GetStockMovementReport) : Result.Result<DTOs.GetStockMovementReport, T.Error>{
        //KEY OUTPUT
            return #err(#NotFound); //TODO
    };
    
    public func getStockAgeingReport(dto: DTOs.GetStockAgeingReport) : Result.Result<DTOs.GetStockAgeingReport, T.Error>{
        //KEY OUTPUT
            return #err(#NotFound); //TODO
    };
  }
};