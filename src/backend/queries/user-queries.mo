import Base "mo:waterway-mops/BaseTypes";
import OrganisationTypes "../../data-types/organisation-types";
import T "../../data-types/types";

module ProfileQueries {

    public type ProfileDTO = {
      principalId : Base.PrincipalId;
      username : Text;
      displayName : Text;
      profession : Text;
      firstName : Text;
      lastName : Text;
      openChatUsername : Text;
      emailAddress : Text;
      phoneNumber : Text;
      otherContact : Text;
      termsAccepted : Bool;
      profilePicture : Blob;
      organisations : [OrganisationTypes.OrganisationId];
      createDate : Int;
      lastModified : Int64;
      userDefinedWallet : Text;
      preferredPaymentCurrency : T.CurrencyId;
    }; 

    public type GetProfile = {
      principalId : Base.PrincipalId;
    };
};
