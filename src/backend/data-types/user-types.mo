import AppTypes "app-types";
import Ids "mo:waterway-mops/Ids";
import AppEnums "../enums/app-enums";
import AppIds "app-ids";
module UserTypes {
    
    public type User = {
        id: Ids.PrincipalId;
        username: Text;
        firstName: Text;
        lastName: Text;
        openchat: Text;
        emailAddress: Text;
        phoneNumber: Text;
        profilePicture: ?Blob;
        termsAccepted: Bool;
        visibility: AppEnums.VisibilityLevel;
        metaData: AppTypes.Metadata;
        organisations: [AppIds.OrganisationId];
    }

}