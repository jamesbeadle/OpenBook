import T "../data-types/types";

module OrganisationTypes {
    
    public type CreateOrganisationDTO = {
        ownerId: T.PrincipalId;
        name: Text;
    };

    public type InitialiseOrganisationDTO = {
        ownerId: T.PrincipalId;
        name: Text;
        canisterId: T.CanisterId;
    };

    public type GetUserOrganisationsDTO = {

    };

    public type UserOrganisationsDTO = {

    };

    public type GetOrganisationDTO = {

    };

    public type OrganisationDTO = {
        id: T.CanisterId;
        name: Text;
        ownerId: T.PrincipalId;
        friendlyName : Text;
        logo : ?Blob;
        banner : ?Blob;
        lastModified : ?Int64;
        members: [T.TeamMember]
    };

    public type UpdateOrganisationDetailDTO = {

    };

    public type DeleteOrganisationDTO = {
        organisationId: T.OrganisationId;
        confirmDelete: Bool;
    };

    public type AcceptUserOrganisationRequestDTO = {
        organisationId: T.OrganisationId;
        principalId: T.PrincipalId;
    };

    public type ServiceCanisterIdsDTO = {
        accountsCanisterId: Text;
        projectsCanisterId: Text;
        salesCanisterId: Text;
        payrollCanisterId: Text;
        recruitementCanisterId: Text;
    };

    public type ChargeServiceDTO = {
        charge: Nat64;
    };

    public type ActivateServiceDTO = {

    };

    public type OrganisationInfoDTO = {

    };

    public type AddCurrencyDTO = {
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