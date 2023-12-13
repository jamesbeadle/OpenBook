import DTO "DTOs";
import List "mo:base/List";

actor Self {

  private func greet(seasonId : Nat16, gameweek : Nat8) : async Text {
    return "Welcome to OpenBook";
  };

  public func getProfile() : async DTO.ProfileDTO {
    let profileDTO : DTO.ProfileDTO = {
      principal = "";
      displayName = "";
      termsAccepted = false;
      profilePicture = "";
      organisations = List.nil<DTO.OrganisationDTO>();
      createDate = 0;
      lastModified = 0;
      userDefinedWallet = "";
      preferredPaymentCurrency = 1;
    };
    return profileDTO;
  }

};
