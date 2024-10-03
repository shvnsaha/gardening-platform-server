/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface TUser {
  _id?: string
  name: string
  email: string
  password: string
  profileImg?: string 
  role: 'user' | 'admin'
  isVerified: boolean
  followers: TUser[]
  followings : TUser[]
  posts: Types.ObjectId[]
  bookmarks: Types.ObjectId[]
}

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}
