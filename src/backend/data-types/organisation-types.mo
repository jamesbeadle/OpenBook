import Departments "../data-types/organisation-departments";
import UserRoles "../data-types/user-roles";
import Base "mo:waterway-mops/BaseTypes";

module OrganisationTypes {

//back burner for ideas
    //idea

  public type IdeaId = Nat32;
  public type AddressId = Nat32;
  public type ContactId = Nat32;
  public type OrganisationId = Base.CanisterId;
  public type Organisation = {
    id: OrganisationId;
    ownerId: Base.PrincipalId;
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
    accessRequests: [AccessRequest];
    chargeBalance : Nat;
  };

  public type AuditRecord = {
    changeType : ChangeType;
    timestamp : Int64;
    visibilityLevel : VisibilityLevel;
  };

  public type Address = {
    id : AddressId;
    addressName : Text;
    addressLines : [Text];
    lastModified : Int;
  };

  public type TeamMember = {
    principalId: Base.PrincipalId;
    organisationId: OrganisationId;
    positions: [OrganisationPosition];
    joined: Int;
  };

  public type Idea = {
    id: IdeaId;
    organisationId: OrganisationId

  };

  public type AccessRequest = {
    requesterPrincipalId: Base.PrincipalId;
    requestTime: Int;
  };

  public type OrganisationPosition = {
    role: UserRoles.UserRole;
    department: Departments.Department;
    started: Int;
    ended: Int;
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

  public type OrganisationInvite = {
    sentBy: Base.PrincipalId;
    sentOn: Int;
    sentTo: Base.PrincipalId;
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
