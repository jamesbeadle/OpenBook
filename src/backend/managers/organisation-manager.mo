import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Option "mo:base/Option";
import Base "mo:waterway-mops/BaseTypes";
import Ids "mo:waterway-mops/Ids";
import Enums "mo:waterway-mops/Enums";
import Org "../data-types/organisation-types";
import OrganisationCommands "../commands/organisation-commands";
import OrganisationQueries "../queries/organisation-queries";

module {
  public class OrganisationManager() {
    
    private var unique_organisation_names : [Text] = [];
    private var organisation_canister_ids: [Ids.CanisterId] = [];

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
    
    public func createOrganisation(dto: OrganisationCommands.CreateOrganisation) : async Result.Result<(), Enums.Error> {
      
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

    public func getOrganisation(dto: OrganisationQueries.GetOrganisation) : async Result.Result<OrganisationQueries.Organisation, Enums.Error> {
      let organisation_canister = actor (organisationId) : actor {
        getOrganisation : () -> async ?OrganisationDTOs.Organisation;
      };
      return await organisation_canister.getOrganisation();
    };

    public func deleteOrganisation(dto: OrganisationQueries.DeleteOrganisation) : async Result.Result<(), Enums.Error> {

      let organisation = await getOrganisation(organisationId);

      switch(organisation){
        case (null){
          return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          unique_organisation_names := Array.filter<Text>(
            unique_organisation_names,
            func(name : Text) : Bool {
              return name != foundOrganisation.name;
            },
          );

          organisation_canister_ids := Array.filter<Base.CanisterId>(
            organisation_canister_ids,
            func(canisterId : Base.CanisterId) : Bool {
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

    public func acceptOrganisationInvitation(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async () {
      let organisation_canister = actor (organisationId) : actor {
        acceptOrganisationInvitation : (principalId: Base.PrincipalId) -> async ();
      };
      return await organisation_canister.acceptOrganisationInvitation(principalId);
    };

    public func isUserOrganisationMember(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Bool{
      let organisation_canister = actor (organisationId) : actor {
        isUserOrganisationMember : (principalId: Base.PrincipalId) -> async Bool;
      };
      return await organisation_canister.isUserOrganisationMember(principalId);
    };

    public func invitationExists(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Bool{
      let organisation_canister = actor (organisationId) : actor {
        invitationExists : (principalId: Base.PrincipalId) -> async Bool;
      };
      return await organisation_canister.invitationExists(principalId);
    };

    public func acceptInvitation(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        acceptInvitation : (principalId: Base.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.acceptInvitation(principalId);
    };

    public func rejectInvitation(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        rejectInvitation : (principalId: Base.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.rejectInvitation(principalId);
    };

    public func requestAccess(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        requestAccess : (principalId: Base.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.requestAccess(principalId);
    };

    public func leaveOrganisation(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        leaveOrganisation : (principalId: Base.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.leaveOrganisation(principalId);
    };

    public func isAdmin(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Bool {
      let organisation_canister = actor (organisationId) : actor {
        isAdmin : (principalId: Base.PrincipalId) -> async Bool;
      };
      return await organisation_canister.isAdmin(principalId);
    };

    public func userAccessRequestExists(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Bool {
      let organisation_canister = actor (organisationId) : actor {
        userAccessRequestExists : (principalId: Base.PrincipalId) -> async Bool;
      };
      return await organisation_canister.userAccessRequestExists(principalId);
    };

    public func confirmAccessRequest(organisationId: Org.OrganisationId, principalId: Base.PrincipalId) : async Result.Result<(), T.Error> {
      let organisation_canister = actor (organisationId) : actor {
        confirmAccessRequest : (principalId: Base.PrincipalId) -> async Result.Result<(), T.Error>;
      };
      return await organisation_canister.confirmAccessRequest(principalId);
    };

    public func getStableUniqueOrganisationNames() : [Text] {
      return unique_organisation_names;
    };

    public func setStableUniqueOrganisationNames(stable_unique_organisation_names: [Text]) : () {
      unique_organisation_names := stable_unique_organisation_names;
    };

    public func getStableOrganisationCanisterIds() : [Base.CanisterId] {
      return organisation_canister_ids; 
    };

    public func setStableOrganisationCanisterIds(stable_organisation_canister_ids: [Base.CanisterId]) : () {
      organisation_canister_ids := stable_organisation_canister_ids; 
    };
  
  };
};


    