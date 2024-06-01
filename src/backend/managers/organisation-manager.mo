import T "../data-types/types";
import OrganisationDTOs "../dtos/organisation-dtos";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Array "mo:base/Array";


module {
  public class OrganisationManager() {
    
    private var unique_organisation_names : [Text] = [];
    private var organisation_canister_ids: [T.CanisterId] = [];
    
    public func createOrganisation(dto: OrganisationDTOs.CreateOrganisationDTO) : async Result.Result<T.OrganisationId, T.Error> {
      //todo
      let nameTaken = isOrganisationNameAvailable(dto.name);
      if(nameTaken){
        return #err(#AlreadyExists);
      };
      
      if(Text.size(dto.name) < 1 or Text.size(dto.name) > 50){
        return #err(#InvalidData);
      };

      //add name to unique organisations
      return #err(#InvalidData); //todo
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
      return false; //todo
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


    