import mongoose, { Schema, Document } from "mongoose";
import {  TPost } from "./post.interface";


// const commentSchema: Schema = new Schema<TComment>(
//   {
//     content: { type: String, required: true },
//     commentator: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );


const postSchema: Schema = new Schema<TPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    image: { type: String },
    upVotes: { type: Number, default: 0 },
    downVotes: { type: Number, default: 0 },
    upvotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downvotedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true }
);

export const Post = mongoose.model<TPost & Document>("Post", postSchema);