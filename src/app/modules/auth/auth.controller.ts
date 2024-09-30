import httpStatus from "http-status"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { AuthServices } from "./auth.service"

const createUser = catchAsync(async (req, res) => {
    const user = await AuthServices.createUserIntoDB(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User registered successfully',
      data: user
    })
  })

  const loginUser = catchAsync(async (req, res) => {
    const { user, accessToken } = await AuthServices.loginUser(req.body)
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User logged in successfully',
      token: accessToken,
      data: user
    })
  })

  export const AuthControllers = {
    createUser,
    loginUser
  }