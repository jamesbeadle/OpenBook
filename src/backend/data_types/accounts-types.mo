
import T "types";
import OB "openbook-types";
import TaxTypes "tax-types";

module AccountsTypes {

    public type AccountCode = Nat32;
    public type CostCenter = Text;
    public type Department = Text;
    
    public type Currency = {
        id: OB.CurrencyId;
        name: Text;
        ticker: Text;
        decimalPlaces: Nat8;
        currencyType : CurrencyType;
        canister : Text;
        symbol: Text;
    };

    public type FinancialReport = {
        #ProfitAndLoss;
        #BalanceSheet;
    };

    public type ReportSection = {
        #Sales;
        #Expenses;
        #FixedAssets;
        #CurrentAssets;
        #CurrentLiabilities;
        #LongTermLiabilities;
        #Equity;
    };

    public type GeneralLedger = {
        accounts: [GeneralLedgerAccount];
    };

    public type GeneralLedgerAccount = {
        report: FinancialReport;
        section: ReportSection;
        index: Nat;
        name: Text;
        description: Text;
        accountCode: AccountCode;
        defaultCostCenter: CostCenter;
        defaultDepartment: Department;
        transactions: [Transaction];
    };

    public type Transaction = {
        amount: Float;
        currency: Currency;
        contraTransaction: OB.TransactionId;
        accountCodeId : OB.AccountCodeId;
        description: Text;
        transactionType: TransactionType;
        detail: TransactionDetail;
        addedBy: T.PrincipalId;
        timestamp: Int;
        balance: Float;
    };

    public type TransactionType = {
        #JournalEntry;
        #BankTransfer;
        #CashTransaction;
        #SalesInvoice;
        #SalesCreditNote;
        #SalesReceipt;
        #SalesReturn;
        #PurchaseReturn;
        #PurchaseRefund;
        #PurchaseInvoice;
        #PurchaseCreditNote;
        #PurchasePayment;
        #CashPurchase;
        #DiscountReceived;
        #DiscountGiven;
        #BankDeposit;
        #BankWithdrawal;
        #FundTransfer;
        #AssetPurchase;
        #AssetDisposal;
        #AssetDepreciation;
        #InventoryAdjustment;
        #PayrollDisbursement;
        #TaxPayment;
        #TaxRebate;
        #LoanRepayment;
        #LoanDisbursement;
        #InterestIncome;
        #InterestExpense;
        #DividendReceipt;
        #WriteOff;
        #ReconciliationAdjustment;
    };

    public type TransactionDetail = {
        #JournalEntryDetail: JournalEntryDetail;
        #SalesInvoiceDetail: SalesInvoiceDetail;
        #SalesReceiptDetail: SalesReceiptDetail;
        #SalesCreditDetail: SalesCreditDetail;
        #SalesReturnDetail: SalesReturnDetail;
        #SalesRefundDetail: SalesRefundDetail;
        #PurchaseInvoiceDetail: PurchaseInvoiceDetail;
        #PurchasePaymentDetail: PurchasePaymentDetail;
        #PurchaseReturnDetail: PurchaseReturnDetail;
        #PurchaseRefundDetail: PurchaseRefundDetail;
        #AccountReceiptDetail: AccountReceiptDetail;
        #AccountPaymentDetail: AccountPaymentDetail;
        #BankTransferDetail: BankTransferDetail;
        #CashTransactionDetail: CashTransactionDetail;
    };

    public type TaxRate = Float;  

    public type Period = {
        startDate: Int;
        endDate: Int;
        month: Nat8;
        year: Nat16;
    };

    public type JournalEntryDetail = {
        entryDate: Int;
        reference: Text;
        lineItems: [JournalEntryLineItem];
    };

    public type JournalEntryLineItem = {
        accountCode: AccountCode;
        description: Text;
        debit: Float;
        credit: Float;
    };

    public type SalesInvoiceDetail = {
        invoiceDate: Int;
        dueDate: Int;
        customer: Text;
        items: [InvoiceItem];
    };

    public type SalesReceiptDetail = {
        receiptDate: Int;
        customer: Text;
        items: [ReceiptItem];
    };

    public type SalesCreditDetail = {
        creditDate: Int;
        customer: Text;
        items: [CreditItem];
    };

    public type SalesReturnDetail = {
        returnDate: Int;
        customer: Text;
        items: [ReturnItem];
    };

    public type SalesRefundDetail = {
        refundDate: Int;
        customer: Text;
        items: [RefundItem];
    };

    public type PurchaseInvoiceDetail = {
        invoiceDate: Int;
        dueDate: Int;
        supplier: Text;
        items: [InvoiceItem];
    };

    public type PurchasePaymentDetail = {
        paymentDate: Int;
        supplier: Text;
        items: [PaymentItem];
    };

    public type PurchaseReturnDetail = {
        returnDate: Int;
        supplier: Text;
        items: [ReturnItem];
    };

    public type PurchaseRefundDetail = {
        refundDate: Int;
        supplier: Text;
        items: [RefundItem];
    };

    public type AccountReceiptDetail = {
        receiptDate: Int;
        payer: Text;
        items: [ReceiptItem];
    };

