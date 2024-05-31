import T "types";
import OB "openbook-types";

module OrganisationTypes {

    public type Organisation = {
        id: OB.OrganisationId;
        owner: T.PrincipalId;
        name: Text;
        friendlyName : Text;
        referenceNumber : Text;
        logo : ?Blob;
        banner : ?Blob;
        serviceAgreements: [OB.ServiceAgreement];
        members : [OrganisationMember];
        mainAddressId : ?OB.AddressId;
        mainContactId : ?OB.ContactId;
        addresses : [OB.Address];
        contacts : [OB.Contact];
        auditHistory : [OB.AuditRecord];
        lastModified : ?Int64;
        timestamp: Int;
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




    public type OrganisationMember = {
        id : OB.OrganisationMemberId;
        principalId : Text;
        department : OB.Department;
        lastModified : Int64;
    };



    public type Department = {

    };

    public type CostCenter = {

    };

    public type FinanceAgreement = {

    };

    public type PublicProfile = {
        principalId: T.PrincipalId;
        firstName : ?Text;
        lastName : ?Text;
        profession : Text;
        storageCanisterId : Text;
        organisations : [OB.OrganisationId];
        createDate : Int;
    };

};
