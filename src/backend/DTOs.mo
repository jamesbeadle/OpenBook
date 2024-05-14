import List "mo:base/List";
import Blob "mo:base/Blob";
import T "types";

module DTOs {

  public type SidebarDTO = {

  };

  public type ProfileDTO = {
    principal : Text;
    username : Text;
    displayName : Text;
    profession : Text;
    firstName : Text;
    lastName : Text;
    openChatUsername : Text;
    emailAddress : Text;
    phoneNumber : Text;
    otherContact : Text;
    termsAccepted : Bool;
    profilePicture : Blob;
    organisations : List.List<DTOs.OrganisationDTO>;
    createDate : Int;
    lastModified : Int64;
    userDefinedWallet : Text;
    preferredPaymentCurrency : T.CurrencyId;
  };

  public type UpdateProfileDTO = {
    username : Text;
    displayName : Text;
    profession : Text;
    firstName : Text;
    lastName : Text;
    openChatUsername : Text;
    emailAddress : Text;
    phoneNumber : Text;
    otherContact : Text;
    termsAccepted : Bool;
    userDefinedWallet : Text;
    preferredPaymentCurrency : T.CurrencyId;
  };

  public type OrganisationDTO = {
    id : T.OrganisationId;
    name : Text;
    friendlyName : Text;
    logo : Text;
    banner : Text;
    lastModified : Int64;
  };

  public type DirectoryDTO = {
    profiles : [DirectoryProfileDTO];
    totalEntries : Int;
    currentPage : Int;
  };

  public type DirectoryProfileDTO = {
    principal : Text;
    username : Text;
    profilePicture : Blob;
    firstName : Text;
    lastName : Text;
    profession : Text;
  };

  public type BankingDashboardDTO = {};
  public type BankingListDTO = {};
  public type CreateBankAccountDTO = {};
  public type GetBankAccountDTO = {};
  public type UpdateBankAccountDTO = {};
  public type RemoveBankAccountDTO = {};

  public type CreateGLTransactionDTO = {};

  public type DebtorsDashboardDTO = {};
  public type DebtorsListDTO = {};
  public type CreateCustomerDTO = {};
  public type GetCustomerDTO = {};
  public type UpdateCustomerDTO = {};
  public type RemoveCustomerDTO = {};

  public type CreditorsDashboardDTO = {};
  public type CreditorsListDTO = {};
  public type CreateSupplierDTO = {};
  public type GetSupplierDTO = {};
  public type UpdateSupplierDTO = {};
  public type RemoveSupplierDTO = {};

  public type ProfitLossDashboardDTO = {};
  public type ProfitLossFiltersDTO = {};

  public type BalanceSheetDashboardDTO = {};
  public type BalanceSheetFiltersDTO = {};

  public type FinancingDashboardDTO = {};
  public type ActiveFinanceAgreementsListDTO = {};
  public type FinancedAgreementListsDTO = {};
  public type RepaidAgreementsListDTO = {};
  public type CreateFinanceAgreementDTO = {};

};
