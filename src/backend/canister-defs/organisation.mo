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
import Blob "mo:base/Blob";
import Base "mo:waterway-mops/BaseTypes";
import ContactsManager "../managers/contacts-manager";
import ICPLedger "../defs/ledger";
import Account "../utilities/Account";
import Org "../data-types/organisation-types";

actor class _OrganisationCanister() {

    private stable var organisation: ?Org.Organisation = null;
    private stable var admins: [Base.PrincipalId] = [];
    private stable var stable_event_logs: [T.EventLogEntry] = [];
    private stable var stable_next_system_event_id: Nat = 1;

    private let currencyManager = CurrencyManager.CurrencyManager();
    private let contactsManager = ContactsManager.ContactsManager();

    private let ledger : ICPLedger.Interface = actor (ICPLedger.CANISTER_ID);
    private let ICP_CHARGE_RATE = 100_000_000;
    let ICP_FEE : Nat = 10_000;
    let DEFAULT_CYCLES_CHECK_AMOUNT: Nat = 2_000_000_000_000;
    private var minimumCanisterCycles: Nat = 10_000_000_000_000;
    private var canisterTopupAmount: Nat = 10_000_000_000_000;

    /* Organisation getters */

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

    /* Organisation management */

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

            let updatedOrganisation: Org.Organisation = {
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
              chargeBalance = foundOrganisation.chargeBalance;
            };

            organisation := ?updatedOrganisation;
          }
        };

        return #ok;
    };

    public shared ({ caller }) func addCurrency(dto: DTOs.AddCurrency) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert await isAdmin(principalId);
      return await currencyManager.addCurrency(dto);
    };

    //TODO: Single charge function only
    public shared ({ caller }) func purchaseCharge (dto: DTOs.PurchaseCharge) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdminForCaller(principalId);

      switch(organisation){
        case (null){
          return #err(#NotFound);
        };
        case (?foundOrganisation){   
          let purchaseResult = await ledger.icrc1_transfer({
            memo = ?Blob.fromArray([]);
            from_subaccount = ?Account.principalToSubaccount(Principal.fromText(foundOrganisation.id));
            to = {owner = Principal.fromText(Environment.BACKEND_CANISTER_ID); subaccount = ?Account.defaultSubaccount()};
            amount = dto.icpAmount - ICP_FEE;
            fee = ?ICP_FEE;
            created_at_time = ?Nat64.fromNat(Int.abs(Time.now()));
          });
          switch(purchaseResult){
            case (#Err result){
              return #err(#PaymentError);
            };
            case (#Ok result){

              let chargeUnits = dto.icpAmount / ICP_CHARGE_RATE;
              
                  let updatedOrganisation: Org.Organisation = {
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
                    accessRequests = foundOrganisation.accessRequests;
                    chargeBalance = chargeUnits;
                  };
                  
                  organisation := ?updatedOrganisation;
                }
              };              
              return #ok;
            };
          };
        
    };

    /* Organisation membership */

    public shared ({ caller }) func acceptInvitation () : async (){
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert not isTeamMember(principalId);

      let isOrganisationMember = await isUserOrganisationMember(principalId);
      assert not isOrganisationMember;

      let invitationAlreadyExists = await invitationExists(principalId);
      assert invitationAlreadyExists;

      switch(organisation){
        case (null){};
        case (?foundOrganisation){
          let main_backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
            organisationInviteExists : (organisationId: Org.OrganisationId, principalId: Base.PrincipalId) -> async Bool;
          };
          let organisationInvitationExists = await main_backend_canister.organisationInviteExists(foundOrganisation.id, principalId);
          assert organisationInvitationExists;

          let remainingInvitationsBuffer = Buffer.fromArray<Org.OrganisationInvite>([]);
          let userInvitationsBuffer = Buffer.fromArray<Org.OrganisationInvite>([]);
          for(invitation in Iter.fromArray(foundOrganisation.invites)){
            if(invitation.sentTo == principalId){
              userInvitationsBuffer.add(invitation);
            }
            else
            {
              remainingInvitationsBuffer.add(invitation)
            }
          };

          let updatedTeamMembersBuffer = Buffer.fromArray<Org.TeamMember>(foundOrganisation.members);
          for(invitation in Iter.fromArray(Buffer.toArray(userInvitationsBuffer))){
            let newTeamMember: Org.TeamMember = {
              joined = Time.now();
              organisationId = foundOrganisation.id;
              positions = [invitation.position];
              principalId = invitation.sentTo
            };
            updatedTeamMembersBuffer.add(newTeamMember);
          };

          let updatedOrganisation: Org.Organisation = {
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
            chargeBalance = foundOrganisation.chargeBalance;
          };

          organisation := ?updatedOrganisation;
        }
      };
    };

    public shared ({ caller }) func rejectInvitation () : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      let isOrganisationMember = await isUserOrganisationMember(principalId);
      assert not isOrganisationMember;
      
      let invitationAlreadyExists = await invitationExists(principalId);
      assert invitationAlreadyExists;
        
      switch(organisation){
        case (null){
          return #err(#NotFound);
        };
        case (?foundOrganisation){
          let main_backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
            organisationInviteExists : (organisationId: Org.OrganisationId, principalId: Base.PrincipalId) -> async Bool;
          };
          let organisationInvitationExists = await main_backend_canister.organisationInviteExists(foundOrganisation.id, principalId);
          assert organisationInvitationExists;
          
          switch (Array.find<Org.OrganisationInvite>(foundOrganisation.invites, func(invite) { invite.sentTo == principalId })) {
            case null {
              return #err(#NotFound);
            };
            case (?_) { 
              organisation := ?{
                addresses = foundOrganisation.addresses;
                auditHistory = foundOrganisation.auditHistory;
                banner = foundOrganisation.banner;
                contacts = foundOrganisation.contacts;
                createdOn = foundOrganisation.createdOn;
                friendlyName = foundOrganisation.friendlyName;
                id = foundOrganisation.id;
                invites = Array.filter<Org.OrganisationInvite>(foundOrganisation.invites, func(invite) { invite.sentTo != principalId });
                lastModified = foundOrganisation.lastModified;
                logo = foundOrganisation.logo;
                mainAddressId = foundOrganisation.mainAddressId;
                mainContactId = foundOrganisation.mainContactId;
                members = foundOrganisation.members;
                name = foundOrganisation.name;
                ownerId = foundOrganisation.ownerId;
                referenceNumber = foundOrganisation.referenceNumber;
                accessRequests = foundOrganisation.accessRequests;
                chargeBalance = foundOrganisation.chargeBalance;
              };
              return #err(#NotFound);
             };
          };
        }
      };
    };

    public shared ({ caller }) func requestAccess () : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
    
      assert not isTeamMember(principalId);

      let isOrganisationMember = await isUserOrganisationMember(principalId);
      assert not isOrganisationMember;
      
      let invitationAlreadyExists = await invitationExists(principalId);
      assert invitationAlreadyExists;

      switch(organisation){
        case (null){
            return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          let existingRequest = Array.find(foundOrganisation.accessRequests, func(request: Org.AccessRequest) : Bool {
            request.requesterPrincipalId == principalId
          });

          if(Option.isSome(existingRequest)){
            return #err(#AlreadyExists);
          };

          let requestsBuffer = Buffer.fromArray<Org.AccessRequest>(foundOrganisation.accessRequests);

          let accessRequest: Org.AccessRequest = {
            requestTime = Time.now();
            requesterPrincipalId = principalId;
          };

          requestsBuffer.add(accessRequest);

          let updatedOrganisation: Org.Organisation = {
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
            chargeBalance = foundOrganisation.chargeBalance;
          };

          organisation := ?updatedOrganisation;


          return #ok;
          
        };
      }
    };

    public shared ({ caller }) func confirmAccessRequest (callerPrincipalId: Base.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      let isOrganisationAdmin = await isAdmin(principalId);
      assert isOrganisationAdmin;

      switch(organisation){
        case (null){
            return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          let existingRequest = Array.find(foundOrganisation.accessRequests, func(request: Org.AccessRequest) : Bool {
            request.requesterPrincipalId == callerPrincipalId
          });

          if(Option.isSome(existingRequest)){
            return #err(#AlreadyExists);
          };

          let requestsBuffer = Buffer.fromArray<Org.AccessRequest>(foundOrganisation.accessRequests);

          let accessRequest: Org.AccessRequest = {
            requestTime = Time.now();
            requesterPrincipalId = callerPrincipalId;
          };

          requestsBuffer.add(accessRequest);

          let updatedOrganisation: Org.Organisation = {
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
            chargeBalance = foundOrganisation.chargeBalance;
          };

          organisation := ?updatedOrganisation;

          return #ok;
          
        };
      }
    };

    public shared ({ caller }) func rejectAccessRequest (callerPrincipalId: Base.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      let isOrganisationAdmin = await isAdmin(principalId);
      assert isOrganisationAdmin;

      switch(organisation){
        case (null){
            return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          let existingRequest = Array.find(foundOrganisation.accessRequests, func(request: Org.AccessRequest) : Bool {
            request.requesterPrincipalId == callerPrincipalId
          });

          if(not Option.isSome(existingRequest)){
            return #err(#NotFound);
          };

          let updatedOrganisation: Org.Organisation = {
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
            accessRequests = Array.filter(foundOrganisation.accessRequests, func(request: Org.AccessRequest) : Bool { request.requesterPrincipalId != callerPrincipalId });
            chargeBalance = foundOrganisation.chargeBalance;
          };

          organisation := ?updatedOrganisation;

          return #ok;
        };
      }
    };

    public shared ({ caller }) func leaveOrganisation (callerPrincipalId: Base.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isTeamMember(principalId);

      switch(organisation){
        case (null){
            return #err(#NotFound);
        };
        case (?foundOrganisation){
          
          let updatedOrganisation: Org.Organisation = {
            id = foundOrganisation.id;
            ownerId = foundOrganisation.ownerId;
            name = foundOrganisation.name;
            friendlyName = foundOrganisation.friendlyName;
            referenceNumber = foundOrganisation.referenceNumber;
            logo = foundOrganisation.logo;
            banner = foundOrganisation.banner;
            members = Array.filter(foundOrganisation.members, func(member: Org.TeamMember) : Bool { member.principalId != callerPrincipalId });
            mainAddressId = foundOrganisation.mainAddressId;
            mainContactId = foundOrganisation.mainContactId;
            addresses = foundOrganisation.addresses;
            contacts = foundOrganisation.contacts;
            auditHistory = foundOrganisation.auditHistory;
            invites = foundOrganisation.invites;
            lastModified = foundOrganisation.lastModified;
            createdOn = foundOrganisation.createdOn;
            accessRequests = foundOrganisation.accessRequests;
            chargeBalance = foundOrganisation.chargeBalance;
          };

          organisation := ?updatedOrganisation;

          return #ok;
        };
      }
    };

    private func isUserOrganisationMember (callerPrincipalId: Base.PrincipalId) : async Bool{
      return isTeamMember(callerPrincipalId);
    };

    private func invitationExists (callerPrincipalId: Base.PrincipalId) : async Bool{
      
      switch(organisation){
        case (null){
          return false;
        };
        case (?foundOrganisation){
          let invitationSentToPrincipalIds = Array.map<Org.OrganisationInvite, Base.PrincipalId>(foundOrganisation.invites, func(invite : Org.OrganisationInvite) : Base.PrincipalId { return invite.sentTo });
          return switch (Array.find<Base.PrincipalId>(invitationSentToPrincipalIds, func(foundPrincipalId) { foundPrincipalId == callerPrincipalId })) {
            case null { false };
            case _ { true };
          };
        }
      };
    };


    /* Organiastion contact functions */
    
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

    /* Permission functions */

    public shared ({ caller }) func isAdmin (principalId: Base.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
     return isAdminForCaller(principalId);
    };

    private func isAdminForCaller(caller : Base.PrincipalId) : Bool {
      switch (Array.find<Base.PrincipalId>(admins, func(admin) { admin == caller })) {
        case null { false };
        case _ { true };
      };
    };

    private func isTeamMember(callerPrincipalId: Base.PrincipalId) : Bool {
      switch(organisation){
        case (null){
          return false;
        };
        case (?foundOrganisation){
          let teamMemberPrincipals = Array.map<Org.TeamMember, Base.PrincipalId>(foundOrganisation.members, func(member : Org.TeamMember) : Base.PrincipalId { return member.principalId });

          let teamMember = Array.find<Base.PrincipalId>(
            teamMemberPrincipals,
            func(memberPrincipalId : Base.PrincipalId) : Bool {
              return callerPrincipalId == memberPrincipalId;
            },
          );
          return Option.isSome(teamMember);
        }
      };
    };
    
    /* Canister maintenance functions */

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
        chargeBalance = 0;
      };
    };
    
    system func preupgrade() {
      
    };

    system func postupgrade() {
      ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
    }; 
    
    private func postUpgradeCallback() : async (){    
      await cyclesCheckCallback();
    };

    private func cyclesCheckCallback() : async () {
      await checkCycles();
      await checkCanisterCycles("Accountancy");
      await checkCanisterCycles("Sales");
      await checkCanisterCycles("Timesheets");
      await checkCanisterCycles("Jobs");
      await checkCanisterCycles("Projects");
    };

    private func checkCycles() : async () {

      let balance = Cycles.balance();

      if (balance < DEFAULT_CYCLES_CHECK_AMOUNT) {
        let main_backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
          requestCanisterTopup : (cycles: Nat) -> async ();
        };
        await main_backend_canister.requestCanisterTopup(DEFAULT_CYCLES_CHECK_AMOUNT);
      };
    };  

    //TODO: requestCanisterTopup make the same cycle sending setup here

    private func checkCanisterCycles(canisterId: Base.CanisterId) : async () {


      //Canisters created with 25T cycles so total organisation starts with 7 canisters
        //total cost for setup is 175T cycles
          //As used check for below 10T cycles, topping up with 10T cycles
            //Meaning the settles balance is always 10-20T cycles on any canister
          //
      
      //Total Charge of organisation is:
        //(Total of 7 Actual) / (7 * (MINIMUM + TOPUP AMOUNT) = % charge
      
      //record topup frequency

      //check topup frequency to adjust values aiming to spread them out


      //call the function on the canister to get the cycles
      //let balance = canister.getCyclesBalance();

      //if (balance < 2_000_000_000_000) {
      //  await requestCanisterTopup(2_000_000_000_000);
      //};
      //ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), cyclesCheckCallback);
    };    
};