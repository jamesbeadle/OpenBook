import Ids "mo:waterway-mops/Ids";
import AppIds "../data-types/app-ids";
module UserQueries {

    public type ListUserOrganisations = {

    };

    public type UserOrganisations = {

    };

    public type User = {
      principalId : Ids.PrincipalId;
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
      organisations : [AppIds.OrganisationId];
      createDate : Int;
      lastModified : Int64;
      userDefinedWallet : Text;
      preferredPaymentCurrency : AppIds.CurrencyId;
    }; 

    public type GetUser = {
      principalId : Ids.PrincipalId;
    };
};
