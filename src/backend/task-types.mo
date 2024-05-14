import T "types";
module TaskTypes {

    public type Task = {
        id: Nat16;
        title: Text;
        description: Text;
        status: Status;
        visibility: Visibility;
        history: [TaskChangeEvent];
        milestones: [Milestone];
        comments: [Comment];
        tags: [Text];
        startDate: Int;
        endDate: Int;
    };

    public type Status = {
        #Draft;
        #New;
        #InProgress;
        #Blocked;
        #OnHold;
        #Testing;
        #Complete;
    };

    public type Visibility = {
        #Private;
        #Public;
    };

    public type TaskChangeEvent = {
        changeTime: Int;
        changeType: ChangeType;
        updateUserId: T.PrincipalId;
    };

    public type ChangeType = {
        #UpdateStatus;
        #UpdateVisibility;
    };

    public type Milestone = {
        id: Nat16;
        title: Text;
        startDate: Int;
        endDate: Int;
    };

    public type Comment = {
        userId: T.PrincipalId;
        detail: Text;
        date: Int;
    };


};