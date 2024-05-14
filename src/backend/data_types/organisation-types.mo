import T "types";
import Book "openbook-types";

module OrganisationTypes {

    public type Organisation = {
        id: T.OrganisationId;
        owner: T.PrincipalId;
        name: Text;
        friendlyName : Text;
        referenceNumber : Text;
        logo : ?Blob;
        banner : ?Blob;
        serviceAgreements: [Book.ServiceAgreement];
        members : [OrganisationMember];
        mainAddressId : ?AddressId;
        mainContactId : ?ContactId;
        addresses : [Address];
        contacts : [Contact];
        auditHistory : [AuditRecord];
        lastModified : ?Int64;
        added: Int;
    };

    public type UserRole = {
        #BusinessOwner;
        #Executive;
        #Manager;
        #Assistant;
        #Administrator;
        #SalesDirector;
        #SalesManager;
        #SalesPerson;
        #SalesAssistant;
        #FinancialController;
        #Accountant;
        #AssistantAccountant;
        #CreditController;
        #AccountsPayable;
        #HRDirector;
        #HRManager;
        #HRAssistant;
        #PayrollManager;
        #PayrollAssistant;
        #RecruitmentManager;
        #Recruiter;
        #Resourcer;
        #ProjectManager;
        #ProjectMember;
    };



    public type Profile = {
        principal : Text;
        username : Text;
        firstName : Text;
        lastName : Text;
        displayName : Text;
        profession : Text;
        openChatUsername : Text;
        emailAddress : Text;
        phoneNumber : Text;
        otherContact : Text;
        termsAccepted : Bool;
        profilePictureCanisterId : Text;
        organisations : [OrganisationId];
        createDate : Int;
        auditHistory : List.List<AuditRecord>;
        lastModified : Int64;
        userDefinedWallet : Text;
        preferredPaymentCurrency : CurrencyId;
    };

    public type OrganisationMember = {
        id : OrganisationMemberId;
        principalId : Text;
        role : Role;
        lastModified : Int64;
    };



  public type Department = {

  };

  public type CostCenter = {

  };

  public type FinanceAgreement = {

  };

};
