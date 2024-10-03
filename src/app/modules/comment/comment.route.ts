import { Router } from 'express'
import { CommentControllers } from './comment.controller'

const router = Router()
router.post("/",CommentControllers.addComment)
router.get("/:id",CommentControllers.getComment)

export const CommentRoutes = router