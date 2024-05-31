import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import T_Old "data-types/old-types";
import ProfileDTOs "dtos/profile-dtos";
import OrganisationDTOs "dtos/organisation-dtos";
import PresaleManager "managers/presale-manager";
import ProfileManager "managers/profile-manager";
import TreasuryManager "managers/treasury-manager";

actor Self {
  
  private let profileManager = ProfileManager.ProfileManager();
  private let treasuryManager = TreasuryManager.TreasuryManager();
  private let presaleManager = PresaleManager.PresaleManager();
  
  public shared ({ caller }) func createProfile(dto : PDTOs.CreateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    let profileExists = profileManager.profileExists(principalId);
    if(profileExists){
      return #err(#AlreadyExists);
    };

    return await profileManager.createProfile(dto);
  };

  public shared ({ caller }) func getProfile() : async Result.Result<PDTOs.ProfileDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    return await profileManager.getProfile(principalId);
  };

  public shared ({ caller }) func updateProfile(dto : PDTOs.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let profileExists = profileManager.profileExists(principalId);
    if(not profileExists){
      return #err(#NotFound);
    };
    
    return profileManager.updateProfile(principalId, dto);
  };
  
  public shared ({ caller }) func deleteProfile(dto : PDTOs.DeleteProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    assert dto.principalId == principalId;

    let profileExists = profileManager.profileExists(principalId);
    if(not profileExists){
      return #err(#NotFound);
    };
    
    return profileManager.deleteProfile(principalId);
  };

  public shared ({ caller }) func isUsernameAvailable(username : Text) : async Result.Result<Bool, T.Error> {
    assert not Principal.isAnonymous(caller);
    return #ok(profileManager.isUsernameAvailable(username));
  };

  public shared ({ caller }) func purchaseOrganisation(dto: ODTOs.CreateOrganisationDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let purchaseResult = await treasuryManager.purchaseOrganisation(Principal.fromActor(Self), principalId);

    switch(purchaseResult){
      case (#ok result){
        return await profileManager.createOrganisation(principalId, dto);
      };
      case (#err err_result){
        return err_result;
      }
    };
  };

  public shared ({ caller }) func deleteOrganisation(dto: OrganisationDTOs.DeleteOrganisationDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    return organisationManager.deleteOrganisation(dto.organisationId, principalId);


    
    //delete the organisation from every users organiastion list
    //delete the organisation from the organisation list
    //delete all the organisation canisters
      //transfer all cycles back to the main cycles wallet
  };

  public shared ({ caller }) func isOrganisationNameAvailable(organisationName : Text) : async Result.Result<Bool, T.Error> {
    assert not Principal.isAnonymous(caller);
    return #ok(organisationManager.isOrganisationNameAvailable(username));
  };

  public shared ({ caller }) func acceptOrganisationInvitation() : async Result.Result<(), T.Error> {

  };

  public shared ({ caller }) func rejectOrganisationInvitation() : async Result.Result<(), T.Error> {

  };

  public shared ({ caller }) func requestOrganisationAccess() : async Result.Result<(), T.Error> {

  };

  public shared ({ caller }) func leaveOrganiastion() : async Result.Result<(), T.Error> {

  };
  













  //Admin functions

  public shared func listOGProfiles() : async Result.Result<[(T.PrincipalId, OT.Profile)], T.Error>{
    return #ok(stable_profiles);
  };

  public func transferOGProfiles(){
    //TODO
    //transfer the profiles into the profile canister architecture using profile picture blob storage
  };
  
  //December 2023 initial profile launch
  //TODO: REMOVE THESE AS NOW MULTICANISTER ARCHITECTURE AFTER THEY HAVE BEEN MOVED
  
  private stable var stable_profiles : [(Text, OT.Profile)] = [];
  private stable var stable_profilePictures : [(Text, Blob)] = [];

  //TODO: Implement cycles checking when implemented on OpenFPL

  //Stable Variables
  private stable var stable_organisation_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_map: [(T.PrincipalId, T.CanisterId)] = [];
  private stable var stable_storage_canister_ids: [T.CanisterId] = [];
  private stable var stable_public_profiles: [OrgT.PublicProfile] = [];

  private stable var unique_usernames : [(T.PrincipalId, Text)] = [];
  private stable var unique_organisation_names : [(T.PrincipalId, Text)] = [];


  system func preupgrade() {
    unique_usernames := profileManager.getStableUniqueUsernames();
    unique_organisation_names := organisationManager.getStableUniqueOrganisationNames();
  };

  system func postupgrade() {
    profileManager.setStableUniqueUsernames(unique_usernames);
    organisationManager.setStableUniqueOrganisationNames(unique_organisation_names);
  };
  

  //OpenBook presale information

  public shared ({ caller }) func participateInPresale(icpAmount: Nat64) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    if(icpAmount >= 0.01){
      return #err(#NotEnoughFunds);
    };

    let scaledAmount = icpAmount * 10000;

    if (scaledAmount % 5 != 0) {
      return #err(#InvalidData);
    };

    let purchaseResult = await treasuryManager.participateInPresale(Principal.fromActor(Self), principalId, icpAmount);

    switch(purchaseResult){
      case (#ok result){  
        presaleManager.participateInPresale(principalId, icpAmount);
      };
      case (#err err_result){
        return err_result;
      }
    };
  };

  public shared ({ caller }) func getPresaleParticipation() : async [T.PresaleParticipation] {
    
  };
};
