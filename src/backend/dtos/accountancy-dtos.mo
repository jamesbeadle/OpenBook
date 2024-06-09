import T "../data-types/accountancy-types";

module AccountancyDTOs {
    public type ListGeneralLedgerAccounts = {};
    public type GetGeneralLedgerAccount = {};
    public type CreateGeneralLedgerAccount = {};
    public type UpdateGeneralLedgerAccount = {};
    public type DeleteGeneralLedgerAccount = {};
    public type ListJournalEntries = {};
    public type GetJournalEntry = {};
    public type CreateJournalEntry = {};
    public type UpdateJournalEntry = {};
    public type DeleteJournalEntry = {};
    public type ListSuppliers = {};
    public type GetSupplier = {};
    public type CreateSupplierInvoice = {};
    public type UpdateSupplierInvoice = {};
    public type DeleteSupplierInvoice = {};
    public type CreateSupplierCreditNote = {};
    public type UpdateSupplierCreditNote = {};
    public type DeleteSupplierCreditNote = {};
    public type GetAgedCreditors = {};
    public type ListCustomers = {};
    public type GetCustomer = {};
    public type CreateCustomerInvoice = {};
    public type UpdateCustomerInvoice = {};
    public type DeleteCustomerInvoice = {};
    public type CreateCustomerCreditNote = {};
    public type UpdateCustomerCreditNote = {};
    public type DeleteCustomerCreditNote = {};
    public type GetAgedDebtors = {};
    public type ListStockItems = {};
    public type GetStockItem = {};
    public type CreateStockItem = {};
    public type UpdateStockItem = {};
    public type DeleteStockItem = {};
    public type ListStockMovement = {};
    public type GetStockMovement = {};
    public type CreateStockMovement = {};
    public type UpdateStockMovement = {};
    public type DeleteStockMovement = {};
    public type ListStockOrder = {};
    public type GetStockOrder = {};
    public type CreateStockOrder = {};
    public type UpdateStockOrder = {};
    public type DeleteStockOrder = {};
    public type GetStockLevelsReport = {};
    public type GetStockValuationReport = {};
    public type GetStockMovementReport = {};
    public type GetStockAgeingReport = {};
    public type GetBankAccounts = {
        page: Nat;
        pageSize: Nat;
        entries: [AssetAccount];
    };
    public type GetBankAccount = {
        
    };
    public type CreateBankAccount = {};
    public type UpdateBankAccount = {};
    public type DeleteBankAccount = {};
    public type GetPayment = {};
    public type CreatePayment = {};
    public type UpdatePayment = {};
    public type DeletePayment = {};
    public type CreateCustomerPayment = {};
    public type DeleteCustomerPayment = {};
    public type CreateSupplierPayment = {};
    public type DeleteSupplierPayment = {};
    public type ReconcileBankAccount = {};
    public type GetBankStatement = {};
    public type GetBankReconciliation = {
        periodId: T.AccountingPeriodId;
        bankReconciliation: ?BankReconciliation;
    };
    public type GetUnreconciledTransactions = {};
    public type ImportTransactions = {};
    public type GetChartOfAccounts = {};
    public type GetTrialBalance = {};
    public type GetBalanceSheet = {};
    public type GetIncomeStatement = {};
    public type GetCashflowStatement = {};
    public type GetEquityStatement = {};
    public type GetFixedAssetRegister = {};

    public type AssetAccount = {

    };

    public type BankReconciliation = {
        reconciliationEndDate: Int;
        bankStatementBalance: Int;
        depositsInTransit: [T.Transaction];
        outstandingPaymentsOut: [T.Transaction];
        interestPaid: [T.Transaction];
        bankFees: [T.Transaction];
        exchangeAdjustments: [T.Transaction];
        reconciliationAdjustments: [T.Transaction];
    };

}