import T "../../../data-types/types";
import DTOs "../../../dtos/accountancy-dtos";
import Result "mo:base/Result";

module {

  public class ReportingManager() {


    public func getChartOfAccounts(dto: DTOs.GetChartOfAccounts) : Result.Result<DTOs.GetTrialBalance, T.Error>{
        //KEY OUTPUT
        return #err(#NotFound);
    };

    public func getTrialBalance(dto: DTOs.GetTrialBalance) : Result.Result<DTOs.GetTrialBalance, T.Error>{
        //KEY OUTPUT
        return #err(#NotFound);
    };

    public func getBalanceSheet(dto: DTOs.GetBalanceSheet) : Result.Result<DTOs.GetBalanceSheet, T.Error>{
        //KEY OUTPUT
        return #err(#NotFound);
    };

    public func getIncomeStatement(dto: DTOs.GetIncomeStatement) : Result.Result<DTOs.GetIncomeStatement, T.Error>{
        //KEY OUTPUT
        return #err(#NotFound);
    };

    public func getCashflowStatement(dto: DTOs.GetCashflowStatement) : Result.Result<DTOs.GetCashflowStatement, T.Error>{
        //KEY OUTPUT
        return #err(#NotFound);
    };

    public func getEquityStatement(dto: DTOs.GetEquityStatement) : Result.Result<DTOs.GetEquityStatement, T.Error>{
        //KEY OUTPUT
        return #err(#NotFound);
    };

    public func getFixedAssetRegister(dto: DTOs.GetFixedAssetRegister) : Result.Result<DTOs.GetFixedAssetRegister, T.Error>{
        //KEY OUTPUT
        return #err(#NotFound);
    };
  }
};