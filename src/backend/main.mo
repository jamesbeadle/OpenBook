import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

import PDTOs "dtos/profile-dtos";
import ODTOs "dtos/organisation-dtos";

import OT "data-types/old-types";
import T "data-types/types";
import OrgT "data-types/organisation-types";

import OrganisationManager "managers/organisation-manager";
import ProfileManager "managers/profile-manager";
import TreasuryManager "managers/treasury-manager";

actor Self {
  
  private let organisationManager = OrganisationManager.OrganisationManager();
  private let profileManager = ProfileManager.ProfileManager();
  private let treasuryManager = TreasuryManager.TreasuryManager();

  public shared query func listProfiles(dto: PDTOs.ListProfilesFiltersDTO) : async Result.Result<PDTOs.ProfilesListDTO, T.Error> {
    return profileManager.listProfiles(dto);
  };

  public shared ({ caller }) func createProfile(dto : PDTOs.CreateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    let profileExists = profileManager.profileExists(principalId);
    if(profileExists){
      return #err(#AlreadyExists);
    };

    return await profileManager.createProfile(dto);
  };

  public shared ({ caller }) func getProfile() : async ?PDTOs.ProfileDTO {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    return await profileManager.getProfile(principalId);
  };

  public shared ({ caller }) func updateProfileDetail(dto : PDTOs.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let profileExists = profileManager.profileExists(principalId);
    if(not profileExists){
      return #err(#NotFound);
    };
    
    return profileManager.updateProfileDetail(principalId, dto);
  };

  public shared ({ caller }) func updateProfilePicture(dto: PDTOs.UpdateProfilePictureDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let profileExists = profileManager.profileExists(principalId);
    if(not profileExists){
      return #err(#NotFound);
    };

    return profileManager.updateProfilePicture(principalId, dto);
  };

  public shared ({ caller }) func isUsernameAvailable(username : Text) : async Result.Result<Bool, T.Error> {
    assert not Principal.isAnonymous(caller);
    return #ok(profileManager.isUsernameAvailable(username));
  };


  //Organisation Functions

  public shared ({ caller }) func createOrganisation(dto: ODTOs.CreateOrganisationDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    let canAffordFee = await treasuryManager.canAffordOrganisation(Principal.fromActor(Self), principalId);
    if(not canAffordFee){
      return #err(#NotEnoughFunds)
    };
    await treasuryManager.purchaseOrganisation(Principal.fromActor(Self), principalId);
    await organisationManager.createOrganisation(principalId, dto);
  };

  public shared ({ caller }) func getUserOrganisations(dto: ODTOs.GetUserOrganisationsDTO) : async Result.Result<ODTOs.UserOrganisationsDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await organisationManager.getUserOrganisations(principalId, dto);
  };

  public shared ({ caller }) func getOrganisation(dto: ODTOs.GetOrganisationDTO) : async Result.Result<ODTOs.OrganisationDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await organisationManager.getOrganisation(principalId, dto);
  };

  public shared ({ caller }) func updateOrganisationDetail(dto: ODTOs.UpdateOrganisationDetailDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await organisationManager.updateOrganisationDetail(principalId, dto);
  };

  public shared ({ caller }) func deleteOrganisation(dto: ODTOs.DeleteOrganisationDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await organisationManager.deleteOrganisation(principalId, dto);
  };

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
