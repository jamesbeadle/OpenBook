
module OpenBookTypes {

  public type OrganisationId = Nat32;
  public type ProjectId = Nat16;
  public type ServiceId = Nat16;
  public type ServiceAgreementId = Nat32;
  public type AccountCodeId = Nat16;
  public type CustomerId = Nat32;
  public type SupplierId = Nat32;
  public type AddressId = Nat32;
  public type ContactId = Nat32;
  public type OrganisationMemberId = Nat32;
  public type CurrencyId = Nat16;

  public type ChangeType = {
    #OrganisationDetailUpdated;
    #CustomerRecordUpdated;
    #SupplierRecordUpdated;
    #ChartOfAccountsUpdated;
    #OrganisationUserAdded;
    #OrganisationUserRemoved;
    #OrganisationUserRoleUpdated;
  };

  public type Department = {
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
  };

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

  public type ServiceAgreement = {
    id : ServiceAgreementId;
    lastModified : Int;
  };

  public type Address = {
    id : AddressId;
    addressName : Text;
    addressLines : [Text];
    lastModified : Int;
  };

  public type Contact = {
    id : ContactId;
    firstName : Text;
    lastName : Text;
    email : Text;
    addressId : AddressId;
    jobTitle : Text;
    lastModified : Int;
  };


};
