import Ids "mo:waterway-mops/Ids";
import AppIds "../data-types/app-ids";

module UserCommands {

    public type CreateUser = {
      principalId: Ids.PrincipalId;
      username: Text;
      picture: ?Blob;
      displayName : Text;
      profession : Text;
      firstName : Text;
      lastName : Text;
      termAgreed: Bool;
    };

    public type UpdateUser = {
      // TODO: Complete when data structure defined
    };

    public type RemoveUser = {

    };

    public type RecoverUser = {

    };

    public type RequestOrganisationAccess = {
        principalId: Ids.PrincipalId;
        organistionId: AppIds.OrganisationId;
    };

    public type CancelOrganisationAccessRequest = {
        principalId: Ids.PrincipalId;
        organistionId: AppIds.OrganisationId;
    };

    public type LeaveOrganisation = {
        principalId: Ids.PrincipalId;
        organistionId: AppIds.OrganisationId;
    };


};
