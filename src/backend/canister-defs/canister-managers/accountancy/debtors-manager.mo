import T "../../../data-types/types";
import DTOs "../../../dtos/accountancy-dtos";
import Result "mo:base/Result";

module {

  public class DebtorsManager() {
    
    public func listCustomers(dto: DTOs.ListCustomers) : Result.Result<DTOs.ListCustomers, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func getCustomer(dto: DTOs.GetCustomer) : Result.Result<DTOs.GetCustomer, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createCustomerInvoice(dto: DTOs.CreateCustomerInvoice) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updateCustomerInvoice(dto: DTOs.UpdateCustomerInvoice) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deleteCustomerInvoice(dto: DTOs.DeleteCustomerInvoice) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createCustomerCreditNote(dto: DTOs.CreateCustomerCreditNote) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updateCustomerCreditNote(dto: DTOs.UpdateCustomerCreditNote) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deleteCustomerCreditNote(dto: DTOs.DeleteCustomerCreditNote) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };
    
    public func getAgedDebtors(dto: DTOs.GetAgedDebtors) : Result.Result<DTOs.GetAgedDebtors, T.Error>{
        return #err(#NotFound); //TODO
    };
  }
};