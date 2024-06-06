import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import T "../data-types/types";
import DTOs "../dtos/organisation-dtos";
import Environment "../utilities/Environment";
import CurrencyManager "../managers/currencyManager";

actor class _OrganisationCanister() {

    private stable var accounts_canister_id = "";
    private stable var projects_canister_id = "";
    private stable var sales_canister_id = "";
    private stable var payroll_canister_id = "";
    private stable var recruitment_canister_id = "";

    private stable var organisation: ?T.Organisation = null;
    private stable var admins: [T.PrincipalId] = [];

    private let currencyManager = CurrencyManager.CurrencyManager();

    public shared ({ caller }) func initialise(dto: DTOs.InitialiseOrganisationDTO) : async (){
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      
      organisation := ?{
        addresses = [];
        auditHistory = [];
        invites = [];
        banner = null;
        contacts = [];
        friendlyName = "";
        id = dto.canisterId;
        lastModified = null;
        logo = null;
        mainAddressId = null;
        mainContactId = null;
        members = [];
        name = dto.name;
        ownerId = dto.ownerId;
        referenceNumber = "";
        createdOn = Time.now();
      };
    };

    public shared ({ caller }) func addCurrency(dto: DTOs.AddCurrencyDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert await isAdmin(principalId);
      return await currencyManager.addCurrency(dto);
    };

    public shared ({ caller }) func isAdmin (principalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
     return isAdminForCaller(principalId);
    };

    public shared ({ caller }) func getServiceCanisterIds() : async DTOs.ServiceCanisterIdsDTO {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isTeamMember(principalId);

      return {
        accountsCanisterId = accounts_canister_id;
        payrollCanisterId = payroll_canister_id;
        projectsCanisterId = projects_canister_id;
        recruitementCanisterId = recruitment_canister_id;
        salesCanisterId = sales_canister_id;
      }
    };

    public shared ({ caller }) func getPublicOrganisation () : async Result.Result<DTOs.OrganisationInfoDTO, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      return #err(#NotFound); //TODO
    };

    public shared ({ caller }) func getOrganisation () : async ?DTOs.OrganisationDTO{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;


      //TODO: only people allowed to

      switch(organisation){
        case (null){
          return null;
        };
        case (?foundOrganisation){
          return ?{
            id = foundOrganisation.id;
            
            name = foundOrganisation.name;
            members = foundOrganisation.members;
            ownerId = foundOrganisation.ownerId;
            banner = foundOrganisation.banner;
            friendlyName = foundOrganisation.friendlyName;
            lastModified = foundOrganisation.lastModified;
            logo = foundOrganisation.logo;
          };  
        }
      };
    };

    public shared ({ caller }) func acceptOrganisationInvitation (callerPrincipalId: T.PrincipalId) : async (){
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      assert not isTeamMember(callerPrincipalId);

      switch(organisation){
        case (null){};
        case (?foundOrganisation){
          let remainingInvitationsBuffer = Buffer.fromArray<T.OrganisationInvite>([]);
          let userInvitationsBuffer = Buffer.fromArray<T.OrganisationInvite>([]);
          for(invitation in Iter.fromArray(foundOrganisation.invites)){
            if(invitation.sentTo == callerPrincipalId){
              userInvitationsBuffer.add(invitation);
            }
            else
            {
              remainingInvitationsBuffer.add(invitation)
            }
          };

          let updatedTeamMembersBuffer = Buffer.fromArray<T.TeamMember>(foundOrganisation.members);
          for(invitation in Iter.fromArray(Buffer.toArray(userInvitationsBuffer))){
            let newTeamMember: T.TeamMember = {
              joined = Time.now();
              organisationId = foundOrganisation.id;
              positions = [invitation.position];
              principalId = invitation.sentTo
            };
            updatedTeamMembersBuffer.add(newTeamMember);
          };

          let updatedOrganisation: T.Organisation = {
            id = foundOrganisation.id;
            ownerId = foundOrganisation.ownerId;
            name = foundOrganisation.name;
            friendlyName = foundOrganisation.friendlyName;
            referenceNumber = foundOrganisation.referenceNumber;
            logo = foundOrganisation.logo;
            banner = foundOrganisation.banner;
            members = Buffer.toArray(updatedTeamMembersBuffer);
            mainAddressId = foundOrganisation.mainAddressId;
            mainContactId = foundOrganisation.mainContactId;
            addresses = foundOrganisation.addresses;
            contacts = foundOrganisation.contacts;
            auditHistory = foundOrganisation.auditHistory;
            invites = Buffer.toArray(remainingInvitationsBuffer);
            lastModified = foundOrganisation.lastModified;
            createdOn = foundOrganisation.createdOn;
          };

          organisation := ?updatedOrganisation;
        }
      };
    };

    public shared ({ caller }) func isUserOrganisationMember (callerPrincipalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      return isTeamMember(principalId);
    };

    public shared ({ caller }) func invitationExists (callerPrincipalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;

      switch(organisation){
        case (null){
          return false;
        };
        case (?foundOrganisation){
          let invitationSentToPrincipalIds = Array.map<T.OrganisationInvite, T.PrincipalId>(foundOrganisation.invites, func(invite : T.OrganisationInvite) : T.PrincipalId { return invite.sentTo });
          return switch (Array.find<T.PrincipalId>(invitationSentToPrincipalIds, func(foundPrincipalId) { foundPrincipalId == callerPrincipalId })) {
            case null { false };
            case _ { true };
          };
        }
      };
    };

    public shared ({ caller }) func acceptInvitation (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;

      switch(organisation){
        case (null){
          return #err(#NotFound);
        };
        case (?foundOrganisation){
          switch (Array.find<T.OrganisationInvite>(foundOrganisation.invites, func(invite) { invite.sentTo == callerPrincipalId })) {
            case null {
              return #err(#NotFound);
            };
            case (?foundInvite) { 
              let membersBuffer = Buffer.fromArray<T.TeamMember>(foundOrganisation.members);
              let newMember: T.TeamMember = {
                joined = Time.now();
                organisationId = foundOrganisation.id;
                positions = [foundInvite.position];
                principalId = callerPrincipalId;
              };
              membersBuffer.add(newMember);
              organisation := ?{
                addresses = foundOrganisation.addresses;
                auditHistory = foundOrganisation.auditHistory;
                banner = foundOrganisation.banner;
                contacts = foundOrganisation.contacts;
                createdOn = foundOrganisation.createdOn;
                friendlyName = foundOrganisation.friendlyName;
                id = foundOrganisation.id;
                invites = Array.filter<T.OrganisationInvite>(foundOrganisation.invites, func(invite) { invite.sentTo != callerPrincipalId });
                lastModified = foundOrganisation.lastModified;
                logo = foundOrganisation.logo;
                mainAddressId = foundOrganisation.mainAddressId;
                mainContactId = foundOrganisation.mainContactId;
                members = Buffer.toArray(membersBuffer);
                name = foundOrganisation.name;
                ownerId = foundOrganisation.ownerId;
                referenceNumber = foundOrganisation.referenceNumber
              };
              return #err(#NotFound);
             };
          };
        }
      };
    };

    public shared ({ caller }) func rejectInvitation (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;

      switch(organisation){
        case (null){
          return #err(#NotFound);
        };
        case (?foundOrganisation){
          switch (Array.find<T.OrganisationInvite>(foundOrganisation.invites, func(invite) { invite.sentTo == callerPrincipalId })) {
            case null {
              return #err(#NotFound);
            };
            case (?foundInvite) { 
              organisation := ?{
                addresses = foundOrganisation.addresses;
                auditHistory = foundOrganisation.auditHistory;
                banner = foundOrganisation.banner;
                contacts = foundOrganisation.contacts;
                createdOn = foundOrganisation.createdOn;
                friendlyName = foundOrganisation.friendlyName;
                id = foundOrganisation.id;
                invites = Array.filter<T.OrganisationInvite>(foundOrganisation.invites, func(invite) { invite.sentTo != callerPrincipalId });
                lastModified = foundOrganisation.lastModified;
                logo = foundOrganisation.logo;
                mainAddressId = foundOrganisation.mainAddressId;
                mainContactId = foundOrganisation.mainContactId;
                members = foundOrganisation.members;
                name = foundOrganisation.name;
                ownerId = foundOrganisation.ownerId;
                referenceNumber = foundOrganisation.referenceNumber
              };
              return #err(#NotFound);
             };
          };
        }
      };
    };

    public shared ({ caller }) func requestAccess (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;


      
      return #ok; //TODO
    };

    public shared ({ caller }) func userAccessRequestExists (callerPrincipalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      return false; //TODO
    };

    public shared ({ caller }) func confirmAccessRequest (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;


      
      return #ok; //TODO
    };

    public shared ({ caller }) func rejectAccessRequest (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;


      
      return #ok; //TODO
    };

    public shared ({ caller }) func leaveOrganisation (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      return #ok; //TODO
    };


    //Organisation Management

    public shared ({ caller }) func updateOrganisationStatus (dto: DTOs.ChargeServiceDTO) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;



      return #ok; //TODO
    };

    public shared ({ caller }) func updateOrganisationDetails(dto: DTOs.UpdateOrganisationDetailDTO) : async Result.Result<(), T.Error> {
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert isAdminForCaller(principalId);
        return #ok; //TODO;
        //update the organisations details

    };

    public shared ({ caller }) func updateOrganisationBanner() : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId); 
      return #ok; //TODO; 
    };

    
    public shared ({ caller }) func chargeService (dto: DTOs.ChargeServiceDTO) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;



      return #ok; //TODO
    };
    
    public shared ({ caller }) func transferCharge (dto: DTOs.ChargeServiceDTO) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;



      return #ok; //TODO
    };
    
    public shared ({ caller }) func acceptCharge (dto: DTOs.ChargeServiceDTO) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;



      return #ok; //TODO
    };
      


    public shared ({ caller }) func activateService (dto: DTOs.ActivateServiceDTO) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;



      return #ok; //TODO
    };





    //Contacts
    
    public shared query ({ caller }) func listContacts(dto: DTOs.ListContacts) : async Result.Result<DTOs.ListContacts, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getContact(dto: DTOs.GetContact) : async Result.Result<DTOs.GetContact, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createContact(dto: DTOs.CreateContact) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateContact(dto: DTOs.UpdateContact) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteContact(dto: DTOs.DeleteContact) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };


    private func isAdminForCaller(caller : T.PrincipalId) : Bool {
      switch (Array.find<T.PrincipalId>(admins, func(admin) { admin == caller })) {
        case null { false };
        case _ { true };
      };
    };

    private func isTeamMember(callerPrincipalId: T.PrincipalId) : Bool {
      switch(organisation){
        case (null){
          return false;
        };
        case (?foundOrganisation){
          let teamMemberPrincipals = Array.map<T.TeamMember, T.PrincipalId>(foundOrganisation.members, func(member : T.TeamMember) : T.PrincipalId { return member.principalId });

          let teamMember = Array.find<T.PrincipalId>(
            teamMemberPrincipals,
            func(memberPrincipalId : T.PrincipalId) : Bool {
              return callerPrincipalId == memberPrincipalId;
            },
          );
          return Option.isSome(teamMember);
        }
      };
    };
    
    system func preupgrade() {
      
    };

    system func postupgrade() {
    };

    
    
    //TODO: Implement cycle topping up as per OpenFPL
};