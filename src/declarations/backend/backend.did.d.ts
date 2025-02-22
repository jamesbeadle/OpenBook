import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AuditRecord {
  'changeType' : ChangeType,
  'timestamp' : bigint,
  'visibilityLevel' : VisibilityLevel,
}
export type ChangeType = { 'ChartOfAccountsUpdated' : null } |
  { 'OrganisationUserAdded' : null } |
  { 'OrganisationUserRoleUpdated' : null } |
  { 'OrganisationUserRemoved' : null } |
  { 'OrganisationDetailUpdated' : null } |
  { 'CustomerRecordUpdated' : null } |
  { 'SupplierRecordUpdated' : null };
export interface CreateOrganisation { 'ownerId' : PrincipalId, 'name' : string }
export interface CreateProfileDTO {
  'username' : string,
  'displayName' : string,
  'termsAccepted' : boolean,
  'preferredPaymentCurrency' : CurrencyId,
  'openChatUsername' : string,
  'profession' : string,
  'otherContact' : string,
  'emailAddress' : string,
  'phoneNumber' : string,
  'profilePicture' : Uint8Array | number[],
  'userDefinedWallet' : string,
  'organisations' : Array<OrganisationId__1>,
  'lastName' : string,
  'firstName' : string,
}
export type CurrencyId = number;
export type CurrencyId__1 = number;
export interface DeleteOrganisation {
  'organisationId' : OrganisationId__1,
  'confirmDelete' : boolean,
}
export type Error = { 'DecodeError' : null } |
  { 'NotAllowed' : null } |
  { 'NotEnoughFunds' : null } |
  { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'InvalidData' : null } |
  { 'AlreadyExists' : null } |
  { 'PaymentError' : null };
export type List = [] | [[AuditRecord, List]];
export type OrganisationId = number;
export type OrganisationId__1 = string;
export type PrincipalId = string;
export interface Profile {
  'principal' : string,
  'username' : string,
  'displayName' : string,
  'termsAccepted' : boolean,
  'preferredPaymentCurrency' : CurrencyId__1,
  'openChatUsername' : string,
  'profession' : string,
  'createDate' : bigint,
  'lastModified' : bigint,
  'auditHistory' : List,
  'profilePictureCanisterId' : string,
  'otherContact' : string,
  'emailAddress' : string,
  'phoneNumber' : string,
  'userDefinedWallet' : string,
  'organisations' : Uint32Array | number[],
  'lastName' : string,
  'firstName' : string,
}
export interface ProfileDTO {
  'principal' : string,
  'username' : string,
  'displayName' : string,
  'termsAccepted' : boolean,
  'preferredPaymentCurrency' : CurrencyId,
  'openChatUsername' : string,
  'profession' : string,
  'createDate' : bigint,
  'lastModified' : bigint,
  'otherContact' : string,
  'emailAddress' : string,
  'phoneNumber' : string,
  'profilePicture' : Uint8Array | number[],
  'userDefinedWallet' : string,
  'organisations' : Array<OrganisationId__1>,
  'lastName' : string,
  'firstName' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Array<[PrincipalId, Profile]> } |
  { 'err' : Error };
export type Result_2 = { 'ok' : boolean } |
  { 'err' : Error };
export type Result_3 = { 'ok' : ProfileDTO } |
  { 'err' : Error };
export interface UpdateProfileDTO {
  'username' : string,
  'displayName' : string,
  'termsAccepted' : boolean,
  'preferredPaymentCurrency' : CurrencyId,
  'openChatUsername' : string,
  'profession' : string,
  'otherContact' : string,
  'emailAddress' : string,
  'phoneNumber' : string,
  'userDefinedWallet' : string,
  'lastName' : string,
  'principalId' : PrincipalId,
  'firstName' : string,
}
export type VisibilityLevel = { 'Internal' : null } |
  { 'Private' : null } |
  { 'Public' : null };
export interface _SERVICE {
  'createProfile' : ActorMethod<[CreateProfileDTO], Result>,
  'deleteOrganisation' : ActorMethod<[DeleteOrganisation], Result>,
  'deleteProfile' : ActorMethod<[PrincipalId], Result>,
  'getProfile' : ActorMethod<[], Result_3>,
  'isOrganisationNameAvailable' : ActorMethod<[string], Result_2>,
  'isUsernameAvailable' : ActorMethod<[string], Result_2>,
  'listOGProfiles' : ActorMethod<[], Result_1>,
  'purchaseOrganisation' : ActorMethod<[CreateOrganisation], Result>,
  'requestCanisterTopup' : ActorMethod<[bigint], undefined>,
  'transferOGProfiles' : ActorMethod<[], undefined>,
  'updateProfile' : ActorMethod<[UpdateProfileDTO], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
