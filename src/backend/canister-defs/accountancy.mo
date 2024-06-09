import Principal "mo:base/Principal";
import Result "mo:base/Result";
import DTOs "../dtos/accountancy-dtos";
import T "../data-types/types";
import GeneralLedgerManager "canister-managers/accountancy/general-ledger-manager";
import CreditorsManager "canister-managers/accountancy/creditors-manager";
import DebtorsManager "canister-managers/accountancy/debtors-manager";
import StockManager "canister-managers/accountancy/stock-manager";
import BankingManager "canister-managers/accountancy/banking-manager";
import ReportingManager "canister-managers/accountancy/reporting-manager";
import PermissionsManager "canister-managers/accountancy/permissions-manager";
import AccountancyPermissions "../permissions/accountancy-permissions";

actor class _AccountancyCanister() {


    private let generalLedgerManager = GeneralLedgerManager.GeneralLedgerManager();
    private let creditorsManager =CreditorsManager.CreditorsManager();
    private let debtorsManager = DebtorsManager.DebtorsManager();
    private let stockManager = StockManager.StockManager();
    private let bankingManager = BankingManager.BankingManager();
    private let reportingManager = ReportingManager.ReportingManager();
    private let permissionsManager = PermissionsManager.PermissionsManager();
    
    public shared ({ caller }) func initialise(){ };

    //General Ledger
    
    public shared query ({ caller }) func listGeneralLedgerAccounts(dto: DTOs.ListGeneralLedgerAccounts) : async Result.Result<DTOs.ListGeneralLedgerAccounts, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListGeneralLedgerAccounts);
        return generalLedgerManager.listGeneralLedgerAccounts(dto);
    };

    public shared query ({ caller }) func getGeneralLedgerAccount(dto: DTOs.GetGeneralLedgerAccount) : async Result.Result<DTOs.GetGeneralLedgerAccount, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetGeneralLedgerAccount);
        return generalLedgerManager.getGeneralLedgerAccount(dto);
    };

    public shared ({ caller }) func createGeneralLedgerAccount(dto: DTOs.CreateGeneralLedgerAccount) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateGeneralLedgerAccount);
        return generalLedgerManager.createGeneralLedgerAccount(dto);
    };

    public shared ({ caller }) func updateGeneralLedgerAccount(dto: DTOs.UpdateGeneralLedgerAccount) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateGeneralLedgerAccount);
        return generalLedgerManager.updateGeneralLedgerAccount(dto);
    };

    public shared ({ caller }) func deleteGeneralLedgerAccount(dto: DTOs.DeleteGeneralLedgerAccount) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteGeneralLedgerAccount);
        return generalLedgerManager.deleteGeneralLedgerAccount(dto);
    };

    //Journals
    
    public shared query ({ caller }) func listJournalEntries(dto: DTOs.ListJournalEntries) : async Result.Result<DTOs.ListJournalEntries, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListJournalEntries);
        return generalLedgerManager.listJournalEntries(dto);
    };

    public shared query ({ caller }) func getJournalEntry(dto: DTOs.GetJournalEntry) : async Result.Result<DTOs.GetJournalEntry, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetJournalEntry);
        return generalLedgerManager.getJournalEntry(dto);
    };

    public shared ({ caller }) func createJournalEntry(dto: DTOs.CreateJournalEntry) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateJournalEntry);
        return generalLedgerManager.createJournalEntry(dto);
    };

    public shared ({ caller }) func updateJournalEntry(dto: DTOs.UpdateJournalEntry) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateJournalEntry);
        return generalLedgerManager.updateJournalEntry(dto);
    };

    public shared ({ caller }) func deleteJournalEntry(dto: DTOs.DeleteJournalEntry) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteJournalEntry);
        return generalLedgerManager.deleteJournalEntry(dto);
    };

    //Creditors
    
    public shared query ({ caller }) func listSuppliers(dto: DTOs.ListSuppliers) : async Result.Result<DTOs.ListSuppliers, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListSuppliers);
        return creditorsManager.listSuppliers(dto);
    };

    public shared query ({ caller }) func getSupplier(dto: DTOs.GetSupplier) : async Result.Result<DTOs.GetSupplier, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetSupplier);
        return creditorsManager.getSupplier(dto);
    };

    public shared ({ caller }) func createSupplierInvoice(dto: DTOs.CreateSupplierInvoice) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateSupplierInvoice);
        return creditorsManager.createSupplierInvoice(dto);
    };

    public shared ({ caller }) func updateSupplierInvoice(dto: DTOs.UpdateSupplierInvoice) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateSupplierInvoice);
        return creditorsManager.updateSupplierInvoice(dto);
    };

    public shared ({ caller }) func deleteSupplierInvoice(dto: DTOs.DeleteSupplierInvoice) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteSupplierInvoice);
        return creditorsManager.deleteSupplierInvoice(dto);
    };

    public shared ({ caller }) func createSupplierCreditNote(dto: DTOs.CreateSupplierCreditNote) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateSupplierCreditNote);
        return creditorsManager.createSupplierCreditNote(dto);
    };

    public shared ({ caller }) func updateSupplierCreditNote(dto: DTOs.UpdateSupplierCreditNote) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateSupplierCreditNote);
        return creditorsManager.updateSupplierCreditNote(dto);
    };

    public shared ({ caller }) func deleteSupplierCreditNote(dto: DTOs.DeleteSupplierCreditNote) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteSupplierCreditNote);
        return creditorsManager.deleteSupplierCreditNote(dto);
    };

    
    public shared query ({ caller }) func getAgedCreditors(dto: DTOs.GetAgedCreditors) : async Result.Result<DTOs.GetAgedCreditors, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetAgedCreditors);
        return creditorsManager.getAgedCreditors(dto);
    };

    //Debtors
    
    public shared query ({ caller }) func listCustomers(dto: DTOs.ListCustomers) : async Result.Result<DTOs.ListCustomers, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListCustomers);
        return debtorsManager.getAgedDebtors(dto);
    };

    public shared query ({ caller }) func getCustomer(dto: DTOs.GetCustomer) : async Result.Result<DTOs.GetCustomer, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetCustomer);
        return debtorsManager.getCustomer(dto);
    };

    public shared ({ caller }) func createCustomerInvoice(dto: DTOs.CreateCustomerInvoice) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateCustomerInvoice);
        return debtorsManager.createCustomerInvoice(dto);
    };

    public shared ({ caller }) func updateCustomerInvoice(dto: DTOs.UpdateCustomerInvoice) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateCustomerInvoice);
        return debtorsManager.updateCustomerInvoice(dto);
    };

    public shared ({ caller }) func deleteCustomerInvoice(dto: DTOs.DeleteCustomerInvoice) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteCustomerInvoice);
        return debtorsManager.deleteCustomerInvoice(dto);
    };

    public shared ({ caller }) func createCustomerCreditNote(dto: DTOs.CreateCustomerCreditNote) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateCustomerCreditNote);
        return debtorsManager.createCustomerCreditNote(dto);
    };

    public shared ({ caller }) func updateCustomerCreditNote(dto: DTOs.UpdateCustomerCreditNote) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateCustomerCreditNote);
        return debtorsManager.updateCustomerCreditNote(dto);
    };

    public shared ({ caller }) func deleteCustomerCreditNote(dto: DTOs.DeleteCustomerCreditNote) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteCustomerCreditNote);
        return debtorsManager.deleteCustomerCreditNote(dto);
    };
    
    public shared query ({ caller }) func getAgedDebtors(dto: DTOs.GetAgedDebtors) : async Result.Result<DTOs.GetAgedDebtors, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetAgedDebtors);
        return debtorsManager.getAgedDebtors(dto);
    };

    //Stock
    
    public shared query ({ caller }) func listStockItems(dto: DTOs.ListStockItems) : async Result.Result<DTOs.ListStockItems, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListStockItems);
        return stockManager.listStockItems(dto);
    };
    
    public shared query ({ caller }) func getStockItem(dto: DTOs.GetStockItem) : async Result.Result<DTOs.GetStockItem, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetStockItem);
        return stockManager.getStockItem(dto);
    };

    public shared ({ caller }) func createStockItem(dto: DTOs.CreateStockItem) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateStockItem);
        return stockManager.createStockItem(dto);
    };

    public shared ({ caller }) func updateStockItem(dto: DTOs.UpdateStockItem) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateStockItem);
        return stockManager.updateStockItem(dto);
    };

    public shared ({ caller }) func deleteStockItem(dto: DTOs.DeleteStockItem) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteStockItem);
        return stockManager.deleteStockItem(dto);
    };
    
    public shared query ({ caller }) func listStockMovement(dto: DTOs.ListStockMovement) : async Result.Result<DTOs.ListStockMovement, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListStockMovement);
        return stockManager.listStockMovement(dto);
    };
    
    public shared query ({ caller }) func getStockMovement(dto: DTOs.GetStockMovement) : async Result.Result<DTOs.GetStockMovement, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetStockMovement);
        return stockManager.getStockMovement(dto);
    };

    public shared ({ caller }) func createStockMovement(dto: DTOs.CreateStockMovement) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateStockMovement);
        return stockManager.createStockMovement(dto);
    };

    public shared ({ caller }) func updateStockMovement(dto: DTOs.UpdateStockMovement) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateStockMovement);
        return stockManager.updateStockMovement(dto);
    };

    public shared ({ caller }) func deleteStockMovement(dto: DTOs.DeleteStockMovement) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteStockMovement);
        return stockManager.deleteStockMovement(dto);
    };
    
    public shared query ({ caller }) func listStockOrder(dto: DTOs.ListStockOrder) : async Result.Result<DTOs.ListStockOrder, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListStockOrder);
        return stockManager.listStockOrder(dto);
    };
    
    public shared query ({ caller }) func getStockOrder(dto: DTOs.GetStockOrder) : async Result.Result<DTOs.GetStockOrder, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetStockOrder);
        return stockManager.getStockOrder(dto);
    };

    public shared ({ caller }) func createStockOrder(dto: DTOs.CreateStockOrder) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateStockOrder);
        return stockManager.createStockOrder(dto);
    };

    public shared ({ caller }) func updateStockOrder(dto: DTOs.UpdateStockOrder) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateStockOrder);
        return stockManager.updateStockOrder(dto);
    };

    public shared ({ caller }) func deleteStockOrder(dto: DTOs.DeleteStockOrder) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteStockOrder);
        return stockManager.deleteStockOrder(dto);
    };
    
    public shared query ({ caller }) func getStockLevelsReport(dto: DTOs.GetStockLevelsReport) : async Result.Result<DTOs.GetStockLevelsReport, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetStockLevelsReport);
        return stockManager.getStockLevelsReport(dto);
    };
    
    public shared query ({ caller }) func getStockValuationReport(dto: DTOs.GetStockValuationReport) : async Result.Result<DTOs.GetStockValuationReport, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetStockValuationReport);
        return stockManager.getStockValuationReport(dto);
    };
    
    public shared query ({ caller }) func getStockMovementReport(dto: DTOs.GetStockMovementReport) : async Result.Result<DTOs.GetStockMovementReport, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetStockMovementReport);
        return stockManager.getStockMovementReport(dto);
    };
    
    public shared query ({ caller }) func getStockAgeingReport(dto: DTOs.GetStockAgeingReport) : async Result.Result<DTOs.GetStockAgeingReport, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetStockAgeingReport);
        return stockManager.getStockAgeingReport(dto);
    };

    //Banking
    
    public shared query ({ caller }) func getBankAccounts(dto: DTOs.GetBankAccounts) : async Result.Result<DTOs.GetBankAccounts, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetBankAccounts);
        return bankingManager.getBankAccounts(dto);
    };
    
    public shared query ({ caller }) func getBankAccount(dto: DTOs.GetBankAccount) : async Result.Result<DTOs.GetBankAccount, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetBankAccount);
        return bankingManager.getBankAccount(dto);
    };

    public shared ({ caller }) func createBankAccount(dto: DTOs.CreateBankAccount) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateBankAccount);
        return bankingManager.createBankAccount(dto);
    };

    public shared ({ caller }) func updateBankAccount(dto: DTOs.UpdateBankAccount) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateBankAccount);
        return bankingManager.updateBankAccount(dto);
    };

    public shared ({ caller }) func deleteBankAccount(dto: DTOs.DeleteBankAccount) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteBankAccount);
        return bankingManager.deleteBankAccount(dto);
    };
    
    public shared query ({ caller }) func getPayment(dto: DTOs.GetPayment) : async Result.Result<DTOs.GetPayment, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetPayment);
        return bankingManager.getPayment(dto);
    };

    public shared ({ caller }) func createPayment(dto: DTOs.CreatePayment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreatePayment);
        return bankingManager.createPayment(dto);
    };

    public shared ({ caller }) func updatePayment(dto: DTOs.UpdatePayment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdatePayment);
        return bankingManager.updatePayment(dto);
    };

    public shared ({ caller }) func deletePayment(dto: DTOs.DeletePayment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeletePayment);
        return bankingManager.deletePayment(dto);
    };
    
    public shared ({ caller }) func createCustomerPayment(dto: DTOs.CreateCustomerPayment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateCustomerPayment);
        return bankingManager.createCustomerPayment(dto);
    };
    
    public shared ({ caller }) func deleteCustomerPayment(dto: DTOs.DeleteCustomerPayment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteCustomerPayment);
        return bankingManager.deleteCustomerPayment(dto);
    };

    public shared ({ caller }) func createSupplierPayment(dto: DTOs.CreateSupplierPayment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateSupplierPayment);
        return bankingManager.createSupplierPayment(dto);
    };

    public shared ({ caller }) func deleteSupplierPayment(dto: DTOs.DeleteSupplierPayment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteSupplierPayment);
        return bankingManager.deleteSupplierPayment(dto);
    };

    public shared ({ caller }) func reconcileBankAccount(dto: DTOs.ReconcileBankAccount) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ReconcileBankAccount);
        return bankingManager.reconcileBankAccount(dto);
    };
    
    public shared query ({ caller }) func getBankStatement(dto: DTOs.GetBankStatement) : async Result.Result<DTOs.GetBankStatement, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetBankStatement);
        return bankingManager.getBankStatement(dto);
    };
    
    public shared query ({ caller }) func getBankReconciliation(dto: DTOs.GetBankReconciliation) : async Result.Result<DTOs.GetBankReconciliation, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetBankReconciliation);
        return bankingManager.getBankReconciliation(dto);
    };
    
    public shared query ({ caller }) func getUnreconciledTransactions(dto: DTOs.GetUnreconciledTransactions) : async Result.Result<DTOs.GetUnreconciledTransactions, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetUnreconciledTransactions);
        return bankingManager.getUnreconciledTransactions(dto);
    };

    public shared ({ caller }) func importTransactions(dto: DTOs.ImportTransactions) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ImportTransactions);
        return bankingManager.importTransactions(dto);
    };

    //Management Reports

    public shared query ({ caller }) func getChartOfAccounts(dto: DTOs.GetChartOfAccounts) : async Result.Result<DTOs.GetTrialBalance, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetChartOfAccounts);
        return reportingManager.getChartOfAccounts(dto);
    };

    public shared query ({ caller }) func getTrialBalance(dto: DTOs.GetTrialBalance) : async Result.Result<DTOs.GetTrialBalance, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetTrialBalance);
        return reportingManager.getTrialBalance(dto);
    };

    public shared query ({ caller }) func getBalanceSheet(dto: DTOs.GetBalanceSheet) : async Result.Result<DTOs.GetBalanceSheet, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetBalanceSheet);
        return reportingManager.getBalanceSheet(dto);
    };

    public shared query ({ caller }) func getIncomeStatement(dto: DTOs.GetIncomeStatement) : async Result.Result<DTOs.GetIncomeStatement, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetIncomeStatement);
        return reportingManager.getIncomeStatement(dto);
    };

    public shared query ({ caller }) func getCashflowStatement(dto: DTOs.GetCashflowStatement) : async Result.Result<DTOs.GetCashflowStatement, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetCashflowStatement);
        return reportingManager.getCashflowStatement(dto);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getEquityStatement(dto: DTOs.GetEquityStatement) : async Result.Result<DTOs.GetEquityStatement, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetEquityStatement);
        return reportingManager.getEquityStatement(dto);
    };

    public shared query ({ caller }) func getFixedAssetRegister(dto: DTOs.GetFixedAssetRegister) : async Result.Result<DTOs.GetFixedAssetRegister, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetFixedAssetRegister);
        return reportingManager.getFixedAssetRegister(dto);
    };

    private func hasPermission(principalId: T.PrincipalId, permission: AccountancyPermissions.AccountancyPermission) : Bool {
        return permissionsManager.hasPermission(principalId, permission);
    };
    
};
