import Base "mo:waterway-mops/BaseTypes";

module UserCommands {

    public type CreateProfile = {
        principalId: Base.PrincipalId;
        username: Text;
        profilePixture: ?Blob;
        profilePictureExtension: Text;
        displayName : Text;
        profession : Text;
        firstName : Text;
        lastName : Text;
    };



    /*

      termsAccepted : Bool;

      username : Text;
      displayName : Text;
      profession : Text;
      firstName : Text;
      lastName : Text;
      profilePicture : Blob;
        profilePictureExtension: Text;

      openChatUsername : Text;
      emailAddress : Text;
      phoneNumber : Text;
      otherContact : Text;

      organisations : [OrganisationTypes.OrganisationId];
      createDate : Int;
      lastModified : Int64;
      userDefinedWallet : Text;
      preferredPaymentCurrency : T.CurrencyId;
    */

};
