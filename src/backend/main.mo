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
      otherContact = "";
      displayName = "";
      profession = "";
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
          profession = foundProfile.profession;
          username = foundProfile.username;
          firstName = foundProfile.firstName;
          lastName = foundProfile.lastName;
          openChatUsername = foundProfile.openChatUsername;
          otherContact = foundProfile.otherContact;
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

  public shared ({ caller }) func createProfile(profileDTO : DTO.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {

        if (not profilesInstance.isDisplayNameValid(profileDTO.displayName)) {
          return #err(#InvalidData);
        };

        if (not profilesInstance.isUsernameValid(profileDTO.username)) {
          return #err(#InvalidData);
        };

        if (Text.size(profileDTO.firstName) > 0 and not profilesInstance.isNameValid(profileDTO.firstName)) {
          return #err(#InvalidData);
        };

        if (not profilesInstance.isNameValid(profileDTO.lastName)) {
          return #err(#InvalidData);
        };

        if (not profilesInstance.isProfessionValid(profileDTO.profession)) {
          return #err(#InvalidData);
        };

        profilesInstance.createProfile(Principal.toText(caller), profileDTO.displayName, profileDTO.username, profileDTO.firstName, profileDTO.lastName, profileDTO.profession);
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

        if (updatedProfile.otherContact != foundProfile.otherContact) {
          var invalidOtherContact = false;
          if (Text.size(updatedProfile.otherContact) > 0) {
            invalidOtherContact := not profilesInstance.isOtherContactValid(updatedProfile.otherContact);
          };
          assert not invalidOtherContact;
        };

        return profilesInstance.updateProfileDetail(Principal.toText(caller), updatedProfile);
      };
    };
  };

  public shared func isUsernameAvailable(username : Text) : async Bool {
    return profilesInstance.isUsernameAvailable(username);
  };

  public shared ({ caller }) func updateProfilePicture(updatedProfilePicture : Blob) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {
        return profilesInstance.updateProfilePicture(Principal.toText(caller), updatedProfilePicture);
      };
    };
  };

  public shared query func getProfiles(usernameFilter: Text, firstNameFilter: Text, lastNameFilter: Text, professionFilter: Text, currentPage: Int) : async DTO.DirectoryDTO {
    
    let fetchedProfiles = profilesInstance.fetchProfiles(usernameFilter, firstNameFilter, lastNameFilter, professionFilter, currentPage, 25);
    let totalEntries = profilesInstance.countProfiles(usernameFilter, firstNameFilter, lastNameFilter, professionFilter);
    
    let directoryDTO: DTO.DirectoryDTO = {
      profiles = fetchedProfiles;
      totalEntries = totalEntries;
      currentPage = currentPage;
    };
    return directoryDTO;
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
