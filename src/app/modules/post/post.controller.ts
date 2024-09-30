import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";

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
  

  export const PostControllers = {
    createPost,
    updatePost
  }