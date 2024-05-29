import List "mo:base/List";
import Blob "mo:base/Blob";
import OB "../data-types/openbook-types";

module DTOs {

  public type SidebarDTO = {

  };

  public type OrganisationDTO = {
    id : OB.OrganisationId;
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

  public type ListProfilesDTO = {
    usernameFilter : Text;
    firstNameFilter : Text;
    lastNameFilter : Text;
    professionFilter : Text;
    currentPage : Int;
    startFilter : Text;
  }

};
