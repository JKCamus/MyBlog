import { z } from 'zod'
import { BlogLayout } from '@prisma/client'

export const blogAddSchema = z.object({
  title: z
    .string({
      required_error: 'Title 不能为空',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, { message: 'Title 不能为空' }),
  summary: z.string().optional(),
  authorId: z
    .string({
      required_error: 'AuthorId 不能为空',
      invalid_type_error: 'AuthorId must be a string',
    })
    .min(1, { message: 'AuthorId 不能为空' }),
  layout: z.nativeEnum(BlogLayout).optional(),
  tags: z.array(
    z
      .string({
        required_error: 'Tag ID 不能为空',
        invalid_type_error: 'Tag ID must be a string',
      })
      .min(1, { message: 'Tag ID 不能为空' })
  ),
  file: z.any(),
})

export const blogUpdateSchema = z.object({
  blogId: z
    .number({
      required_error: 'Blog ID 不能为空',
      invalid_type_error: 'Blog ID must be a number',
    })
    .min(1, { message: '请输入有效 Blog ID' }),
  title: z.string().optional(),
  summary: z.string().optional(),
  layout: z.nativeEnum(BlogLayout).optional(),
  tags: z.array(
    z
      .string({
        required_error: 'Tag ID 不能为空',
        invalid_type_error: 'Tag ID must be a string',
      })
      .min(1, { message: 'Tag ID 不能为空' })
  ),
  draft: z.boolean().optional(),
})

export const blogDelSchema = z
  .number({
    required_error: 'Blog ID 不能为空',
    invalid_type_error: 'Blog ID must be a number',
  })
  .min(1, { message: 'Blog ID 不能为空' })


  export type BlogUpdateType=z.infer<typeof blogUpdateSchema>
