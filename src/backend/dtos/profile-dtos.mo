import OB "../data-types/openbook-types";

module ProfileDTOs {
    public type ListProfilesFiltersDTO = {

    };

    public type ProfilesListDTO = {

    };

    public type CreateProfileDTO = {

    };

    public type ProfileDTO = {

    };

    

    public type UpdateProfileDTO = {
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
        preferredPaymentCurrency : OB.CurrencyId;
    };

    public type UpdateProfilePictureDTO = {
        
    };
}
