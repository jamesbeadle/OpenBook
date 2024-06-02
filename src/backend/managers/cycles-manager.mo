import Cycles "mo:base/ExperimentalCycles";
import List "mo:base/List";
import Timer "mo:base/Timer";
import Time "mo:base/Time";
import Environment "../utilities/Environment";
import T "../data-types/types";
import Utilities "../utilities/Utilities";

module {

  public class CyclesManager() {

    private var canisterIds : List.List<Text> = List.fromArray<Text>([Environment.BACKEND_CANISTER_ID]);
    private var topups : [T.CanisterTopup] = [];

    private let cyclesCheckInterval : Nat = Utilities.getHour() * 24;
    private var cyclesCheckTimerId : ?Timer.TimerId = null;
    
    private let cyclesCheckWalletInterval : Nat = Utilities.getHour() * 24;
    private var cyclesCheckWalletTimerId : ?Timer.TimerId = null;
    private var nextCyclesCheckTime : Int = 0;
    private var nextWalletCheckTime : Int = 0;

    public func getStableCanisterIds() : [Text] {
      return List.toArray(canisterIds);
    };

    public func setStableCanisterIds(stable_canister_ids : [Text]) {
      canisterIds := List.fromArray(stable_canister_ids);
    };

    public func getStableTopups() : [T.CanisterTopup] {
      return topups;
    };

    public func setStableTopups(stable_topups : [T.CanisterTopup]) {
      topups := stable_topups;
    };

    public func requestCanisterTopup(canisterPrincipal : Text) : async () {
      
      let canisterId = List.find<Text>(
        canisterIds,
        func(text : Text) : Bool {
          return text == canisterPrincipal;
        },
      );

      switch (canisterId) {
        case (null) {};
        case (?foundId) {
          let canister_actor = actor (foundId) : actor {
            topupCanister : () -> async ();
          };
          Cycles.add<system>(2_000_000_000_000);
          await canister_actor.topupCanister();
          recordCanisterTopup(foundId, 2_000_000_000_000, );
        };
      };
    };

    private func recordCanisterTopup(canisterId: T.CanisterId, cyclesAmount: Nat64){

    };

    public func storeCanisterId(canisterId : Text) : async () {
      let existingCanisterId = List.find<Text>(
        canisterIds,
        func(text : Text) : Bool {
          return text == canisterId;
        },
      );

      switch (existingCanisterId) {
        case (null) {
          canisterIds := List.append(canisterIds, List.make(canisterId));
        };
        case (?foundId) {};
      };
    };


  private func setCheckCyclesTimer() : async () {
    switch (cyclesCheckTimerId) {
      case (null) {};
      case (?id) {
        Timer.cancelTimer(id);
        cyclesCheckTimerId := null;
      };
    };
    nextCyclesCheckTime := Time.now() + cyclesCheckInterval;
    cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);
  };

  private func checkCanisterCycles() : async () {

    let balance = Cycles.balance();

    if (balance < 500_000_000_000) {
      await requestCanisterTopup(Environment.BACKEND_CANISTER_ID);
    };
    await setCheckCyclesTimer();
  };

  };
};
