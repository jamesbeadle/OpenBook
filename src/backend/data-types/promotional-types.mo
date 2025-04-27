import AppTypes "app-types";
import AppIds "app-ids";
import Ids "mo:waterway-mops/Ids";
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
        teamMembers: [Ids.PrincipalId];
        eventLead: Ids.PrincipalId;
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