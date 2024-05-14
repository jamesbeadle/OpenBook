module RecruitmentTypes {

    public type PrincipalId = Text;

    public type JobPosting = {
        jobId: Text;
        title: Text;
        description: Text;
        department: Text;
        location: Text;
        employmentType: EmploymentType;
        salaryRange: SalaryRange;
        postingDate: Int;
        closingDate: Int;
        status: JobStatus;
        postedBy: PrincipalId;
    };

    public type EmploymentType = {
        #FullTime;
        #PartTime;
        #Contract;
        #Temporary;
        #Internship;
    };

    public type SalaryRange = {
        min: Float;
        max: Float;
        currency: Text;
    };

    public type JobStatus = {
        #Open;
        #Closed;
        #Filled;
        #Cancelled;
    };

    public type JobApplication = {
        applicationId: Text;
        jobId: Text;
        candidateId: Text;
        applicationDate: Int;
        status: ApplicationStatus;
        resume: Text;
        coverLetter: Text;
        appliedBy: PrincipalId;
    };

    public type ApplicationStatus = {
        #Received;
        #UnderReview;
        #InterviewScheduled;
        #OfferExtended;
        #Hired;
        #Rejected;
        #Withdrawn;
    };

    public type Candidate = {
        candidateId: Text;
        firstName: Text;
        lastName: Text;
        email: Text;
        phone: Text;
        address: Text;
        skills: [Text];
        experience: [WorkExperience];
        education: [Education];
    };

    public type WorkExperience = {
        company: Text;
        title: Text;
        startDate: Int;
        endDate: Int;
        description: Text;
    };

    public type Education = {
        institution: Text;
        degree: Text;
        fieldOfStudy: Text;
        startDate: Int;
        endDate: Int;
    };

    public type Interview = {
        interviewId: Text;
        applicationId: Text;
        interviewerId: PrincipalId;
        schedule: Int;
        interviewType: InterviewType;
        status: InterviewStatus;
        feedback: Text;
    };

    public type InterviewType = {
        #Phone;
        #Video;
        #InPerson;
        #Panel;
    };

    public type InterviewStatus = {
        #Scheduled;
        #Completed;
        #Cancelled;
        #NoShow;
    };

    public type JobOffer = {
        offerId: Text;
        applicationId: Text;
        offerDate: Int;
        salary: SalaryRange;
        benefits: [Text];
        status: OfferStatus;
    };

    public type OfferStatus = {
        #Extended;
        #Accepted;
        #Rejected;
        #Withdrawn;
    };

    public type EmployeeOnboarding = {
        onboardingId: Text;
        candidateId: Text;
        startDate: Int;
        assignedTo: PrincipalId;
        tasks: [OnboardingTask];
    };

    public type OnboardingTask = {
        taskId: Text;
        description: Text;
        assignedTo: PrincipalId;
        dueDate: Int;
        status: TaskStatus;
    };

    public type TaskStatus = {
        #Pending;
        #InProgress;
        #Completed;
        #Overdue;
    };

    public type RecruitmentPackage = {
        jobPostings: [JobPosting];
        candidates: [Candidate];
        applications: [JobApplication];
        interviews: [Interview];
        offers: [JobOffer];
        onboarding: [EmployeeOnboarding];
    };

};
