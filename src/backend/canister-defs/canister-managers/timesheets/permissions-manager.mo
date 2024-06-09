import T "../../../data-types/types";
import AccountancyPermissions "../../../permissions/accountancy-permissions";

module {

  public class PermissionsManager() {
    public func hasPermission(principalId: T.PrincipalId, permission: AccountancyPermissions.AccountancyPermission) : Bool {
        return false; //TODO
    };

  }
};