import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { PostRoutes } from '../modules/post/post.route'
import { CommentRoutes } from '../modules/comment/comment.route'


const router = Router()

const moduleRoutes = [
  
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
 
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
