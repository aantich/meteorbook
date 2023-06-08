import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
//@ts-ignore
import {ValidatedMethod} from 'meteor/mdg:validated-method'

export interface IPost {
    _id?: string,
    title: string,
    content: string,
    createdAt: Date,
    updatedAt: Date,
    authorId: string
}

export const SPost = new SimpleSchema({
    _id: {
      type: String,
      optional: true,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    authorId: {
      type: String,
    },
  });

export const CollectionPosts = new Mongo.Collection<IPost>("posts");

export const PostController = {

    addNewPost: new ValidatedMethod({
        name: "posts.addNewPost",
        validate: SPost.validator(),
        run(p:IPost) {
            const uid = Meteor.userId()
            if (!uid) {
                throw new Meteor.Error("not-authorized",
                "only logged in users can create new posts")
            }
            p.createdAt = new Date()
            p.updatedAt = p.createdAt
            p.authorId = uid
            return CollectionPosts.insert(p);
        }
    }),

    editPost: new ValidatedMethod({
        name: "posts.editPost",
        validate: null,
        run(props: {id:string, title:string, content:string}) {
            const {id, title, content} = props
            // is the user logged in check?
            const uid = Meteor.userId()
            if (!uid) {
                throw new Meteor.Error("not-authorized",
                "only logged in users can create new posts")
            }

            // is the user owner of the post check?
            const post = CollectionPosts.findOne({_id: id});
            if (!post || (post?.authorId != uid)) {
                throw new Meteor.Error("not-authorized",
                "only owners may edit posts!")
            }

            return CollectionPosts.update({_id:id},
            {
                $set: {
                    title: title,
                    content: content,
                    updatedAt: new Date()
                }
            })
        }
    })
}

