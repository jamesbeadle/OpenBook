import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
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

    private func isAdmin(caller : T.PrincipalId) : Bool {
      switch (Array.find<T.PrincipalId>(admins, func(admin) { admin == caller })) {
        case null { false };
        case _ { true };
      };
    };

    public shared ({ caller }) func getServiceCanisterIds() : async OrganisationDTOs.ServiceCanisterIdsDTO {
      return {
        accountsCanisterId = accounts_canister_id;
        payrollCanisterId = payroll_canister_id;
        projectsCanisterId = projects_canister_id;
        recruitementCanisterId = recruitment_canister_id;
        salesCanisterId = sales_canister_id;
      }
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
        assert isAdmin(principalId);
        return #ok; //TODO;
        //update the organisations details

    };

    public shared ({ caller }) func updateOrganisationBanner() : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdmin(principalId); 
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