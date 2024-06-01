import T "../data-types/types";
import Result "mo:base/Result";


module {
  public class PresaleManager() {
    private var presaleEntries: [(T.PrincipalId, T.PresaleParticipation)] = [];
    private let TOKEN_COUNT = 12_000_000;
    private let TOKEN_PRICE = 50_000;
    private var MINIMUM_PURCHASE_AMOUNT = 20; //Means have to buy 20 * 50_000 e8s == 0.01 ICP
    private var tokensAvailable: Nat64 = 12_000_000;

    

    public func participateInPresale(principalId: T.PrincipalId, icpAmount: Nat64, tokens: Nat64) : async Result.Result<(), T.Error>{
        let participation: T.PresaleParticipation = {
            bookTokens = tokens; icpSwapped = icpAmount; principalId = principalId
        };
        tokensAvailable -= tokens;
        return #ok;
    };

    public func listPresaleAllocation() {
      //if exists if not add
    }

    public func transferPresaleAllocation() {
      
    }
    
  };
};


    