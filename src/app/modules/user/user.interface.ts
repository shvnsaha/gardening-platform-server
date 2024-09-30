/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface TUser {
  name: string
  email: string
  password: string
  phone: string
  profileImg?: string 
  role: 'user' | 'admin'
  status: string
  expireDate: number 
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
