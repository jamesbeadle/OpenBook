import Int "mo:base/Int";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Result "mo:base/Result";
import Blob "mo:base/Blob";
import Int64 "mo:base/Int64";
import Float "mo:base/Float";
import Nat8 "mo:base/Nat8";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

module {

  public class TreasuryManager() {

    public type ConversionRateResponse = {
      data : Nat;
    };
    
    let icp_fee : Nat64 = 10_000;
    let memo_txt_tpup : Nat64 = 0x50555054;
    private let ledger : ICPLedger.Interface = actor (ICPLedger.CANISTER_ID);
    
    public func getUserAccountBalance(defaultAccount : Principal, user : Principal) : async Nat64 {
      let source_account = Account.accountIdentifier(defaultAccount, Account.principalToSubaccount(user));
      let balance = await ledger.account_balance({ account = source_account });
      return balance.e8s;
    };

    public func sendICPForCycles(treasuryAccount : Account.AccountIdentifier, cyclesRequested : Nat64) : async () {

      if (cyclesRequested <= 0) {
        return;
      };

      let cycles_minting_canister = actor (Environment.CYCLES_MINTING_CANISTER_ID) : actor {
        get_icp_xdr_conversion_rate : () -> async ConversionRateResponse;
      };
      let converstionRate : ConversionRateResponse = await cycles_minting_canister.get_icp_xdr_conversion_rate();

      let icp_required : Nat64 = cyclesRequested / Nat64.fromNat(converstionRate.data) / 1_000_000;
      
      let balance = await ledger.account_balance({ account = treasuryAccount });
      
      if (balance.e8s < icp_fee) {
        return;
      };

      let withdrawable = balance.e8s - icp_fee;

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
        amount = { e8s = icp_required };
        fee = { e8s = icp_fee };
        created_at_time = ?{
          timestamp_nanos = Nat64.fromNat(Int.abs(Time.now()));
        };
      });
    };

    public func canAffordOrganisation(defaultAccount: Principal, userId: T.PrincipalId) : async Bool{
      
      var entryFee: Nat64 = 100_000_000;
      var fee: Nat64 = 10_000;

      let ledger : SNSToken.Interface = actor (Environment.NNS_LEDGER_CANISTER_ID);

      let source_account = Account.accountIdentifier(defaultAccount, Account.principalToSubaccount(Principal.fromText(managerId)));
      let checkAccount : SNSToken.Account = {
        owner = Principal.fromBlob(source_account);
        subaccount = null;
      };

      let balance = Nat64.fromNat(await ledger.icrc1_balance_of(checkAccount));

      return balance >= entryFee;
    };

    public func purchaseOrganisation(defaultAccount: Principal, canisterId: T.CanisterId, userId: T.PrincipalId) : async (){
        let _ = await ledger.icrc1_transfer({
            memo = ?Blob.fromArray([]);
            from_subaccount = ?Account.principalToSubaccount(Principal.fromText(managerId));
            to = {owner = defaultAccount; subaccount = ?Account.principalToSubaccount(Principal.fromText(foundPrivateLeague.creatorPrincipalId))};
            amount = adminFee - token.fee;
            fee = ?token.fee;
            created_at_time = ?Nat64.fromNat(Int.abs(Time.now()));
        });
    };
    
  };
};