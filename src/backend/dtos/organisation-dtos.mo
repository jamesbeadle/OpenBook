import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";
import Org "../data-types/organisation-types";

module OrganisationDTOs {
    
    public type CreateOrganisation = {
        ownerId: Base.PrincipalId;
        name: Text;
    };

    public type InitialiseOrganisation = {
        ownerId: Base.PrincipalId;
        name: Text;
        canisterId: Base.CanisterId;
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
        id: Base.CanisterId;
        name: Text;
        ownerId: Base.PrincipalId;
        friendlyName : Text;
        logo : ?Blob;
        banner : ?Blob;
        lastModified : ?Int64;
        members: [Org.TeamMember]
    };

    public type UpdateOrganisationDetail = {
        id: Org.OrganisationId;
        name: ?Text;
        friendlyName : ?Text;
        referenceNumber : ?Text;
        logo : ?Blob;
        banner : ?Blob;
    };

    public type DeleteOrganisation = {
        organisationId: Org.OrganisationId;
        confirmDelete: Bool;
    };

    public type AcceptUserOrganisationRequest = {
        organisationId: Org.OrganisationId;
        principalId: Base.PrincipalId;
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
        #Jobs;
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