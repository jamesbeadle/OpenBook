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

  public shared ({ caller }) func createProfile(username: Text, displayName: Text, firstName: Text, lastName: Text, openChatUsername: Text, email: Text, phone: Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {

        if(not profilesInstance.isDisplayNameValid(displayName)){
          return #err(#InvalidData);
        };

        if(not profilesInstance.isUsernameValid(username)){
          return #err(#InvalidData);
        };

        if(Text.size(firstName) > 0 and not profilesInstance.isNameValid(firstName)){
          return #err(#InvalidData);
        };

        if(not profilesInstance.isNameValid(lastName)){
          return #err(#InvalidData);
        };

        if(Text.size(openChatUsername) > 0 and not profilesInstance.isOpenChatUsernameValid(openChatUsername)){
          return #err(#InvalidData);
        };

        if(Text.size(email) > 0 and not profilesInstance.isEmailValid(email)){
          return #err(#InvalidData);
        };

        if(Text.size(phone) > 0 and not profilesInstance.isPhoneValid(phone)){
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

  public shared ({ caller }) func updateUsername(username : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isUsernameValid(username);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {};
    };
    return profilesInstance.updateUsername(Principal.toText(caller), username);
  };

  public shared ({ caller }) func updateDisplayName(displayName : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isDisplayNameValid(displayName);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {};
    };
    return profilesInstance.updateDisplayName(Principal.toText(caller), displayName);
  };

  public shared ({ caller }) func updateFirstName(firstName : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isNameValid(firstName);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {};
    };
    return profilesInstance.updateFirstName(Principal.toText(caller), firstName);
  };

  public shared ({ caller }) func updateLastName(lastName : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isNameValid(lastName);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {};
    };
    return profilesInstance.updateLastName(Principal.toText(caller), lastName);
  };

  public shared ({ caller }) func updateOpenChatUsername(openChatUsername : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isOpenChatUsernameValid(openChatUsername);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundProfile) {};
    };
    return profilesInstance.updateOpenChatUsername(Principal.toText(caller), openChatUsername);
  };

  public shared ({ caller }) func updateProfilePicture(profilePicture : Blob) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);

    let sizeInKB = Array.size(Blob.toArray(profilePicture)) / 1024;
    if (sizeInKB > 500) {
      return #err(#NotAllowed);
    };

    return profilesInstance.updateProfilePicture(Principal.toText(caller), profilePicture);
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
