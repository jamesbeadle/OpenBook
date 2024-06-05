import Principal "mo:base/Principal";
import Result "mo:base/Result";
import DTOs "../dtos/accountancy-dtos";
import AccountancyTypes "../data-types/accountancy-types";
import T "../data-types/types";

actor class _AccountancyCanister() {

    private var transactions: [AccountancyTypes.Transaction] = [];
    private var chartOfAccounts: [AccountancyTypes.GeneralLedgerAccount] = [];
    //TODO: Add customers and suppliers but link to contacts
    //have reconciled bank information saved

    public shared ({ caller }) func initialise(){

    };


    //General Ledger
    
    public shared query ({ caller }) func listGeneralLedgerAccounts(dto: DTOs.ListGeneralLedgerAccounts) : async Result.Result<DTOs.ListGeneralLedgerAccounts, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getGeneralLedgerAccount(dto: DTOs.GetGeneralLedgerAccount) : async Result.Result<DTOs.GetGeneralLedgerAccount, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createGeneralLedgerAccount(dto: DTOs.CreateGeneralLedgerAccount) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateGeneralLedgerAccount(dto: DTOs.UpdateGeneralLedgerAccount) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteGeneralLedgerAccount(dto: DTOs.DeleteGeneralLedgerAccount) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Journals
    
    public shared query ({ caller }) func listJournalEntries(dto: DTOs.ListJournalEntries) : async Result.Result<DTOs.ListJournalEntries, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getJournalEntry(dto: DTOs.GetJournalEntry) : async Result.Result<DTOs.GetJournalEntry, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createJournalEntry(dto: DTOs.CreateJournalEntry) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateJournalEntry(dto: DTOs.UpdateJournalEntry) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteJournalEntry(dto: DTOs.DeleteJournalEntry) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Creditors
    
    public shared query ({ caller }) func listSuppliers(dto: DTOs.ListSuppliers) : async Result.Result<DTOs.ListSuppliers, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getSupplier(dto: DTOs.GetSupplier) : async Result.Result<DTOs.GetSupplier, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createSupplierInvoice(dto: DTOs.CreateSupplierInvoice) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateSupplierInvoice(dto: DTOs.UpdateSupplierInvoice) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteSupplierInvoice(dto: DTOs.DeleteSupplierInvoice) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createSupplierCreditNote(dto: DTOs.CreateSupplierCreditNote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateSupplierCreditNote(dto: DTOs.UpdateSupplierCreditNote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteSupplierCreditNote(dto: DTOs.DeleteSupplierCreditNote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    
    public shared query ({ caller }) func getAgedCreditors(dto: DTOs.GetAgedCreditors) : async Result.Result<DTOs.GetAgedCreditors, T.Error>{
        return #err(#NotFound);
    };

    //Debtors
    
    public shared query ({ caller }) func listCustomers(dto: DTOs.ListCustomers) : async Result.Result<DTOs.ListCustomers, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getCustomer(dto: DTOs.GetCustomer) : async Result.Result<DTOs.GetCustomer, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createCustomerInvoice(dto: DTOs.CreateCustomerInvoice) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateCustomerInvoice(dto: DTOs.UpdateCustomerInvoice) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteCustomerInvoice(dto: DTOs.DeleteCustomerInvoice) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createCustomerCreditNote(dto: DTOs.CreateCustomerCreditNote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateCustomerCreditNote(dto: DTOs.UpdateCustomerCreditNote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteCustomerCreditNote(dto: DTOs.DeleteCustomerCreditNote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getAgedDebtors(dto: DTOs.GetAgedDebtors) : async Result.Result<DTOs.GetAgedDebtors, T.Error>{
        return #err(#NotFound);
    };

    //Stock
    
    public shared query ({ caller }) func listStockItems(dto: DTOs.ListStockItems) : async Result.Result<DTOs.ListStockItems, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getStockItem(dto: DTOs.GetStockItem) : async Result.Result<DTOs.GetStockItem, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createStockItem(dto: DTOs.CreateStockItem) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateStockItem(dto: DTOs.UpdateStockItem) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteStockItem(dto: DTOs.DeleteStockItem) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func listStockMovement(dto: DTOs.ListStockMovement) : async Result.Result<DTOs.ListStockMovement, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getStockMovement(dto: DTOs.GetStockMovement) : async Result.Result<DTOs.GetStockMovement, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createStockMovement(dto: DTOs.CreateStockMovement) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateStockMovement(dto: DTOs.UpdateStockMovement) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteStockMovement(dto: DTOs.DeleteStockMovement) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func listStockOrder(dto: DTOs.ListStockOrder) : async Result.Result<DTOs.ListStockOrder, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getStockOrder(dto: DTOs.GetStockOrder) : async Result.Result<DTOs.GetStockOrder, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createStockOrder(dto: DTOs.CreateStockOrder) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateStockOrder(dto: DTOs.UpdateStockOrder) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteStockOrder(dto: DTOs.DeleteStockOrder) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getStockLevelsReport(dto: DTOs.GetStockLevelsReport) : async Result.Result<DTOs.GetStockLevelsReport, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getStockValuationReport(dto: DTOs.GetStockValuationReport) : async Result.Result<DTOs.GetStockValuationReport, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getStockMovementReport(dto: DTOs.GetStockMovementReport) : async Result.Result<DTOs.GetStockMovementReport, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getStockAgeingReport(dto: DTOs.GetStockAgeingReport) : async Result.Result<DTOs.GetStockAgeingReport, T.Error>{
        return #err(#NotFound);
    };

    //Banking
    
    public shared query ({ caller }) func getBankAccounts(dto: DTOs.GetBankAccounts) : async Result.Result<DTOs.GetBankAccounts, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getBankAccount(dto: DTOs.GetBankAccount) : async Result.Result<DTOs.GetBankAccount, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createBankAccount(dto: DTOs.CreateBankAccount) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateBankAccount(dto: DTOs.UpdateBankAccount) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteBankAccount(dto: DTOs.DeleteBankAccount) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getPayment(dto: DTOs.GetPayment) : async Result.Result<DTOs.GetPayment, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createPayment(dto: DTOs.CreatePayment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updatePayment(dto: DTOs.UpdatePayment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deletePayment(dto: DTOs.DeletePayment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared ({ caller }) func createCustomerPayment(dto: DTOs.CreateCustomerPayment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared ({ caller }) func deleteCustomerPayment(dto: DTOs.DeleteCustomerPayment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createSupplierPayment(dto: DTOs.CreateSupplierPayment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteSupplierPayment(dto: DTOs.DeleteSupplierPayment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func reconcileBankAccount(dto: DTOs.ReconcileBankAccount) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getBankStatement(dto: DTOs.GetBankStatement) : async Result.Result<DTOs.GetBankStatement, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getBankReconciliation(dto: DTOs.GetBankReconciliation) : async Result.Result<DTOs.GetBankReconciliation, T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func getUnreconciledTransactions(dto: DTOs.GetUnreconciledTransactions) : async Result.Result<DTOs.GetUnreconciledTransactions, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func importTransactions(dto: DTOs.ImportTransactions) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Management Reports

    public shared query ({ caller }) func getChartOfAccounts(dto: DTOs.GetTrialBalance) : async Result.Result<DTOs.GetTrialBalance, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getTrialBalance(dto: DTOs.GetTrialBalance) : async Result.Result<DTOs.GetTrialBalance, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getBalanceSheet(dto: DTOs.GetBalanceSheet) : async Result.Result<DTOs.GetBalanceSheet, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getIncomeStatement(dto: DTOs.GetIncomeStatement) : async Result.Result<DTOs.GetIncomeStatement, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getCashflowStatement(dto: DTOs.GetCashflowStatement) : async Result.Result<DTOs.GetCashflowStatement, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getEquityStatement(dto: DTOs.GetEquityStatement) : async Result.Result<DTOs.GetEquityStatement, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getFixedAssetRegister(dto: DTOs.GetFixedAssetRegister) : async Result.Result<DTOs.GetFixedAssetRegister, T.Error>{
        return #err(#NotFound);
    };
    
};
