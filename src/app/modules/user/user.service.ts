import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";

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

  export const UserServices = {
    createUserIntoDB
  }