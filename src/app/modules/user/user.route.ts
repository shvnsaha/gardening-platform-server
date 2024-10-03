import { Router } from 'express'
import { UserControllers } from './user.controller'


// import auth from '../../middlewares/auth'

const router = Router()
router.get("/:id",UserControllers.getSingleUser)


 

export const UserRoutes = router
