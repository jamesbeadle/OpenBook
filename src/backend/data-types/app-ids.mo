import Ids "mo:waterway-mops/Ids";

module AppIds {
  public type AddressId = Nat32;
  public type ContactId = Nat32;
  public type OrganisationId = Ids.CanisterId;

  public type ProjectId = Nat16;
  public type ProjectLinkId = Nat16;
  public type ProjectStageId = Nat16;
  public type ProjectMilestoneId = Nat16;
  public type ProjectAttachmentId = Nat16;

  public type TaskId = Nat16;
  public type CommentId = Nat16;
  
  public type CurrencyId = Nat32;
  public type FileId = Nat32;
};
