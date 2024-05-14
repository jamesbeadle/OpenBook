import DTO "DTOs";
import T "data-types/types";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Profiles "profiles";
import OrganisationManager "managers/organisation-manager";

actor Self {
  
  //TODO: Add Organisational Manager stable variables
  //TODO: Add profile manager stable variables
  private stable var storageCanisterIds: [T.CanisterId] = [];
  
  //TODO: REMOVE THESE AS NOW MULTICANISTER ARCHITECTURE AFTER THEY HAVE BEEN MOVED
  private stable var stable_profiles : [(Text, T.Profile)] = [];
  private stable var stable_profilePictures : [(Text, Blob)] = [];

  private let organisationManager = OrganisationManager.OrganisationManager();
  private let profileManager = ProfileManager.ProfileManager();


  //TODO: Update all profile functions
  public shared query ({ caller }) func getProfile() : async DTO.ProfileDTO {
    let newProfile : DTO.ProfileDTO = {
      principal = "";
      username = "";
      firstName = "";
      lastName = "";
      openChatUsername = "";
      emailAddress = "";
      phoneNumber = "";
      otherContact = "";
      displayName = "";
      profession = "";
      termsAccepted = false;
      profilePicture = "";
      organisations = List.nil<DTO.OrganisationDTO>();
      createDate = 0;
      lastModified = 0;
      userDefinedWallet = "";
      preferredPaymentCurrency = 1;
    };

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {
        return newProfile;
      };
      case (?foundProfile) {
        let profilePicture = profilesInstance.getProfilePicture(foundProfile.principal);

        return {
          principal = foundProfile.principal;
          displayName = foundProfile.displayName;
          profession = foundProfile.profession;
          username = foundProfile.username;
          firstName = foundProfile.firstName;
          lastName = foundProfile.lastName;
          openChatUsername = foundProfile.openChatUsername;
          otherContact = foundProfile.otherContact;
          emailAddress = foundProfile.emailAddress;
          phoneNumber = foundProfile.phoneNumber;
          termsAccepted = foundProfile.termsAccepted;
          profilePicture = profilePicture;
          organisations = List.nil<T.Organisation>();
          createDate = foundProfile.createDate;
          lastModified = foundProfile.lastModified;
          userDefinedWallet = foundProfile.userDefinedWallet;
          preferredPaymentCurrency = foundProfile.preferredPaymentCurrency;
        };
      };
    };
  };

  public shared ({ caller }) func createProfile(profileDTO : DTO.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {

        if (not profilesInstance.isDisplayNameValid(profileDTO.displayName)) {
          return #err(#InvalidData);
        };

        if (not profilesInstance.isUsernameValid(profileDTO.username)) {
          return #err(#InvalidData);
        };

        if (Text.size(profileDTO.firstName) > 0 and not profilesInstance.isNameValid(profileDTO.firstName)) {
          return #err(#InvalidData);
        };

        if (not profilesInstance.isNameValid(profileDTO.lastName)) {
          return #err(#InvalidData);
        };

        if (not profilesInstance.isProfessionValid(profileDTO.profession)) {
          return #err(#InvalidData);
        };

        profilesInstance.createProfile(Principal.toText(caller), profileDTO.displayName, profileDTO.username, profileDTO.firstName, profileDTO.lastName, profileDTO.profession);
        return #ok(());
      };
      case (_) {
        return #ok(());
      };
    };
  };

  public shared ({ caller }) func updateProfileDetail(updatedProfile : DTO.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {
        if (updatedProfile.username != foundProfile.username) {
          let invalidUsername = not profilesInstance.isUsernameValid(updatedProfile.username);
          assert not invalidUsername;
        };

        if (updatedProfile.displayName != foundProfile.displayName) {
          let invalidDisplayName = not profilesInstance.isDisplayNameValid(updatedProfile.displayName);
          assert not invalidDisplayName;
        };

        if (updatedProfile.firstName != foundProfile.firstName) {
          var invalidFirstName = false;
          if (Text.size(updatedProfile.firstName) > 0) {
            invalidFirstName := not profilesInstance.isNameValid(updatedProfile.firstName);
          };
          assert not invalidFirstName;
        };

        if (updatedProfile.lastName != foundProfile.lastName) {
          let invalidLastName = not profilesInstance.isNameValid(updatedProfile.lastName);
          assert not invalidLastName;
        };

        if (updatedProfile.openChatUsername != foundProfile.openChatUsername) {
          var invalidOpenChatUsername = false;
          if (Text.size(updatedProfile.openChatUsername) > 0) {
            invalidOpenChatUsername := not profilesInstance.isOpenChatUsernameValid(updatedProfile.openChatUsername);
          };
          assert not invalidOpenChatUsername;
        };

        if (updatedProfile.emailAddress != foundProfile.emailAddress) {
          var invalidEmail = false;
          if (Text.size(updatedProfile.emailAddress) > 0) {
            invalidEmail := not profilesInstance.isEmailValid(updatedProfile.emailAddress);
          };
          assert not invalidEmail;
        };

        if (updatedProfile.phoneNumber != foundProfile.phoneNumber) {
          var invalidPhone = false;
          if (Text.size(updatedProfile.phoneNumber) > 0) {
            invalidPhone := not profilesInstance.isPhoneValid(updatedProfile.phoneNumber);
          };
          assert not invalidPhone;
        };

        if (updatedProfile.otherContact != foundProfile.otherContact) {
          var invalidOtherContact = false;
          if (Text.size(updatedProfile.otherContact) > 0) {
            invalidOtherContact := not profilesInstance.isOtherContactValid(updatedProfile.otherContact);
          };
          assert not invalidOtherContact;
        };

        return profilesInstance.updateProfileDetail(Principal.toText(caller), updatedProfile);
      };
    };
  };

  public shared func isUsernameAvailable(username : Text) : async Bool {
    return profilesInstance.isUsernameAvailable(username);
  };

  public shared ({ caller }) func updateProfilePicture(updatedProfilePicture : Blob) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {
        return profilesInstance.updateProfilePicture(Principal.toText(caller), updatedProfilePicture);
      };
    };
  };

  public shared query func getProfiles(usernameFilter : Text, firstNameFilter : Text, lastNameFilter : Text, professionFilter : Text, currentPage : Int, startFilter : Text) : async DTO.DirectoryDTO {
    let fetchedProfiles = profilesInstance.fetchProfiles(usernameFilter, firstNameFilter, lastNameFilter, professionFilter, currentPage, 25, startFilter);
    let totalEntries = profilesInstance.countProfiles(usernameFilter, firstNameFilter, lastNameFilter, professionFilter, startFilter);

    let directoryDTO : DTO.DirectoryDTO = {
      profiles = fetchedProfiles;
      totalEntries = totalEntries;
      currentPage = currentPage;
    };
    return directoryDTO;
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
    
    let isOrganisationAdmin = organisationManager.isOrganisationAdmin(principalId, dto.organisationId);
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
    
    let isOrganisationAdmin = organisationManager.isOrganisationAdmin(principalId, dto.organisationId);
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
