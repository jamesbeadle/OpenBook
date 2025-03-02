export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const CurrencyId = IDL.Nat32;
  const OrganisationId__1 = IDL.Text;
  const CreateProfileDTO = IDL.Record({
    username: IDL.Text,
    displayName: IDL.Text,
    termsAccepted: IDL.Bool,
    preferredPaymentCurrency: CurrencyId,
    openChatUsername: IDL.Text,
    profession: IDL.Text,
    otherContact: IDL.Text,
    emailAddress: IDL.Text,
    phoneNumber: IDL.Text,
    profilePicture: IDL.Vec(IDL.Nat8),
    userDefinedWallet: IDL.Text,
    organisations: IDL.Vec(OrganisationId__1),
    lastName: IDL.Text,
    firstName: IDL.Text,
  });
  const Error = IDL.Variant({
    DecodeError: IDL.Null,
    NotAllowed: IDL.Null,
    NotEnoughFunds: IDL.Null,
    NotFound: IDL.Null,
    NotAuthorized: IDL.Null,
    InvalidData: IDL.Null,
    AlreadyExists: IDL.Null,
    PaymentError: IDL.Null,
  });
  const Result = IDL.Variant({ ok: IDL.Null, err: Error });
  const DeleteOrganisation = IDL.Record({
    organisationId: OrganisationId__1,
    confirmDelete: IDL.Bool,
  });
  const PrincipalId = IDL.Text;
  const GetOrganisations = IDL.Record({
    owner: PrincipalId,
    offset: IDL.Nat,
    limit: IDL.Nat,
    searchTerm: IDL.Text,
  });
  const OrganisationDTO = IDL.Record({});
  const Organisations = IDL.Record({
    owner: PrincipalId,
    organisations: IDL.Vec(OrganisationDTO),
  });
  const Result_4 = IDL.Variant({ ok: Organisations, err: Error });
  const GetProfile = IDL.Record({ principalId: PrincipalId });
  const ProfileDTO = IDL.Record({
    username: IDL.Text,
    displayName: IDL.Text,
    termsAccepted: IDL.Bool,
    preferredPaymentCurrency: CurrencyId,
    openChatUsername: IDL.Text,
    profession: IDL.Text,
    createDate: IDL.Int,
    lastModified: IDL.Int64,
    otherContact: IDL.Text,
    emailAddress: IDL.Text,
    phoneNumber: IDL.Text,
    profilePicture: IDL.Vec(IDL.Nat8),
    userDefinedWallet: IDL.Text,
    organisations: IDL.Vec(OrganisationId__1),
    lastName: IDL.Text,
    principalId: PrincipalId,
    firstName: IDL.Text,
  });
  const Result_3 = IDL.Variant({ ok: ProfileDTO, err: Error });
  const Result_2 = IDL.Variant({ ok: IDL.Bool, err: Error });
  const CurrencyId__1 = IDL.Nat32;
  const ChangeType = IDL.Variant({
    ChartOfAccountsUpdated: IDL.Null,
    OrganisationUserAdded: IDL.Null,
    OrganisationUserRoleUpdated: IDL.Null,
    OrganisationUserRemoved: IDL.Null,
    OrganisationDetailUpdated: IDL.Null,
    CustomerRecordUpdated: IDL.Null,
    SupplierRecordUpdated: IDL.Null,
  });
  const VisibilityLevel = IDL.Variant({
    Internal: IDL.Null,
    Private: IDL.Null,
    Public: IDL.Null,
  });
  const AuditRecord = IDL.Record({
    changeType: ChangeType,
    timestamp: IDL.Int64,
    visibilityLevel: VisibilityLevel,
  });
  List.fill(IDL.Opt(IDL.Tuple(AuditRecord, List)));
  const OrganisationId = IDL.Nat32;
  const Profile = IDL.Record({
    principal: IDL.Text,
    username: IDL.Text,
    displayName: IDL.Text,
    termsAccepted: IDL.Bool,
    preferredPaymentCurrency: CurrencyId__1,
    openChatUsername: IDL.Text,
    profession: IDL.Text,
    createDate: IDL.Int,
    lastModified: IDL.Int64,
    auditHistory: List,
    profilePictureCanisterId: IDL.Text,
    otherContact: IDL.Text,
    emailAddress: IDL.Text,
    phoneNumber: IDL.Text,
    userDefinedWallet: IDL.Text,
    organisations: IDL.Vec(OrganisationId),
    lastName: IDL.Text,
    firstName: IDL.Text,
  });
  const Result_1 = IDL.Variant({
    ok: IDL.Vec(IDL.Tuple(PrincipalId, Profile)),
    err: Error,
  });
  const CreateOrganisation = IDL.Record({
    ownerId: PrincipalId,
    name: IDL.Text,
  });
  const UpdateProfileDTO = IDL.Record({
    username: IDL.Text,
    displayName: IDL.Text,
    termsAccepted: IDL.Bool,
    preferredPaymentCurrency: CurrencyId,
    openChatUsername: IDL.Text,
    profession: IDL.Text,
    otherContact: IDL.Text,
    emailAddress: IDL.Text,
    phoneNumber: IDL.Text,
    userDefinedWallet: IDL.Text,
    lastName: IDL.Text,
    principalId: PrincipalId,
    firstName: IDL.Text,
  });
  return IDL.Service({
    createProfile: IDL.Func([CreateProfileDTO], [Result], []),
    deleteOrganisation: IDL.Func([DeleteOrganisation], [Result], []),
    deleteProfile: IDL.Func([PrincipalId], [Result], []),
    getOrganisations: IDL.Func([GetOrganisations], [Result_4], []),
    getProfile: IDL.Func([GetProfile], [Result_3], []),
    isOrganisationNameAvailable: IDL.Func([IDL.Text], [Result_2], []),
    isUsernameAvailable: IDL.Func([IDL.Text], [Result_2], []),
    listOGProfiles: IDL.Func([], [Result_1], []),
    purchaseOrganisation: IDL.Func([CreateOrganisation], [Result], []),
    requestCanisterTopup: IDL.Func([IDL.Nat], [], []),
    transferOGProfiles: IDL.Func([], [], ["oneway"]),
    updateProfile: IDL.Func([UpdateProfileDTO], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
