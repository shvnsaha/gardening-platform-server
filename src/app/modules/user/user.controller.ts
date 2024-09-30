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


  export const UserControllers = {
    getSingleUser,
    updateUser
  }