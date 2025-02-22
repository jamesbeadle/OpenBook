import Base "mo:waterway-mops/BaseTypes";
import T "types";
import Org "organisation-types";

module NetworkingTypes {

    public type NetworkingProfile = {
        principalId: Base.PrincipalId;
        contexts: [Context];
        posts: [Post];
        likes: [PostId];
        endorsements: [PostId];
        supporters: [PostId];
        congratulations: [PostId];
    };

    public type ContextId = Nat;

    public type Context = {
        id: ContextId;
        description: Text;
        tag: Text;
        visibility: Bool;
        postCount: Nat;
    };

    public type PostId = Nat;
    
    public type Post = {
        id: PostId;
        status: PostStatus;
        author: Base.PrincipalId;
        content: Text;
        tags: [Text];
        createdAt: Int;
        likes: [Base.PrincipalId];
        endorsements: [Base.PrincipalId];
        supporters: [Base.PrincipalId];
        congratulations: [Base.PrincipalId];
        shares: [Base.PrincipalId];
        viewCount: Nat;
        bookmarks: Nat;
        comments: [Comment];
        questions: [Question];
        contextId: ContextId;
        organisation: Org.OrganisationId;
        project: T.ProjectId;
        projectStage: Nat16;
    };

    public type PostStatus = {
        #Draft;
        #Live;
        #Edited;
    };

    public type Comment = {
        id: Nat;
        author: Base.PrincipalId;
        content: Text;
        createdAt: Int;
        replies: [Comment];
        likes: [Base.PrincipalId];
    };

    public type Question = {
        id: Nat;
        author: Base.PrincipalId;
        content: Text;
        createdAt: Int;
        upvotes: [Base.PrincipalId]; 
        resolved: Bool;             
        resolutionVotes: [Base.PrincipalId]; 

    };

};
