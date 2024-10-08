import  mongoose, { Schema, model } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: 0  },
    profileImg:{type: String},
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
        message: '{VALUE} is not valid',
      },
      default: 'user'
    },
    isVerified:{type:Boolean,default: false},
    followers :[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    followings :[{type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
    posts : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
    bookmarks : [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
  },
  { versionKey: false,
    timestamps:true
   },

)

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.statics.isUserExists = async function (email: string) {
  return await User.findOne({ email }).select("+password");
}

userSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

export const User = model<TUser, UserModel>('User', userSchema)
