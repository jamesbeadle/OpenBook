import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import T "data-types/types";
import T_Old "data-types/old-types";
import ProfileDTOs "dtos/profile-dtos";
import OrganisationDTOs "dtos/organisation-dtos";
import PresaleManager "managers/presale-manager";
import ProfileManager "managers/profile-manager";
import TreasuryManager "managers/treasury-manager";
import OrganisationManager "managers/organisation-manager";

actor Self {
  
  private let profileManager = ProfileManager.ProfileManager();
  private let treasuryManager = TreasuryManager.TreasuryManager();
  private let presaleManager = PresaleManager.PresaleManager();
  private let organisationManager = OrganisationManager.OrganisationManager();
  
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
        let organisationId = await organisationManager.createOrganisation(dto);
        return await profileManager.addOrganisationToProfile(principalId, organisationId);
      };
      case (#Err err_result){
        return #err(#PaymentError);
      }
    };
  };

  public shared ({ caller }) func deleteOrganisation(dto: OrganisationDTOs.DeleteOrganisationDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

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
        return await organisationManager.addUser(organisationId, principalId);
      };
    };
  };

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
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    presaleManager.getPresaleParticipation(principalId);
  };

  public shared ({ caller }) func updatePresaleNNSId(newNNSId: Text) : async [T.PresaleParticipation] {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    presaleManager.updatePresaleNNSId(principalId, newNNSId);
  };

  public shared ({ caller }) func listPresaleAllocation(listPrice: Nat64) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    presaleManager.listPresaleAllocation(principalId, listPrice);
  };

  public shared ({ caller }) func () : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    presaleManager.unlistPresaleAllocation(principalId);
  };

  public shared ({ caller }) func purchasePresaleAllocation(ownerId: T.PrincipalId) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    let transferResult = await treasuryManager.purchasePresaleAllocation(principalId, ownerId);
    switch(transferResult){
      case (#ok transferResult){
        return await presaleManager.transferPresaleAllocation(principalId, ownerId);
      };
      case _ {
        return #err(#TransferError);
      }
    };
  };

  public shared ({ caller }) func getPresaleAllocationListings() : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    return await presaleManager.getPresaleAllocationListings();
  };
  
  //TODO: Implement cycles checking when implemented on OpenFPL

  //Stable Variables
  private stable var stable_organisation_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_canister_ids: [T.CanisterId] = [];
  private stable var stable_profile_map: [(T.PrincipalId, T.CanisterId)] = [];
  private stable var stable_storage_canister_ids: [T.CanisterId] = [];

  private stable var unique_usernames : [Text] = [];
  private stable var unique_organisation_names : [Text] = [];

  system func preupgrade() {
    unique_usernames := profileManager.getStableUniqueUsernames();
    unique_organisation_names := organisationManager.getStableUniqueOrganisationNames();
  };

  system func postupgrade() {
    profileManager.setStableUniqueUsernames(unique_usernames);
    organisationManager.setStableUniqueOrganisationNames(unique_organisation_names);
  };
  

  //OpenBook presale information











  
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
