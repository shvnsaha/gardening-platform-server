import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLogin, TUser } from "./user.interface";
import { User } from "./user.model";
import { createToken } from "./user.utils";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
    const isUserExists = await User.findOne({email:payload.email});
    if(isUserExists){
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Already a user using this email',
      )
    }
    const result = await User.create(payload)
    return result
  }


  const loginUser = async (payload: TLogin) => {
    const user = await User.isUserExists(payload?.email)
  
    // console.log(user);
  
    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'There is no user using this email',
      )
    }
  
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
      throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  
    //    jwtpayload;
    const jwtPayload = {
      userId: user._id,
      email: user?.email,
      role: user?.role,
    }
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  
 
  
    return {
      accessToken,
      user,
    }
  }
  

  export const UserServices = {
    createUserIntoDB,
    loginUser
  }