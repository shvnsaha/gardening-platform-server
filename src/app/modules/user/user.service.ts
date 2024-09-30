import { TUser } from "./user.interface";
import { User } from "./user.model";

const getSingleUserFromDB = async (email: string) => {
    const result = await User.findOne({ email });
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

  export const UserServices = {
    getSingleUserFromDB,
    updateUserIntoDB
  }