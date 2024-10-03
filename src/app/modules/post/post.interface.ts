import { Types } from "mongoose";
export type TComment = {
  content: string;
  commentator: Types.ObjectId;
};

export type TPost = {
    title: string;
    content: string;
    author: Types.ObjectId;
    category: string;
    isPremium?: boolean;
    image: string;
    upVotes: number;
    downVotes: number;
    upvotedBy: Types.ObjectId[];
    downvotedBy: Types.ObjectId[];
    comments?: Types.ObjectId[];
    isDeleted?: boolean
  };
  