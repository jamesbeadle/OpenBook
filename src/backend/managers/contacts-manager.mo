
import DTOs "../dtos/organisation-dtos";
import T "../data-types/types";
import Result "mo:base/Result";
module {
  public class ContactsManager() { //TODO
    public func listContacts(dto: DTOs.ListContacts) : async Result.Result<DTOs.ListContacts, T.Error>{
      return #err(#NotFound);
    };

    public func getContact(dto: DTOs.GetContact) : async Result.Result<DTOs.GetContact, T.Error>{
      return #err(#NotFound);
    };

    public func createContact(dto: DTOs.CreateContact) : async Result.Result<(), T.Error>{
      return #err(#NotFound);
    };

    public func updateContact(dto: DTOs.UpdateContact) : async Result.Result<(), T.Error>{
      return #err(#NotFound);
    };

    public func deleteContact(dto: DTOs.DeleteContact) : async Result.Result<(), T.Error>{
      return #err(#NotFound);
    };
  };
};


    