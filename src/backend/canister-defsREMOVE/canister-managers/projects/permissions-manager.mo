import T "../../../data-types/types";
import ProjectsPermissions "../../../permissions/projects-permissions";

module {

  public class PermissionsManager() {
    public func hasPermission(principalId: T.PrincipalId, permission: ProjectsPermissions.ProjectsPermission) : Bool {
        return false; //TODO
    };

  }
};