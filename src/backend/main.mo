import Blob "mo:base/Blob";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

import PD "dtos/profile-dtos";
import OD "dtos/organisation-dtos";

import OT "data-types/old-types";
import T "data-types/types";
import OrgT "data-types/organisation-types";

import OrganisationManager "managers/organisation-manager";
import ProfileManager "managers/profile-manager";

actor Self {
  
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

  public shared ({ caller }) func isUsernameAvailable(username : Text) : async Result.Result<Bool, T.Error> {
    assert not Principal.isAnonymous(caller);
    return profilesInstance.isUsernameAvailable(username);
  };


  //Organisation Functions

  public shared ({ caller }) func createOrganisation(dto: OD.CreateOrganisationDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(principalId);
    let canAffordFee = treasuryManager.canAffordOrganisation(principalId);
    if(not canAffordFee){
      return #err(#NotEnoughFunds)
    };
    await treasuryManager.purchaseOrganisation(principalId);
    await organisationManager.createOrganisation(principalId, dto);
  };

  //get user ogranisations

  //get organisation

  //update organisation detail

  //delete organisation

  //storage functions

  //Create an organisation
    //services will be charged per month
      //need to check that the orgisations bill is paid
      //what are the services areas
        //TaskManagement
        //Sales
        //Accounts
        //HR
        




  //December 2023 initial profile launch
  //TODO: REMOVE THESE AS NOW MULTICANISTER ARCHITECTURE AFTER THEY HAVE BEEN MOVED
  
  private stable var stable_profiles : [(Text, OT.Profile)] = [];
  private stable var stable_profilePictures : [(Text, Blob)] = [];

  public func transferProfiles(){
    //TODO
    //transfer the profiles into the profile canister architecture using profile picture blob storage
  };


  //TODO: Implement cycles checking when implemented on OpenFPL


  //Stable Variables
  private stable var stable_organisation_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_map: [(T.PrincipalId, T.CanisterId)] = [];
  private stable var stable_storage_canister_ids: [T.CanisterId] = [];
  private stable var stable_public_profiles: [OrgT.PublicProfile] = [];

  system func preupgrade() {
  };

  system func postupgrade() {
    //TODO: Trigger timer function to transfer existing profiles to new profile data structure
  };
};
