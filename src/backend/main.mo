import Blob "mo:base/Blob";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Base "mo:waterway-mops/BaseTypes";
import T "data-types/types";
import T_Old "data-types/old-types";
import ProfileDTOs "dtos/profile-dtos";
import OrganisationDTOs "dtos/organisation-dtos";
import ProfileManager "managers/profile-manager";
import StorageManager "managers/storage-manager";
import TreasuryManager "managers/treasury-manager";
import OrganisationManager "managers/organisation-manager";
import CyclesManager "managers/cycles-manager";
import NewsFeedManager "managers/news-feed-manager";

actor Self {
  
  private let organisationManager = OrganisationManager.OrganisationManager();
  private let newsFeedManager = NewsFeedManager.NewsFeedManager();
  private let profileManager = ProfileManager.ProfileManager();
  private let treasuryManager = TreasuryManager.TreasuryManager();
  private let storageManager = StorageManager.StorageManager();
  private let cyclesManager = CyclesManager.CyclesManager();
  
  /* Profile functions */
  
  public shared ({ caller }) func createProfile(dto : ProfileDTOs.CreateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    let profileExists = profileManager.profileExists(principalId);
    if(profileExists){
      return #err(#AlreadyExists);
    };

    return await profileManager.createProfile(dto);
  };

  public shared ({ caller }) func getProfile() : async Result.Result<ProfileDTOs.ProfileDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let profile = await profileManager.getProfile(principalId);

    switch(profile){
      case (null){
        return #err(#NotFound);
      };
      case (?foundProfile){
        return #ok(foundProfile);
      }
    };
  };

  public shared ({ caller }) func updateProfile(dto : ProfileDTOs.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;

    let profileExists = profileManager.profileExists(principalId);
    if(not profileExists){
      return #err(#NotFound);
    };
    
    return await profileManager.updateProfile(dto);
  };
  
  public shared ({ caller }) func deleteProfile(deletePrincipalId: Base.PrincipalId) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    assert deletePrincipalId == principalId;

    let profileExists = profileManager.profileExists(principalId);
    if(not profileExists){
      return #err(#NotFound);
    };
    
    return await profileManager.deleteProfile(principalId);
  };

  public shared ({ caller }) func isUsernameAvailable(username : Text) : async Result.Result<Bool, T.Error> {
    assert not Principal.isAnonymous(caller);
    return #ok(profileManager.isUsernameAvailable(username));
  };

  /* Organisation functions */

  public shared ({ caller }) func purchaseOrganisation(dto: OrganisationDTOs.CreateOrganisation) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    assert dto.ownerId == principalId;

    let purchaseResult = await treasuryManager.purchaseOrganisation(Principal.fromActor(Self), principalId);

    switch(purchaseResult){
      case (#Ok result){
        //await recordPurchase(); //TODO
        let createResult = await organisationManager.createOrganisation(dto);
        switch(createResult){
          case (#ok organisationId){
            return await profileManager.addOrganisationToProfile(principalId, organisationId);
          };
          case (#err result) {
            return #err(result);
          };
        };
      };
      case (#Err err_result){
        return #err(#PaymentError);
      }
    };
  };

  public shared ({ caller }) func deleteOrganisation(dto: OrganisationDTOs.DeleteOrganisation) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.confirmDelete;

    let organisation = await organisationManager.getOrganisation(dto.organisationId);

    switch(organisation){
      case (null){
        return #err(#NotFound);
      };
      case (?foundOrganisation){
        assert foundOrganisation.ownerId == principalId;

        for(member in Iter.fromArray(foundOrganisation.members)){
          let _ = await profileManager.leaveOrganisation(foundOrganisation.id, member.principalId);
        };
        
        return await organisationManager.deleteOrganisation(dto.organisationId);
      };
    };
  };

  //TODO: Topup cycles

  public shared ({ caller }) func isOrganisationNameAvailable(organisationName : Text) : async Result.Result<Bool, T.Error> {
    assert not Principal.isAnonymous(caller);
    return #ok(organisationManager.isOrganisationNameAvailable(organisationName));
  };
    
  /* Canister maintenance functions */

  public shared ({ caller }) func requestCanisterTopup(cycles: Nat) : async () {
    Debug.print("IMPORTANT: External canister just requested topup");
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    await cyclesManager.requestCanisterTopup(principalId, cycles);
  };
  
  //TODO: Stable Variables
  private stable var stable_topups : [T.CanisterTopup] = [];
  private stable var stable_organisation_canister_ids: [Base.CanisterId] = [];
  private stable var stable_profile_canister_ids: [Base.CanisterId] = [];
  private stable var stable_profile_canister_index: [(Base.PrincipalId, Base.CanisterId)] = [];
  private stable var stable_active_profile_canister_id: Base.CanisterId = "";
  private stable var stable_storage_canister_ids: [Base.CanisterId] = [];
  private stable var stable_active_storage_canister_id: Base.CanisterId = "";

  private stable var stable_unique_usernames : [Text] = [];
  private stable var stable_unique_organisation_names : [Text] = [];
  
  system func preupgrade() {
    stable_unique_usernames := profileManager.getStableUniqueUsernames();
    stable_unique_organisation_names := organisationManager.getStableUniqueOrganisationNames();
    stable_organisation_canister_ids := organisationManager.getStableOrganisationCanisterIds();
    stable_profile_canister_ids := profileManager.getStableProfileCanisterIds();
    stable_profile_canister_index := profileManager.getStableProfileCanisterIndex();
    stable_active_profile_canister_id := profileManager.getStableActiveCanisterId();
    stable_storage_canister_ids := storageManager.getStableStorageCanisterIds(); 
    stable_active_storage_canister_id := storageManager.getStableActiveCanisterId();
  };

  system func postupgrade() {
    cyclesManager.setStableTopups(stable_topups);
    organisationManager.setBackendCanisterController(Principal.fromActor(Self));
    profileManager.setStableUniqueUsernames(stable_unique_usernames);
    organisationManager.setStableUniqueOrganisationNames(stable_unique_organisation_names);
    organisationManager.setStableOrganisationCanisterIds(stable_organisation_canister_ids);
    profileManager.setStableProfileCanisterIds(stable_profile_canister_ids);
    profileManager.setStableProfileCanisterIndex(stable_profile_canister_index);
    profileManager.setStableActiveCanisterId(stable_active_profile_canister_id);
    storageManager.setStableStorageCanisterIds(stable_storage_canister_ids);
    storageManager.setStableActiveCanisterId(stable_active_storage_canister_id);

    //TODO: Trigger cycles manager to begin watching canisters, implement on OpenFPL
  };
  
  /* The below functionality relates to the December 2023 directory launch with all user to be transferred to the new data structure */

  public shared func listOGProfiles() : async Result.Result<[(Base.PrincipalId, T_Old.Profile)], T.Error>{
    return #ok(stable_profiles);
  };

  public func transferOGProfiles(){
    //TODO
    //transfer the profiles into the profile canister architecture using profile picture blob storage
  };
    
  private stable var stable_profiles : [(Text, T_Old.Profile)] = [];
  private stable var stable_profilePictures : [(Text, Blob)] = [];
};
