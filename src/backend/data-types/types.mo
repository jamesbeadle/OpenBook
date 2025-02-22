import Departments "../data-types/organisation-departments";
import UserRoles "../data-types/user-roles";
import Base "mo:waterway-mops/BaseTypes";
import Org "../data-types/organisation-types";

module OpenBookTypes {

  public type ProjectId = Nat16;
  public type AccountCodeId = Nat16;
  public type CustomerId = Nat32;
  public type SupplierId = Nat32;
  public type OrganisationMemberId = Nat32;
  public type CurrencyId = Nat32;
  public type TransactionId = Nat32;
  public type BucketNumber = Nat8;
  public type FileId = Nat32;
  public type CalendarMonth = Nat8;

  public type Currency = {
    id: CurrencyId;
    name: Text;
    ticker: Text;
    decimalPlaces: Nat8;
  };

  public type Profile = {
    principal : Base.PrincipalId;
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
    profilePictureCanisterId : Base.CanisterId;
    profilePictureBucketNumber: BucketNumber;
    profilePictureFileId: FileId;
    ownedOrganiastions: [Org.OrganisationId];
    teamMemberships : [Org.TeamMember];
    createDate : Int;
    auditHistory : [Org.AuditRecord];
    lastModified : Int64;
    userDefinedWallet : Text;
    preferredPaymentCurrency : CurrencyId;
  };

  public type CanisterTopup = {
    canisterId: Base.CanisterId;
    topupTime: Int;
    cyclesAmount: Nat;
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

  public type EventLogEntry = {
    eventId: Nat;
    eventTime: Int;
    eventType: EventLogEntryType;
    eventTitle: Text;
    eventDetail: Text;
  };

  public type EventLogEntryType = {
    #SystemCheck;
    #UnexpectedError;
    #CanisterTopup;
    #CanisterCreated;
  };

  

};
