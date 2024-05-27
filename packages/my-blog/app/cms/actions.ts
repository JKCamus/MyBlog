'use server'

import { z } from 'zod'
import {
  addTag,
  updateTag,
  deleteTag,
  getAllTags,
  addBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getUserById,
  getTagsByIds,
} from '@/lib/prismaClientUtils'
import validate from '@/lib/validate'
import { BlogLayout, Tags } from '@prisma/client'
import dayjs from 'dayjs'
import { join } from 'path'
import { mkdir, stat, writeFile, readFile } from 'fs/promises'

const tagSchema = z.object({
  tagName: z
    .string({
      required_error: 'Tag name 不能为空',
      invalid_type_error: 'Tag name must be a string',
    })
    .min(1, { message: 'Tag name cannot be empty' }),
})

const tagUpdateSchema = z.object({
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

const tagDeleteSchema = z.object({
  tagId: z
    .string({
      required_error: 'Tag ID cannot be empty',
      invalid_type_error: 'Tag ID must be a string',
    })
    .min(1, { message: 'Tag ID cannot be empty' }),
})

const blogSchema = z.object({
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

const blogUpdateSchema = z.object({
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

const blogDeleteSchema = z.object({
  blogId: z
    .number({
      required_error: 'Blog ID 不能为空',
      invalid_type_error: 'Blog ID must be a number',
    })
    .min(1, { message: 'Blog ID 不能为空' }),
})

export async function createTag(data: { tagName: string }) {
  const { success, data: parsed, error } = validate(tagSchema, data)
  if (!success) {
    throw new Error(error)
  }
  const newTag = await addTag(parsed.tagName)
  return newTag
}

export async function modifyTag(data: { tagId: string; tagName: string }) {
  const { success, data: parsed, error } = validate(tagUpdateSchema, data)
  if (!success) {
    throw new Error(error)
  }
  const updatedTag = await updateTag(parsed.tagId, parsed.tagName)
  return updatedTag
}

export async function removeTag(data: { tagId: string }) {
  const { success, data: parsed, error } = validate(tagDeleteSchema, data)
  if (!success) {
    throw new Error(error)
  }
  const deletedTag = await deleteTag(parsed.tagId)
  return deletedTag
}

export { getAllTags }

export async function createBlog(data: any) {
  const { success, data: parsed, error } = validate(blogSchema, data)
  if (!success) {
    throw new Error(error)
  }
  const newBlog = await addBlog(parsed)
  return newBlog
}

export async function modifyBlog(
  blogId: number,
  data: Omit<z.infer<typeof blogUpdateSchema>, 'blogId'>
) {
  const { success, data: parsed, error } = validate(blogUpdateSchema, { blogId, ...data })
  if (!success) {
    throw new Error(error)
  }
  const updatedBlog = await updateBlog(parsed.blogId, {
    title: parsed?.title,
    summary: parsed?.summary,
    layout: parsed?.layout,
    tags: parsed?.tags || [],
    lastmod: new Date(),
  })
  const tags = await getTagsByIds(parsed.tags)
  const yamlFrontMatter = `---
title: ${updatedBlog.title}
date: '${dayjs(updatedBlog.date).format('YYYY-MM-DD')}'
lastmod: '${dayjs(updatedBlog.lastmod).format('YYYY-MM-DD')}'
${tags.length > 0 ? `tags: [${tags.map((tag) => `'${tag.tagName}'`).join(', ')}]` : ''}
draft: ${updatedBlog?.draft}
${updatedBlog.summary ? `summary: ${updatedBlog.summary}` : ''}
layout: ${updatedBlog.layout}
---`

  const filePath = join(process.cwd(), 'data', updatedBlog.filepath)
  const fileContent = await readFile(filePath, 'utf-8')
  const newContent = fileContent.replace(/---[\s\S]*?---/, yamlFrontMatter)

  await writeFile(filePath, newContent)

  return updatedBlog
}

export async function removeBlog(data: { blogId: number }) {
  const { success, data: parsed, error } = validate(blogDeleteSchema, data)
  if (!success) {
    throw new Error(error)
  }
  await deleteBlog(parsed.blogId)
  return
}

export async function fetchAllBlogs() {
  try {
    const blogs = await getAllBlogs()
    const blogsData = await Promise.all(
      blogs.map(async (item) => {
        const user = await getUserById(item.authorId)
        const userName = user?.userName
        const tagIds = item?.tags?.map((tagOnBlog) => tagOnBlog.tagId) || []
        const tags = await getTagsByIds(tagIds)

        return {
          key: item.id,
          title: item.title,
          summary: item?.summary || undefined,
          userName: userName,
          layout: item.layout,
          tags,
        }
      })
    )

    return blogsData
  } catch (error) {
    console.error('Error fetching all blogs:', error)
    throw error
  }
}
