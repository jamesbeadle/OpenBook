import T "../../../data-types/types";
import SalesPermissions "../../../permissions/sales-permissions";

module {

  public class PermissionsManager() {
    public func hasPermission(principalId: T.PrincipalId, permission: SalesPermissions.SalesPermission) : Bool {
        return false; //TODO
    };

  }
};