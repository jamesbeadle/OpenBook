import Ids "mo:waterway-mops/Ids";

module AppTypes {

  public type TargetDates = {
    targetStartDate: ?Int;
    targetEndDate: ?Int;
    startDate: ?Int;
    endDate: ?Int;
  };

  public type Metadata = {
    createdBy: Ids.PrincipalId;
    createdOn: Int;
    lastUpdatedBy: ?Ids.PrincipalId;
    lastUpdatedOn: ?Int;
  };


};
