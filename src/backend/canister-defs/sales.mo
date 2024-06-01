actor Self{


    //Sales CRM Endpoints
      //Convert Lead to Opportunity
      //Convert Opportunity to Order
      //Crud Contact
      //Crud Leads
      //Crud Opportunity
      //Crud Account
      //Crud activity
      //crud pipeline
      //crud pipeline stage
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
}