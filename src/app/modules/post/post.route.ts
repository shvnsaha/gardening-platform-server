import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { PostValidations } from "./post.validation";
import { PostControllers } from "./post.controller";



const router = express.Router();

router.post(
    "/",
    // validateRequest(PostValidations.createPostSchema),
    PostControllers.createPost
);

router.get("/user/:id", PostControllers.getPostsByUser);

router.patch(
    "/update-post/:id",

    validateRequest(PostValidations.updatePostSchema),
    PostControllers.updatePost
);

router.delete(
    "/:id",PostControllers.deletePost
  );
  router.get("/:id", PostControllers.getSinglePost);
  router.get("/user/:id",PostControllers.getPostsByUser)

  router.post(
    "/vote/:id",
    validateRequest(PostValidations.voteSchema),
    PostControllers.vote
  );
  


export const PostRoutes = router;