import Base "mo:waterway-mops/BaseTypes";

module OrganisationCommands {

    public type PuchaseOrganisation = {};

    public type UpdateOrganisationName = {
        organisationId: Base.CanisterId;
        updatedName: Text;
    };

    public type UpdateOrganisationOwner = {
        organisationId: Base.CanisterId;
        newOwner: Base.PrincipalId;
    };

    

    /*

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

    */

    //TODO:     
        //Create Commands for Everything you might update

    //update organisation

    //delete organistaion

};
