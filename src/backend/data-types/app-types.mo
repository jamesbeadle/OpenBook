import Ids "mo:waterway-mops/Ids";
import AppEnums "../enums/app-enums";
import AppIds "app-ids";

module AppTypes {

  public type Address = {
    id : AppIds.AddressId;
    addressName : Text;
    addressLines : [Text];
    lastModified : Int;
  };

  public type Contact = {
    id : AppIds.ContactId;
    firstName : Text;
    lastName : Text;
    email : Text;
    addressId : AppIds.AddressId;
    jobTitle : Text;
    lastModified : Int;
  };

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

  public type AuditRecord = {
    changeType : AppEnums.ChangeType;
    timestamp : Int64;
    visibilityLevel : AppEnums.VisibilityLevel;
  };


};
