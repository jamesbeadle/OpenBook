import Cycles "mo:base/ExperimentalCycles";
import Timer "mo:base/Timer";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Result "mo:base/Result";
import AccountsManager "../managers/accounts-manager";
import ProjectManager "../managers/project-manager";
import SalesManager "../managers/sales-manager";
import TimesheetManager "../managers/timesheet-manager";
import RecruitmentManager "../managers/recruitment-manager";

actor class _OrganisationCanister() {

    private let accountsManager = AccountsManager.AccountsManager();
    private let projectManager = ProjectManager.ProjectManager();
    private let salesManager = SalesManager.SalesManager();
    private let timesheetManager = TimesheetManager.TimesheetManager();
    private let recruitmentManager = RecruitmentManager.RecruitmentManager();

    private stable var organisation: ?T.Organisation = null;

    //Organisational Management Endpoints
    public shared ({ caller }) func createOrganisation(dto: OrganisationDTOs.CreateOrganisationDTO){

    };

    public shared ({ caller }) func updateOrganisationDetails(dto: OrganisationDTOs.UpdateOrganisationDetailDTO) : async Result.Result<(), T.Error> {
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert principalId == Environment.BACKEND_CANISTER_ID;

        //update the organisations details

    };

    //TODO: All organisational management endpoints

    //TODO: ALL
    //Accounting Endpoints
    
    //Project Management Endpoints

    //Sales CRM Endpoints
    
    //Timesheet Management Endpoints
    
    //Recruitment Management Endpoints


    //todo confirm with openfpl cycles etc
    private stable let cyclesCheckInterval : Nat = Utilities.getHour() * 24;
    private stable var cyclesCheckTimerId : ?Timer.TimerId = null;
    private stable var activeGroupIndex : Nat8 = 0;
    private stable var totalManagers = 0;

    public shared ({ caller }) func updateTeamSelection(teamUpdateDTO : DTOs.TeamUpdateDTO, transfersAvailable : Nat8, monthlyBonuses : Nat8, newBankBalance : Nat16) : async Result.Result<(), T.Error> {
        assert not Principal.isAnonymous(caller);
        let principalId = Principal.toText(caller);
        assert principalId == Environment.BACKEND_CANISTER_ID;

        let managerBuffer = Buffer.fromArray<T.Manager>([]);
        let managerGroupIndex = managerGroupIndexes.get(teamUpdateDTO.principalId);
        
    };

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