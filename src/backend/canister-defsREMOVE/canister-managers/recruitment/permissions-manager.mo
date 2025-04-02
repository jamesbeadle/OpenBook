import T "../../../data-types/types";
import JobPermissions "../../../permissions/job-permissions";

module {

  public class PermissionsManager() {
    public func hasPermission(principalId: T.PrincipalId, permission: JobPermissions.JobPermission) : Bool {
        return false; //TODO
    };

  }
};