import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import T "../data-types/types";
import DTOs "../dtos/organisation-dtos";

module {

  public class CurrencyManager() {

    private var currencies : [T.Currency] = [];
    private var nextCurrencyId: T.CurrencyId = 1;


    public func getStableCurrencies() : [T.Currency] {
      return currencies;
    };

    public func setStableCurrencies(stable_currencies : [T.Currency]) {
      currencies := stable_currencies;
    };

    public func getStableNextCurrencyId() : T.CurrencyId{
      return nextCurrencyId;
    };

    public func setStableNextCanisterId(stable_next_CurrencyId: T.CurrencyId){
      nextCurrencyId := stable_next_CurrencyId;
    };
    
    public func addCurrency(dto: DTOs.AddCurrencyDTO) : async Result.Result<(), T.Error>{

      let currencyBuffer = Buffer.fromArray<T.Currency>(currencies);
      currencyBuffer.add({
        decimalPlaces = dto.decimalPlaces; id = nextCurrencyId; name = dto.name; ticker = dto.ticker;
      });

      nextCurrencyId += 1;

      return #err(#NotFound);
    };

  };
};
