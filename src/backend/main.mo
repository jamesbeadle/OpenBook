import DTO "DTOs";
import T "types";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Profiles "profiles";

actor Self {

  let profilesInstance = Profiles.Profiles();

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
  };

  public shared ({ caller }) func createProfile() : async () {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    var existingProfile = profilesInstance.getProfile(Principal.toText(caller));
    switch (existingProfile) {
      case (null) {
        profilesInstance.createProfile(Principal.toText(caller), Principal.toText(caller));
      };
      case (_) {};
    };
  };

  public shared query ({ caller }) func isDisplayNameValid(displayName : Text) : async Bool {
    assert not Principal.isAnonymous(caller);
    return profilesInstance.isDisplayNameValid(displayName);
  };

  public shared ({ caller }) func updateDisplayName(displayName : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isDisplayNameValid(displayName);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        profilesInstance.createProfile(Principal.toText(caller), Principal.toText(caller));
        profile := profilesInstance.getProfile(Principal.toText(caller));
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

};
