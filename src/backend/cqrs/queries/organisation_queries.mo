import Base "mo:waterway-mops/BaseTypes";

module OrganisationQueries {

    public type OrganisationDTO = {

    };

    public type OrganisationSummaryDTO = {
        canisterId: Base.CanisterId;
    }; 

    public type GetOrganisations = {
        owner : Base.PrincipalId;
        limit : Nat;
        offset : Nat;
        searchTerm : Text;
    };
    
    public type Organisations = {
        owner : Base.PrincipalId;
        organisations : [OrganisationSummaryDTO];
    };
    
};
