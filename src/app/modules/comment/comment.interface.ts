import { Types } from "mongoose"

export type TComment = {
    text: string,
    author: Types.ObjectId,
    post: Types.ObjectId
}