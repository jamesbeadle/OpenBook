import List "mo:base/List";
import TaxTypes "tax-types";

module Types {

    public type OrganisationId = Nat32;
    public type ServiceId = Nat32;
    public type ServiceAgreementId = Nat32;
    public type AccountCodeId = Nat16;

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
    };

    public type AuditRecord = {
        changeType: ChangeType;
        timestamp: Int64;
        visibilityLevel: VisibilityLevel;
    };

    public type VisibilityLevel = {
        #Private;
        #Internal;
        #Public;
    };

    public type Profile = {
        principalName : Text;
        displayName : Text;
        termsAccepted : Bool;
        profilePicture : Text;
        organisations: [OrganisationId];
        createDate : Int;
        auditHistory: List.List<AuditRecord>;
        lastModified: Int64;
    };

    public type Organisation = {
        id: OrganisationId;
        name: Text;
        friendlyName: Text;
        referenceNumber: Text;
        taxReferences: List.List<TaxReference>;
        logo: Text;
        banner: Text;
        mainAddress: Address;
        mainContact: Contact;
        members: List.List<OrganisationMember>;
        services: List.List<ServiceAgreement>;
        addresses: List.List<Address>;
        contacts: List.List<Contact>;
        auditHistory: List.List<AuditRecord>;
        customers: List.List<Customer>;
        suppliers: List.List<Supplier>;
        lastModified: Int64;
    };

    public type OrganisationMember = {
        id: Nat32;
        principalId: Text;
        role: Role;
        lastModified: Int64;
    };

    public type Customer = {
        id: Nat32;
        name: Text;
        legalName: Text;
        mainContact: Text;
        assetAccounts: AssetAccount;
        salesTaxId: Text;
        paymentTermDays: Nat16;
        contactMethod: ContactMethod;
    };

    public type Supplier = {
        id: Nat32;
    };

    public type TaxReference = {
        taxType: TaxType;
        referenceNumber: Text;
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
        #UK: [TaxTypes.UKTaxType];
        #USA: [TaxTypes.USTaxType];
    };

    public type ServiceAgreement = {
        id: ServiceAgreementId;
        lastModified: Int64;
    };

    public type Address = {
        addressName: Text;
        addressLines: List.List<Text>;
        lastModified: Int64;
    };

    public type Contact = {
        lastModified: Int64;
    };

    public type AssetAccount = {
        accountType: AssetAccountType;
        accountId: Nat32;
        name: Text;
        lastModified: Int64;
    };

    public type AssetAccountType = {
        #TokenWallet;
        #BankAccount;
    };  

    public type TokenWallet = {
        id: Nat32;
        details: List.List<BankDetail>;
        lastModified: Int64;
    };

    public type BankAccount = {
        id: Nat32;
        details: List.List<BankDetail>;
        lastModified: Int64;
    };

    public type BankDetail = {
        description: Text;
        value: Text;
        lastModified: Int64;
    };

    public type Transaction = {
        id: Nat32;
        description: Text;
        accountCodeId: AccountCodeId;
        debit: Nat;
        credit: Nat;
        transactionType: TransactionType;
        contraId: Nat32;
        timestamp: Int64;
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

};
