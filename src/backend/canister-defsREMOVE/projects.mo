import Principal "mo:base/Principal";
import Result "mo:base/Result";
import DTOs "../dtos/projects-dtos";
import T "../data-types/types";
import PermissionsManager "./canister-managers/projects/permissions-manager";
import ProjectsManager "./canister-managers/projects/projects-manager";
import ProjectsPermissions "../permissions/projects-permissions";

actor class _ProjectsCanister() {

    private let projectsManager = ProjectsManager.ProjectsManager();
    private let permissionsManager = PermissionsManager.PermissionsManager();

    public shared ({ caller }) func initialise(){}; //TODO

    //Projects
    
    public shared query ({ caller }) func listProjects(dto: DTOs.ListProjects) : async Result.Result<DTOs.ListProjects, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListProjects);
        return projectsManager.listProjects(dto);
    };

    public shared query ({ caller }) func getProject(dto: DTOs.GetProject) : async Result.Result<DTOs.GetProject, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetProject);
        return projectsManager.getProject(dto);
    };

    public shared ({ caller }) func createProject(dto: DTOs.CreateProject) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateProject);
        return projectsManager.createProject(dto);
    };

    public shared ({ caller }) func updateProject(dto: DTOs.UpdateProject) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateProject);
        return projectsManager.updateProject(dto);
    };

    public shared ({ caller }) func deleteProject(dto: DTOs.DeleteProject) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteProject);
        return projectsManager.deleteProject(dto);
    };

    //Project Membership

    public shared ({ caller }) func setProjectManager(dto: DTOs.SetProjectManager) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #SetProjectManager);
        return projectsManager.setProjectManager(dto);
    };

    public shared ({ caller }) func setStageManager(dto: DTOs.SetStageManager) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #SetStageManager);
        return projectsManager.setStageManager(dto);
    };

    public shared ({ caller }) func setMilestoneManager(dto: DTOs.SetMilestoneManager) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #SetMilestoneManager);
        return projectsManager.setMilestoneManager(dto);
    };
    
    public shared query ({ caller }) func listMembers(dto: DTOs.ListMembers) : async Result.Result<DTOs.ListProjects, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListMembers);
        return projectsManager.listMembers(dto);
    };

    public shared ({ caller }) func inviteMember(dto: DTOs.InviteMember) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #InviteMember);
        return projectsManager.inviteMember(dto);
    };

    public shared ({ caller }) func removeMember(dto: DTOs.RemoveMember) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #RemoveMember);
        return projectsManager.removeMember(dto);
    };

    //Project Links

    public shared query ({ caller }) func listLinks(dto: DTOs.ListLinks) : async Result.Result<DTOs.ListProjects, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListLinks);
        return projectsManager.listLinks(dto);
    };

    public shared query ({ caller }) func getLink(dto: DTOs.GetLink) : async Result.Result<DTOs.GetProject, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetLink);
        return projectsManager.getLink(dto);
    };

    public shared ({ caller }) func createLink(dto: DTOs.CreateLink) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateLink);
        return projectsManager.createLink(dto);
    };

    public shared ({ caller }) func updateLink(dto: DTOs.UpdateLink) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateLink);
        return projectsManager.updateLink(dto);
    };

    public shared ({ caller }) func deleteLink(dto: DTOs.DeleteLink) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteLink);
        return projectsManager.deleteLink(dto);
    };

    //Project Stages

    public shared query ({ caller }) func listStages(dto: DTOs.ListStages) : async Result.Result<DTOs.ListProjects, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListStages);
        return projectsManager.listStages(dto);
    };

    public shared query ({ caller }) func getStage(dto: DTOs.GetStage) : async Result.Result<DTOs.GetProject, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetStage);
        return projectsManager.getStage(dto);
    };

    public shared ({ caller }) func createStage(dto: DTOs.CreateStage) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateStage);
        return projectsManager.createStage(dto);
    };

    public shared ({ caller }) func updateStage(dto: DTOs.UpdateStage) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateStage);
        return projectsManager.updateStage(dto);
    };

    public shared ({ caller }) func deleteStage(dto: DTOs.DeleteStage) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteStage);
        return projectsManager.deleteStage(dto);
    };

    //Project Milestones

    public shared query ({ caller }) func listMilestones(dto: DTOs.ListMilestones) : async Result.Result<DTOs.ListProjects, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListMilestones);
        return projectsManager.listMilestones(dto);
    };

    public shared query ({ caller }) func getMilestone(dto: DTOs.GetMilestone) : async Result.Result<DTOs.GetProject, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetMilestone);
        return projectsManager.getMilestone(dto);
    };

    public shared ({ caller }) func createMilestone(dto: DTOs.CreateMilestone) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateMilestone);
        return projectsManager.createMilestone(dto);
    };

    public shared ({ caller }) func updateMilestone(dto: DTOs.UpdateMilestone) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateMilestone);
        return projectsManager.updateMilestone(dto);
    };

    public shared ({ caller }) func deleteMilestone(dto: DTOs.DeleteMilestone) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteMilestone);
        return projectsManager.deleteMilestone(dto);
    };

    //Project Tasks

    public shared query ({ caller }) func listTasks(dto: DTOs.ListTasks) : async Result.Result<DTOs.ListProjects, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListTasks);
        return projectsManager.listTasks(dto);
    };

    public shared query ({ caller }) func getTask(dto: DTOs.GetTask) : async Result.Result<DTOs.GetProject, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetTask);
        return projectsManager.getTask(dto);
    };

    public shared ({ caller }) func createTask(dto: DTOs.CreateTask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateTask);
        return projectsManager.createTask(dto);
    };

    public shared ({ caller }) func updateTask(dto: DTOs.UpdateTask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateTask);
        return projectsManager.updateTask(dto);
    };

    public shared ({ caller }) func deleteTask(dto: DTOs.DeleteTask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteTask);
        return projectsManager.deleteTask(dto);
    };

    public shared ({ caller }) func assignTask(dto: DTOs.AssignTask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #AssignTask);
        return projectsManager.assignTask(dto);
    };

    public shared ({ caller }) func unassignTask(dto: DTOs.UnassignTask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UnassignTask);
        return projectsManager.unassignTask(dto);
    };


    //Attachments

    public shared ({ caller }) func getProjectAttachment(dto: DTOs.GetProjectAttachment) : async Result.Result<DTOs.GetProjectAttachment, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetProjectAttachment);
        return projectsManager.getProjectAttachment(dto);
    };

    public shared ({ caller }) func uploadProjectAttachment(dto: DTOs.UploadProjectAttachment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UploadProjectAttachment);
        return projectsManager.uploadProjectAttachment(dto);
    };

    public shared ({ caller }) func deleteProjectAttachment(dto: DTOs.DeleteProjectAttachment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteProjectAttachment);
        return projectsManager.deleteProjectAttachment(dto);
    };

    public shared ({ caller }) func getMilestoneAttachment(dto: DTOs.GetMilestoneAttachment) : async Result.Result<DTOs.GetMilestoneAttachment, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetMilestoneAttachment);
        return projectsManager.getMilestoneAttachment(dto);
    };

    public shared ({ caller }) func uploadMilestoneAttachment(dto: DTOs.UploadMilestoneAttachment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UploadMilestoneAttachment);
        return projectsManager.uploadMilestoneAttachment(dto);
    };

    public shared ({ caller }) func deleteMilestoneAttachment(dto: DTOs.DeleteMilestoneAttachment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteMilestoneAttachment);
        return projectsManager.deleteMilestoneAttachment(dto);
    };

    public shared ({ caller }) func getTaskAttachment(dto: DTOs.GetTaskAttachment) : async Result.Result<DTOs.GetTaskAttachment, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetTaskAttachment);
        return projectsManager.getTaskAttachment(dto);
    };

    public shared ({ caller }) func uploadTaskAttachment(dto: DTOs.UploadTaskAttachment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UploadTaskAttachment);
        return projectsManager.uploadTaskAttachment(dto);
    };

    public shared ({ caller }) func deleteTaskAttachment(dto: DTOs.DeleteTaskAttachment) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteTaskAttachment);
        return projectsManager.deleteTaskAttachment(dto);
    };

    //Subtasks

    public shared query ({ caller }) func listSubtasks(dto: DTOs.ListSubtasks) : async Result.Result<DTOs.ListProjects, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #ListSubtasks);
        return projectsManager.listSubtasks(dto);
    };

    public shared query ({ caller }) func getSubtask(dto: DTOs.GetSubtask) : async Result.Result<DTOs.GetProject, T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #GetSubtask);
        return projectsManager.getSubtask(dto);
    };

    public shared ({ caller }) func createSubtask(dto: DTOs.CreateSubtask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #CreateSubtask);
        return projectsManager.createSubtask(dto);
    };

    public shared ({ caller }) func updateSubtask(dto: DTOs.UpdateSubtask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UpdateSubtask);
        return projectsManager.updateSubtask(dto);
    };

    public shared ({ caller }) func deleteSubtask(dto: DTOs.DeleteSubtask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #DeleteSubtask);
        return projectsManager.deleteSubtask(dto);
    };

    public shared ({ caller }) func assignSubtask(dto: DTOs.AssignSubtask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #AssignSubtask);
        return projectsManager.assignSubtask(dto);
    };

    public shared ({ caller }) func unassignSubtask(dto: DTOs.UnassignSubtask) : async Result.Result<(), T.Error>{
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert hasPermission(principalId, #UnassignSubtask);
        return projectsManager.unassignSubtask(dto);
    };

    private func hasPermission(principalId: T.PrincipalId, permission: ProjectsPermissions.ProjectsPermission) : Bool {
        return permissionsManager.hasPermission(principalId, permission);
    };
    
};
