import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { PostValidations } from "./post.validation";
import { PostControllers } from "./post.controller";


const router = express.Router();

router.post(
    "/create-post",

    validateRequest(PostValidations.createPostSchema),
    PostControllers.createPost
);

router.patch(
    "/update-post/:id",

    validateRequest(PostValidations.updatePostSchema),
    PostControllers.updatePost
);


export const PostRoutes = router;