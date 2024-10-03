import { z } from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Email must be a string',
      })
      .min(2, 'Name must be at least 2 characters long')
      .max(50, 'Name cannot exceed 50 characters'),

    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email()
      .min(5, 'Email must be at least 5 characters long')
      .max(100, 'Email cannot exceed 100 characters'),

    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Email must be a string',
      })
      .min(6, 'Password must be at least 6 characters long')
      .max(50, 'Password cannot exceed 50 characters'),
  }),
})


const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    profileImg: z.string().optional(),
    phone: z.string().optional(),
    isVerified: z.boolean().optional(),
  }),
});



export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema
}
