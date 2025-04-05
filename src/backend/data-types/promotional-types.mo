import TeamQueries "../queries/team-queries";
import AppTypes "app-types";
import AppIds "app-ids";
module PromotionalTypes {

    public type Campaign = {
        id: AppIds.CampaignId;
        mission: Text;
        strategicEvents: [StrategicEvent];
        startDate: Int;
        endDate: Int;
    };

    public type StrategicEvent = {
        id: AppIds.StrategicEventId;
        strategicEventType: StrategicEventType;
        location: AppTypes.Address;
        startDate: Int;
        endDate: Int;
        teamMembers: [AppIds.TeamMemberId];
        eventLead: AppIds.TeamMemberId;
    };

    public type StrategicEventType = {
        #Video;
        #VideoSeries;
        #Article;
        #EventShow;
        #SocialPost;
        #GeneralMarketing;
    };
}