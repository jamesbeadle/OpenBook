import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Option "mo:base/Option";
import T "../data-types/types";
import OrganisationDTOs "../dtos/organisation-dtos";
import Environment "../utilities/Environment";

actor class _OrganisationCanister() {

    private stable var accounts_canister_id = "";
    private stable var projects_canister_id = "";
    private stable var sales_canister_id = "";
    private stable var payroll_canister_id = "";
    private stable var recruitment_canister_id = "";

    private stable var organisation: ?T.Organisation = null;
    private stable var admins: [T.PrincipalId] = [];

    public shared ({ caller }) func initialise(dto: OrganisationDTOs.InitialiseOrganisationDTO) : async (){
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
    public shared ({ caller }) func isAdmin (principalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
     return isAdminForCaller(principalId);
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

    public shared ({ caller }) func getServiceCanisterIds() : async OrganisationDTOs.ServiceCanisterIdsDTO {
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

    public shared ({ caller }) func getOrganisation () : async ?OrganisationDTOs.OrganisationDTO{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;

      switch(organisation){
        case (null){
          return null;
        };
        case (?foundOrganisation){
          return ?{
            id = foundOrganisation.id;
            name = foundOrganisation.name;
          };  
        }
      };
    };
    public shared ({ caller }) func acceptOrganisationInvitation (callerPrincipalId: T.PrincipalId) : async (){
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
      assert isTeamMember(principalId);
      switch(organisation){
        case (null){};
        case (?foundOrganisation){



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
    };
    public shared ({ caller }) func rejectInvitation (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
    };
    public shared ({ caller }) func requestAccess (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
    };
    public shared ({ caller }) func leaveOrganisation (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
    };
    public shared ({ caller }) func userAccessRequestExists (callerPrincipalId: T.PrincipalId) : async Bool{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
    };
    public shared ({ caller }) func addUser (callerPrincipalId: T.PrincipalId) : async Result.Result<(), T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert principalId == Environment.BACKEND_CANISTER_ID;
    };


    //get organiaston
      //only people allowed to
    
    //get public organiastion
      //just publoc info

    //Organisation Charge Functions
    //Charge Service
    //

    //organisation needs endpoints out to each canister so this becomes a god file of everything that can be done

    //TODO: Purchase service?

    //update org status

    //Organisation Management

    public shared ({ caller }) func updateOrganisationDetails(dto: OrganisationDTOs.UpdateOrganisationDetailDTO) : async Result.Result<(), T.Error> {
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
    


    //Todo: Implement dynamic cycles as per OpenFPL
    //Topup service
    //Transfer charge
    //activate service


  system func preupgrade() {
    
  };

  system func postupgrade() {
  };
  
  //TODO: Implement cycle topping up as per OpenFPL
};