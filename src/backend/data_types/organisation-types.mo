import T "../types";

module OrganisationTypes {

    public type User = {
        id: T.PrincipalId;
        name: Text;
        role: UserRole;
        added: Int;
    };

    public type Organisation = {
        id: Text;
        name: Text;
        departments: [Department];
        costCenters: [CostCenter];
        users: [User];
    };

    public type AccountingPeriod = {
        period: Period;
        closed: Bool;
        createdBy: T.PrincipalId;
        created: Int;
    };

    public type AccountingPackage = {
        organisation: Organisation;
        generalLedger: GeneralLedger;
        periods: [AccountingPeriod];
        taxRates: [TaxRateDetail];
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


};
