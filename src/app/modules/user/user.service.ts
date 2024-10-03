import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Post } from "../post/post.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { initiatePayment } from "../payment/payment.utils";

const getSingleUserFromDB = async (id:string) => {
  const result = await User.findById(id);
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

const verifyUser = async (id: string) => {
  // Check if the user has at least one post with 5 or more upvotes
  const eligiblePost = await Post.findOne({ author: id, upVotes: { $gte: 1 } });

  if (!eligiblePost) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "User is not eligible for verification");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.status == 'premium') {
    throw new Error("User is already verified");
  }

  // Initiate payment
  const paymentData = {
    transactionId: `TRXN-${id}-${Date.now()}`,
    totalAmount: "1200",
    customerName: user.name,
    customerEmail: user.email,
  };
  console.log(paymentData);

  const paymentSession = await initiatePayment(paymentData);
  console.log(paymentSession);
  // Return the payment URL for the frontend to redirect the user

  return paymentSession;
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