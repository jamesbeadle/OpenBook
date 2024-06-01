import T "../data-types/types";

module OrganisationTypes {
    
    public type CreateOrganisationDTO = {
        ownerId: T.PrincipalId;
        name: Text;
    };

    public type GetUserOrganisationsDTO = {

    };

    public type UserOrganisationsDTO = {

    };

    public type GetOrganisationDTO = {

    };

    public type OrganisationDTO = {

    };

    public type UpdateOrganisationDetailDTO = {

    };

    public type DeleteOrganisationDTO = {
        organisationId: T.OrganisationId;
    };

    public type AcceptUserOrganisationRequestDTO = {
        organisationId: T.OrganisationId;
        principalId: T.PrincipalId;
    };
};