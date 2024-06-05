import Principal "mo:base/Principal";
import Result "mo:base/Result";
import DTOs "../dtos/sales-dtos";
import T "../data-types/types";

actor class _SalesCanister() {

    public shared ({ caller }) func initialise(){

    };


    //Clients
    
    public shared query ({ caller }) func listClients(dto: DTOs.ListClients) : async Result.Result<DTOs.ListClients, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getClient(dto: DTOs.GetClient) : async Result.Result<DTOs.GetClient, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createClient(dto: DTOs.CreateClient) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateClient(dto: DTOs.UpdateClient) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteClient(dto: DTOs.DeleteClient) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Leads
    
    public shared query ({ caller }) func listLeads(dto: DTOs.ListLeads) : async Result.Result<DTOs.ListLeads, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getLead(dto: DTOs.GetLead) : async Result.Result<DTOs.GetLead, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createLead(dto: DTOs.CreateLead) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateLead(dto: DTOs.UpdateLead) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteLead(dto: DTOs.DeleteLead) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Opportunities
    
    public shared query ({ caller }) func listOpportunities(dto: DTOs.ListOpportunities) : async Result.Result<DTOs.ListOpportunities, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getOpportunity(dto: DTOs.GetOpportunity) : async Result.Result<DTOs.GetOpportunity, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createOpportunity(dto: DTOs.CreateOpportunity) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateOpportunity(dto: DTOs.UpdateOpportunity) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteOpportunity(dto: DTOs.DeleteOpportunity) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Quotes
    
    public shared query ({ caller }) func listQuotes(dto: DTOs.ListQuotes) : async Result.Result<DTOs.ListQuotes, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getQuote(dto: DTOs.GetQuote) : async Result.Result<DTOs.GetQuote, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createQuote(dto: DTOs.CreateQuote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateQuote(dto: DTOs.UpdateQuote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteQuote(dto: DTOs.DeleteQuote) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Products
    
    public shared query ({ caller }) func listProducts(dto: DTOs.ListProducts) : async Result.Result<DTOs.ListProducts, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getProduct(dto: DTOs.GetProduct) : async Result.Result<DTOs.GetProduct, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createProduct(dto: DTOs.CreateProduct) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateProduct(dto: DTOs.UpdateProduct) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteProduct(dto: DTOs.DeleteProduct) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Orders
    
    public shared query ({ caller }) func listOrders(dto: DTOs.ListOrders) : async Result.Result<DTOs.ListOrders, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getOrder(dto: DTOs.GetOrder) : async Result.Result<DTOs.GetOrder, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createOrder(dto: DTOs.CreateOrder) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateOrder(dto: DTOs.UpdateOrder) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteOrder(dto: DTOs.DeleteOrder) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };


    //Activities
    
    public shared query ({ caller }) func listActivities(dto: DTOs.ListActivities) : async Result.Result<DTOs.ListActivities, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getActivity(dto: DTOs.GetActivity) : async Result.Result<DTOs.GetActivity, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createActivity(dto: DTOs.CreateActivity) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateActivity(dto: DTOs.UpdateActivity) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteActivity(dto: DTOs.DeleteActivity) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Activity Types
    
    public shared query ({ caller }) func listActivityTypes(dto: DTOs.ListActivityTypes) : async Result.Result<DTOs.ListActivityTypes, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getActivityType(dto: DTOs.GetActivityType) : async Result.Result<DTOs.GetActivityType, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createActivityType(dto: DTOs.CreateActivityType) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateActivityType(dto: DTOs.UpdateActivityType) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteActivityType(dto: DTOs.DeleteActivityType) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Sales Pipelines
    
    public shared query ({ caller }) func listSalesPipelines(dto: DTOs.ListSalesPipelines) : async Result.Result<DTOs.ListSalesPipelines, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getSalesPipeline(dto: DTOs.GetSalesPipeline) : async Result.Result<DTOs.GetSalesPipeline, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createSalesPipeline(dto: DTOs.CreateSalesPipeline) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updateSalesPipeline(dto: DTOs.UpdateSalesPipeline) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deleteSalesPipeline(dto: DTOs.DeleteSalesPipeline) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Pipeline Stages
    
    public shared query ({ caller }) func listPipelineStages(dto: DTOs.ListPipelineStages) : async Result.Result<DTOs.ListPipelineStages, T.Error>{
      assert not Principal.isAnonymous(caller);
      let principalId = Principal.toText(caller);
      //assert hasPermission(principalId);
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getPipelineStage(dto: DTOs.GetPipelineStage) : async Result.Result<DTOs.GetPipelineStage, T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func createPipelineStage(dto: DTOs.CreatePipelineStage) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func updatePipelineStage(dto: DTOs.UpdatePipelineStage) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public shared ({ caller }) func deletePipelineStage(dto: DTOs.DeletePipelineStage) : async Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    //Sales Reports

    public shared query ({ caller }) func getSalesReport(dto: DTOs.GetSalesReport) : async Result.Result<DTOs.GetSalesReport, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getSalesLeads(dto: DTOs.GetSalesLeads) : async Result.Result<DTOs.GetSalesLeads, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getSalesOpportunities(dto: DTOs.GetSalesOpportunities) : async Result.Result<DTOs.GetSalesOpportunities, T.Error>{
        return #err(#NotFound);
    };

    public shared query ({ caller }) func getSalesActivityReport(dto: DTOs.GetSalesActivityReport) : async Result.Result<DTOs.GetSalesActivityReport, T.Error>{
        return #err(#NotFound);
    };
    
};
