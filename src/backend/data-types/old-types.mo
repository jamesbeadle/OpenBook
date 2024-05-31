import List "mo:base/List";
module Types {

  public type PrincipalId = Text;
  public type OrganisationId = Nat32;
  public type CurrencyId = Nat32;

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


  public type ChangeType = {
    #OrganisationDetailUpdated;
    #CustomerRecordUpdated;
    #SupplierRecordUpdated;
    #ChartOfAccountsUpdated;
    #OrganisationUserAdded;
    #OrganisationUserRemoved;
    #OrganisationUserRoleUpdated;
  };

  public type Profile = {
    principal : Text;
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
    profilePictureCanisterId : Text;
    organisations : [OrganisationId];
    createDate : Int;
    auditHistory : List.List<AuditRecord>;
    lastModified : Int64;
    userDefinedWallet : Text;
    preferredPaymentCurrency : CurrencyId;
  };
}