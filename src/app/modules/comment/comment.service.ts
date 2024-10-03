import { Post } from "../post/post.model";
import { TComment } from "./comment.interface";
import { Comment } from "./comment.model";

const createCommentIntoDB = async (commentData: TComment) => {
    const result = await Comment.create(commentData);
    const post = await Post.findById(commentData.post);
    if (post) {
        post?.comments?.push(result._id);
        await post.save();
    }
    return result;
};

export const getCommentsOfPostFromDB = async (postId: string) => {
    const comments = await Comment.find({ post: postId }).populate('author');
    return comments
}


export const CommentServices = {
    createCommentIntoDB,
    getCommentsOfPostFromDB
}
