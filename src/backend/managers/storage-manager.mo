import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module {

    public class StorageManager() {
        
        private var storage_canister_ids : [Base.CanisterId] = [];
        private var active_canister_id: Base.CanisterId = "";

        public func getStableStorageCanisterIds() : [Base.CanisterId] {
            return storage_canister_ids;
        };

        public func setStableStorageCanisterIds(stable_storage_canister_ids: [Base.CanisterId]) {
            storage_canister_ids := stable_storage_canister_ids;
        };

        public func getStableActiveCanisterId() : Base.CanisterId {
        return active_canister_id; 
        };

        public func setStableActiveCanisterId(stable_active_canisterId: Base.CanisterId) : () {
        active_canister_id := stable_active_canisterId; 
        };
        
    };
};