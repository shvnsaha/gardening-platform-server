import { Types } from "mongoose";
import { TPost } from "./post.interface";
import { Post } from "./post.model";

const createPostIntoDB = async (postData: Partial<TPost>): Promise<TPost> => {
  const result = await Post.create(postData);
  return result;
};


const updatePostIntoDB = async (
  id: string,
  postData: Partial<TPost>
): Promise<TPost | null> => {
  const result = await Post.findByIdAndUpdate(
    id,
    { $set: postData },
    { new: true, runValidators: true }
  );
  return result;
};


const deletePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}

const getSinglePostFromDB = async (id: string): Promise<TPost | null> => {
  const result = await Post.findById(id).populate("author");
  return result;
};

const voteInPost = async (
  postId: string,
  userId: string,
  voteType: "upvote" | "downvote"
): Promise<TPost | null> => {
  const post = await Post.findById(postId);
  if (!post) return null;

  const hasUpvotedByUser = post.upvotedBy.includes(new Types.ObjectId(userId));
  const hasDownvotedByUser = post.downvotedBy.includes(new Types.ObjectId(userId));

  if (voteType === "upvote") {
    if (hasUpvotedByUser) {
      // User already upvoted, so remove the upvote
      post.upVotes--;
      post.upvotedBy = post.upvotedBy.filter((id) => id.toString() !== userId);
    } else {
      // Add upvote and remove downvote if exists
      post.upVotes++;
      post.upvotedBy.push(new Types.ObjectId(userId));
      if (hasDownvotedByUser) {
        post.downVotes--;
        post.downvotedBy = post.downvotedBy.filter(
          (id) => id.toString() !== userId
        );
      }
    }
  } else if (voteType === "downvote") {
    if (hasDownvotedByUser) {
      // User already downvoted, so remove the downvote
      post.downVotes--;
      post.downvotedBy = post.downvotedBy.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // Add downvote and remove upvote if exists
      post.downVotes++;
      post.downvotedBy.push(new Types.ObjectId(userId));
      if (hasUpvotedByUser) {
        post.upVotes--;
        post.upvotedBy = post.upvotedBy.filter(
          (id) => id.toString() !== userId
        );
      }
    }
  }

  return await post.save();
};


export const PostServices = {
  createPostIntoDB,
  updatePostIntoDB,
  deletePostFromDB,
  getSinglePostFromDB,
  voteInPost
}