    public type AccountPaymentDetail = {
        paymentDate: Int;
        payee: Text;
        items: [PaymentItem];
    };

    public type BankTransferDetail = {
        transferDate: Int;
        fromAccount: AccountCode;
        toAccount: AccountCode;
        amount: Float;
    };

    public type CashTransactionDetail = {
        transactionDate: Int;
        description: Text;
        amount: Float;
    };

    public type InvoiceItem = {
        description: Text;
        quantity: Float;
        unitPrice: Float;
        taxRate: TaxRateDetail;
    };

    public type ReceiptItem = {
        description: Text;
        amount: Float;
        taxRate: TaxRateDetail;
    };

    public type CreditItem = {
        description: Text;
        amount: Float;
        taxRate: TaxRateDetail;
    };

    public type ReturnItem = {
        description: Text;
        amount: Float;
        taxRate: TaxRateDetail;
    };

    public type RefundItem = {
        description: Text;
        amount: Float;
        taxRate: TaxRateDetail;
    };

    public type PaymentItem = {
        description: Text;
        amount: Float;
        taxRate: TaxRateDetail;
    };

    public type TaxRateDetail = {
        taxCode: Text;
        rate: Float;
        description: Text;
    };


    public type Customer = {
        id : OB.CustomerId;
        name : Text;
        legalName : Text;
        mainAddressId : OB.AddressId;
        mainContactId : OB.ContactId;
        assetAccounts : AssetAccount;
        salesTaxId : Text;
        paymentTermDays : Nat16;
        contactMethod : OB.ContactMethod;
        accountManager : OB.CustomerId;
        primaryAddressId : OB.AddressId;
        primaryContactId : OB.ContactId;
        addresses : [OB.Address];
        contacts : [OB.Contact];
    };

    public type AccountStatus = {
        #Active;
        #OnHold;
        #Inactive;
    };

    public type Supplier = {
        id : OB.SupplierId;
        name : Text;
        legalName : Text;
        mainAddressId : OB.AddressId;
        mainContactId : OB.ContactId;
        assetAccounts : AssetAccount;
        salesTaxId : Text;
        paymentTermDays : Nat16;
        contactMethod : OB.ContactMethod;
        accountManager : OB.CustomerId;
        primaryAddressId : OB.AddressId;
        primaryContactId : OB.ContactId;
        addresses : [OB.Address];
        contacts : [OB.Contact];
        paymentOptions : [AssetAccount];
    };

    public type TaxReference = {
        taxType : TaxType;
        referenceNumber : Text;
    };


    public type TaxType = {
        #UK : [TaxTypes.UKTaxType];
        #USA : [TaxTypes.USTaxType];
    };



    public type AssetAccount = {
        accountType : AssetAccountType;
        accountId : Nat32;
        name : Text;
        lastModified : Int64;
    };

    public type AssetAccountType = {
        #TokenWallet;
        #BankAccount;
    };

    public type TokenWallet = {
        id : Nat32;
        account : Text;
        principal : Text;
        lastModified : Int64;
    };

    public type BankAccount = {
        id : Nat32;
        details : [BankDetail];
        lastModified : Int64;
    };

    public type BankDetail = {
        description : Text;
        value : Text;
        lastModified : Int64;
    };


  public type CurrencyType = {
    #Fiat;
    #Token;
  };

  public type AccountGroup = {
    #Assets;
    #Liabilities;
    #Equity;
    #Income;
    #Expenses;
  };

  public type AccountSubGroup = {
    // Assets
    #CashAndCashEquivalents;
    #ShortTermInvestments;
    #AccountsReceivable;
    #Inventory;
    #PrepaidExpenses;
    #FixedAssets;
    #AccumulatedDepreciation;
    #LongTermInvestments;
    #Goodwill;
    #OtherIntangibleAssets;
    #DeferredIncomeTaxes;
    #OtherNonCurrentAssets;

    // Liabilities
    #AccountsPayable;
    #AccruedExpenses;
    #ShortTermDebt;
    #CurrentPortionOfLongTermDebt;
    #UnearnedRevenue;
    #LongTermDebt;
    #PensionLiabilities;
    #DeferredRevenue;
    #DeferredIncomeTaxesLiability;
    #OtherLongTermLiabilities;

    // Equity
    #CommonStock;
    #PreferredStock;
    #AdditionalPaidInCapital;
    #TreasuryStock;
    #RetainedEarnings;
    #AccumulatedOtherComprehensiveIncome;

    // Income
    #SalesRevenue;
    #ServiceRevenue;
    #InterestIncome;
    #DividendIncome;
    #RentalIncome;
    #RoyaltyIncome;
    #CapitalGains;

    // Expenses
    #CostOfSales;
    #OperatingExpenses;
    #GeneralAndAdministrativeExpenses;
    #SellingAndMarketingExpenses;
    #ResearchAndDevelopmentExpenses;
    #DepreciationAndAmortizationExpenses;
    #InterestExpense;
    #IncomeTaxExpense;
    #ForeignExchangeLoss;
    #ImpairmentLosses;
    #RestructuringCosts;
  };


};