import Cycles "mo:base/ExperimentalCycles";
import Timer "mo:base/Timer";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Result "mo:base/Result";
import T "../data-types/accounts-types";

actor class _AccountancyCanister() {

    private var transactions: [T.Transaction] = [];
    private var chartOfAccounts: [T.GeneralLedgerAccount] = [];

    //Data stored in the accountancy canister
        //All transactions
        //All suppliers and customers linked back to contact records
        //chart of accounts
        //balance of banking accounts with matching of payments etc
        //




    public shared ({ caller }) func initialise(){

    };


    //Accounting

    public shared ({ caller }) func addCurrency(dto: ADTOs.AddCurrencyDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return accountsManager.addCurrency(dto);
    };

    public shared ({ caller }) func addGeneralLedgerAccount(dto: ADTOs.AddGeneralLedgerAccountDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return accountsManager.addGeneralLedgerAccount(dto);
    };

    public shared ({ caller }) func removeGeneralLedgerAccount(dto: ADTOs.RemoveGeneralLedgerAccountDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      assert generalLedgerAccountEmpty(principalId);
      return accountsManager.addGeneralLedgerAccount(dto);
    };

    public shared ({ caller }) func addTransaction(dto: ADTOs.AddTransactionDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return accountsManager.addTransaction(dto);
    };

    system func preupgrade() {
  
    };

    system func postupgrade() {
        switch (cyclesCheckTimerId) {
        case (null) {};
        case (?id) {
            Timer.cancelTimer(id);
            cyclesCheckTimerId := null;
        };
        };
        cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);
    };

    private func checkCanisterCycles() : async () {

        let balance = Cycles.balance();

        if (balance < 2_000_000_000_000) {
        let backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
            requestCanisterTopup : () -> async ();
        };
        await backend_canister.requestCanisterTopup();
        };
        await setCheckCyclesTimer();
    };

    private func setCheckCyclesTimer() : async () {
        switch (cyclesCheckTimerId) {
        case (null) {};
        case (?id) {
            Timer.cancelTimer(id);
            cyclesCheckTimerId := null;
        };
        };
        cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);
    };

    public func topupCanister() : async () {
        let amount = Cycles.available();
        let _ = Cycles.accept<system>(amount);
    };

    public func getCyclesBalance() : async Nat {
        return Cycles.balance();
    };
};