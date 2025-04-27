import Ids "mo:waterway-mops/Ids";

module AppIds {
  public type AddressId = Nat32;
  public type ContactId = Nat32;
  public type OrganisationId = Ids.CanisterId;

  public type ProjectId = Nat32;
  public type ProjectLinkId = Nat32;
  public type ProjectStageId = Nat32;
  public type ProjectMilestoneId = Nat32;
  public type ProjectAttachmentId = Nat32;

  public type TaskId = Nat32;
  public type CommentId = Nat32;
  public type StrategicEventId = Nat32;
  
  public type CurrencyId = Nat32;
  public type FileId = Nat32;

  public type CampaignId = Nat32;
};
