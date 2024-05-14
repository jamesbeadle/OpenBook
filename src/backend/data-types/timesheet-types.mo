
import T "types";

module TimesheetTypes {

    public type Timesheet = {
        entries: [TimesheetEntry];
    };

    public type TimesheetEntry = {
        staffMemberId: T.PrincipalId;
        index: Nat;
        startTime: Int;
        endTime: Int;
    };

};