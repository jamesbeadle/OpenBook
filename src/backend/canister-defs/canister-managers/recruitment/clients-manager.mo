import T "../../../data-types/types";
import DTOs "../../../dtos/job-dtos";
import Result "mo:base/Result";

module {

  public class ClientsManager() {
    
    public func listClients(dto: DTOs.ListClients) : Result.Result<DTOs.ListClients, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func getClient(dto: DTOs.GetClient) : Result.Result<DTOs.GetClient, T.Error>{
        return #err(#NotFound); //TODO
    };

    public func createClient(dto: DTOs.CreateClient) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func updateClient(dto: DTOs.UpdateClient) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };

    public func deleteClient(dto: DTOs.DeleteClient) : Result.Result<(), T.Error>{
        return #err(#NotFound); //TODO
    };
  }
};