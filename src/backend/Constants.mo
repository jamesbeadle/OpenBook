import T "data_types/accounts-types";
module Constants {

  public let CURRENCIES: [T.Currency] = [
      {id = 1; name = "ICP"; ticker = "ICP"; decimalPlaces = 4; },
      {id = 2; name = "BOOK"; ticker = "BOOK"; decimalPlaces = 4; },
      {id = 3; name = "Bitcoin"; ticker = "ckBTC"; decimalPlaces = 4; },
      {id = 4; name = "USD"; ticker = "ckUSD"; decimalPlaces = 4; }
  ];
  
  public let BOOK_TRANSACTION_FEE : Nat64 = 100_000;
  public let ICP_TRANSACTION_FEE : Nat64 = 10_000;
};