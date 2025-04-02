
/* ----- Mops Packages ----- */
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Ids "mo:waterway-mops/Ids";
import Enums "mo:waterway-mops/Enums";
import CanisterIds "mo:waterway-mops/CanisterIds";


/* ----- Queries ----- */
import UserQueries "../queries/user_queries";
import UserCommands "../commands/user_commands";
import Utilities "../utilities/utilities";

actor class _UserCanister() {
    private stable var stable_user_group_indexes : [(Ids.PrincipalId, Nat8)] = [];
    private stable var userGroup1 : [T.User] = [];
    private stable var userGroup2 : [T.User] = [];
    private stable var userGroup3 : [T.User] = [];
    private stable var userGroup4 : [T.User] = [];
    private stable var userGroup5 : [T.User] = [];
    private stable var userGroup6 : [T.User] = [];
    private stable var userGroup7 : [T.User] = [];
    private stable var userGroup8 : [T.User] = [];
    private stable var userGroup9 : [T.User] = [];
    private stable var userGroup10 : [T.User] = [];

    private stable var activeGroupIndex : Nat8 = 0;
    private stable var totalUsers = 0;
    private stable var MAX_USERS_PER_GROUP : Nat = 1000;
    private stable var MAX_USERS_PER_CANISTER : Nat = 10000;
    private stable var canisterFull = false;

    

    public shared ({ caller }) func getUser(dto : UserCommands.GetUser) : async Result.Result<UserQueries.UserDTO, Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {

                        let recent_5_membership_claims = List.take<T.MembershipClaim>(List.reverse(List.fromArray(foundUser.membershipClaims)), 5);
                        let membershipArray = List.toArray(recent_5_membership_claims);

                        let dto : UserQueries.UserDTO = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            userPicture = foundUser.userPicture;
                            displayName = foundUser.displayName;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipType = foundUser.membershipType;
                            membershipClaims = membershipArray;
                            createdOn = foundUser.createdOn;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };
                        return #ok(dto);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func getUserSummary(dto : UserCommands.GetUser) : async Result.Result<UserQueries.ICFCUserSummary, Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {

                        let latest_membership_claims = List.take<T.MembershipClaim>(List.reverse(List.fromArray(foundUser.membershipClaims)), 1);
                        let latestMembershipClaim = List.toArray(latest_membership_claims)[0];

                        let dto : UserQueries.ICFCUserSummary = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            userPicture = foundUser.userPicture;
                            displayName = foundUser.displayName;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipType = foundUser.membershipType;
                            membershipClaim = latestMembershipClaim;
                            createdOn = foundUser.createdOn;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                            membershipClaims = foundUser.membershipClaims;
                        };
                        return #ok(dto);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func getClaimedMembership(dto : UserQueries.GetClaimedMemberships) : async Result.Result<UserQueries.ClaimedMembershipsDTO, Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {
                        let allMembershipClaims = List.fromArray(foundUser.membershipClaims);
                        let droppedEntries = List.drop<T.MembershipClaim>(allMembershipClaims, dto.offset);
                        let paginatedEntires = List.take<T.MembershipClaim>(droppedEntries, MEMBERSHIPS_ROW_COUNT_LIMIT);

                        let claimedMembershipsDTO : UserQueries.ClaimedMembershipsDTO = {
                            claimedMemberships = List.toArray(paginatedEntires);
                        };
                        return #ok(claimedMembershipsDTO);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func createUser(userPrincipalId : Ids.PrincipalId, dto : UserCommands.CreateUser, membership : T.EligibleMembership) : async Result.Result<(), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        if (totalUsers >= MAX_PROFILES_PER_CANISTER) {
            return #err(#MaxDataExceeded);
        };

        if (getUserCountInGroup(activeGroupIndex) >= MAX_PROFILES_PER_GROUP) {
            activeGroupIndex += 1;
        };

        if (activeGroupIndex > 11) {
            canisterFull := true;
            return #err(#MaxDataExceeded);
        };

        let newUser : T.User = {
            principalId = userPrincipalId;
            userPicture = dto.userPicture;
            username = dto.username;
            displayName = dto.displayName;
            termsAgreed = false;
            appPrincipalIds = dto.appPrincipalIds;
            podcastIds = [];
            membershipType = membership.membershipType;
            membershipClaims = [{
                claimedOn = Time.now();
                expiresOn = ?Utilities.getMembershipExpirationDate(membership.membershipType);
                membershipType = membership.membershipType;
            }];
            createdOn = Time.now();
            membershipExpiryTime = 0;
            favouriteLeagueId = dto.favouriteLeagueId;
            favouriteClubId = dto.favouriteClubId;
            nationalityId = dto.nationalityId;
        };

        let _ = addUser(newUser);

        return #ok();

    };

    public shared ({ caller }) func updateUsername(dto : UserCommands.UpdateUserName) : async Result.Result<(), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {
                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = dto.username;
                            displayName = foundUser.displayName;
                            membershipType = foundUser.membershipType;
                            membershipClaims = foundUser.membershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = foundUser.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };
                        await saveUser(foundGroupIndex, updatedUser);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func updateDisplayName(dto : UserCommands.UpdateDisplayName) : async Result.Result<(), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {
                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            displayName = dto.displayName;
                            membershipType = foundUser.membershipType;
                            membershipClaims = foundUser.membershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = foundUser.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };
                        await saveUser(foundGroupIndex, updatedUser);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func updateNationality(dto : UserCommands.UpdateNationality) : async Result.Result<(), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {
                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            displayName = foundUser.displayName;
                            membershipType = foundUser.membershipType;
                            membershipClaims = foundUser.membershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = foundUser.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = ?dto.nationalityId;
                        };
                        await saveUser(foundGroupIndex, updatedUser);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func updateFavouriteClub(dto : UserCommands.UpdateFavouriteClub) : async Result.Result<(), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {
                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            displayName = foundUser.displayName;
                            membershipType = foundUser.membershipType;
                            membershipClaims = foundUser.membershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = foundUser.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = ?dto.favouriteLeagueId;
                            favouriteClubId = ?dto.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };
                        await saveUser(foundGroupIndex, updatedUser);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func updateAppPrincipalIds(dto : UserCommands.AddSubApp) : async Result.Result<(), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {

                        var appPrincipalIdsBuffer = Buffer.fromArray<(T.SubApp, Ids.PrincipalId)>(foundUser.appPrincipalIds);

                        let subAppAlreadyLinked = Array.find<(T.SubApp, Ids.PrincipalId)>(
                            foundUser.appPrincipalIds,
                            func(appPrincipalId : (T.SubApp, Ids.PrincipalId)) {
                                appPrincipalId.0 == dto.subApp;
                            },
                        );

                        // add new subapp if not already linked
                        if (subAppAlreadyLinked == null) {
                            appPrincipalIdsBuffer.add((dto.subApp, dto.subAppUserPrincipalId));
                        } else {
                            // update subapp if already linked
                            // let updatedAppPrincipalIds = Array.map<(T.SubApp, Ids.PrincipalId), (T.SubApp, Ids.PrincipalId)>(
                            //     foundUser.appPrincipalIds,
                            //     func(appPrincipalId : (T.SubApp, Ids.PrincipalId)) {
                            //         if (appPrincipalId.0 == dto.subApp) {
                            //             (appPrincipalId.0, dto.subAppUserPrincipalId);
                            //         } else {
                            //             appPrincipalId;
                            //         };
                            //     },
                            // );

                            // appPrincipalIdsBuffer := Buffer.fromArray<(T.SubApp, Ids.PrincipalId)>(updatedAppPrincipalIds);

                            return #err(#AlreadyExists);

                        };

                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            displayName = foundUser.displayName;
                            membershipType = foundUser.membershipType;
                            membershipClaims = foundUser.membershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = foundUser.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = Buffer.toArray(appPrincipalIdsBuffer);
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };
                        await saveUser(foundGroupIndex, updatedUser);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func removeSubApp(dto : UserCommands.RemoveSubApp) : async Result.Result<(), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.userPrincipalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };

        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.userPrincipalId);
                switch (user) {
                    case (?foundUser) {
                        let updatedAppPrincipalIds = Array.filter<(T.SubApp, Ids.PrincipalId)>(
                            foundUser.appPrincipalIds,
                            func(appPrincipalId : (T.SubApp, Ids.PrincipalId)) {
                                appPrincipalId.0 != dto.subApp;
                            },
                        );

                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            displayName = foundUser.displayName;
                            membershipType = foundUser.membershipType;
                            membershipClaims = foundUser.membershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = foundUser.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = updatedAppPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };
                        await saveUser(foundGroupIndex, updatedUser);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func updateUserPicture(dto : UserCommands.UpdateUserPicture) : async Result.Result<(), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };
        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {
                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            displayName = foundUser.displayName;
                            membershipType = foundUser.membershipType;
                            membershipClaims = foundUser.membershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = dto.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = foundUser.membershipExpiryTime;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };
                        await saveUser(foundGroupIndex, updatedUser);
                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func updateMembership(dto : UserCommands.UpdateMembership) : async Result.Result<(T.MembershipClaim), Enums.Error> {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == dto.principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };

        switch (groupIndex) {
            case (null) { return #err(#NotFound) };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, dto.principalId);
                switch (user) {
                    case (?foundUser) {
                        let membershipClaimsBuffer = Buffer.fromArray<T.MembershipClaim>(foundUser.membershipClaims);
                        let newClaim : T.MembershipClaim = {
                            membershipType = dto.membershipType;
                            claimedOn = Time.now();
                            expiresOn = ?Utilities.getMembershipExpirationDate(dto.membershipType);
                        };
                        membershipClaimsBuffer.add(newClaim);
                        let updatedMembershipClaims = Buffer.toArray(membershipClaimsBuffer);

                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            displayName = foundUser.displayName;
                            membershipType = dto.membershipType;
                            membershipClaims = updatedMembershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = foundUser.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = switch (newClaim.expiresOn) {
                                case (?expiryTime) {
                                    expiryTime;
                                };
                                case (null) {
                                    0;
                                };
                            };
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };

                        let res = await saveUser(foundGroupIndex, updatedUser);
                        switch (res) {
                            case (#err(error)) { return #err(error) };
                            case (#ok) { return #ok(newClaim) };
                        };

                    };
                    case (null) {
                        return #err(#NotFound);
                    };
                };
            };
        };
    };

    public shared ({ caller }) func isCanisterFull() : async Bool {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;
        return (totalUsers >= MAX_PROFILES_PER_CANISTER);
    };

    public shared ({ caller }) func checkAndExpireMembership() : async () {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;

        for (index in Iter.range(0, 11)) {
            switch (index) {
                case 0 {
                    for (user in Iter.fromArray(userGroup1)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 1 {
                    for (user in Iter.fromArray(userGroup2)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 2 {
                    for (user in Iter.fromArray(userGroup3)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 3 {
                    for (user in Iter.fromArray(userGroup4)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 4 {
                    for (user in Iter.fromArray(userGroup5)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 5 {
                    for (user in Iter.fromArray(userGroup6)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 6 {
                    for (user in Iter.fromArray(userGroup7)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 7 {
                    for (user in Iter.fromArray(userGroup8)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 8 {
                    for (user in Iter.fromArray(userGroup9)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 9 {
                    for (user in Iter.fromArray(userGroup10)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 10 {
                    for (user in Iter.fromArray(userGroup11)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case 11 {
                    for (user in Iter.fromArray(userGroup12)) {
                        if (user.membershipExpiryTime < Time.now()) {
                            let _ = expireMembership(user.principalId);
                        };
                    };
                };
                case _ {};
            };
        };
    };

    private func expireMembership(principalId : Ids.PrincipalId) : async () {

        var groupIndex : ?Nat8 = null;
        for (userGroupIndex in Iter.fromArray(stable_user_group_indexes)) {
            if (userGroupIndex.0 == principalId) {
                groupIndex := ?userGroupIndex.1;
            };
        };

        switch (groupIndex) {
            case (null) { return };
            case (?foundGroupIndex) {
                let user = findUser(foundGroupIndex, principalId);
                switch (user) {
                    case (?foundUser) {

                        let updatedUser : T.User = {
                            principalId = foundUser.principalId;
                            username = foundUser.username;
                            displayName = foundUser.displayName;
                            membershipType = #Expired;
                            membershipClaims = foundUser.membershipClaims;
                            createdOn = foundUser.createdOn;
                            userPicture = foundUser.userPicture;
                            termsAgreed = foundUser.termsAgreed;
                            appPrincipalIds = foundUser.appPrincipalIds;
                            podcastIds = foundUser.podcastIds;
                            membershipExpiryTime = 0;
                            favouriteLeagueId = foundUser.favouriteLeagueId;
                            favouriteClubId = foundUser.favouriteClubId;
                            nationalityId = foundUser.nationalityId;
                        };

                        let res = await saveUser(foundGroupIndex, updatedUser);
                        switch (res) {
                            case (#err(_)) { return };
                            case (#ok) {

                                var backend = actor (CanisterIds.ICFC_BACKEND_CANISTER_ID) : actor {
                                    removeNeuronsforExpiredMembership : shared query Ids.PrincipalId -> async ();
                                };

                                await backend.removeNeuronsforExpiredMembership(principalId);
                            };
                        };
                    };
                    case (null) {
                        return;
                    };
                };
            };
        };

    };

    private func findUser(userGroupIndex : Nat8, userPrincipalId : Ids.PrincipalId) : ?T.User {
        switch (userGroupIndex) {
            case 0 {
                let foundUser = Array.find<T.User>(
                    userGroup1,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 1 {
                let foundUser = Array.find<T.User>(
                    userGroup2,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 2 {
                let foundUser = Array.find<T.User>(
                    userGroup3,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 3 {
                let foundUser = Array.find<T.User>(
                    userGroup4,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 4 {
                let foundUser = Array.find<T.User>(
                    userGroup5,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 5 {
                let foundUser = Array.find<T.User>(
                    userGroup6,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 6 {
                let foundUser = Array.find<T.User>(
                    userGroup7,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 7 {
                let foundUser = Array.find<T.User>(
                    userGroup8,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 8 {
                let foundUser = Array.find<T.User>(
                    userGroup9,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 9 {
                let foundUser = Array.find<T.User>(
                    userGroup10,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 10 {
                let foundUser = Array.find<T.User>(
                    userGroup11,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case 11 {
                let foundUser = Array.find<T.User>(
                    userGroup12,
                    func(user : T.User) {
                        user.principalId == userPrincipalId;
                    },
                );
                return foundUser;
            };
            case _ {
                return null;
            };
        };
    };

    private func addUser(newUser : T.User) : Result.Result<(), Enums.Error> {
        switch (activeGroupIndex) {
            case 0 {
                let group1Buffer = Buffer.fromArray<T.User>(userGroup1);
                group1Buffer.add(newUser);
                userGroup1 := Buffer.toArray(group1Buffer);

            };
            case 1 {
                let group2Buffer = Buffer.fromArray<T.User>(userGroup2);
                group2Buffer.add(newUser);
                userGroup2 := Buffer.toArray(group2Buffer);

            };
            case 2 {
                let group3Buffer = Buffer.fromArray<T.User>(userGroup3);
                group3Buffer.add(newUser);
                userGroup3 := Buffer.toArray(group3Buffer);
            };
            case 3 {
                let group4Buffer = Buffer.fromArray<T.User>(userGroup4);
                group4Buffer.add(newUser);
                userGroup4 := Buffer.toArray(group4Buffer);
            };
            case 4 {
                let group5Buffer = Buffer.fromArray<T.User>(userGroup5);
                group5Buffer.add(newUser);
                userGroup5 := Buffer.toArray(group5Buffer);
            };
            case 5 {
                let group6Buffer = Buffer.fromArray<T.User>(userGroup6);
                group6Buffer.add(newUser);
                userGroup6 := Buffer.toArray(group6Buffer);
            };
            case 6 {
                let group7Buffer = Buffer.fromArray<T.User>(userGroup7);
                group7Buffer.add(newUser);
                userGroup7 := Buffer.toArray(group7Buffer);
            };
            case 7 {
                let group8Buffer = Buffer.fromArray<T.User>(userGroup8);
                group8Buffer.add(newUser);
                userGroup8 := Buffer.toArray(group8Buffer);
            };
            case 8 {
                let group9Buffer = Buffer.fromArray<T.User>(userGroup9);
                group9Buffer.add(newUser);
                userGroup9 := Buffer.toArray(group9Buffer);
            };
            case 9 {
                let group10Buffer = Buffer.fromArray<T.User>(userGroup10);
                group10Buffer.add(newUser);
                userGroup10 := Buffer.toArray(group10Buffer);
            };
            case 10 {
                let group11Buffer = Buffer.fromArray<T.User>(userGroup11);
                group11Buffer.add(newUser);
                userGroup11 := Buffer.toArray(group11Buffer);
            };
            case 11 {
                let group12Buffer = Buffer.fromArray<T.User>(userGroup12);
                group12Buffer.add(newUser);
                userGroup12 := Buffer.toArray(group12Buffer);
            };
            case _ {
                return #err(#NotFound);
            };
        };
        totalUsers += 1;

        let groupIndexBuffer = Buffer.fromArray<(Ids.PrincipalId, Nat8)>(stable_user_group_indexes);
        groupIndexBuffer.add((newUser.principalId, activeGroupIndex));
        stable_user_group_indexes := Buffer.toArray(groupIndexBuffer);
        return #ok();
    };

    private func saveUser(userGroupIndex : Nat8, updatedUser : T.User) : async Result.Result<(), Enums.Error> {
        switch (userGroupIndex) {
            case 0 {
                userGroup1 := Array.map<T.User, T.User>(
                    userGroup1,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 1 {
                userGroup2 := Array.map<T.User, T.User>(
                    userGroup2,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 2 {
                userGroup3 := Array.map<T.User, T.User>(
                    userGroup3,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 3 {
                userGroup4 := Array.map<T.User, T.User>(
                    userGroup4,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 4 {
                userGroup5 := Array.map<T.User, T.User>(
                    userGroup5,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 5 {
                userGroup6 := Array.map<T.User, T.User>(
                    userGroup6,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 6 {
                userGroup7 := Array.map<T.User, T.User>(
                    userGroup7,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 7 {
                userGroup8 := Array.map<T.User, T.User>(
                    userGroup8,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 8 {
                userGroup9 := Array.map<T.User, T.User>(
                    userGroup9,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 9 {
                userGroup10 := Array.map<T.User, T.User>(
                    userGroup10,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 10 {
                userGroup11 := Array.map<T.User, T.User>(
                    userGroup11,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case 11 {
                userGroup12 := Array.map<T.User, T.User>(
                    userGroup12,
                    func(user : T.User) {
                        if (user.principalId == updatedUser.principalId) {
                            return updatedUser;
                        } else {
                            return user;
                        };
                    },
                );
            };
            case _ {
                return #err(#NotFound);
            };
        };

        return #ok();
    };

    private func getUserCountInGroup(groupIndex : Nat8) : Nat {
        switch (groupIndex) {
            case 0 {
                return userGroup1.size();
            };
            case 1 {
                return userGroup2.size();
            };
            case 2 {
                return userGroup3.size();
            };
            case 3 {
                return userGroup4.size();
            };
            case 4 {
                return userGroup5.size();
            };
            case 5 {
                return userGroup6.size();
            };
            case 6 {
                return userGroup7.size();
            };
            case 7 {
                return userGroup8.size();
            };
            case 8 {
                return userGroup9.size();
            };
            case 9 {
                return userGroup10.size();
            };
            case 10 {
                return userGroup11.size();
            };
            case 11 {
                return userGroup12.size();
            };
            case _ {
                return 0;
            };
        };
    };

    system func preupgrade() {};

    system func postupgrade() {
        /*
        stable_user_group_indexes := [];
        userGroup1 := [];
        totalUsers := 0;
        */
    };
};
