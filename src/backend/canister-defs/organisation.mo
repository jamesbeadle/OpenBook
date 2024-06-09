import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Timer "mo:base/Timer";
import Nat64 "mo:base/Nat64";
import T "../data-types/types";
import DTOs "../dtos/organisation-dtos";
import Environment "../utilities/Environment";
import CurrencyManager "../managers/currency-manager";
import Utilities "../utilities/Utilities";
import Cycles "mo:base/ExperimentalCycles";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import ContactsManager "../managers/contacts-manager";

actor class _OrganisationCanister() {

    private stable var accountancy_canister_id = "";
    private stable var projects_canister_id = "";
    private stable var sales_canister_id = "";
    private stable var timesheets_canister_id = "";
    private stable var recruitment_canister_id = "";
    private stable var storage_canister_id = "";

    private stable var organisation: ?T.Organisation = null;
    private stable var admins: [T.PrincipalId] = [];

    private let currencyManager = CurrencyManager.CurrencyManager();
    private let contactsManager = ContactsManager.ContactsManager();

    public shared ({ caller }) func initialise(dto: DTOs.InitialiseOrganisation) : async (){
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
        accessRequests = [];
        chargeInformation = null;
      };
    };

    public shared ({ caller }) func isAdmin (principalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
     return isAdminForCaller(principalId);
    };

    public shared ({ caller }) func addCurrency(dto: DTOs.AddCurrency) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert await isAdmin(principalId);
      return await currencyManager.addCurrency(dto);
    };

    public shared ({ caller }) func getServiceCanisterIds() : async DTOs.ServiceCanisterIds {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isTeamMember(principalId);

      return {
        accountancyCanisterId = accountancy_canister_id;
        timesheetsCanisterId = timesheets_canister_id;
        projectsCanisterId = projects_canister_id;
        recruitmentCanisterId = recruitment_canister_id;
        salesCanisterId = sales_canister_id;
        storageCanisterId = storage_canister_id;
      }
    };

    public shared ({ caller }) func getPublicOrganisation () : async Result.Result<DTOs.OrganisationInfo, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      
      switch(organisation){
        case (null){
          return #err(#NotFound);
        };
        case (?foundOrganisation){
          let dto: DTOs.Organisation = {
            id = foundOrganisation.id;
            name = foundOrganisation.name;
            ownerId = foundOrganisation.ownerId;
            friendlyName = foundOrganisation.friendlyName;
            logo = foundOrganisation.logo;
            banner = foundOrganisation.banner;
            lastModified = foundOrganisation.lastModified;
            members = foundOrganisation.members;
          };
          return #ok(dto);
        }
      };
    };

    public shared ({ caller }) func getOrganisation () : async ?DTOs.Organisation{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isTeamMember(principalId);

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
            accessRequests = foundOrganisation.accessRequests;
            chargeInformation = foundOrganisation.chargeInformation;
          };

          organisation := ?updatedOrganisation;
        }
      };
    };

    public shared ({ caller }) func isUserOrganisationMember (callerPrincipalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      return isTeamMember(callerPrincipalId);
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
                referenceNumber = foundOrganisation.referenceNumber;
                accessRequests = foundOrganisation.accessRequests;
                chargeInformation = foundOrganisation.chargeInformation;
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
                referenceNumber = foundOrganisation.referenceNumber;
                accessRequests = foundOrganisation.accessRequests;
                chargeInformation = foundOrganisation.chargeInformation;
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
      assert not isTeamMember(callerPrincipalId);

      switch(organisation){
        case (null){
            return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          let existingRequest = Array.find(foundOrganisation.accessRequests, func(request: T.AccessRequest) : Bool {
            request.requesterPrincipalId == callerPrincipalId
          });

          if(Option.isSome(existingRequest)){
            return #err(#AlreadyExists);
          };

          let requestsBuffer = Buffer.fromArray<T.AccessRequest>(foundOrganisation.accessRequests);

          let accessRequest: T.AccessRequest = {
            requestTime = Time.now();
            requesterPrincipalId = callerPrincipalId;
          };

          requestsBuffer.add(accessRequest);

          let updatedOrganisation: T.Organisation = {
            id = foundOrganisation.id;
            ownerId = foundOrganisation.ownerId;
            name = foundOrganisation.name;
            friendlyName = foundOrganisation.friendlyName;
            referenceNumber = foundOrganisation.referenceNumber;
            logo = foundOrganisation.logo;
            banner = foundOrganisation.banner;
            members = foundOrganisation.members;
            mainAddressId = foundOrganisation.mainAddressId;
            mainContactId = foundOrganisation.mainContactId;
            addresses = foundOrganisation.addresses;
            contacts = foundOrganisation.contacts;
            auditHistory = foundOrganisation.auditHistory;
            invites = foundOrganisation.invites;
            lastModified = foundOrganisation.lastModified;
            createdOn = foundOrganisation.createdOn;
            accessRequests = Buffer.toArray(requestsBuffer);
            chargeInformation = foundOrganisation.chargeInformation;
          };

          organisation := ?updatedOrganisation;


          return #ok;
          
        };
      }
    };

    public shared ({ caller }) func userAccessRequestExists (callerPrincipalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;

      switch(organisation){
        case (null){
            return false;
        };
        case (?foundOrganisation){
          
          let existingRequest = Array.find(foundOrganisation.accessRequests, func(request: T.AccessRequest) : Bool {
            request.requesterPrincipalId == callerPrincipalId
          });

          return Option.isSome(existingRequest);          
        };
      }
    };

    public shared ({ caller }) func confirmAccessRequest (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;

      switch(organisation){
        case (null){
            return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          let existingRequest = Array.find(foundOrganisation.accessRequests, func(request: T.AccessRequest) : Bool {
            request.requesterPrincipalId == callerPrincipalId
          });

          if(Option.isSome(existingRequest)){
            return #err(#AlreadyExists);
          };

          let requestsBuffer = Buffer.fromArray<T.AccessRequest>(foundOrganisation.accessRequests);

          let accessRequest: T.AccessRequest = {
            requestTime = Time.now();
            requesterPrincipalId = callerPrincipalId;
          };

          requestsBuffer.add(accessRequest);

          let updatedOrganisation: T.Organisation = {
            id = foundOrganisation.id;
            ownerId = foundOrganisation.ownerId;
            name = foundOrganisation.name;
            friendlyName = foundOrganisation.friendlyName;
            referenceNumber = foundOrganisation.referenceNumber;
            logo = foundOrganisation.logo;
            banner = foundOrganisation.banner;
            members = foundOrganisation.members;
            mainAddressId = foundOrganisation.mainAddressId;
            mainContactId = foundOrganisation.mainContactId;
            addresses = foundOrganisation.addresses;
            contacts = foundOrganisation.contacts;
            auditHistory = foundOrganisation.auditHistory;
            invites = foundOrganisation.invites;
            lastModified = foundOrganisation.lastModified;
            createdOn = foundOrganisation.createdOn;
            accessRequests = Buffer.toArray(requestsBuffer);
            chargeInformation = foundOrganisation.chargeInformation;
          };

          organisation := ?updatedOrganisation;

          return #ok;
          
        };
      }
    };

    public shared ({ caller }) func rejectAccessRequest (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;

      switch(organisation){
        case (null){
            return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          let existingRequest = Array.find(foundOrganisation.accessRequests, func(request: T.AccessRequest) : Bool {
            request.requesterPrincipalId == callerPrincipalId
          });

          if(not Option.isSome(existingRequest)){
            return #err(#NotFound);
          };

          let updatedOrganisation: T.Organisation = {
            id = foundOrganisation.id;
            ownerId = foundOrganisation.ownerId;
            name = foundOrganisation.name;
            friendlyName = foundOrganisation.friendlyName;
            referenceNumber = foundOrganisation.referenceNumber;
            logo = foundOrganisation.logo;
            banner = foundOrganisation.banner;
            members = foundOrganisation.members;
            mainAddressId = foundOrganisation.mainAddressId;
            mainContactId = foundOrganisation.mainContactId;
            addresses = foundOrganisation.addresses;
            contacts = foundOrganisation.contacts;
            auditHistory = foundOrganisation.auditHistory;
            invites = foundOrganisation.invites;
            lastModified = foundOrganisation.lastModified;
            createdOn = foundOrganisation.createdOn;
            accessRequests = Array.filter(foundOrganisation.accessRequests, func(request: T.AccessRequest) : Bool { request.requesterPrincipalId != callerPrincipalId });
            chargeInformation = foundOrganisation.chargeInformation;
          };

          organisation := ?updatedOrganisation;

          return #ok;
        };
      }
    };

    public shared ({ caller }) func leaveOrganisation (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      assert isTeamMember(callerPrincipalId);

      switch(organisation){
        case (null){
            return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          let updatedOrganisation: T.Organisation = {
            id = foundOrganisation.id;
            ownerId = foundOrganisation.ownerId;
            name = foundOrganisation.name;
            friendlyName = foundOrganisation.friendlyName;
            referenceNumber = foundOrganisation.referenceNumber;
            logo = foundOrganisation.logo;
            banner = foundOrganisation.banner;
            members = Array.filter(foundOrganisation.members, func(member: T.TeamMember) : Bool { member.principalId != callerPrincipalId });
            mainAddressId = foundOrganisation.mainAddressId;
            mainContactId = foundOrganisation.mainContactId;
            addresses = foundOrganisation.addresses;
            contacts = foundOrganisation.contacts;
            auditHistory = foundOrganisation.auditHistory;
            invites = foundOrganisation.invites;
            lastModified = foundOrganisation.lastModified;
            createdOn = foundOrganisation.createdOn;
            accessRequests = foundOrganisation.accessRequests;
            chargeInformation = foundOrganisation.chargeInformation;
          };

          organisation := ?updatedOrganisation;

          return #ok;
        };
      }
    };

    public shared ({ caller }) func updateOrganisationDetails(dto: DTOs.UpdateOrganisationDetail) : async Result.Result<(), T.Error> {
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert isAdminForCaller(principalId);

        switch(organisation){
          case (null){
            return #err(#NotFound);
          };
          case (?foundOrganisation){

            var name = foundOrganisation.name;
            var friendlyName = foundOrganisation.friendlyName;
            var referenceNumber = foundOrganisation.referenceNumber;
            var logo = foundOrganisation.logo;
            var banner = foundOrganisation.banner;

            switch(dto.name){
              case (null) {};
              case (?updatedName){
                name := updatedName;
              }
            };

            switch(dto.friendlyName){
              case (null) {};
              case (?updatedFriendlyName){
                friendlyName := updatedFriendlyName;
              }
            };

            switch(dto.referenceNumber){
              case (null) {};
              case (?updatedReferenceNumber){
                referenceNumber := updatedReferenceNumber;
              }
            };

            switch(dto.logo){
              case (null) {};
              case (?updatedLogo){
                logo := ?updatedLogo;
              }
            };

            switch(dto.banner){
              case (null) {};
              case (?updatedBanner){
                banner := ?updatedBanner;
              }
            };

            let updatedOrganisation: T.Organisation = {
              id = foundOrganisation.id;
              ownerId = foundOrganisation.ownerId;
              name = name;
              friendlyName = friendlyName;
              referenceNumber = referenceNumber;
              logo = logo;
              banner = banner;
              members = foundOrganisation.members;
              mainAddressId = foundOrganisation.mainAddressId;
              mainContactId = foundOrganisation.mainContactId;
              addresses = foundOrganisation.addresses;
              contacts = foundOrganisation.contacts;
              auditHistory = foundOrganisation.auditHistory;
              invites = foundOrganisation.invites;
              lastModified = foundOrganisation.lastModified;
              createdOn = foundOrganisation.createdOn;
              accessRequests = foundOrganisation.accessRequests;
              chargeInformation = foundOrganisation.chargeInformation;
            };

            organisation := ?updatedOrganisation;
          }
        };

        return #ok;
    };

    public shared ({ caller }) func purchaseCharge (dto: DTOs.PurchaseCharge) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId);

      //TODO: IMPLEMENT CHARGE AND PAYMENT SYSTEM

      return #ok; //TODO

    };


    public shared ({ caller }) func chargeService (dto: DTOs.ChargeService) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId);

      //TODO: IMPLEMENT CHARGE AND PAYMENT SYSTEM

      return #ok; //TODO
    };

    public shared ({ caller }) func transferCharge (dto: DTOs.TransferCharge) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId);

      //TODO: IMPLEMENT CHARGE AND PAYMENT SYSTEM

      return #ok; //TODO
    };

    public shared ({ caller }) func updateChargeRanges (dto: DTOs.UpdateChargeRanges) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId);

      //TODO: IMPLEMENT CHARGE AND PAYMENT SYSTEM

      return #ok; //TODO
    };

    //Contacts
    
    public shared ({ caller }) func listContacts(dto: DTOs.ListContacts) : async Result.Result<DTOs.ListContacts, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isTeamMember(principalId);
      return await contactsManager.listContacts(dto);
    };

    public shared ({ caller }) func getContact(dto: DTOs.GetContact) : async Result.Result<DTOs.GetContact, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isTeamMember(principalId);
      return await contactsManager.getContact(dto);
    };

    public shared ({ caller }) func createContact(dto: DTOs.CreateContact) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId);
      return await contactsManager.createContact(dto);
    };

    public shared ({ caller }) func updateContact(dto: DTOs.UpdateContact) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId);
      return await contactsManager.updateContact(dto);
    };

    public shared ({ caller }) func deleteContact(dto: DTOs.DeleteContact) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId);
      return await contactsManager.deleteContact(dto);
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

    //event logs
    private stable var stable_event_logs: [T.EventLogEntry] = [];
    private stable var stable_next_system_event_id: Nat = 1;
    
    system func preupgrade() {
      
    };

    system func postupgrade() {
      ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
    }; 
    
    private func postUpgradeCallback() : async (){      
      await systemCheckCallback();
      await cyclesCheckCallback();
    };

    private func systemCheckCallback() : async () {
      
      let eventTime = Time.now();
      let dateString = Utilities.getReadableDate(eventTime);

      let cyclesAvailable: Nat = await getCanisterCyclesAvailable();
      
      recordSystemEvent({
        eventDetail = "Good morning from OpenBook. I have " # Nat.toText(cyclesAvailable) # " cycles available in my backend canister wallet."; 
        eventId = 0;
        eventTime = Time.now();
        eventTitle = "System Check " # dateString # ". (ID: " # Int.toText(stable_next_system_event_id) # ")";
        eventType = #SystemCheck;
      });

      let remainingDuration = Nat64.toNat(Nat64.fromIntWrap(Utilities.getNext6AM() - Time.now()));
      ignore Timer.setTimer<system>(#nanoseconds remainingDuration, systemCheckCallback);
    };

    private func recordSystemEvent(eventLog: T.EventLogEntry){
      let eventsBuffer = Buffer.fromArray<T.EventLogEntry>(stable_event_logs);
      eventsBuffer.add({
        eventDetail = eventLog.eventDetail;
        eventId = stable_next_system_event_id;
        eventTime = eventLog.eventTime;
        eventTitle = eventLog.eventTitle;
        eventType = eventLog.eventType;
      }); 
      stable_event_logs := Buffer.toArray(eventsBuffer);
      stable_next_system_event_id += 1;
    };

    private func getCanisterCyclesAvailable() : async Nat {
      return Cycles.available();
    };

    private func cyclesCheckCallback() : async () {
      await checkCycles();
      await checkCanisterCycles("Accountancy");
      await checkCanisterCycles("Sales");
      await checkCanisterCycles("Timesheets");
      await checkCanisterCycles("Recruitment");
      await checkCanisterCycles("Projects");
    };


    private func checkCycles() : async () {

      let balance = Cycles.balance();

      if (balance < 2_000_000_000_000) {
        //TODO: They do need to request cycles from the backend provided they can afford them
        let openfpl_backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
          requestCanisterTopup : (cycles: Nat) -> async ();
        };
        await openfpl_backend_canister.requestCanisterTopup(2_000_000_000_000);
      };
    };  

    private func checkCanisterCycles(canisterId: T.CanisterId) : async () {
      



      //call the function on the canister to get the cycles
      //let balance = canister.getCyclesBalance();

      //if (balance < 2_000_000_000_000) {
      //  await requestCanisterTopup(2_000_000_000_000);
      //};
      //ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), cyclesCheckCallback);
    };    
};