import Int "mo:base/Int";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Base "mo:waterway-mops/BaseTypes";
import Ledger "../defs/ledger";
import Account "../utilities/Account";

module {

    public class TreasuryManager() {
        
        type ConversionRateResponse = {
            data : Nat;
        };
    
        private let organisationPrice: Nat = 100_000_000;
        private let icp_fee : Nat = 10_000;
        private let ledger : Ledger.Interface = actor (Ledger.CANISTER_ID);
    
        public func getUserAccountBalance(defaultAccount : Principal, user : Principal) : async Nat64 {
            let source_account = Account.accountIdentifier(defaultAccount, Account.principalToSubaccount(user));
            let balance = await ledger.account_balance({ account = source_account });
            return balance.e8s;
        };

        public func purchaseOrganisation(defaultAccount: Principal, userId: Base.PrincipalId) : async Ledger.Icrc1TransferResult{
            let _ = await ledger.icrc1_transfer({
                memo = ?Blob.fromArray([]);
                from_subaccount = ?Account.principalToSubaccount(Principal.fromText(userId));
                to = {owner = defaultAccount; subaccount = ?Account.defaultSubaccount()};
                amount = organisationPrice - icp_fee;
                fee = ?icp_fee;
                created_at_time = ?Nat64.fromNat(Int.abs(Time.now()));
            });
        };
        
    };
};