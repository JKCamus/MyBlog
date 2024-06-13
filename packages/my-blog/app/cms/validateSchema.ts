import { z } from 'zod'

export const userSchema = z.object({
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

export type UserFormSchemaType = z.infer<typeof userSchema>;
