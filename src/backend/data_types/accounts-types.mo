
import T "../types";

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

};