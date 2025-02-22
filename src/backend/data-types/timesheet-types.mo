
import Base "mo:waterway-mops/BaseTypes";

module TimesheetTypes {

    public type Timesheet = {
        entries: [TimesheetEntry];
    };

    public type TimesheetEntry = {
        staffMemberId: Base.PrincipalId;
        index: Nat;
        startTime: Int;
        endTime: Int;
    };

};