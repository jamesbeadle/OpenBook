module RecruitmentTypes {

    public type PrincipalId = Text;
    public type DateTime = Int;
    public type Text = String;
    public type Float = Double;

    public type JobPosting = {
        jobId: Text;
        title: Text;
        description: Text;
        department: Text;
        location: Text;
        employmentType: EmploymentType;
        salaryRange: SalaryRange;
        postingDate: DateTime;
        closingDate: DateTime;
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
        applicationDate: DateTime;
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
        startDate: DateTime;
        endDate: DateTime;
        description: Text;
    };

    public type Education = {
        institution: Text;
        degree: Text;
        fieldOfStudy: Text;
        startDate: DateTime;
        endDate: DateTime;
    };

    public type Interview = {
        interviewId: Text;
        applicationId: Text;
        interviewerId: PrincipalId;
        schedule: DateTime;
        type: InterviewType;
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
        offerDate: DateTime;
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
        startDate: DateTime;
        assignedTo: PrincipalId;
        tasks: [OnboardingTask];
    };

    public type OnboardingTask = {
        taskId: Text;
        description: Text;
        assignedTo: PrincipalId;
        dueDate: DateTime;
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
