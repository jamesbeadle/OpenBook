import AppIds "../data-types/app-ids";
import MopsBaseTypes "../mops/mops_base_types";

module OrganisationQueries {

    public type ListOrganisations = {
        page : Nat;
        searchTerm : Text;
    };

    public type OrganistionsList = {
        entries: [Organisation];
        page: Nat;
        totalEntries: Nat;
    };

    public type GetOrganisation = {
        organisationId: AppIds.OrganisationId;
    };

    public type Organisation = {
        organisationId: AppIds.OrganisationId;
        name: Text;
        legalName: Text;
        logo: ?Blob;
        banner: ?Blob;
        colourPalette: MopsBaseTypes.ColourPalette;
    };
    
};
