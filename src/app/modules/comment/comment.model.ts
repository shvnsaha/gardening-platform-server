import mongoose, { Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema:Schema = new Schema<TComment>({
    text:{
        type: String,
        rquired: true
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true}
})

export const Comment = mongoose.model<TComment>('Comment',commentSchema)

