import Blob "mo:base/Blob";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import T "data-types/types";
import T_Old "data-types/old-types";
import DTOs "dtos/DTOs";
import ProfileDTOs "dtos/profile-dtos";
import OrganisationDTOs "dtos/organisation-dtos";
import PresaleManager "managers/presale-manager";
import ProfileManager "managers/profile-manager";
import StorageManager "managers/storage-manager";
import TreasuryManager "managers/treasury-manager";
import OrganisationManager "managers/organisation-manager";
import CyclesManager "managers/cycles-manager";

actor Self {
  
  private let profileManager = ProfileManager.ProfileManager();
  private let treasuryManager = TreasuryManager.TreasuryManager();
  private let presaleManager = PresaleManager.PresaleManager();
  private let organisationManager = OrganisationManager.OrganisationManager();
  private let storageManager = StorageManager.StorageManager();
  private let cyclesManager = CyclesManager.CyclesManager();
  
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
  
  public shared ({ caller }) func deleteProfile(deletePrincipalId: T.PrincipalId) : async Result.Result<(), T.Error> {
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

  public shared ({ caller }) func purchaseOrganisation(dto: OrganisationDTOs.CreateOrganisationDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    assert dto.ownerId == principalId;

    let purchaseResult = await treasuryManager.purchaseOrganisation(Principal.fromActor(Self), principalId);

    switch(purchaseResult){
      case (#Ok result){
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

  public shared ({ caller }) func deleteOrganisation(dto: OrganisationDTOs.DeleteOrganisationDTO) : async Result.Result<(), T.Error>{
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

  public shared ({ caller }) func isOrganisationNameAvailable(organisationName : Text) : async Result.Result<Bool, T.Error> {
    assert not Principal.isAnonymous(caller);
    return #ok(organisationManager.isOrganisationNameAvailable(organisationName));
  };

  public shared ({ caller }) func acceptOrganisationInvitation(organisationId: T.OrganisationId) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    let profile = await profileManager.getProfile(principalId);

    switch(profile){
      case (null){
        return #err(#NotFound);
      };
      case (?foundProfile){
        let isOrganisationMember = await organisationManager.isUserOrganisationMember(organisationId, principalId);
        assert not isOrganisationMember;

        let invitationExists = await organisationManager.invitationExists(organisationId, principalId);
        assert invitationExists;

        let organisationInvitationExists = await profileManager.organisationInviteExists(organisationId, principalId);
        assert organisationInvitationExists;
        
        await profileManager.acceptOrganisationInvitation(organisationId, principalId);
        return await organisationManager.acceptInvitation(organisationId, principalId);
      };
    };
  };

  public shared ({ caller }) func rejectOrganisationInvitation(organisationId: T.OrganisationId) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    let profile = await profileManager.getProfile(principalId);

    switch(profile){
      case (null){
        return #err(#NotFound);
      };
      case (?foundProfile){
        
        let isOrganisationMember = await organisationManager.isUserOrganisationMember(organisationId, principalId);
        assert not isOrganisationMember;
        
        let invitationExists = await organisationManager.invitationExists(organisationId, principalId);
        assert invitationExists;

        let organisationInvitationExists = await profileManager.organisationInviteExists(organisationId, principalId);
        assert organisationInvitationExists;
        
        await profileManager.rejectOrganisationInvitation(organisationId, principalId);
        return await organisationManager.rejectInvitation(organisationId, principalId);
      };
    };
  };

  public shared ({ caller }) func requestOrganisationAccess(organisationId: T.OrganisationId) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    let profile = await profileManager.getProfile(principalId);

    switch(profile){
      case (null){
        return #err(#NotFound);
      };
      case (?foundProfile){
        
        let isOrganisationMember = await organisationManager.isUserOrganisationMember(organisationId, principalId);
        assert not isOrganisationMember;
        
        let invitationExists = await organisationManager.invitationExists(organisationId, principalId);
        if(invitationExists){
          await profileManager.acceptOrganisationInvitation(organisationId, principalId);
          return await organisationManager.acceptInvitation(organisationId, principalId);
        };

        await profileManager.addOrganisationAccessRequest(organisationId, principalId);
        return await organisationManager.requestAccess(organisationId, principalId);
      };
    };
  };

  public shared ({ caller }) func leaveOrganiastion(organisationId: T.OrganisationId) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    let profile = await profileManager.getProfile(principalId);

    switch(profile){
      case (null){
        return #err(#NotFound);
      };
      case (?foundProfile){
        
        let isOrganisationMember = await organisationManager.isUserOrganisationMember(organisationId, principalId);
        assert not isOrganisationMember;
        
        await profileManager.leaveOrganisation(organisationId, principalId);
        return await organisationManager.leaveOrganisation(organisationId, principalId);
      };
    };
  };

  public shared ({ caller }) func acceptUserOrganisationRequest(dto: OrganisationDTOs.AcceptUserOrganisationRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let isOrganisationAdmin = await organisationManager.isAdmin(dto.organisationId, principalId);
    assert isOrganisationAdmin;

    let requestExists = await organisationManager.userAccessRequestExists(dto.organisationId, dto.principalId);
    assert requestExists;
    
    let profile = await profileManager.getProfile(principalId);

    switch(profile){
      case (null){
        return #err(#NotFound);
      };
      case (?foundProfile){
        
        let isOrganisationMember = await organisationManager.isUserOrganisationMember(dto.organisationId, principalId);
        assert not isOrganisationMember;
        
        await profileManager.addOrganisation(dto.organisationId, principalId);
        return await organisationManager.confirmAccessRequest(dto.organisationId, principalId);
      };
    };
  };

  //Presale Functions

  public shared ({ caller }) func participateInPresale(icpAmount: Nat64, tokens: Nat64) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    if(icpAmount < 1_000_000){
      return #err(#InvalidData);
    };

    if(tokens < 10){
      return #err(#InvalidData);
    };

    if (tokens % 10 != 0) {
      return #err(#InvalidData);
    };

    let purchaseResult = await treasuryManager.participateInPresale(Principal.fromActor(Self), principalId, icpAmount);

    switch(purchaseResult){
      case (#Ok result){  
        await presaleManager.participateInPresale(principalId, icpAmount, tokens);
      };
      case (#Err err_result){
        return #err(#PaymentError);
      }
    };
  };

  public shared ({ caller }) func getPresaleParticipation() : async [T.PresaleParticipation] {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    presaleManager.getPresaleParticipation(principalId);
  };

  public shared ({ caller }) func updatePresaleNNSId(newNNSId: Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await presaleManager.updatePresaleNNSId(principalId, newNNSId);
  };

  public shared ({ caller }) func listPresaleAllocation(tokens: Nat64, listPrice: Nat64) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await presaleManager.listPresaleAllocation(principalId, tokens, listPrice);
  };

  public shared ({ caller }) func unlistPresaleAllocation(tokens: Nat64) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await presaleManager.unlistPresaleAllocation(principalId, tokens);
  };

  public shared ({ caller }) func purchasePresaleAllocation(dto: DTOs.PurchasePresaleAllocationDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let listing = await presaleManager.getListing(dto.ownerId);
    switch(listing){
      case (null){
        return #err(#NotAllowed);
      };
      case (?foundListing){
        if(dto.tokens == foundListing.tokens and dto.price == foundListing.price){
          let transferResult = await treasuryManager.purchasePresaleAllocation(Principal.fromActor(Self), principalId, foundListing.ownerId, foundListing.price);
          switch(transferResult){
            case (#Ok transferResult){
              return await presaleManager.transferPresaleAllocation(principalId, dto.ownerId);
            };
            case _ {
              return #err(#PaymentError);
            }
          };
        };
        return #err(#NotAllowed);
      }
    };
  };

  public shared ({ caller }) func getPresaleAllocationListings() : async Result.Result<[DTOs.PresaleListingDTO], T.Error>{
    assert not Principal.isAnonymous(caller);
    return await presaleManager.getPresaleAllocationListings();
  };
  
  //TODO: Implement cycles checking when implemented on OpenFPL

  //TODO: Stable Variables
  private stable var stable_canister_ids : [Text] = [];
  private stable var stable_topups : [T.CanisterTopup] = [];
  private stable var stable_organisation_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_canister_index: [(T.PrincipalId, T.CanisterId)] = [];
  private stable var stable_active_profile_canister_id: T.CanisterId = "";
  private stable var stable_storage_canister_ids: [T.CanisterId] = [];
  private stable var stable_active_storage_canister_id: T.CanisterId = "";

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
    cyclesManager.setStableCanisterIds(stable_canister_ids);
    cyclesManager.setStableTopups(stable_topups);
    organisationManager.setStoreCanisterIdFunction(cyclesManager.storeCanisterId);
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

  public shared func listOGProfiles() : async Result.Result<[(T.PrincipalId, T_Old.Profile)], T.Error>{
    return #ok(stable_profiles);
  };

  public func transferOGProfiles(){
    //TODO
    //transfer the profiles into the profile canister architecture using profile picture blob storage
  };
    
  private stable var stable_profiles : [(Text, T_Old.Profile)] = [];
  private stable var stable_profilePictures : [(Text, Blob)] = [];
};
