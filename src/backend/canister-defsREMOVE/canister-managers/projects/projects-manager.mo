import T "../../../data-types/types";
import DTOs "../../../dtos/projects-dtos";
import Result "mo:base/Result";

module {

  public class ProjectsManager() {
        public func listProjects(dto: DTOs.ListProjects) : Result.Result<DTOs.ListProjects, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getProject(dto: DTOs.GetProject) : Result.Result<DTOs.GetProject, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func createProject(dto: DTOs.CreateProject) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func updateProject(dto: DTOs.UpdateProject) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteProject(dto: DTOs.DeleteProject) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        //Project Membership

        public func setProjectManager(dto: DTOs.SetProjectManager) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func setStageManager(dto: DTOs.SetStageManager) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func setMilestoneManager(dto: DTOs.SetMilestoneManager) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };
        
        public func listMembers(dto: DTOs.ListMembers) : Result.Result<DTOs.ListProjects, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func inviteMember(dto: DTOs.InviteMember) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func removeMember(dto: DTOs.RemoveMember) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        //Project Links

        public func listLinks(dto: DTOs.ListLinks) : Result.Result<DTOs.ListLinks, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getLink(dto: DTOs.GetLink) : Result.Result<DTOs.GetLink, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func createLink(dto: DTOs.CreateLink) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func updateLink(dto: DTOs.UpdateLink) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteLink(dto: DTOs.DeleteLink) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        //Project Stages

        public func listStages(dto: DTOs.ListStages) : Result.Result<DTOs.ListStages, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getStage(dto: DTOs.GetStage) : Result.Result<DTOs.GetStage, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func createStage(dto: DTOs.CreateStage) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func updateStage(dto: DTOs.UpdateStage) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteStage(dto: DTOs.DeleteStage) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        //Project Milestones

        public func listMilestones(dto: DTOs.ListMilestones) : Result.Result<DTOs.ListMilestones, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getMilestone(dto: DTOs.GetMilestone) : Result.Result<DTOs.GetMilestone, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func createMilestone(dto: DTOs.CreateMilestone) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func updateMilestone(dto: DTOs.UpdateMilestone) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteMilestone(dto: DTOs.DeleteMilestone) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        //Project Tasks

        public func listTasks(dto: DTOs.ListTasks) : Result.Result<DTOs.ListTasks, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getTask(dto: DTOs.GetTask) : Result.Result<DTOs.GetTask, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func createTask(dto: DTOs.CreateTask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func updateTask(dto: DTOs.UpdateTask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteTask(dto: DTOs.DeleteTask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func assignTask(dto: DTOs.AssignTask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func unassignTask(dto: DTOs.UnassignTask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };


        //Attachments

        public func getProjectAttachment(dto: DTOs.GetProjectAttachment) : Result.Result<DTOs.GetProjectAttachment, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func uploadProjectAttachment(dto: DTOs.UploadProjectAttachment) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteProjectAttachment(dto: DTOs.DeleteProjectAttachment) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getMilestoneAttachment(dto: DTOs.GetMilestoneAttachment) : Result.Result<DTOs.GetMilestoneAttachment, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func uploadMilestoneAttachment(dto: DTOs.UploadMilestoneAttachment) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteMilestoneAttachment(dto: DTOs.DeleteMilestoneAttachment) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getTaskAttachment(dto: DTOs.GetTaskAttachment) : Result.Result<DTOs.GetTaskAttachment, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func uploadTaskAttachment(dto: DTOs.UploadTaskAttachment) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteTaskAttachment(dto: DTOs.DeleteTaskAttachment) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        //Subtasks

        public func listSubtasks(dto: DTOs.ListSubtasks) : Result.Result<DTOs.ListSubtasks, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getSubtask(dto: DTOs.GetSubtask) : Result.Result<DTOs.GetSubtask, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func createSubtask(dto: DTOs.CreateSubtask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func updateSubtask(dto: DTOs.UpdateSubtask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteSubtask(dto: DTOs.DeleteSubtask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func assignSubtask(dto: DTOs.AssignSubtask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func unassignSubtask(dto: DTOs.UnassignSubtask) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };
  }
};