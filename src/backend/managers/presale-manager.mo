import Result "mo:base/Result";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class PresaleManager() {
    private var presaleEntries: [(T.PrincipalId, T.PresaleParticipation)] = [];
    private let TOKEN_COUNT = 12_000_000;
    private let TOKEN_PRICE = 50_000;
    private var MINIMUM_PURCHASE_AMOUNT = 20; //Means have to buy 20 * 50_000 e8s == 0.01 ICP
    private var tokensAvailable: Nat64 = 12_000_000;

    public func getPresaleParticipation(principalId: T.PrincipalId) : [T.PresaleParticipation] {
      return [];//todo
    };

    public func participateInPresale(principalId: T.PrincipalId, icpAmount: Nat64, tokens: Nat64) : async Result.Result<(), T.Error>{
        let participation: T.PresaleParticipation = {
            bookTokens = tokens; icpSwapped = icpAmount; principalId = principalId
        };
        tokensAvailable -= tokens;
        return #ok;
    };
    
    public func updatePresaleNNSId(principalId: T.PrincipalId, newNNSId: Text) : async Result.Result<(), T.Error> {
        return #ok;
    };

    public func listPresaleAllocation(principalId: T.PrincipalId, tokens: Nat64, listPrice: Nat64) : async Result.Result<(), T.Error> {
      //if exists if not add

      if(listPrice < 1_000_000){
        return #err(#InvalidData);
      };

      if(tokens < 10){
        return #err(#InvalidData);
      };

      if (tokens % 10 != 0) {
        return #err(#InvalidData);
      };


      return #ok;
    };

    public func unlistPresaleAllocation(principalId: T.PrincipalId, tokens: Nat64) : async Result.Result<(), T.Error> {
      //if exists if not add
      
      if(tokens < 10){
        return #err(#InvalidData);
      };

      if (tokens % 10 != 0) {
        return #err(#InvalidData);
      };
      return #ok;
    };

    public func transferPresaleAllocation(principalId: T.PrincipalId, ownerId: T.PrincipalId) : async Result.Result<(), T.Error> {
        return #ok;
    };

    public func getPresaleAllocationListings() : async Result.Result<[DTOs.PresaleListingDTO], T.Error>{
        return #ok([]);
    };

    public func getListing(ownerId: T.PrincipalId) : async ?DTOs.PresaleListingDTO {
      return null;
    };
    
  };
};


    