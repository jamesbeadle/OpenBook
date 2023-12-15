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
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Order "mo:base/Order";
import DTOs "DTOs";
import Prim "mo:prim";

module {
  public class Profiles() {

    private var userProfiles : HashMap.HashMap<Text, T.Profile> = HashMap.HashMap<Text, T.Profile>(100, Text.equal, Text.hash);
    private var userProfilePictures : HashMap.HashMap<Text, Blob> = HashMap.HashMap<Text, Blob>(100, Text.equal, Text.hash);

    public func setData(stable_profiles : [(Text, T.Profile)], stable_profilePictures : [(Text, Blob)]) {
      userProfiles := HashMap.fromIter<Text, T.Profile>(
        stable_profiles.vals(),
        stable_profiles.size(),
        Text.equal,
        Text.hash,
      );
      userProfilePictures := HashMap.fromIter<Text, Blob>(
        stable_profilePictures.vals(),
        stable_profilePictures.size(),
        Text.equal,
        Text.hash,
      );
    };

    public func getProfiles() : [(Text, T.Profile)] {
      return Iter.toArray(userProfiles.entries());
    };

    public func getProfilePictures() : [(Text, Blob)] {
      return Iter.toArray(userProfilePictures.entries());
    };

    public func getProfile(principalName : Text) : ?T.Profile {
      return userProfiles.get(principalName);
    };

    public func getProfilePicture(principalName : Text) : Blob {
      let profilePicture = userProfilePictures.get(principalName);
      switch (profilePicture) {
        case (null) { return Blob.fromArray([]) };
        case (?foundPicture) {
          return foundPicture;
        };
      };
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

    public func createProfile(
      principalName : Text,
      displayName : Text,
      username : Text,
      firstName : Text,
      lastName : Text,
      profession : Text,
    ) : () {
      if (userProfiles.get(principalName) == null) {
        let newProfile : T.Profile = {
          principal = principalName;
          displayName = displayName;
          username = username;
          firstName = firstName;
          lastName = lastName;
          profession = profession;
          openChatUsername = "";
          emailAddress = "";
          phoneNumber = "";
          otherContact = "";
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

    public func updateProfileDetail(principalName : Text, updatedProfile : DTOs.UpdateProfileDTO) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          let adjustedProfile : T.Profile = {
            principal = existingProfile.principal;
            username = updatedProfile.username;
            displayName = updatedProfile.displayName;
            profession = updatedProfile.profession;
            firstName = updatedProfile.firstName;
            lastName = updatedProfile.lastName;
            openChatUsername = updatedProfile.openChatUsername;
            emailAddress = updatedProfile.emailAddress;
            otherContact = updatedProfile.otherContact;
            phoneNumber = updatedProfile.phoneNumber;
            profilePictureCanisterId = existingProfile.profilePictureCanisterId;
            termsAccepted = existingProfile.termsAccepted;
            createDate = existingProfile.createDate;
            auditHistory = existingProfile.auditHistory;
            lastModified = existingProfile.lastModified;
            organisations = existingProfile.organisations;
            preferredPaymentCurrency = existingProfile.preferredPaymentCurrency;
            userDefinedWallet = existingProfile.userDefinedWallet;
          };

          userProfiles.put(principalName, adjustedProfile);

          return #ok(());
        };
      };
    };

    public func isUsernameValid(username : Text) : Bool {

      if (Text.size(username) < 0 or Text.size(username) > 16) {
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

      if (not isAlphanumeric(username)) {
        return false;
      };

      for (profile in userProfiles.vals()) {

        let lowercaseUsername = Text.map(profile.username, Prim.charToLower);
        let lowercaseNewUsername = Text.map(username, Prim.charToLower);
        if (lowercaseUsername == lowercaseNewUsername) {
          return false;
        };
      };

      return true;
    };

    public func isProfessionValid(profession : Text) : Bool {

      if (Text.size(profession) < 0 or Text.size(profession) > 50) {
        return false;
      };

      let isAlphanumeric = func(s : Text) : Bool {
        let chars = Text.toIter(s);
        for (c in chars) {
          if (not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9') or (c == ' ') or (c == '-'))) {
            return false;
          };
        };
        return true;
      };

      if (not isAlphanumeric(profession)) {
        return false;
      };

      return true;
    };

    public func isDisplayNameValid(displayName : Text) : Bool {

      if (Text.size(displayName) < 0 or Text.size(displayName) > 30) {
        return false;
      };

      let isAlphanumeric = func(s : Text) : Bool {
        let chars = Text.toIter(s);
        for (c in chars) {
          if (not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9') or (c == ' '))) {
            return false;
          };
        };
        return true;
      };

      if (not isAlphanumeric(displayName)) {
        return false;
      };

      return true;
    };

    public func isNameValid(name : Text) : Bool {

      if (Text.size(name) < 0 or Text.size(name) > 30) {
        return false;
      };

      let isAlphanumeric = func(s : Text) : Bool {
        let chars = Text.toIter(s);
        for (c in chars) {
          if (not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9') or (c == ' ') or (c == '-'))) {
            return false;
          };
        };
        return true;
      };

      if (not isAlphanumeric(name)) {
        return false;
      };

      return true;
    };

    public func isOpenChatUsernameValid(openChatUsername : Text) : Bool {

      if (Text.size(openChatUsername) < 5 or Text.size(openChatUsername) > 13) {
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

      if (not isAlphanumeric(openChatUsername)) {
        return false;
      };

      return true;
    };

    public func isEmailValid(email : Text) : Bool {
      if (Text.size(email) < 5 or Text.size(email) > 254) {
        // too short or too long
        return false;
      };

      var atFound = false;
      var dotFound = false;
      let chars = Text.toIter(email);
      for (c in chars) {
        if (c == '@') {
          if (atFound) {
            // Multiple '@' symbols found
            return false;
          };
          atFound := true;
        } else if (atFound and c == '.') {
          dotFound := true;
        };
      };

      return atFound and dotFound;
    };

    public func isPhoneValid(phone : Text) : Bool {

      if (Text.size(phone) < 0 or Text.size(phone) > 30) {
        return false;
      };

      let isAlphanumeric = func(s : Text) : Bool {
        let chars = Text.toIter(s);
        for (c in chars) {
          if (not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9') or (c == ' ') or (c == '+') or (c == '-') or (c == '(') or (c == ')'))) {
            return false;
          };
        };
        return true;
      };

      if (not isAlphanumeric(phone)) {
        return false;
      };

      return true;
    };

    public func isOtherContactValid(otherContact : Text) : Bool {

      if (Text.size(otherContact) < 0 or Text.size(otherContact) > 30) {
        return false;
      };

      let isAlphanumeric = func(s : Text) : Bool {
        let chars = Text.toIter(s);
        for (c in chars) {
          if (not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9') or (c == ' ') or (c == '+') or (c == '-') or (c == '(') or (c == ')') or (c == '@'))) {
            return false;
          };
        };
        return true;
      };

      if (not isAlphanumeric(otherContact)) {
        return false;
      };

      return true;
    };

    public func updateProfilePicture(principalName : Text, profilePicture : Blob) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?foundProfile) {
          userProfilePictures.put(principalName, profilePicture);
          return #ok(());
        };
      };
    };

    public func isUsernameAvailable(username : Text) : Bool {

      if (Text.size(username) < 0 or Text.size(username) > 16) {
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

      if (not isAlphanumeric(username)) {
        return false;
      };

      for (profile in userProfiles.vals()) {
        let lowercaseUsername = Text.map(profile.username, Prim.charToLower);
        let lowercaseNewUsername = Text.map(username, Prim.charToLower);
        if (lowercaseUsername == lowercaseNewUsername) {
          return false;
        };
      };

      return true;
    };

    public func fetchProfiles(usernameFilter : Text, firstNameFilter : Text, lastNameFilter : Text, professionFilter : Text, currentPage : Int, pageSize : Int) : [DTOs.DirectoryProfileDTO] {
      let profilesList = Iter.toList(userProfiles.vals());
      let filteredProfiles = List.filter(
        profilesList,
        func(profile : T.Profile) : Bool {
          Debug.print(debug_show "profile");
          Debug.print(debug_show profile);
          let lowerCaseProfile = {
            username = Text.map(profile.username, Prim.charToLower);
            firstName = Text.map(profile.firstName, Prim.charToLower);
            lastName = Text.map(profile.lastName, Prim.charToLower);
            profession = Text.map(profile.profession, Prim.charToLower);
          };
          Debug.print(debug_show "lowerCaseProfile");
          Debug.print(debug_show lowerCaseProfile);
          let lowerCaseFilters = {
            username = Text.map(usernameFilter, Prim.charToLower);
            firstName = Text.map(firstNameFilter, Prim.charToLower);
            lastName = Text.map(lastNameFilter, Prim.charToLower);
            profession = Text.map(professionFilter, Prim.charToLower);
          };
          Debug.print(debug_show "lowerCaseFilters");
          Debug.print(debug_show lowerCaseFilters);
          (lowerCaseFilters.username == "" or Text.compare(lowerCaseProfile.username, lowerCaseFilters.username) == #equal) and (lowerCaseFilters.firstName == "" or Text.compare(lowerCaseProfile.firstName, lowerCaseFilters.firstName) == #equal) and (lowerCaseFilters.lastName == "" or Text.compare(lowerCaseProfile.lastName, lowerCaseFilters.lastName) == #equal) and (lowerCaseFilters.profession == "" or Text.compare(lowerCaseProfile.profession, lowerCaseFilters.profession) == #equal);
        },
      );
      Debug.print(debug_show "filteredProfiles");
      Debug.print(debug_show filteredProfiles);

      let sortedProfiles = Array.sort(
        List.toArray(filteredProfiles),
        func(a : T.Profile, b : T.Profile) : Order.Order {
          if (a.createDate < b.createDate) { return #less };
          if (a.createDate == b.createDate) { return #equal };
          return #greater;
        },
      );

      Debug.print(debug_show "sortedProfiles");
      Debug.print(debug_show sortedProfiles);
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Int.min(startIndex + pageSize, List.size(filteredProfiles));

      var profileBuffer = Buffer.fromArray<DTOs.DirectoryProfileDTO>([]);
      var currentIndex : Nat = 0;
      var iter = List.fromArray(sortedProfiles);

      label indexLoop while (currentIndex < endIndex) {
        switch (iter) {
          case (?(profile, rest)) {
            if (currentIndex >= startIndex) {
              var profilePicture : Blob = Blob.fromArray([]);
              switch (userProfilePictures.get(profile.principal)) {
                case (null) {};
                case (?foundPicture) {
                  profilePicture := foundPicture;
                };
              };
              let dto : DTOs.DirectoryProfileDTO = {
                principal = profile.principal;
                username = profile.username;
                firstName = profile.firstName;
                lastName = profile.lastName;
                profession = profile.profession;
                displayName = profile.displayName;
                profilePicture = profilePicture;
              };
              profileBuffer.add(dto);
            };
            currentIndex := currentIndex + 1;
            iter := rest;
          };
          case null { break indexLoop };
        };
      };

      return Buffer.toArray(profileBuffer);
    };

    public func countProfiles(usernameFilter : Text, firstNameFilter : Text, lastNameFilter : Text, professionFilter : Text) : Int {
      let profilesList = Iter.toList(userProfiles.vals());
      let filteredProfiles = List.filter(
        profilesList,
        func(profile : T.Profile) : Bool {
          Text.contains(profile.username, #text usernameFilter) and Text.contains(profile.firstName, #text firstNameFilter) and Text.contains(profile.lastName, #text lastNameFilter) and Text.contains(profile.profession, #text professionFilter)
        },
      );
      return List.size(filteredProfiles);
    };
  };
};
