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
};