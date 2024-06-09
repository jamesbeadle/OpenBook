import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Array "mo:base/Array";
import TrieMap "mo:base/TrieMap";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Utilities "../utilities/Utilities";
import Cycles "mo:base/ExperimentalCycles";
import Environment "../utilities/Environment";

actor class _StorageCanister() {

    //Canister to store data as blobs
    //Maximum file size 2MB
    //If 400GB Stable and 3GB RAM then 100 Buckets at 1200 files at 2MB == 234.375GB
    let MAX_FILE_COUNT: Nat = 1200;

    type PrincipalId = Text;
    type FileId = Nat32;
    type BucketNumber = Nat8;
    type StorageBlob = {
        id: FileId;
        owner: PrincipalId;
        blob: Blob
    };


    type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
        #NotAllowed;
        #DecodeError;
        #InvalidData;
    };

    private stable var activeBucketNumber: Nat8 = 1; 
    private stable var canisterFull = false;
    private stable var nextFileId: FileId = 1;
    private stable var fileIdBucketIndex: [(FileId, BucketNumber)] = [];

    public shared func isCanisterFull() : async Bool {
        return canisterFull;
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

    private stable let cyclesCheckInterval : Nat = Utilities.getHour() * 24;
    private stable var cyclesCheckTimerId : ?Timer.TimerId = null;

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
};