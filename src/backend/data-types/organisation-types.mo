import Ids "mo:waterway-mops/Ids";
import AppIds "app-ids";
import UserEnums "../enums/user-enums";
import OrganisationEnums "../enums/organisation-enums";
import AppTypes "app-types";

module OrganisationTypes {

  public type Organisation = {
    id: AppIds.OrganisationId;
    ownerId: Ids.PrincipalId;
    name: Text;
    officialName : Text;
    logo : ?Blob;
    banner : ?Blob;
    members : [TeamMember];
    mainAddressId : ?AppIds.AddressId;
    mainContactId : ?AppIds.ContactId;
    addresses : [AppTypes.Address];
    contacts : [AppTypes.Contact];
    invites : [OrganisationInvite];
    lastModified : ?Int;
    createdOn: Int;
    accessRequests: [AccessRequest];
    auditHistory : [AppTypes.AuditRecord];
  };

  public type TeamMember = {
    principalId: Ids.PrincipalId;
    organisationId: AppIds.OrganisationId;
    positions: [OrganisationPosition];
    joined: Int;
  };

  public type OrganisationPosition = {
    role: UserEnums.UserRole;
    department: OrganisationEnums.Department;
    started: Int;
    ended: Int;
  };

  public type OrganisationInvite = {
    sentBy: Ids.PrincipalId;
    sentOn: Int;
    sentTo: Ids.PrincipalId;
    position: OrganisationPosition;
  };

  public type AccessRequest = {
    requesterPrincipalId: Ids.PrincipalId;
    requestTime: Int;
  };

};
