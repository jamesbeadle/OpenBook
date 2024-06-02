import T "../data-types/types";
import OrganisationDTOs "../dtos/organisation-dtos";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Management "../utilities/Management";
import OrganisationCanister "../canister-defs/organisation";
import Utilities "../utilities/Utilities";
import Cycles "mo:base/ExperimentalCycles";
import Option "mo:base/Option";
import Environment "../utilities/Environment";

module {
  public class OrganisationManager() {
    
    private var unique_organisation_names : [Text] = [];
    private var organisation_canister_ids: [T.CanisterId] = [];

    private var storeCanisterId : ?((canisterId : Text) -> async ()) = null;
    private var backendCanisterController : ?Principal = null;
    
    public func setStoreCanisterIdFunction(
      _storeCanisterId : (canisterId : Text) -> async (),
    ) {
      storeCanisterId := ?_storeCanisterId;
    };
    
    public func setBackendCanisterController(controller : Principal) {
      backendCanisterController := ?controller;
    };
    
    public func createOrganisation(dto: OrganisationDTOs.CreateOrganisationDTO) : async Result.Result<T.OrganisationId, T.Error> {
      
      let nameTaken = isOrganisationNameAvailable(dto.name);
      if(nameTaken){
        return #err(#AlreadyExists);
      };
      
      if(Text.size(dto.name) < 1 or Text.size(dto.name) > 50){
        return #err(#InvalidData);
      };

      Cycles.add<system>(12_000_000_000_000);
      let canister = await OrganisationCanister._OrganisationCanister();
      let IC : Management.Management = actor (Environment.Default);
      let _ = await Utilities.updateCanister_(canister, backendCanisterController, IC);
      let canister_principal = Principal.fromActor(canister);
      let canisterId = Principal.toText(canister_principal);
      await canister.initialise({name = dto.name; ownerId = dto.ownerId; canisterId});
      
      switch (storeCanisterId) {
        case (null) {
          return #err(#NotAllowed);
        };
        case (?actualFunction) {
          await actualFunction(canisterId);
          return #ok(Principal.toText(canister_principal));
        };
      };      
    };

    public func getOrganisation(organisationId: T.OrganisationId) : async ?OrganisationDTOs.OrganisationDTO {
      let organisation_canister = actor (organisationId) : actor {
        getOrganisation : () -> async ?OrganisationDTOs.OrganisationDTO;
      };
      return await organisation_canister.getOrganisation();
    };

    public func deleteOrganisation(organisationId: T.OrganisationId) : async Result.Result<(), T.Error> {

      let organisation = await getOrganisation(organisationId);

      switch(organisation){
        case (null){
          return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          //Todo: delete the canister and transfer the cycles back to openbook

          unique_organisation_names := Array.filter<T.CanisterId>(
            unique_organisation_names,
            func(name : Text) : Bool {
              return name != foundOrganisation.name;
            },
          );

          organisation_canister_ids := Array.filter<T.CanisterId>(
            organisation_canister_ids,
            func(canisterId : T.CanisterId) : Bool {
              return canisterId != organisationId;
            },
          );

          return #ok;
        };
      };
    };

    public func isOrganisationNameAvailable(organisationName: Text) : Bool {
      let nameExists = Array.find(unique_organisation_names, 
      func(name : Text) : Bool {
        return name == organisationName;
      },);
      return Option.isNull(nameExists);
    };

    public func acceptOrganisationInvitation(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async () {
      let organisation_canister = actor (organisationId) : actor {
        acceptOrganisationInvitation : (principalId: T.PrincipalId) -> async ();
      };
      return await organisation_canister.acceptOrganisationInvitation(principalId);
    };

    public func isUserOrganisationMember(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Bool{
      let organisation_canister = actor (organisationId) : actor {
        isUserOrganisationMember : (principalId: T.PrincipalId) -> async Bool;
      };
      return await organisation_canister.isUserOrganisationMember(principalId);
    };

    public func invitationExists(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Bool{
      let organisation_canister = actor (organisationId) : actor {
        invitationExists : (principalId: T.PrincipalId) -> async Bool;
      };
      return await organisation_canister.invitationExists(principalId);
    };

    public func acceptInvitation(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        acceptInvitation : (principalId: T.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.acceptInvitation(principalId);
    };

    public func rejectInvitation(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        rejectInvitation : (principalId: T.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.rejectInvitation(principalId);
    };

    public func requestAccess(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        requestAccess : (principalId: T.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.requestAccess(principalId);
    };

    public func leaveOrganisation(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        leaveOrganisation : (principalId: T.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.leaveOrganisation(principalId);
    };

    public func isAdmin(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Bool {
      let organisation_canister = actor (organisationId) : actor {
        isAdmin : (principalId: T.PrincipalId) -> async Bool;
      };
      return await organisation_canister.isAdmin(principalId);
    };

    public func userAccessRequestExists(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Bool {
      let organisation_canister = actor (organisationId) : actor {
        userAccessRequestExists : (principalId: T.PrincipalId) -> async Bool;
      };
      return await organisation_canister.userAccessRequestExists(principalId);
    };

    public func addUser(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        addUser : (principalId: T.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.addUser(principalId);
    };

    public func getStableUniqueOrganisationNames() : [Text] {
      return unique_organisation_names;
    };

    public func setStableUniqueOrganisationNames(stable_unique_organisation_names: [Text]) : () {
      unique_organisation_names := stable_unique_organisation_names;
    };

    public func getStableOrganisationCanisterIds() : [T.CanisterId] {
      return organisation_canister_ids; 
    };

    public func setStableOrganisationCanisterIds(stable_organisation_canister_ids: [T.CanisterId]) : () {
      organisation_canister_ids := stable_organisation_canister_ids; 
    };
  
  };
};


    