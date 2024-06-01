import T "../data-types/types";
import OrganisationDTOs "../dtos/organisation-dtos";
import Result "mo:base/Result";


module {
  public class OrganisationManager() {
    
  private var unique_organisation_names : [Text] = [];

  //add organiastion name
  //delete organisation
  //is organiastoin name availabel
    
    public func createOrganisation(dto: OrganisationDTOs.CreateOrganisationDTO) : async T.OrganisationId {
      return 0; //todo
    };

    public func getOrganisation(organisationId: T.OrganisationId) : async ?T.Organisation {
      return null;
    };

    public func deleteOrganisation(organisationId: T.OrganisationId) : async Result.Result<(), T.Error> {
      //remove the organisation from the organisation lists

        //delete the canister and transfer the cycles back to openbook
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


    