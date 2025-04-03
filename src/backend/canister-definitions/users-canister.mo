
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
import UserQueries "../queries/user-queries";
import UserCommands "../commands/user-commands";
import Utilities "../utilities/utilities";
import AppTypes "../data-types/app-types";
import UserTypes "../data-types/user-types";

actor class _UserCanister() {
    private stable var stable_user_group_indexes : [(Ids.PrincipalId, Nat8)] = [];
    private stable var userGroup1 : [UserTypes.User] = [];
    private stable var userGroup2 : [UserTypes.User] = [];
    private stable var userGroup3 : [UserTypes.User] = [];
    private stable var userGroup4 : [UserTypes.User] = [];
    private stable var userGroup5 : [UserTypes.User] = [];
    private stable var userGroup6 : [UserTypes.User] = [];
    private stable var userGroup7 : [UserTypes.User] = [];
    private stable var userGroup8 : [UserTypes.User] = [];
    private stable var userGroup9 : [UserTypes.User] = [];
    private stable var userGroup10 : [UserTypes.User] = [];

    private stable var activeGroupIndex : Nat8 = 0;
    private stable var totalUsers = 0;
    private stable var MAX_USERS_PER_GROUP : Nat = 1000;
    private stable var MAX_USERS_PER_CANISTER : Nat = 10000;
    private stable var canisterFull = false;

    


    public shared ({ caller }) func isCanisterFull() : async Bool {
        assert not Principal.isAnonymous(caller);
        let backendPrincipalId = Principal.toText(caller);
        assert backendPrincipalId == CanisterIds.ICFC_BACKEND_CANISTER_ID;
        return (totalUsers >= MAX_USERS_PER_CANISTER);
    };

    system func preupgrade() {};

    system func postupgrade() {
    };
};
