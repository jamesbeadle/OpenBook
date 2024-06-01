import T "../data-types/types";

module ProfileDTOs {
    public type GetDirectoryDTO = {
      searchTerm : Text;
      limit : Nat;
      offset : Nat;
    };

    public type ProfilesListDTO = {
      searchTerm : Text;
      limit : Nat;
      offset : Nat;
      profiles : [PublicProfileDTO];
    };

    public type PublicProfileDTO = {
      principal : Text;
      username : Text;
      displayName : Text;
      profession : Text;
      firstName : Text;
      lastName : Text;
    };

    public type ProfileDTO = {
      principal : Text;
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
      organisations : [T.OrganisationId];
      createDate : Int;
      lastModified : Int64;
      userDefinedWallet : Text;
      preferredPaymentCurrency : T.CurrencyId;
    };

    public type CreateProfileDTO = {
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
      organisations : [T.OrganisationId];
      userDefinedWallet : Text;
      preferredPaymentCurrency : T.CurrencyId;
    };

    public type UpdateProfileDTO = {
      principalId: T.PrincipalId;
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
      userDefinedWallet : Text;
      preferredPaymentCurrency : T.CurrencyId;
    };

    public type UpdateProfilePictureDTO = {
        
    };
}
