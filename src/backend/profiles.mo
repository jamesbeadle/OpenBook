import T "types";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Account "Account";
import Result "mo:base/Result";
import { now } "mo:base/Time";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Time "mo:base/Time";
import Int64 "mo:base/Int64";

module {
  public class Profiles() {

    private var userProfiles : HashMap.HashMap<Text, T.Profile> = HashMap.HashMap<Text, T.Profile>(100, Text.equal, Text.hash);
    private var userProfilePictures : HashMap.HashMap<Text, Blob> = HashMap.HashMap<Text, Blob>(100, Text.equal, Text.hash);

    public func setData(stable_profiles : [(Text, T.Profile)]) {
      userProfiles := HashMap.fromIter<Text, T.Profile>(
        stable_profiles.vals(),
        stable_profiles.size(),
        Text.equal,
        Text.hash,
      );
    };

    public func getProfiles() : [(Text, T.Profile)] {
      return Iter.toArray(userProfiles.entries());
    };

    public func getProfile(principalName : Text) : ?T.Profile {
      return userProfiles.get(principalName);
    };

    public func isWalletValid(walletAddress : Text) : Bool {
      let account_id = Account.decode(walletAddress);
      switch account_id {
        case (#ok array) {
          if (Account.validateAccountIdentifier(Blob.fromArray(array))) {
            return true;
          };
        };
        case (#err err) {
          return false;
        };
      };

      return false;
    };

    public func createProfile(principalName : Text, displayName : Text) : () {
      if (userProfiles.get(principalName) == null) {
        let newProfile : T.Profile = {
          principal = principalName;
          displayName = displayName;
          profilePictureCanisterId = "";
          termsAccepted = false;
          createDate = now();
          auditHistory = List.nil<T.AuditRecord>();
          lastModified = Int64.fromInt(Time.now());
          organisations = [];
          preferredPaymentCurrency = 1;
          userDefinedWallet = "";
        };

        userProfiles.put(principalName, newProfile);
      };
    };

    public func isDisplayNameValid(displayName : Text) : Bool {

      if (Text.size(displayName) < 3 or Text.size(displayName) > 20) {
        return false;
      };

      let isAlphanumeric = func(s : Text) : Bool {
        let chars = Text.toIter(s);
        for (c in chars) {
          if (not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9'))) {
            return false;
          };
        };
        return true;
      };

      if (not isAlphanumeric(displayName)) {
        return false;
      };

      for (profile in userProfiles.vals()) {
        if (profile.displayName == displayName) {
          return false;
        };
      };

      return true;
    };

    public func updateDisplayName(principalName : Text, displayName : Text) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          if (existingProfile.displayName == displayName) {
            return #ok(());
          };
          let nameValid = isDisplayNameValid(displayName);
          if (not nameValid) {
            return #err(#NotAllowed);
          };

          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            displayName = displayName;
            profilePictureCanisterId = existingProfile.profilePictureCanisterId;
            termsAccepted = existingProfile.termsAccepted;
            createDate = existingProfile.createDate;
            auditHistory = existingProfile.auditHistory;
            lastModified = existingProfile.lastModified;
            organisations = existingProfile.organisations;
            preferredPaymentCurrency = existingProfile.preferredPaymentCurrency;
            userDefinedWallet = existingProfile.userDefinedWallet;
          };

          userProfiles.put(principalName, updatedProfile);

          return #ok(());
        };
      };
    };

    public func updateFavouriteTeam(principalName : Text, favouriteTeamId : Nat16) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            displayName = existingProfile.displayName;
            profilePictureCanisterId = existingProfile.profilePictureCanisterId;
            termsAccepted = existingProfile.termsAccepted;
            favouriteTeamId = favouriteTeamId;
            createDate = existingProfile.createDate;
            auditHistory = existingProfile.auditHistory;
            lastModified = existingProfile.lastModified;
            organisations = existingProfile.organisations;
            preferredPaymentCurrency = existingProfile.preferredPaymentCurrency;
            userDefinedWallet = existingProfile.userDefinedWallet;
          };

          userProfiles.put(principalName, updatedProfile);
          return #ok(());
        };
      };
    };

    public func updateProfilePicture(principalName : Text, profilePicture : Blob) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      userProfilePictures.put(principalName, profilePicture);

      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            displayName = existingProfile.displayName;
            termsAccepted = existingProfile.termsAccepted;
            profilePictureCanisterId = "";
            createDate = existingProfile.createDate;
            auditHistory = existingProfile.auditHistory;
            lastModified = existingProfile.lastModified;
            organisations = existingProfile.organisations;
            preferredPaymentCurrency = existingProfile.preferredPaymentCurrency;
            userDefinedWallet = existingProfile.userDefinedWallet;
          };

          userProfiles.put(principalName, updatedProfile);
          return #ok(());
        };
      };
    };

  };
};
