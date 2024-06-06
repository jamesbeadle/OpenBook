import Principal "mo:base/Principal";
import Result "mo:base/Result";
import DTOs "../dtos/timesheet-dtos";
import TimesheetTypes "../data-types/timesheet-types";
import T "../data-types/types";

actor class _TimesheetsCanister() {

    public shared ({ caller }) func initialise(){

    };


    //Timesheets
    
    public shared query ({ caller }) func listTimesheets(dto: DTOs.ListTimesheets) : async Result.Result<DTOs.ListTimesheets, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getTimesheet(dto: DTOs.GetTimesheet) : async Result.Result<DTOs.GetTimesheet, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createTimesheet(dto: DTOs.CreateTimesheet) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateTimesheet(dto: DTOs.UpdateTimesheet) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteTimesheet(dto: DTOs.DeleteTimesheet) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func approveTimesheet(dto: DTOs.ApproveTimesheet) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func rejectTimesheet(dto: DTOs.RejectTimesheet) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getUserTimeReport(dto: DTOs.GetUserTimeReport) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    
};
