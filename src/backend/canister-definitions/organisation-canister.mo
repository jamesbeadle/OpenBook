import MopsBaseTypes "../mops/mops_base_types";
import OrganisationTypes "../data-types/organisation-types";
import ProjectTypes "../data-types/project-types";

/* ----- Mops Packages ----- */

/* ----- Queries ----- */

actor class _OrganisationCanister() {
    
    /* ----- Stable Variables ----- */
    
    private stable var name: Text = "";
    private stable var legal_name: Text = "";
    private stable var colour_palette: MopsBaseTypes.ColourPalette = { primary = "#000000"; secondary = "#FFFFFF"; tertiary = "#0F0F0F"; };
    private stable var team_members: [OrganisationTypes.TeamMember] = [];
    private stable var projects: [ProjectTypes.Project] = [];
    private stable var support_queries: [OrganisationTypes.SupportQuery] = [];
    private stable var promotional_campaigns: [PromotionalTypes.PromotionalCampaign] = [];



    /* ----- Commands ----- */

    public shared ({ caller }) func updateOrganisationName(dto : OrganisationCommands.UpdateOrganisationName) : async Result.Result<(), Enums.Error> {
    };

    public shared ({ caller }) func updateOrganisationLegalName(dto : OrganisationCommands.UpdateOrganisationLegalName) : async Result.Result<(), Enums.Error> {
    };

    public shared ({ caller }) func updateOrganisationColourPalette(dto : OrganisationCommands.UpdateOrganisationColourPalette) : async Result.Result<(), Enums.Error> {
    };

    public shared ({ caller }) func updateOrganisationTeamMembers(dto : OrganisationCommands.UpdateOrganisationColourPalette) : async Result.Result<(), Enums.Error> {
    };





    system func preupgrade() {};

    system func postupgrade() {
    };
};
