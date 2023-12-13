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

    public func createProfile(principalName : Text, displayName : Text, username: Text, firstName: Text, lastName: Text,
      openChatUsername: Text, emailAddress: Text, phoneNumber: Text) : () {
      if (userProfiles.get(principalName) == null) {
        let newProfile : T.Profile = {
          principal = principalName;
          displayName = displayName;
          username = username;
          firstName = firstName;
          lastName = lastName;
          openChatUsername = openChatUsername;
          emailAddress = emailAddress;
          phoneNumber = phoneNumber;
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
            username = existingProfile.username;
            displayName = displayName;
            firstName = existingProfile.firstName;
            lastName = existingProfile.lastName;
            openChatUsername = existingProfile.openChatUsername;
            emailAddress = existingProfile.emailAddress;
            phoneNumber = existingProfile.phoneNumber;
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

    public func updateUsername(principalName : Text, username : Text) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          if (existingProfile.username == username) {
            return #ok(());
          };
          let nameValid = isUsernameValid(username);
          if (not nameValid) {
            return #err(#NotAllowed);
          };

          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            username = username;
            displayName = existingProfile.displayName;
            firstName = existingProfile.firstName;
            lastName = existingProfile.lastName;
            openChatUsername = existingProfile.openChatUsername;
            emailAddress = existingProfile.emailAddress;
            phoneNumber = existingProfile.phoneNumber;
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

    public func updateFirstName(principalName : Text, firstName : Text) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          if (existingProfile.firstName == firstName) {
            return #ok(());
          };
          let nameValid = isNameValid(firstName);
          if (not nameValid) {
            return #err(#NotAllowed);
          };

          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            username = existingProfile.username;
            displayName = existingProfile.displayName;
            firstName = firstName;
            lastName = existingProfile.lastName;
            openChatUsername = existingProfile.openChatUsername;
            emailAddress = existingProfile.emailAddress;
            phoneNumber = existingProfile.phoneNumber;
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

    public func updateLastName(principalName : Text, lastName : Text) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          if (existingProfile.lastName == lastName) {
            return #ok(());
          };
          let nameValid = isNameValid(lastName);
          if (not nameValid) {
            return #err(#NotAllowed);
          };

          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            username = existingProfile.username;
            displayName = existingProfile.displayName;
            firstName = existingProfile.firstName;
            lastName = lastName;
            openChatUsername = existingProfile.openChatUsername;
            emailAddress = existingProfile.emailAddress;
            phoneNumber = existingProfile.phoneNumber;
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

    public func updateOpenChatUsername(principalName : Text, openChatUsername : Text) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          if (existingProfile.openChatUsername == openChatUsername) {
            return #ok(());
          };
          let nameValid = isOpenChatUsernameValid(openChatUsername);
          if (not nameValid) {
            return #err(#NotAllowed);
          };

          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            username = existingProfile.username;
            displayName = existingProfile.displayName;
            firstName = existingProfile.firstName;
            lastName = existingProfile.lastName;
            openChatUsername = openChatUsername;
            emailAddress = existingProfile.emailAddress;
            phoneNumber = existingProfile.phoneNumber;
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

    public func updateEmail(principalName : Text, email : Text) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          if (existingProfile.emailAddress == email) {
            return #ok(());
          };
          let emailValid = isEmailValid(email);
          if (not emailValid) {
            return #err(#NotAllowed);
          };

          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            username = existingProfile.username;
            displayName = existingProfile.displayName;
            firstName = existingProfile.firstName;
            lastName = existingProfile.lastName;
            openChatUsername = existingProfile.openChatUsername;
            emailAddress = email;
            phoneNumber = existingProfile.phoneNumber;
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

    public func updatePhone(principalName : Text, phone : Text) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalName);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          if (existingProfile.phoneNumber == phone) {
            return #ok(());
          };
          let phoneValid = isPhoneValid(phone);
          if (not phoneValid) {
            return #err(#NotAllowed);
          };

          let updatedProfile : T.Profile = {
            principal = existingProfile.principal;
            username = existingProfile.username;
            displayName = existingProfile.displayName;
            firstName = existingProfile.firstName;
            lastName = existingProfile.lastName;
            openChatUsername = existingProfile.openChatUsername;
            emailAddress = existingProfile.emailAddress;
            phoneNumber = phone;
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
            username = existingProfile.username;
            displayName = existingProfile.displayName;
            firstName = existingProfile.firstName;
            lastName = existingProfile.lastName;
            openChatUsername = existingProfile.openChatUsername;
            emailAddress = existingProfile.emailAddress;
            phoneNumber = existingProfile.phoneNumber;
            termsAccepted = existingProfile.termsAccepted;
            profilePictureCanisterId = ""; //SET WHEN MCA IMPLEMENTED
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
        if (profile.username == username) {
          return false;
        };
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

    public func isNameValid(name: Text) : Bool {

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

    public func isOpenChatUsernameValid(openChatUsername: Text) : Bool {

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
    
    public func isEmailValid(email: Text) : Bool {
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
  };
};
