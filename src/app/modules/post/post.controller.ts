import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import AppError from "../../errors/AppError";

const createPost = catchAsync(async (req, res) => {
    const result = await PostServices.createPostIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post created successfully",
      data: result,
    });
  });

  const updatePost = catchAsync(async (req, res) => {
    const result = await PostServices.updatePostIntoDB(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post updated successfully",
      data: result,
    });
  });

  const deletePost = catchAsync(async (req, res) => {
    const result = await PostServices.deletePostFromDB(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post deleted successfully",
      data: result,
    });
  });

  const getSinglePost = catchAsync(async (req, res) => {
    const result = await PostServices.getSinglePostFromDB(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post retrieved successfully",
      data: result,
    });
  });

  const vote = catchAsync(async (req, res) => {
    const postId = req.params.id;
  
    const { voteType, userId } = req.body;
  
    if (!userId) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User not authenticated");
    }
  
    const result = await PostServices.voteInPost(postId, userId.toString(), voteType);
  
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Vote recorded successfully",
      data: result,
    });
  });
  

  export const PostControllers = {
    createPost,
    updatePost,
    deletePost,
    getSinglePost,
    vote
  }