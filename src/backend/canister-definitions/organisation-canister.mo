import MopsBaseTypes "../mops/mops_base_types";
import OrganisationTypes "../data-types/organisation-types";
import ProjectTypes "../data-types/project-types";
import SupportTypes "../data-types/support-types";
import PromotionalTypes "../data-types/promotional-types";
import OrganisationCommands "../commands/organisation-commands";
import Result "mo:base/Result";
import Enums "mo:waterway-mops/Enums";

/* ----- Mops Packages ----- */

/* ----- Queries ----- */

actor class _OrganisationCanister() {
    

    /* ----- Stable Variables ----- */
    
    private stable var name: Text = "";
    private stable var legal_name: Text = "";
    private stable var colour_palette: MopsBaseTypes.ColourPalette = { primary = "#000000"; secondary = "#FFFFFF"; tertiary = "#0F0F0F"; };
    private stable var team_members: [OrganisationTypes.TeamMember] = [];
    private stable var projects: [ProjectTypes.Project] = [];
    private stable var support_queries: [SupportTypes.SupportTicket] = [];
    private stable var promotional_campaigns: [PromotionalTypes.Campaign] = [];


    /* ----- Commands ----- */

    public shared ({ caller }) func updateOrganisationName(dto : OrganisationCommands.UpdateOrganisationName) : async Result.Result<(), Enums.Error> {
        return #err(#NotFound); // TODO
    };

    public shared ({ caller }) func updateOrganisationLegalName(dto : OrganisationCommands.UpdateOrganisationLegalName) : async Result.Result<(), Enums.Error> {
        return #err(#NotFound); // TODO
    };

    public shared ({ caller }) func updateOrganisationColourPalette(dto : OrganisationCommands.UpdateOrganisationColourPalette) : async Result.Result<(), Enums.Error> {
        return #err(#NotFound); // TODO
    };

    public shared ({ caller }) func updateOrganisationTeamMembers(dto : OrganisationCommands.UpdateOrganisationColourPalette) : async Result.Result<(), Enums.Error> {
        return #err(#NotFound); // TODO
    };





    system func preupgrade() {};

    system func postupgrade() {
    };
};
