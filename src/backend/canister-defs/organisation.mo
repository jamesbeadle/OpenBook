import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Cycles "mo:base/ExperimentalCycles";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Timer "mo:base/Timer";
import Order "mo:base/Order";
import Nat8 "mo:base/Nat8";
import T "../data-types/types";
import Accounts "../dtos/sales-dtos";
import Payroll "../dtos/payroll-dtos";
import Project "../dtos/projects-dtos";
import Recruitment "../dtos/recruitment-dtos";
import Sales "../dtos/sales-dtos";
import OrganisationDTOs "../dtos/organisation-dtos";

actor class _OrganisationCanister() {

    private stable var accounts_canister_id = "";
    private stable var projects_canister_id = "";
    private stable var sales_canister_id = "";
    private stable var payroll_canister_id = "";
    private stable var recruitment_canister_id = "";

    private stable var organisation: ?T.Organisation = null;
    private stable var teamMembers: [T.TeamMember] = [];
    private stable var contacts: [T.Contact] = [];


    public shared ({ caller }) func initialise(dto: OrganisationDTOs.CreateOrganisationDTO){

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
        
        //update the organisations details

    };

    public shared ({ caller }) func updateOrganisationBanner() : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert isAdmin(principalId);  
    };
    


    //Todo: Implement dynamic cycles as per OpenFPL
    //Topup service
    //Transfer charge
    //activate service


  system func preupgrade() {
    stable_manager_group_indexes := Iter.toArray(managerGroupIndexes.entries());
  };

  system func postupgrade() {
    for (index in Iter.fromArray(stable_manager_group_indexes)) {
      managerGroupIndexes.put(index.0, index.1);
    };
    switch (cyclesCheckTimerId) {
      case (null) {};
      case (?id) {
        Timer.cancelTimer(id);
        cyclesCheckTimerId := null;
      };
    };
    cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);
  };

  private func checkCanisterCycles() : async () {

    let balance = Cycles.balance();

    if (balance < 2_000_000_000_000) {
      let openfpl_backend_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
        requestCanisterTopup : () -> async ();
      };
      await openfpl_backend_canister.requestCanisterTopup();
    };
    await setCheckCyclesTimer();
  };

  private func setCheckCyclesTimer() : async () {
    switch (cyclesCheckTimerId) {
      case (null) {};
      case (?id) {
        Timer.cancelTimer(id);
        cyclesCheckTimerId := null;
      };
    };
    cyclesCheckTimerId := ?Timer.setTimer<system>(#nanoseconds(cyclesCheckInterval), checkCanisterCycles);
  };

  public func topupCanister() : async () {
    let amount = Cycles.available();
    let _ = Cycles.accept<system>(amount);
  };

  public func getCyclesBalance() : async Nat {
    return Cycles.balance();
  };

  public func getMainCanisterId() : async Text {
    return Environment.BACKEND_CANISTER_ID;
  };
};