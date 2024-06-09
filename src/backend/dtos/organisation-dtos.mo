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

    public type UpdateOrganisationBanner = {

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
        id: T.OrganisationId;
        name: ?Text;
        friendlyName : ?Text;
        referenceNumber : ?Text;
        logo : ?Blob;
        banner : ?Blob;
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
        accountancyCanisterId: Text;
        projectsCanisterId: Text;
        salesCanisterId: Text;
        timesheetsCanisterId: Text;
        recruitmentCanisterId: Text;
        storageCanisterId: Text;
    };

    public type PurchaseCharge = {
        icpAmount: Nat;
    };

    public type TransferCharge = {
        fromService: ServiceType;
        toService: ServiceType;
        transferAmount: Nat;
    };

    public type UpdateChargeRanges = {
        serviceType: ServiceType;
        newChargeMin: Nat;
        newChargeMax: Nat;
    };

    public type ChargeService = {
        serviceType: ServiceType;
        transferAmount: Nat;
    };
    
    public type ServiceType = {
        #Accountancy;
        #Sales;
        #Recruitment;
        #Projects;
        #Timesheets;
    };

    public type ActivateService = {
        serviceType: ServiceType;
        minChargeRange: Nat64;
        maxChargeRange: Nat64;
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