import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

const addComment = catchAsync(async (req, res) => {
    const result = await CommentServices.createCommentIntoDB(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Comment added successfully",
      data: result,
    });
  });
  

const getComment = catchAsync(async (req, res) => {
    const result = await CommentServices.getCommentsOfPostFromDB(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Comment retrieved successfully",
      data: result,
    });
  });

  export const CommentControllers = {
    addComment,
    getComment
  }