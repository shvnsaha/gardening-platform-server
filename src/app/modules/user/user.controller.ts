import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";


const getSingleUser = catchAsync(async (req, res) => {
    const result = await UserServices.getSingleUserFromDB(req.params.email);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved successfully",
      data: result,
    });
  });

  const updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.updateUserIntoDB(id, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your profile updated successfully",
      data: result,
    });
  });

  const followUser = catchAsync(async (req, res) => {
    const { followerId } = req.body;
    const followingId = req.params.id;
  
    const result = await UserServices.followUser(followerId, followingId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User followed successfully",
      data: result,
    });
  });
  
  const unfollowUser = catchAsync(async (req, res) => {
    const { followerId } = req.body;
    const followingId = req.params.id;
  
    const result = await UserServices.unfollowUser(followerId, followingId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User unfollowed successfully",
      data: result,
    });
  });
  
  // favorite post
  const bookmark = catchAsync(async (req, res) => {
    const { userId } = req.body;
    const postId = req.params.id;
  
    const result = await UserServices.bookmarkPost(userId, postId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Post added to bookmarked",
      data: result,
    });
  });
  
  // unfavorite post
  const removeBookmark = catchAsync(async (req, res) => {
    const { userId } = req.body;
    const postId = req.params.id;
  
    const result = await UserServices.removeBookmarkPost(userId, postId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Post removed from favorites successfully",
      data: result,
    });
  });
  
  // get user favorites posts
  const getUserFavoritesPosts = catchAsync(
    async (req, res) => {
      const userId = req.params.id;
  
      const result = await UserServices.getUserFavorites(userId);
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User favorites retrieved successfully",
        data: result,
      });
    }
  );


  export const UserControllers = {
    getSingleUser,
    updateUser,
    followUser,
    unfollowUser,
    bookmark,
    removeBookmark,
    getUserFavoritesPosts
  }