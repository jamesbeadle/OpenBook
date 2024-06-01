import T "../data-types/types";

module {

    public class StorageManager() {
        
        private var storage_canister_ids : [T.CanisterId] = [];
        private var active_canister_id: T.CanisterId = "";

        public func getStableStorageCanisterIds() : [T.CanisterId] {
            return storage_canister_ids;
        };

        public func setStableStorageCanisterIds(stable_storage_canister_ids: [T.CanisterId]) {
            storage_canister_ids := stable_storage_canister_ids;
        };

        public func getStableActiveCanisterId() : T.CanisterId {
        return active_canister_id; 
        };

        public func setStableActiveCanisterId(stable_active_canisterId: T.CanisterId) : () {
        active_canister_id := stable_active_canisterId; 
        };
        
    };
};