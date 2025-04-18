import Text "mo:base/Text";

module {
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

};
