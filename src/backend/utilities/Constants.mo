import T "../data-types/accounts-types";
module Constants {

  public let CURRENCIES: [T.Currency] = [
      {id = 1; name = "ICP"; ticker = "ICP"; decimalPlaces = 4; canister = ""; currencyType = #Token; symbol = "ICP" },
      {id = 2; name = "BOOK"; ticker = "BOOK"; decimalPlaces = 4; canister = ""; currencyType = #Token; symbol = "BOOK"  },
      {id = 3; name = "Bitcoin"; ticker = "ckBTC"; decimalPlaces = 4; canister = ""; currencyType = #Token; symbol = "BTC"  },
      {id = 4; name = "USD"; ticker = "ckUSD"; decimalPlaces = 4; canister = ""; currencyType = #Fiat; symbol = "USD"  },
      {id = 4; name = "GBP"; ticker = "ckGBP"; decimalPlaces = 4; canister = ""; currencyType = #Fiat; symbol = "GBP"  }
  ];
  
  public let BOOK_TRANSACTION_FEE : Nat64 = 100_000;
  public let ICP_TRANSACTION_FEE : Nat64 = 10_000;
};