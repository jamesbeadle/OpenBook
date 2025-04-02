import Ids "mo:waterway-mops/Ids";
import MembershipTypes "../data-types/membership-types";
import MopsBaseTypes "../mops/mops_base_types";
import AppIds "../data-types/app-ids";

module OrganisationCommands {

    public type CreateOrganisation = {
        createdBy: Ids.PrincipalId;
        createdOn: Int;
        linkedMembership: MembershipTypes.Membership;
        name: Text;
        legalName: Text;
        logo: ?Blob;
        banner: ?Blob;
        colourPalette: MopsBaseTypes.ColourPalette;
    };

    public type UpdateOrganisationName = {
        organisationId: AppIds.OrganisationId;
        name: Text;
    };

    public type UpdateOrganisationLegalName = {
        organisationId: AppIds.OrganisationId;
        legalName: Text;
    };

    public type UpdateOrganisationLogo = {
        organisationId: AppIds.OrganisationId;
        logo: ?Blob;
    };

    public type UpdateOrganisationBanner = {
        organisationId: AppIds.OrganisationId;
        banner: ?Blob;
    };

    public type UpdateOrganisationColourPalette = {
        organisationId: AppIds.OrganisationId;
        colourPalette: MopsBaseTypes.ColourPalette;
    };

    public type RemoveOrganisation = {
        organisationId: AppIds.OrganisationId;
    };

    public type RecoverOrganisation = {
        organisationId: AppIds.OrganisationId;
    };

};
