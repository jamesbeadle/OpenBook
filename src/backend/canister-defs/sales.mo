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


/*

Sales CRM Module
Leads
Leads

GET /api/leads - Retrieve a list of all leads.
POST /api/leads - Create a new lead.
GET /api/leads/{id} - Retrieve details of a specific lead.
PUT /api/leads/{id} - Update details of a specific lead.
DELETE /api/leads/{id} - Delete a specific lead.
Lead Statuses

GET /api/lead-statuses - Retrieve a list of all lead statuses.
POST /api/lead-statuses - Create a new lead status.
GET /api/lead-statuses/{id} - Retrieve details of a specific lead status.
PUT /api/lead-statuses/{id} - Update details of a specific lead status.
DELETE /api/lead-statuses/{id} - Delete a specific lead status.
Opportunities
Opportunities

GET /api/opportunities - Retrieve a list of all opportunities.
POST /api/opportunities - Create a new opportunity.
GET /api/opportunities/{id} - Retrieve details of a specific opportunity.
PUT /api/opportunities/{id} - Update details of a specific opportunity.
DELETE /api/opportunities/{id} - Delete a specific opportunity.
Opportunity Stages

GET /api/opportunity-stages - Retrieve a list of all opportunity stages.
POST /api/opportunity-stages - Create a new opportunity stage.
GET /api/opportunity-stages/{id} - Retrieve details of a specific opportunity stage.
PUT /api/opportunity-stages/{id} - Update details of a specific opportunity stage.
DELETE /api/opportunity-stages/{id} - Delete a specific opportunity stage.
Contacts
Contacts
GET /api/contacts - Retrieve a list of all contacts.
POST /api/contacts - Create a new contact.
GET /api/contacts/{id} - Retrieve details of a specific contact.
PUT /api/contacts/{id} - Update details of a specific contact.
DELETE /api/contacts/{id} - Delete a specific contact.
Accounts
Accounts
GET /api/accounts - Retrieve a list of all accounts.
POST /api/accounts - Create a new account.
GET /api/accounts/{id} - Retrieve details of a specific account.
PUT /api/accounts/{id} - Update details of a specific account.
DELETE /api/accounts/{id} - Delete a specific account.
Activities
Activities

GET /api/activities - Retrieve a list of all activities.
POST /api/activities - Create a new activity.
GET /api/activities/{id} - Retrieve details of a specific activity.
PUT /api/activities/{id} - Update details of a specific activity.
DELETE /api/activities/{id} - Delete a specific activity.
Activity Types

GET /api/activity-types - Retrieve a list of all activity types.
POST /api/activity-types - Create a new activity type.
GET /api/activity-types/{id} - Retrieve details of a specific activity type.
PUT /api/activity-types/{id} - Update details of a specific activity type.
DELETE /api/activity-types/{id} - Delete a specific activity type.
Sales Pipelines
Sales Pipelines
GET /api/sales-pipelines - Retrieve a list of all sales pipelines.
POST /api/sales-pipelines - Create a new sales pipeline.
GET /api/sales-pipelines/{id} - Retrieve details of a specific sales pipeline.
PUT /api/sales-pipelines/{id} - Update details of a specific sales pipeline.
DELETE /api/sales-pipelines/{id} - Delete a specific sales pipeline.
Notes
Notes
GET /api/notes - Retrieve a list of all notes.
POST /api/notes - Create a new note.
GET /api/notes/{id} - Retrieve details of a specific note.
PUT /api/notes/{id} - Update details of a specific note.
DELETE /api/notes/{id} - Delete a specific note.
Files
Files
GET /api/files - Retrieve a list of all files.
POST /api/files - Upload a new file.
GET /api/files/{id} - Retrieve details of a specific file.
DELETE /api/files/{id} - Delete a specific file.
Reports
Reports
GET /api/reports/sales - Retrieve sales reports.
GET /api/reports/leads - Retrieve lead reports.
GET /api/reports/opportunities - Retrieve opportunity reports.
GET /api/reports/activities - Retrieve activity reports.
User and Team Management (Optional for CRM)
Users

GET /api/users - Retrieve a list of all users.
POST /api/users - Create a new user.
GET /api/users/{id} - Retrieve details of a specific user.
PUT /api/users/{id} - Update details of a specific user.
DELETE /api/users/{id} - Delete a specific user.
Teams

GET /api/teams - Retrieve a list of all teams.
POST /api/teams - Create a new team.
GET /api/teams/{id} - Retrieve details of a specific team.
PUT /api/teams/{id} - Update details of a specific team.
DELETE /api/teams/{id} - Delete a specific team.
Team Members

GET /api/teams/{team_id}/members - Retrieve a list of all members of a specific team.
POST /api/teams/{team_id}/members - Add a new member to a specific team.
DELETE /api/teams/{team_id}/members/{member_id} - Remove a member from a specific team.

*/