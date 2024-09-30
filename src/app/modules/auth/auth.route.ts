import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidations } from '../user/user.validation'
import { AuthControllers } from './auth.controller'
import { AuthValidations } from './auth.validation'

const router = Router()

router
  .post(
    '/signup',
    validateRequest(UserValidations.createUserValidationSchema),
    AuthControllers.createUser,
  )
  .post(
    '/login',
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser,
  )


export const AuthRoutes = router
