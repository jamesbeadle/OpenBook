import T "../../../data-types/types";
import RecruitmentPermissions "../../../permissions/recruitment-permissions";

module {

  public class PermissionsManager() {
    public func hasPermission(principalId: T.PrincipalId, permission: RecruitmentPermissions.RecruitmentPermission) : Bool {
        return false; //TODO
    };

  }
};