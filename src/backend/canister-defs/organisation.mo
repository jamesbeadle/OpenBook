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

import SD "../dtos/sales-dtos";
import RD "../dtos/recruitment-dtos";
import TD "../dtos/task-dtos";

actor class _OrganisationCanister() {

    private let accountsManager = AccountsManager.AccountsManager();
    private let projectManager = ProjectManager.ProjectManager();
    private let salesManager = SalesManager.SalesManager();
    private let timesheetManager = TimesheetManager.TimesheetManager();
    private let recruitmentManager = RecruitmentManager.RecruitmentManager();

    private stable var organisation: ?T.Organisation = null;

    public shared ({ caller }) func initialise(dto: OrganisationDTOs.CreateOrganisationDTO){

    };


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

    //Sales

    //Clients

    public shared ({ caller }) func listClients(dto: SD.ClientListFiltersDTO) : async Result.Result<SD.ClientListDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.listClients(dto);
    };

    public shared ({ caller }) func createClient(dto: SD.CreateClientDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.createClient(dto);
    };

    public shared ({ caller }) func getClient(dto: SD.GetClientDTO) : async Result.Result<SD.ClientDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.getClient(dto);
    };

    public shared ({ caller }) func updateClient(dto: SD.UpdateClientDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.updateClient(dto);
    };

    public shared ({ caller }) func deleteClient(dto: SD.DeleteClientDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.deleteClient(dto);
    };


    //Leads

    public shared ({ caller }) func listLeads(dto: SD.LeadListFiltersDTO) : async Result.Result<SD.LeadListDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.listLeads(dto);
    };

    public shared ({ caller }) func createLead(dto: SD.CreateLeadDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.createLead(dto);
    };

    public shared ({ caller }) func getLead(dto: SD.GetLeadDTO) : async Result.Result<SD.LeadDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.getLead(dto);
    };

    public shared ({ caller }) func updateLead(dto: SD.UpdateLeadDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.updateLead(dto);
    };

    public shared ({ caller }) func deleteLead(dto: SD.DeleteLeadDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.deleteLead(dto);
    };

    //Opportunities

    public shared ({ caller }) func listOpportunities(dto: SD.OpportunityListFiltersDTO) : async Result.Result<SD.OpportunityListDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.listOpportunities(dto);
    };

    public shared ({ caller }) func createOpportunity(dto: SD.CreateOpportunityDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.createOpportunity(dto);
    };

    public shared ({ caller }) func getOpportunity(dto: SD.GetOpportunityDTO) : async Result.Result<SD.OpportunityDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.getOpportunity(dto);
    };

    public shared ({ caller }) func updateOpportunity(dto: SD.UpdateOpportunityDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.updateOpportunity(dto);
    };

    public shared ({ caller }) func deleteOpportunity(dto: SD.DeleteOpportunityDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.deleteOpportunity(dto);
    };

    //Quotes

    public shared ({ caller }) func listQuotes(dto: SD.QuoteListFiltersDTO) : async Result.Result<SD.QuoteListDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.listQuotes(dto);
    };

    public shared ({ caller }) func createQuote(dto: SD.CreateQuoteDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.createQuote(dto);
    };

    public shared ({ caller }) func getQuote(dto: SD.GetQuoteDTO) : async Result.Result<SD.QuoteDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.getQuote(dto);
    };

    public shared ({ caller }) func updateQuote(dto: SD.UpdateQuoteDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.updateQuote(dto);
    };

    public shared ({ caller }) func deleteQuote(dto: SD.DeleteQuoteDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.deleteQuote(dto);
    };

    //Products

    public shared ({ caller }) func listProducts(dto: SD.ProductListFiltersDTO) : async Result.Result<SD.ProductsListDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.listProducts(dto);
    };

    public shared ({ caller }) func createProduct(dto: SD.CreateProductDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.createProduct(dto);
    };

    public shared ({ caller }) func getProduct(dto: SD.GetProductDTO) : async Result.Result<SD.ProductDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.getProduct(dto);
    };

    public shared ({ caller }) func updateProduct(dto: SD.UpdateProductDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.updateProduct(dto);
    };

    public shared ({ caller }) func deleteProduct(dto: SD.DeleteProductDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.deleteProduct(dto);
    };

    //Orders

    public shared ({ caller }) func listOrders(dto: SD.OrderListFiltersDTO) : async Result.Result<SD.OrdersListDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.listOrders(dto);
    };

    public shared ({ caller }) func createOrder(dto: SD.CreateOrderDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.createOrder(dto);
    };

    public shared ({ caller }) func getOrder(dto: SD.GetOrderDTO) : async Result.Result<SD.OrderDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.getOrder(dto);
    };

    public shared ({ caller }) func updateOrder(dto: SD.UpdateOrderDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.updateOrder(dto);
    };

    public shared ({ caller }) func deleteOrder(dto: SD.DeleteOrderDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.deleteOrder(dto);
    };

    //Contacts

    public shared ({ caller }) func listSalesContacts(dto: SD.SalesContactListFiltersDTO) : async Result.Result<SD.SalesContactListDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.listContacts(dto);
    };

    public shared ({ caller }) func createSalesContact(dto: SD.CreateSalesContactDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.createContact(dto);
    };

    public shared ({ caller }) func getSalesContact(dto: SD.GetSalesContactDTO) : async Result.Result<SD.SalesContactDTO, T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.getContact(dto);
    };

    public shared ({ caller }) func updateSalesContact(dto: SD.UpdateSalesContactDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.updateSalesContact(dto);
    };

    public shared ({ caller }) func deleteSalesContact(dto: SD.DeleteSalesContactDTO) : async Result.Result<(), T.Error> {
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      assert hasPermission(principalId);
      return salesManager.deleteSalesContact(dto);
    };
    
    //Accounting

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


  public shared ({ caller }) func purchaseService(dto: DTOs.PurchaseServiceDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(principalId);
    
    let isOrganisationAdmin = organisationManager.isOrganisationAdmin(principalId, DTOs.organisationId);
    if(not isOrganisationAdmin){
      return #err(#NotAllowed);
    };
    
    let canAffordFee = organisationManager.canAffordService(principalId, dto);
    if(not canAffordFee){
      return #err(#NotEnoughFunds)
    };
    
    await treasuryManager.purchaseService(principalId, dto);
    await organisationManager.addService(principalId, dto);
  };

  public shared ({ caller }) func cancelService(dto: DTOs.CancelServiceDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(principalId);
    
    let isOrganisationAdmin = organisationManager.isOrganisationAdmin(principalId, DTOs.organisationId);
    if(not isOrganisationAdmin){
      return #err(#NotAllowed);
    };
    
    await organisationManager.removeService(principalId, dto);
  };

    

  //accounts
    //add transaction
    //get report


  //recruitment
    //add cv
    //add job
    //

  //timesheet management
    //add time sheet
    //add employee

  //Task Management

  public shared ({ caller }) func sendInvite(dto: DTOs.SendInviteDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func unsendInvite(dto: DTOs.UnsendInviteDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectMember(dto: DTOs.RemoveMemberDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addProjectLink(dto: DTOs.AddProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectLink(dto: DTOs.UpdateProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectLink(dto: DTOs.RemoveProjectLinkDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addProjectStage(dto: DTOs.AddProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectStage(dto: DTOs.AddProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeProjectStage(dto: DTOs.RemoveProjectStageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectDetails(dto: DTOs.UpdateProjectDetailsDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateProjectStatus(dto: DTOs.UpdateProjectStatusDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addStageMilestone(dto: DTOs.AddStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateStageMilestone(dto: DTOs.UpdateStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeStageMilestone(dto: DTOs.AddStageMilestoneDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addMilestoneTask(dto: DTOs.AddMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateMilestoneTask(dto: DTOs.UpdateMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func removeMilestoneTask(dto: DTOs.RemoveMilestoneTaskDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func addTaskComment(dto: DTOs.AddTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func updateTaskComment(dto: DTOs.AddTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };

  public shared ({ caller }) func deleteTaskComment(dto: DTOs.DeleteTaskCommentDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    //TODO
  };


  //Create a project
  //Add a project stage
  //Invite a member to a project 
  //Add a link to a project
  //Add a milestone to a project stage
  //Add a task to a project milestone
  //Add a comment to a task
  //Update the project status if allowed
  //Update the project priority if allowed


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