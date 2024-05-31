import T "../data-types/openbook-types";
import Result "mo:base/Result";


module {
  public class OrganisationManager() {
    
  private var unique_organisation_names : [Text] = [];

  //add organiastion name
  //delete organisation
  //is organiastoin name availabel

    public func getStableUniqueOrganisationNames() : [Text] {
      return unique_organisation_names;
    };

    public func setStableUniqueOrganisationNames(stable_unique_organisation_names: [Text]) : () {
      unique_organisation_names := stable_unique_organisation_names;
    };

  
  };
};


    