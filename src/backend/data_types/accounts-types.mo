
import T "types";

module AccountsTypes {

    public type AccountCode = Nat32;
    public type CostCenter = Text;
    public type Department = Text;
    
    public type Currency = {
        id: Nat32;
        name: Text;
        ticker: Text;
        decimalPlaces: Nat8;
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
        contra_account: AccountCode;
        description: Text;
        transactionType: TransactionType;
        detail: TransactionDetail;
        addedBy: T.PrincipalId;
        added: Int;
        balance: Float;
    };

    public type TransactionType = {
        #JournalEntry;
        #SalesInvoice;
        #SalesReceipt;
        #SalesCredit;
        #SalesReturn;
        #SalesRefund;
        #PurchaseInvoice;
        #PurchasePayment;
        #PurchaseReturn;
        #PurchaseRefund;
        #AccountReceipt;
        #AccountPayment;
        #BankTransfer;
        #CashTransaction;
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
    id : CustomerId;
    name : Text;
    legalName : Text;
    mainAddressId : AddressId;
    mainContactId : ContactId;
    assetAccounts : AssetAccount;
    salesTaxId : Text;
    paymentTermDays : Nat16;
    contactMethod : ContactMethod;
    accountManager : CustomerId;
    primaryAddressId : AddressId;
    primaryContactId : ContactId;
    addresses : [Address];
    contacts : [Contact];

  };

  public type CustomerStatus = {
    #Active;
    #OnHold;
    #Inactive;
  };

  public type Supplier = {
    id : SupplierId;
    name : Text;
    legalName : Text;
    mainAddressId : AddressId;
    mainContactId : ContactId;
    assetAccounts : AssetAccount;
    salesTaxId : Text;
    paymentTermDays : Nat16;
    contactMethod : ContactMethod;
    accountManager : CustomerId;
    primaryAddressId : AddressId;
    primaryContactId : ContactId;
    addresses : [Address];
    contacts : [Contact];
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

  public type Transaction = {
    id : Nat32;
    description : Text;
    accountCodeId : AccountCodeId;
    currency : Currency;
    debit : Nat;
    credit : Nat;
    transactionType : TransactionType;
    contraId : Nat32;
    timestamp : Int64;
  };

  public type Currency = {
    id : CurrencyId;
    name : Text;
    currencyType : CurrencyType;
    symbol : Text;
    icon : Text;
    canister : Text;
  };

  public type CurrencyType = {
    #Fiat;
    #Token;
  };

  public type TransactionType = {
    #SalesInvoice;
    #SalesCreditNote;
    #SalesReceipt;
    #CustomerRefund;
    #PurchaseInvoice;
    #PurchaseCreditNote;
    #SupplierPayment;
    #CashPurchase;
    #DiscountReceived;
    #DiscountGiven;
    #JournalEntry;
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

  public type ChartOfAccounts = {
    accounts : List.List<GeneralLedgerAccount>;

  };

  public type GeneralLedgerAccount = {
    group : AccountGroup;
    subGroup : AccountSubGroup;
    name : Text;
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