import { TUser } from "./user.interface";
import { User } from "./user.model";

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  ).select("-password");

  return result;
};

const followUser = async (followerId: string, followingId: string) => {
  const result = await User.findByIdAndUpdate(
    followerId,
    { $addToSet: { followings: followingId } },
    { new: true }
  );

  await User.findByIdAndUpdate(followingId, {
    $addToSet: { followers: followerId },
  });

  return result;
};

const unfollowUser = async (followerId: string, followingId: string) => {
  const result = await User.findByIdAndUpdate(
    followerId,
    { $pull: { followings: followingId } },
    { new: true }
  );

  await User.findByIdAndUpdate(followingId, {
    $pull: { followers: followerId },
  });

  return result;
};

const bookmarkPost = async (userId: string, postId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { bookmarks: postId } },
    { new: true }
  );

  return result;
};

const removeBookmarkPost = async (userId: string, postId: string) => {
  const result = await User.findByIdAndUpdate(
    userId,
    { $pull: { bookmarks: postId } },
    { new: true }
  );

  return result;
};

const getUserFavorites = async (userId: string) => {
  const result = await User.findById(userId).populate("bookmarks");
  return result?.bookmarks;
};

export const UserServices = {
  getSingleUserFromDB,
  updateUserIntoDB,
  followUser,
  unfollowUser,
  bookmarkPost,
  removeBookmarkPost,
  getUserFavorites
}