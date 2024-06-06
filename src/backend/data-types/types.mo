import Departments "../data-types/organisation-departments";
import UserRoles "../data-types/user-roles";

module OpenBookTypes {

  public type PrincipalId = Text;
  public type OrganisationId = CanisterId;
  public type ProjectId = Nat16;
  public type ServiceId = Nat16;
  public type ServiceAgreementId = Nat32;
  public type AccountCodeId = Nat16;
  public type CustomerId = Nat32;
  public type SupplierId = Nat32;
  public type AddressId = Nat32;
  public type ContactId = Nat32;
  public type OrganisationMemberId = Nat32;
  public type CurrencyId = Nat32;
  public type TransactionId = Nat32;
  public type CanisterId = Text;
  public type BucketNumber = Nat8;
  public type FileId = Nat32;

  public type Currency = {
    id: CurrencyId;
    name: Text;
    ticker: Text;
    decimalPlaces: Nat8;
  };

  public type Profile = {
    principal : PrincipalId;
    username : Text;
    firstName : Text;
    lastName : Text;
    displayName : Text;
    profession : Text;
    openChatUsername : Text;
    emailAddress : Text;
    phoneNumber : Text;
    otherContact : Text;
    termsAccepted : Bool;
    profilePictureCanisterId : CanisterId;
    profilePictureBucketNumber: BucketNumber;
    profilePictureFileId: FileId;
    teamMemberships : [TeamMember];
    createDate : Int;
    auditHistory : [AuditRecord];
    lastModified : Int64;
    userDefinedWallet : Text;
    preferredPaymentCurrency : CurrencyId;
  };


  public type Organisation = {
    id: OrganisationId;
    ownerId: PrincipalId;
    name: Text;
    friendlyName : Text;
    referenceNumber : Text;
    logo : ?Blob;
    banner : ?Blob;
    members : [TeamMember];
    mainAddressId : ?AddressId;
    mainContactId : ?ContactId;
    addresses : [Address];
    contacts : [Contact];
    auditHistory : [AuditRecord];
    invites : [OrganisationInvite];
    lastModified : ?Int64;
    createdOn: Int;
  };

  public type TeamMember = {
    principalId: PrincipalId;
    organisationId: OrganisationId;
    positions: [OrganisationPosition];
    joined: Int;
  };

  public type OrganisationPosition = {
    role: UserRoles.UserRole;
    department: Departments.Department;
    started: Int;
    ended: Int;
  };

  public type PresaleParticipation = {
    principalId: PrincipalId;
    bookTokens: Nat64;
    icpSwapped: Nat64;
  };

  public type ChangeType = {
    #OrganisationDetailUpdated;
    #CustomerRecordUpdated;
    #SupplierRecordUpdated;
    #ChartOfAccountsUpdated;
    #OrganisationUserAdded;
    #OrganisationUserRemoved;
    #OrganisationUserRoleUpdated;
  };


  public type AuditRecord = {
    changeType : ChangeType;
    timestamp : Int64;
    visibilityLevel : VisibilityLevel;
  };

  public type OrganisationInvite = {
    sentBy: PrincipalId;
    sentOn: Int;
    sentTo: PrincipalId;
    position: OrganisationPosition;
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

  public type CanisterTopup = {
    canisterId: CanisterId;
    topupTime: Int;
    icpAmount: Nat64;
    cyclesAmount: Nat64;
    xdrRate: Nat64;
  };

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #NotAllowed;
    #DecodeError;
    #InvalidData;
    #NotEnoughFunds;
    #PaymentError;
  };

};
