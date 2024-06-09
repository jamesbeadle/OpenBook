import T "../../../data-types/types";
import TimesheetsPermissions "../../../permissions/timesheets-permissions";

module {

  public class PermissionsManager() {
    public func hasPermission(principalId: T.PrincipalId, permission: TimesheetsPermissions.TimesheetsPermission) : Bool {
        return false; //TODO
    };

  }
};