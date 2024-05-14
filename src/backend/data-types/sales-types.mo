module SalesTypes {

    public type PrincipalId = Text;
    public type DateTime = Int;
    public type Currency = Text;

    public type Lead = {
        leadId: Text;
        name: Text;
        company: Text;
        email: Text;
        phone: Text;
        status: LeadStatus;
        source: LeadSource;
        assignedTo: PrincipalId;
        createdDate: DateTime;
        lastContactedDate: DateTime;
        notes: [Text];
    };

    public type LeadStatus = {
        #New;
        #Contacted;
        #Qualified;
        #Converted;
        #Disqualified;
    };

    public type LeadSource = {
        #Advertisement;
        #Referral;
        #SocialMedia;
        #Website;
        #TradeShow;
        #Other;
    };

    public type Contact = {
        contactId: Text;
        firstName: Text;
        lastName: Text;
        email: Text;
        phone: Text;
        company: Text;
        title: Text;
        address: Text;
        notes: [Text];
    };

    public type Opportunity = {
        opportunityId: Text;
        name: Text;
        contactId: Text;
        accountId: Text;
        value: Float;
        currency: Currency;
        stage: OpportunityStage;
        closeDate: DateTime;
        probability: Float;
        assignedTo: PrincipalId;
        createdDate: DateTime;
        notes: [Text];
        activities: [Activity];
    };

    public type OpportunityStage = {
        #Qualification;
        #NeedsAnalysis;
        #Proposal;
        #Negotiation;
        #ClosedWon;
        #ClosedLost;
    };

    public type Account = {
        accountId: Text;
        name: Text;
        industry: Text;
        annualRevenue: Float;
        currency: Currency;
        phone: Text;
        website: Text;
        address: Text;
        contacts: [Contact];
        opportunities: [Opportunity];
        notes: [Text];
    };

    public type Activity = {
        activityId: Text;
        activityType: ActivityType;
        subject: Text;
        description: Text;
        dueDate: DateTime;
        status: ActivityStatus;
        assignedTo: PrincipalId;
        createdDate: DateTime;
    };

    public type ActivityType = {
        #Call;
        #Email;
        #Meeting;
        #Task;
    };

    public type ActivityStatus = {
        #Scheduled;
        #Completed;
        #Cancelled;
        #Overdue;
    };

    public type SalesPipeline = {
        pipelineId: Text;
        name: Text;
        stages: [PipelineStage];
        createdBy: PrincipalId;
        createdDate: DateTime;
    };

    public type PipelineStage = {
        stageId: Text;
        name: Text;
        probability: Float;
        order: Int;
    };

    public type SalesPackage = {
        leads: [Lead];
        contacts: [Contact];
        accounts: [Account];
        opportunities: [Opportunity];
        activities: [Activity];
        pipelines: [SalesPipeline];
    };

};
