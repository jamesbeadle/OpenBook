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


    public func getUserOrganisations(principalId: T.PrincipalId, dto: ODTOs.GetUserOrganisationsDTO) : async Result.Result<ODTOs.UserOrganisationsDTO, T.Error> {
      return #err(#NotFound);
    };

    public func getOrganisation(principalId: T.PrincipalId, dto: ODTOs.GetOrganisationDTO) : async Result.Result<ODTOs.OrganisationDTO, T.Error> {
      return #err(#NotFound);
    };

    public func updateOrganisationDetail(principalId: T.PrincipalId, dto: ODTOs.UpdateOrganisationDetailDTO) : async Result.Result<(), T.Error> {
      return #err(#NotFound);
    };

    public func deleteOrganisation(principalId: T.PrincipalId, dto: ODTOs.DeleteOrganisationDTO) : async Result.Result<(), T.Error> {
      return #err(#NotFound);
    };
  }
};

    