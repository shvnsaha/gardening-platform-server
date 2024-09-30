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

  export const PostServices = {
    createPostIntoDB,
    updatePostIntoDB
  }
  