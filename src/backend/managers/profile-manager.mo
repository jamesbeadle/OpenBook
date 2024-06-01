

import T "../data-types/types";
import OT "../data-types/old-types";

import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Account "../utilities/Account";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
import Array "mo:base/Array";
import Order "mo:base/Order";
import DTOs "../dtos/DTOs";
import Prim "mo:prim";

import ProfileDTOs "../dtos/profile-dtos"

module {
  public class ProfileManager() {
    private var profile_canister_ids: [T.CanisterId] = [];
    private var profile_canister_index: [(T.PrincipalId, T.CanisterId)] = [];
    private var unique_usernames : [Text] = [];

    public func getStableProfileCanisterIds() : [T.CanisterId] {
      return profile_canister_ids;
    };

    public func setStableProfileCanisterIds(stable_profile_canister_ids: [T.CanisterId]) : () {
      profile_canister_ids := stable_profile_canister_ids;
    };

    public func getStableProfileCanisterIndex() : [(T.PrincipalId, T.CanisterId)] {
      return profile_canister_index;
    };

    public func setStableProfileCanisterIndex(stable_profile_canister_index: [(T.PrincipalId, T.CanisterId)]) : () {
      profile_canister_index := stable_profile_canister_index;
    };

    public func getStableUniqueUsernames() : [Text] {
      return unique_usernames;
    };

    public func setStableUniqueUsernames(stable_unique_usernames: [Text]) : () {
      unique_usernames := stable_unique_usernames;
    };

    public func profileExists(principalId: T.PrincipalId) : Bool {
      return false; //todo;
    };

    public func getProfile(principalId: T.PrincipalId) : async ?ProfileDTOs.ProfileDTO {
      return null; //todo
    };

    public func createProfile(dto: ProfileDTOs.CreateProfileDTO) : async Result.Result<(), T.Error> {
      return #err(#NotFound); //todo
    };

    public func updateProfile(dto: ProfileDTOs.UpdateProfileDTO) : async Result.Result<(), T.Error> {
      return #err(#NotFound); //todo
    };

    public func deleteProfile(principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      return #err(#NotFound); //todo
    };

    public func addOrganisationToProfile(principalId: T.PrincipalId, organisationId: T.OrganisationId) : async Result.Result<(), T.Error> {
      return #err(#NotFound); //todo
    };

    public func leaveOrganisation(organisationId: T.OrganisationId, principalId: T.PrincipalId) : async Result.Result<(), T.Error> {
      return #err(#NotFound);
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

      for (existingUsername in Iter.fromArray(unique_usernames)) {

        let lowercaseUsername = Text.map(existingUsername, Prim.charToLower);
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

      for (existingUsername in Iter.fromArray(unique_usernames)) {
        let lowercaseUsername = Text.map(existingUsername, Prim.charToLower);
        let lowercaseNewUsername = Text.map(username, Prim.charToLower);
        if (lowercaseUsername == lowercaseNewUsername) {
          return false;
        };
      };

      return true;
    };
  };
};


    