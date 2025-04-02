
module AppEnums {

  public type MembershipLevel = {
    #Founding; //5000000 BOOK STAKED - SINGULAR CHECK
    #BlueChip; //1000000 BOOK STAKED - CHECKED EVERY 5 YEARS 
    #MidCap; //100000 BOOK STAKED - CHECKED ANNUALLY
    #StartUp; //10000 BOOK STAKED - CHECKED ANNUALLY
    #Subscription; //1000 BOOK STAKED - CHECKED MONTHLY
  };

  public type ChangeType = {
    #OrganisationDetailUpdated;
    #CustomerRecordUpdated;
    #SupplierRecordUpdated;
    #ChartOfAccountsUpdated;
    #OrganisationUserAdded;
    #OrganisationUserRemoved;
    #OrganisationUserRoleUpdated;
  };

  public type VisibilityLevel = {
    #Private;
    #Internal;
    #Public;
  };

  public type ContactMethod = {
    #Email;
    #Phone;
    #Post;
    #OpenChat;
    #Twitter;
    #Discord;
    #Telegram;
    #Other;
  };

};
