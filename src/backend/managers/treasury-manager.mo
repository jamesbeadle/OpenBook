import Int "mo:base/Int";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Ledger "../defs/ledger";
import Account "../utilities/Account";
import T "../data-types/types";
import Environment "../utilities/Environment";

module {

    public class TreasuryManager() {
        
        type ConversionRateResponse = {
            data : Nat;
        };
    
        private let organisationPrice: Nat = 100_000_000;
        private let icp_fee : Nat = 10_000;
        private let memo_txt_tpup : Nat64 = 0x50555054;
        private let ledger : Ledger.Interface = actor (Ledger.CANISTER_ID);
    
        public func getUserAccountBalance(defaultAccount : Principal, user : Principal) : async Nat64 {
            let source_account = Account.accountIdentifier(defaultAccount, Account.principalToSubaccount(user));
            let balance = await ledger.account_balance({ account = source_account });
            return balance.e8s;
        };

        public func sendICPForCycles(treasuryAccount : Account.AccountIdentifier, cyclesRequested : Nat) : async () {

            if (cyclesRequested <= 0) {
                return;
            };

            let cycles_minting_canister = actor (Environment.CYCLES_MINTING_CANISTER_ID) : actor {
                get_icp_xdr_conversion_rate : () -> async ConversionRateResponse;
            };
            let converstionRate : ConversionRateResponse = await cycles_minting_canister.get_icp_xdr_conversion_rate();

            let icp_required : Nat = cyclesRequested / converstionRate.data / 1_000_000;
            
            let balance = await ledger.account_balance({ account = treasuryAccount });
            let e8s = Nat64.toNat(balance.e8s);

            if (e8s < icp_fee) {
                return;
            };

            let withdrawable: Nat = e8s - icp_fee;

            if (icp_required >= withdrawable) {
                return;
            };

            let target_account = Account.accountIdentifier(Principal.fromText(Environment.CYCLES_MINTING_CANISTER_ID), Account.principalToSubaccount(Principal.fromText(Environment.BACKEND_CANISTER_ID)));

            if (not Account.validateAccountIdentifier(target_account)) {
                return;
            };

            let _ = await ledger.transfer({
                memo = memo_txt_tpup;
                from_subaccount = null;
                to = target_account;
                amount = { e8s = Nat64.fromNat(icp_required) };
                fee = { e8s = Nat64.fromNat(icp_fee) };
                created_at_time = ?{
                timestamp_nanos = Nat64.fromNat(Int.abs(Time.now()));
                };
            });
        };

        public func purchaseOrganisation(defaultAccount: Principal, userId: T.PrincipalId) : async Ledger.Icrc1TransferResult{
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