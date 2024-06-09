import T "../../../data-types/types";
import DTOs "../../../dtos/accountancy-dtos";
import Result "mo:base/Result";


module {

  public class CreditorsManager() {
    public func listSuppliers(dto: DTOs.ListSuppliers) : Result.Result<DTOs.ListSuppliers, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func getSupplier(dto: DTOs.GetSupplier) : Result.Result<DTOs.GetSupplier, T.Error>{
       return #err(#NotFound); //TODO
    };

    public func createSupplierInvoice(dto: DTOs.CreateSupplierInvoice) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updateSupplierInvoice(dto: DTOs.UpdateSupplierInvoice) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deleteSupplierInvoice(dto: DTOs.DeleteSupplierInvoice) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createSupplierCreditNote(dto: DTOs.CreateSupplierCreditNote) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updateSupplierCreditNote(dto: DTOs.UpdateSupplierCreditNote) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deleteSupplierCreditNote(dto: DTOs.DeleteSupplierCreditNote) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    
    public func getAgedCreditors(dto: DTOs.GetAgedCreditors) : Result.Result<DTOs.GetAgedCreditors, T.Error>{
        return #err(#NotFound); //TODO
    };
  }
};