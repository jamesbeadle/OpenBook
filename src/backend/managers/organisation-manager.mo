import T "../data-types/types";
import OrganisationDTOs "../dtos/organisation-dtos";
import Result "mo:base/Result";
import Text "mo:base/Text";


module {
  public class OrganisationManager() {
    
    private var unique_organisation_names : [Text] = [];
    
    public func createOrganisation(dto: OrganisationDTOs.CreateOrganisationDTO) : async Result.Result<T.OrganisationId, T.Error> {

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

    public func getOrganisation(organisationId: T.OrganisationId) : async ?T.Organisation {
      return null;
    };

    public func deleteOrganisation(organisationId: T.OrganisationId) : async Result.Result<(), T.Error> {
      //remove the organisation from the organisation lists

        //delete the canister and transfer the cycles back to openbook
      return #err(#NotFound);
    };

    public func isOrganisationNameAvailable(organisationName: Text) : Bool {
      return false; //todo
    };

    public func acceptOrganisationInvitation(organisationId: T.OrganisationId) : async () {

    };

    public func isUserOrganisationMember(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Bool{
      return false;
    };

    public func invitationExists(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Bool{
      return false;
    };

    public func acceptInvitation(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      //remove the organisation from the organisation lists

        //delete the canister and transfer the cycles back to openbook
      return #err(#NotFound);
    };

    public func rejectInvitation(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      return #err(#NotFound);
    };

    public func requestAccess(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      return #err(#NotFound);
    };

    public func leaveOrganisation(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      return #err(#NotFound);
    };

    public func isAdmin(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Bool {
      return false;
    };

    public func userAccessRequestExists(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Bool {
      return false;
    };

    public func addUser(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      return #err(#NotFound);
    };

    public func getStableUniqueOrganisationNames() : [Text] {
      return unique_organisation_names;
    };

    public func setStableUniqueOrganisationNames(stable_unique_organisation_names: [Text]) : () {
      unique_organisation_names := stable_unique_organisation_names;
    };

  
  };
};


    