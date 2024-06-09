import T "../data-types/types";

module OrganisationTypes {
    
    public type CreateOrganisation = {
        ownerId: T.PrincipalId;
        name: Text;
    };

    public type InitialiseOrganisation = {
        ownerId: T.PrincipalId;
        name: Text;
        canisterId: T.CanisterId;
    };

    public type GetUserOrganisations = {

    };

    public type UserOrganisations = {

    };

    public type GetOrganisation = {

    };

    public type Organisation = {
        id: T.CanisterId;
        name: Text;
        ownerId: T.PrincipalId;
        friendlyName : Text;
        logo : ?Blob;
        banner : ?Blob;
        lastModified : ?Int64;
        members: [T.TeamMember]
    };

    public type UpdateOrganisationDetail = {

    };

    public type DeleteOrganisation = {
        organisationId: T.OrganisationId;
        confirmDelete: Bool;
    };

    public type AcceptUserOrganisationRequest = {
        organisationId: T.OrganisationId;
        principalId: T.PrincipalId;
    };

    public type ServiceCanisterIds = {
        accountsCanisterId: Text;
        projectsCanisterId: Text;
        salesCanisterId: Text;
        payrollCanisterId: Text;
        recruitementCanisterId: Text;
    };

    public type ChargeService = {
        charge: Nat64;
    };

    public type ActivateService = {

    };

    public type OrganisationInfo = {

    };

    public type UpdateOrganisationStatus = {

    };

    public type AddCurrency = {
        id: T.CurrencyId;
        decimalPlaces: Nat8;
        name: Text; 
        ticker: Text;
    };

    public type ListContacts = {
        //todo
    };

    public type GetContact = {
        //todo
    };

    public type CreateContact = {}; //TODO
    public type UpdateContact = {}; //TODO
    public type DeleteContact = {}; //TODO

};