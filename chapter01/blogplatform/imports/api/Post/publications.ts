import { Meteor } from "meteor/meteor";
import { CollectionPosts } from "./Post";


Meteor.publish("posts.allPosts",
    ()=> CollectionPosts.find({}))
