import T "../../../data-types/types";
import AccountancyTypes = "../../../data-types/accountancy-types";
import DTOs "../../../dtos/accountancy-dtos";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";

module {

  public class BankingManager() {

    private var accounts: [AccountancyTypes.AssetAccount] = [];
   
    public func getBankAccounts(dto: DTOs.GetBankAccounts) : Result.Result<DTOs.GetBankAccounts, T.Error>{

        if(dto.pageSize > 100){
            return #err(#NotAllowed);
        };

        let bankAccounts = Buffer.fromArray<AccountancyTypes.AssetAccount>(
            Array.filter<AccountancyTypes.AssetAccount>(accounts, func(account: AccountancyTypes.AssetAccount): Bool{
                account.accountType == #BankAccount
            })
        );

        let start = dto.page * dto.pageSize;
        let end = start + dto.pageSize;

        if (start >= bankAccounts.size()) {
            return #err(#NotFound);
        };
    
        let paginatedAccounts = Array.subArray<AccountancyTypes.AssetAccount>(Buffer.toArray(bankAccounts), start, end);
        let returnDTO: DTOs.GetBankAccounts = {
            entries = paginatedAccounts;
            page = dto.page;
            pageSize = dto.pageSize;

        };
        return #ok(returnDTO);
    };
    
    public func getBankAccount(dto: DTOs.GetBankAccount) : Result.Result<DTOs.GetBankAccount, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createBankAccount(dto: DTOs.CreateBankAccount) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updateBankAccount(dto: DTOs.UpdateBankAccount) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deleteBankAccount(dto: DTOs.DeleteBankAccount) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };
    
    public func getPayment(dto: DTOs.GetPayment) : Result.Result<DTOs.GetPayment, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createPayment(dto: DTOs.CreatePayment) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updatePayment(dto: DTOs.UpdatePayment) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deletePayment(dto: DTOs.DeletePayment) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };
    
    public func createCustomerPayment(dto: DTOs.CreateCustomerPayment) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };
    
    public func deleteCustomerPayment(dto: DTOs.DeleteCustomerPayment) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createSupplierPayment(dto: DTOs.CreateSupplierPayment) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deleteSupplierPayment(dto: DTOs.DeleteSupplierPayment) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func reconcileBankAccount(dto: DTOs.ReconcileBankAccount) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };
    
    public func getBankStatement(dto: DTOs.GetBankStatement) : Result.Result<DTOs.GetBankStatement, T.Error>{
        return #err(#NotFound); //TODO
    };
    
    public func getBankReconciliation(dto: DTOs.GetBankReconciliation) : Result.Result<DTOs.GetBankReconciliation, T.Error>{
        //KEY OUTPUT
        return #err(#NotFound); //TODO
    };
    
    public func getUnreconciledTransactions(dto: DTOs.GetUnreconciledTransactions) : Result.Result<DTOs.GetUnreconciledTransactions, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func importTransactions(dto: DTOs.ImportTransactions) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

  }
};