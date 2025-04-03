import Ids "mo:waterway-mops/Ids";
import AppIds "app-ids";
import AppEnums "app-enums";

module OrganisationTypes {

  public type Organisation = {
    id: AppIds.OrganisationId;
    ownerId: Ids.PrincipalId;
    name: Text;
    friendlyName : Text;
    referenceNumber : Text;
    logo : ?Blob;
    banner : ?Blob;
    members : [TeamMember];
    mainAddressId : ?AppIds.AddressId;
    mainContactId : ?AppIds.ContactId;
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
    changeType : AppEnums.ChangeType;
    timestamp : Int64;
    visibilityLevel : AppEnums.VisibilityLevel;
  };

  public type Address = {
    id : AppIds.AddressId;
    addressName : Text;
    addressLines : [Text];
    lastModified : Int;
  };

  public type TeamMember = {
    principalId: Ids.PrincipalId;
    organisationId: AppIds.OrganisationId;
    positions: [OrganisationPosition];
    joined: Int;
  };

  public type AccessRequest = {
    requesterPrincipalId: Ids.PrincipalId;
    requestTime: Int;
  };

  public type OrganisationPosition = {
    role: AppEnums.UserRole;
    department: AppEnums.Department;
    started: Int;
    ended: Int;
  };

  public type OrganisationInvite = {
    sentBy: Ids.PrincipalId;
    sentOn: Int;
    sentTo: Ids.PrincipalId;
    position: OrganisationPosition;
  };

  public type Contact = {
    id : AppIds.ContactId;
    firstName : Text;
    lastName : Text;
    email : Text;
    addressId : AppIds.AddressId;
    jobTitle : Text;
    lastModified : Int;
  };

};
