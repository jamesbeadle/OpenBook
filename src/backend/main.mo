import Blob "mo:base/Blob";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

import PD "dtos/profile-dtos";
import OD "dtos/organisation-dtos";
import SD "dtos/sales-dtos";
import RD "dtos/recruitment-dtos";
import TD "dtos/task-dtos";

import OT "data-types/old-types";
import T "data-types/types";

import OrganisationManager "managers/organisation-manager";
import ProfileManager "managers/profile-manager";

actor Self {
  private stable var stable_organisation_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_map: [(T.PrincipalId, T.CanisterId)] = [];
  private stable var stable_storage_canister_ids: [T.CanisterId] = [];
  
  private let organisationManager = OrganisationManager.OrganisationManager();
  private let profileManager = ProfileManager.ProfileManager();

  public shared query func listProfiles(dto: PD.ListProfilesFiltersDTO) : async Result.Result<PD.ProfilesListDTO, T.Error> {
    return profileManager.listProfiles(dto);
  };

  public shared ({ caller }) func createProfile(dto : PD.CreateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    let existingProfile = profileManager.profileExists(principalId);
    if(profileExists){
      return #err(#AlreadyExists);
    };

    return await profileManager.createProfile(dto);
  };

  public shared query ({ caller }) func getProfile() : async PD.ProfileDTO {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    return profileManager.getProfile(principalId);
  };

  public shared ({ caller }) func updateProfileDetail(dto : PD.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    return profileManager.updateProfile(principalId, dto);
  };

  public shared ({ caller }) func updateProfilePicture(dto : PD.UpdateProfilePictureDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let existingProfile = profileManager.profileExists(principalId);
    if(not profileExists){
      return #err(#NotFound);
    };

    return profilesInstance.updateProfilePicture(principalId, dto);
  };

  public shared ({ caller }) func isUsernameAvailable(username : Text) : Result.Result<Bool, T.Error> {
    assert not Principal.isAnonymous(caller);
    return profilesInstance.isUsernameAvailable(username);
  };


  //Organisation Functions

  public shared ({ caller }) func createOrganisation(dto: DTOs.CreateOrganisationDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(principalId);
    let canAffordFee = treasuryManager.canAffordOrganisation(principalId);
    if(not canAffordFee){
      return #err(#NotEnoughFunds)
    };
    await treasuryManager.purchaseOrganisation(principalId);
    await organisationManager.createOrganisation(principalId, dto);
  };


  public shared ({ caller }) func purchaseService(dto: DTOs.PurchaseServiceDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(principalId);
    
    let isOrganisationAdmin = organisationManager.isOrganisationAdmin(principalId, DTOs.organisationId);
    if(not isOrganisationAdmin){
      return #err(#NotAllowed);
    };
    
    let canAffordFee = organisationManager.canAffordService(principalId, dto);
    if(not canAffordFee){
      return #err(#NotEnoughFunds)
    };
    
    await treasuryManager.purchaseService(principalId, dto);
    await organisationManager.addService(principalId, dto);
  };

  public shared ({ caller }) func cancelService(dto: DTOs.CancelServiceDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(principalId);
    
    let isOrganisationAdmin = organisationManager.isOrganisationAdmin(principalId, DTOs.organisationId);
    if(not isOrganisationAdmin){
      return #err(#NotAllowed);
    };
    
    await organisationManager.removeService(principalId, dto);
  };

  //TODO: Implement storage functions CRUD

  //TODO: Implement cycles checking when implemented on OpenFPL


  //sales
    //add client
    //add lead
    //add contact
    //convert lead


  //accounts
    //add transaction
    //get report


  //recruitment
    //add cv
    //add job
    //

  //timesheet management
    //add time sheet
    //add employee

  //Task Management

  public shared ({ caller }) func sendInvite(dto: DTOs.SendInviteDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func unsendInvite(dto: DTOs.UnsendInviteDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectMember(dto: DTOs.RemoveMemberDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addProjectLink(dto: DTOs.AddProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectLink(dto: DTOs.UpdateProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectLink(dto: DTOs.RemoveProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addProjectStage(dto: DTOs.AddProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectStage(dto: DTOs.AddProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectStage(dto: DTOs.RemoveProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectDetails(dto: DTOs.UpdateProjectDetailsDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectStatus(dto: DTOs.UpdateProjectStatusDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addStageMilestone(dto: DTOs.AddStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateStageMilestone(dto: DTOs.UpdateStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeStageMilestone(dto: DTOs.AddStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addMilestoneTask(dto: DTOs.AddMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateMilestoneTask(dto: DTOs.UpdateMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeMilestoneTask(dto: DTOs.RemoveMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addTaskComment(dto: DTOs.AddTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateTaskComment(dto: DTOs.AddTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func deleteTaskComment(dto: DTOs.DeleteTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  //storage functions




  //Create an organisation
    //services will be charged per month
      //need to check that the orgisations bill is paid
      //what are the services areas
        //TaskManagement
        //Sales
        //Accounts
        //HR
        

  //Create a project
  //Add a project stage
  //Invite a member to a project 
  //Add a link to a project
  //Add a milestone to a project stage
  //Add a task to a project milestone
  //Add a comment to a task
  //Update the project status if allowed
  //Update the project priority if allowed













  //December 2023 initial profile launch
  //TODO: REMOVE THESE AS NOW MULTICANISTER ARCHITECTURE AFTER THEY HAVE BEEN MOVED
  
  private stable var stable_profiles : [(Text, OT.Profile)] = [];
  private stable var stable_profilePictures : [(Text, Blob)] = [];

  public func transferProfiles(){
    //TODO
    //transfer the profiles into the profile canister architecture using profile picture blob storage
  };




  //Stable Variables

  system func preupgrade() {
    stable_profiles := profilesInstance.getProfiles();
    stable_profilePictures := profilesInstance.getProfilePictures();
  };

  system func postupgrade() {
    profilesInstance.setData(stable_profiles, stable_profilePictures);

    //TODO: Trigger timer function to transfer existing profiles to new profile data structure

  };
};
