import { z } from 'zod'

export const userAddSchema = z.object({
  email: z
    .string({
      required_error: '请输入邮箱',
      invalid_type_error: 'email must be a string',
    })
    .min(1, { message: '请输入邮箱' })
    .email({ message: '请输入有效的邮箱地址' }),
  password: z
    .string({
      required_error: '请输入密码',
      invalid_type_error: 'password must be a string',
    })
    .min(1, { message: '请输入密码' }),
})

export const userModifySchema = z.object({
  userId: z
    .string({
      required_error: 'userId is required',
    })
    .min(1, { message: 'userId is required' }),
  userName: z
    .string({
      required_error: '请输入用户名',
      invalid_type_error: 'userName must be a string',
    })
    .min(1, { message: '请输入用户名' }),
})

export const userDelSchema = z.string({
  required_error: 'userId is required',
});


export type UserFormSchemaType = z.infer<typeof userAddSchema>
export type UserModifyType = z.infer<typeof userModifySchema>
