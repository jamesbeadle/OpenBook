import Principal "mo:base/Principal";
import Result "mo:base/Result";
import DTOs "../dtos/projects-dtos";
import T "../data-types/types";

actor class _ProjectsCanister() {

    public shared ({ caller }) func initialise(){

    };

    //Projects
    
    public shared query ({ caller }) func listProjects(dto: DTOs.ListProjects) : async Result.Result<DTOs.ListProjects, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getProject(dto: DTOs.GetProject) : async Result.Result<DTOs.GetProject, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createProject(dto: DTOs.CreateProject) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateProject(dto: DTOs.UpdateProject) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteProject(dto: DTOs.DeleteProject) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Project Membership

    public shared ({ caller }) func setProjectManager(dto: DTOs.SetProjectManager) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func setStageManager(dto: DTOs.SetStageManager) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func setMilestoneManager(dto: DTOs.SetMilestoneManager) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
    public shared query ({ caller }) func listMembers(dto: DTOs.ListMembers) : async Result.Result<DTOs.ListProjects, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared ({ caller }) func inviteMember(dto: DTOs.InviteMember) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func removeMember(dto: DTOs.RemoveMember) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Project Links

    public shared query ({ caller }) func listLinks(dto: DTOs.ListLinks) : async Result.Result<DTOs.ListProjects, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getLink(dto: DTOs.GetLink) : async Result.Result<DTOs.GetProject, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createLink(dto: DTOs.CreateLink) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateLink(dto: DTOs.UpdateLink) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteLink(dto: DTOs.DeleteLink) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Project Stages

    public shared query ({ caller }) func listStages(dto: DTOs.ListStages) : async Result.Result<DTOs.ListProjects, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getStage(dto: DTOs.GetStage) : async Result.Result<DTOs.GetProject, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createStage(dto: DTOs.CreateStage) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateStage(dto: DTOs.UpdateStage) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteStage(dto: DTOs.DeleteStage) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Project Milestones

    public shared query ({ caller }) func listMilestones(dto: DTOs.ListMilestones) : async Result.Result<DTOs.ListProjects, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getMilestone(dto: DTOs.GetMilestone) : async Result.Result<DTOs.GetProject, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createMilestone(dto: DTOs.CreateMilestone) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateMilestone(dto: DTOs.UpdateMilestone) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteMilestone(dto: DTOs.DeleteMilestone) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Project Tasks

    public shared query ({ caller }) func listTasks(dto: DTOs.ListTasks) : async Result.Result<DTOs.ListProjects, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getTask(dto: DTOs.GetTask) : async Result.Result<DTOs.GetProject, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createTask(dto: DTOs.CreateTask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateTask(dto: DTOs.UpdateTask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteTask(dto: DTOs.DeleteTask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func assignTask(dto: DTOs.AssignTask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func unassignTask(dto: DTOs.AnassignTask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };


    //Attachments

    public shared ({ caller }) func getProjectAttachment(dto: DTOs.GetProjectAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func uploadProjectAttachment(dto: DTOs.UploadProjectAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteProjectAttachment(dto: DTOs.DeleteProjectAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func getMilestoneAttachment(dto: DTOs.GetMilestoneAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func uploadMilestoneAttachment(dto: DTOs.UploadMilestoneAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteMilestoneAttachment(dto: DTOs.DeleteMilestoneAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func getTaskAttachment(dto: DTOs.GetTaskAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func uploadTaskAttachment(dto: DTOs.UploadTaskAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteTaskAttachment(dto: DTOs.DeleteTaskAttachment) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Subtasks

    public shared query ({ caller }) func listSubtasks(dto: DTOs.ListSubtasks) : async Result.Result<DTOs.ListProjects, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getSubtask(dto: DTOs.GetSubtask) : async Result.Result<DTOs.GetProject, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createSubtask(dto: DTOs.CreateSubtask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateSubtask(dto: DTOs.UpdateSubtask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteSubtask(dto: DTOs.DeleteSubtask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func assignSubtask(dto: DTOs.AssignSubtask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func unassignSubtask(dto: DTOs.UnassignSubtask) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };
    
};
