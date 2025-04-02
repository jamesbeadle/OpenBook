import T "../../../data-types/types";
import Types "../../../data-types/accountancy-types";
import DTOs "../../../dtos/accountancy-dtos";
import Result "mo:base/Result";

module{
    public class GeneralLedgerManager(){

        private var transactions: [Types.Transaction] = [];
        private var chartOfAccounts: [Types.GeneralLedgerAccount] = [];

        public func listGeneralLedgerAccounts(dto: DTOs.ListGeneralLedgerAccounts) : Result.Result<DTOs.ListGeneralLedgerAccounts, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getGeneralLedgerAccount(dto: DTOs.GetGeneralLedgerAccount) : Result.Result<DTOs.GetGeneralLedgerAccount, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func createGeneralLedgerAccount(dto: DTOs.CreateGeneralLedgerAccount) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func updateGeneralLedgerAccount(dto: DTOs.UpdateGeneralLedgerAccount) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteGeneralLedgerAccount(dto: DTOs.DeleteGeneralLedgerAccount) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };
        
        public func listJournalEntries(dto: DTOs.ListJournalEntries) : Result.Result<DTOs.ListJournalEntries, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func getJournalEntry(dto: DTOs.GetJournalEntry) : Result.Result<DTOs.GetJournalEntry, T.Error>{
            return #err(#NotFound); //TODO
        };

        public func createJournalEntry(dto: DTOs.CreateJournalEntry) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func updateJournalEntry(dto: DTOs.UpdateJournalEntry) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

        public func deleteJournalEntry(dto: DTOs.DeleteJournalEntry) : Result.Result<(), T.Error>{
            return #err(#NotFound); //TODO
        };

    }
}