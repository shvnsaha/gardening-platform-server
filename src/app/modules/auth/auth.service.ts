import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../config";
import { Document } from "mongoose";

const createUserIntoDB = async (payload: TUser) => {
    const isUserExists = await User.findOne({ email: payload.email });
    if (isUserExists) {
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
        email: user?.email,
        role: user?.role,
    }

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );


    const userDocument = user as Document & TUser & { toObject: () => TUser };
    const userObject = userDocument.toObject();
    delete userObject.password;



    return {
        accessToken,
        user:userObject,
    }
}

export const AuthServices = {
    createUserIntoDB,
    loginUser
}
