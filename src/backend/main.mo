import DTO "DTOs";
import T "types";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
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
    Debug.print(debug_show existingProfile);
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

  public shared ({ caller }) func createProfile() : async () {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {
        profilesInstance.createProfile(Principal.toText(caller), Principal.toText(caller), "", "", "", "", "", "");
      };
      case (_) {};
    };
  };

  public shared ({ caller }) func updateUsername(username : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isUsernameValid(username);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        profilesInstance.createProfile(Principal.toText(caller), "", "", "", "", "", "", ""); //here
        return #ok(());
      };
      case (?foundProfile) {};
    };
    return profilesInstance.updateDisplayName(Principal.toText(caller), displayName);
  };

  public shared ({ caller }) func updateDisplayName(displayName : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isDisplayNameValid(displayName);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        profilesInstance.createProfile(Principal.toText(caller), displayName, "", "", "", "", "", "");
        return #ok(());
      };
      case (?foundProfile) {};
    };
    return profilesInstance.updateDisplayName(Principal.toText(caller), displayName);
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
