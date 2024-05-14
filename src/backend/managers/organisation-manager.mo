import T "../data-types/types";
import OB "../data-types/openbook-types";
import ODTOs "../dtos/organisation-dtos";
import Result "mo:base/Result";

module {
  public class OrganisationManager() {
    
    //store index of owner organisations
    private var ownerOrganisationIndex: [(T.PrincipalId, OB.OrganisationId)] = [];
  
    public func createOrganisation(creatorPrincipalId: T.PrincipalId, dto: ODTOs.CreateOrganisationDTO) : async Result.Result<(), T.Error>{
      return #ok;
    };
  }
};

    