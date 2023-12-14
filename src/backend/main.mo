import DTO "DTOs";
import T "types";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Profiles "profiles";

actor Self {

  let profilesInstance = Profiles.Profiles();

  public shared query ({ caller }) func getProfile() : async DTO.ProfileDTO {
    let newProfile : DTO.ProfileDTO = {
      principal = "";
      username = "";
      firstName = "";
      lastName = "";
      openChatUsername = "";
      emailAddress = "";
      phoneNumber = "";
      displayName = "";
      termsAccepted = false;
      profilePicture = "";
      organisations = List.nil<DTO.OrganisationDTO>();
      createDate = 0;
      lastModified = 0;
      userDefinedWallet = "";
      preferredPaymentCurrency = 1;
    };

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {
        return newProfile;
      };
      case (?foundProfile) {
        let profilePicture = profilesInstance.getProfilePicture(foundProfile.principal);

        return {
          principal = foundProfile.principal;
          displayName = foundProfile.displayName;
          username = foundProfile.username;
          firstName = foundProfile.firstName;
          lastName = foundProfile.lastName;
          openChatUsername = foundProfile.openChatUsername;
          emailAddress = foundProfile.emailAddress;
          phoneNumber = foundProfile.phoneNumber;
          termsAccepted = foundProfile.termsAccepted;
          profilePicture = profilePicture;
          organisations = List.nil<T.Organisation>();
          createDate = foundProfile.createDate;
          lastModified = foundProfile.lastModified;
          userDefinedWallet = foundProfile.userDefinedWallet;
          preferredPaymentCurrency = foundProfile.preferredPaymentCurrency;
        };
      };
    };
  };

  public shared ({ caller }) func createProfile(username : Text, displayName : Text, firstName : Text, lastName : Text, openChatUsername : Text, email : Text, phone : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {

        if (not profilesInstance.isDisplayNameValid(displayName)) {
          return #err(#InvalidData);
        };

        if (not profilesInstance.isUsernameValid(username)) {
          return #err(#InvalidData);
        };

        if (Text.size(firstName) > 0 and not profilesInstance.isNameValid(firstName)) {
          return #err(#InvalidData);
        };

        if (not profilesInstance.isNameValid(lastName)) {
          return #err(#InvalidData);
        };

        if (Text.size(openChatUsername) > 0 and not profilesInstance.isOpenChatUsernameValid(openChatUsername)) {
          return #err(#InvalidData);
        };

        if (Text.size(email) > 0 and not profilesInstance.isEmailValid(email)) {
          return #err(#InvalidData);
        };

        if (Text.size(phone) > 0 and not profilesInstance.isPhoneValid(phone)) {
          return #err(#InvalidData);
        };

        profilesInstance.createProfile(Principal.toText(caller), displayName, username, firstName, lastName, openChatUsername, email, phone);
        return #ok(());
      };
      case (_) {
        return #ok(());
      };
    };
  };

  public shared ({ caller }) func updateProfileDetail(updatedProfile : DTO.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {
        if (updatedProfile.username != foundProfile.username) {
          let invalidUsername = not profilesInstance.isUsernameValid(updatedProfile.username);
          assert not invalidUsername;
        };

        if (updatedProfile.displayName != foundProfile.displayName) {
          let invalidDisplayName = not profilesInstance.isDisplayNameValid(updatedProfile.displayName);
          assert not invalidDisplayName;
        };

        if (updatedProfile.firstName != foundProfile.firstName) {
          var invalidFirstName = false;
          if (Text.size(updatedProfile.firstName) > 0) {
            invalidFirstName := not profilesInstance.isNameValid(updatedProfile.firstName);
          };
          assert not invalidFirstName;
        };

        if (updatedProfile.lastName != foundProfile.lastName) {
          let invalidLastName = not profilesInstance.isNameValid(updatedProfile.lastName);
          assert not invalidLastName;
        };

        if (updatedProfile.openChatUsername != foundProfile.openChatUsername) {
          var invalidOpenChatUsername = false;
          if (Text.size(updatedProfile.openChatUsername) > 0) {
            invalidOpenChatUsername := not profilesInstance.isOpenChatUsernameValid(updatedProfile.openChatUsername);
          };
          assert not invalidOpenChatUsername;
        };

        if (updatedProfile.emailAddress != foundProfile.emailAddress) {
          var invalidEmail = false;
          if (Text.size(updatedProfile.emailAddress) > 0) {
            invalidEmail := not profilesInstance.isEmailValid(updatedProfile.emailAddress);
          };
          assert not invalidEmail;
        };

        if (updatedProfile.phoneNumber != foundProfile.phoneNumber) {
          var invalidPhone = false;
          if (Text.size(updatedProfile.phoneNumber) > 0) {
            invalidPhone := not profilesInstance.isPhoneValid(updatedProfile.phoneNumber);
          };
          assert not invalidPhone;
        };

        return profilesInstance.updateProfileDetail(Principal.toText(caller), updatedProfile);
      };
    };
  };

  //Stable Variables
  private stable var stable_profiles : [(Text, T.Profile)] = [];
  private stable var stable_profilePictures : [(Text, Blob)] = [];

  system func preupgrade() {
    stable_profiles := profilesInstance.getProfiles();
    stable_profilePictures := profilesInstance.getProfilePictures();
  };

  system func postupgrade() {
    profilesInstance.setData(stable_profiles, stable_profilePictures);
  };
};
