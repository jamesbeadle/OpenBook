import List "mo:base/List";
import TaxTypes "tax-types";

module Types {

  public type OrganisationId = Nat32;
  public type ServiceId = Nat16;
  public type ServiceAgreementId = Nat32;
  public type AccountCodeId = Nat16;
  public type CustomerId = Nat32;
  public type SupplierId = Nat32;
  public type AddressId = Nat32;
  public type ContactId = Nat32;
  public type OrganisationMemberId = Nat32;
  public type CurrencyId = Nat16;

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #NotAllowed;
    #DecodeError;
    #InvalidData;
  };

  public type ChangeType = {
    #ProfileCreated;
    #ProfileNameUpdated;
    #TermsAccepted;
    #ProfilePictureUpdated;
    #ProfileOrganisationAdded;
    #ProfileOrganisationRemoved;

    //ADD ALL
  };

  public type Country = {
    #UK;
    #USA;
    #Germany;
    #Canada;
    #Japan;
    #France;
    #Australia;
    #India;
    #China;
    #Brazil;
    #Netherlands;
    #Sweden;
  };

  public type Role = {
    #Finance;
    #Sales;
    #HR;
    #Administration;
    #Marketing;
    #CustomerService;
    #ProjectManagement;
    #Payroll;
    #Compliance;
    #ResearchAndDevelopment;
    #SoftwareDevelopment;
  };
  /*
        #Production;
        #SupplyChain;
        #Legal;
        #PR;
        #QR;
        #Procurement;
        #Logistics;
        #Operations;
        #BusinessDevelopment;
        #RiskManagement;
        #Training;
        #HealthAndSafety;
        #Recruitment;
        #SystemAdministration;
        #Security;
        #TechnicalSupport;
        #Planning;
        */

  public type AuditRecord = {
    changeType : ChangeType;
    timestamp : Int64;
    visibilityLevel : VisibilityLevel;
  };

  public type VisibilityLevel = {
    #Private;
    #Internal;
    #Public;
  };

  public type Profile = {
    principal : Text;
    username : Text;
    firstName : Text;
    lastName : Text;
    displayName : Text;
    openChatUsername : Text;
    emailAddress : Text;
    phoneNumber : Text;
    termsAccepted : Bool;
    profilePictureCanisterId : Text;
    organisations : [OrganisationId];
    createDate : Int;
    auditHistory : List.List<AuditRecord>;
    lastModified : Int64;
    userDefinedWallet : Text;
    preferredPaymentCurrency : CurrencyId;
  };

  public type Organisation = {
    id : OrganisationId;
    name : Text;
    friendlyName : Text;
    referenceNumber : Text;
    taxReferences : List.List<TaxReference>;
    logo : Text;
    banner : Text;
    mainAddressId : AddressId;
    mainContactId : ContactId;
    members : List.List<OrganisationMember>;
    services : List.List<ServiceAgreement>;
    addresses : List.List<Address>;
    contacts : List.List<Contact>;
    auditHistory : List.List<AuditRecord>;
    customers : List.List<Customer>;
    suppliers : List.List<Supplier>;
    lastModified : Int64;
    primaryAddressId : AddressId;
    primaryContactId : ContactId;
    chartOfAccounts : ChartOfAccounts;
  };

  public type OrganisationMember = {
    id : OrganisationMemberId;
    principalId : Text;
    role : Role;
    lastModified : Int64;
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
    addresses : List.List<Address>;
    contacts : List.List<Contact>;

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
    addresses : List.List<Address>;
    contacts : List.List<Contact>;
    paymentOptions : List.List<AssetAccount>;
  };

  public type TaxReference = {
    taxType : TaxType;
    referenceNumber : Text;
  };

  public type ContactMethod = {
    #Email;
    #Phone;
    #Post;
    #OpenChat;
    #Twitter;
    #Discord;
    #Telegram;
    #Other;
  };

  public type TaxType = {
    #UK : [TaxTypes.UKTaxType];
    #USA : [TaxTypes.USTaxType];
  };

  public type ServiceAgreement = {
    id : ServiceAgreementId;
    lastModified : Int64;
  };

  public type Address = {
    id : Nat32;
    addressName : Text;
    addressLines : List.List<Text>;
    lastModified : Int64;
  };

  public type Contact = {
    id : Nat32;
    firstName : Text;
    lastName : Text;
    email : Text;
    addressId : AddressId;
    jobTitle : Text;
    lastModified : Int64;

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
    details : List.List<BankDetail>;
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

  public type Department = {

  };

  public type CostCenter = {

  };

  public type FinanceAgreement = {

  };

};
