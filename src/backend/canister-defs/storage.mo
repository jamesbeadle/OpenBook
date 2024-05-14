
actor class _StorageCanister() {

//define the max size of an object
//define all the blobs 
//access methods etc
  get();
  add();
  update();
  remove();

//todo confirm with openfpl cycles etc
  private stable let cyclesCheckInterval : Nat = Utilities.getHour() * 24;
  private stable var cyclesCheckTimerId : ?Timer.TimerId = null;
  private stable var activeGroupIndex : Nat8 = 0;
  private stable var totalManagers = 0;


  system func preupgrade() {
    stable_manager_group_indexes := Iter.toArray(managerGroupIndexes.entries());
  };

  system func postupgrade() {
    for (index in Iter.fromArray(stable_manager_group_indexes)) {
      managerGroupIndexes.put(index.0, index.1);
    };
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
      let openfpl_backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
        requestCanisterTopup : () -> async ();
      };
      await openfpl_backend_canister.requestCanisterTopup();
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

  public func getMainCanisterId() : async Text {
    return Environment.BACKEND_CANISTER_ID;
  };
};