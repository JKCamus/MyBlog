import { z } from 'zod'

export const tagAddSchema = z
  .string({
    required_error: 'Tag name 不能为空',
    invalid_type_error: 'Tag name must be a string',
  })
  .min(1, { message: 'Tag name cannot be empty' })

export const tagUpdateSchema = z.object({
  tagId: z
    .string({
      required_error: 'Tag ID 不能为空',
      invalid_type_error: 'Tag ID must be a string',
    })
    .min(1, { message: 'Tag ID cannot be empty' }),
  tagName: z
    .string({
      required_error: 'Tag name cannot be empty',
      invalid_type_error: 'Tag name must be a string',
    })
    .min(1, { message: 'Tag name cannot be empty' }),
})

export const tagDelSchema = z
  .string({
    required_error: 'Tag ID cannot be empty',
    invalid_type_error: 'Tag ID must be a string',
  })
  .min(1, { message: 'Tag ID cannot be empty' })
