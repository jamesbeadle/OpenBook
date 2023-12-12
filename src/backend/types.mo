import List "mo:base/List";

module Types {

    public type OrganisationId = Nat32;
    public type ServiceId = Nat32;
    public type ServiceAgreementId = Nat32;

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
  };

  public type Profile = {
    principalName : Text;
    displayName : Text;
    termsAccepted : Bool;
    profilePicture : Text;
    organisations: [OrganisationId];
    createDate : Int;
    auditHistory: List.List<AuditRecord>;
  };

  public type Organisation = {
    id: OrganisationId;
    name: Text;
    friendlyName: Text;
    referenceNumber: Text;
    taxReferences: Text;//VAT and maybe utr number
    logo: Text;
    banner: Text;
    members: List.List<OrganisationMember>;
    services: List.List<ServiceAgreement>;
    addresses: List.List<Address>;
    auditHistory: List.List<AuditRecord>;
  };

  public type OrganisationMember = {
    id: Nat32;
    principalId: Text;
    role: Role;
    auditHistory: List.List<AuditRecord>;
  };

  public type ServiceAgreement = {
    id: ServiceAgreementId;
    auditHistory: List.List<AuditRecord>;
  };

  public type Address = {
    addressName: Text;
    addressLines: List.List<Text>;
    auditHistory: List.List<AuditRecord>;
  };

};
