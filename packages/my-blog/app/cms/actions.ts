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
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from '@/lib/prismaClientUtils'
import validate, { actionValidate } from '@/lib/validate'
import { BlogLayout, Tags } from '@prisma/client'
import dayjs from 'dayjs'
import { join } from 'path'
import { mkdir, stat, writeFile, readFile } from 'fs/promises'
import { auth, signIn } from '@/lib/auth'
import { UserModifyType, userDelSchema, userModifySchema, userSchema } from './validateSchema'

interface UserInput {
  email: string
  password: string
}

export interface UserData {
  userId: string
  userName: string
  email: string | null
  createdAt: string
}

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

const blogAddSchema = z.object({
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

export async function registerUser(data: UserInput) {
  const { success, data: parsed, error } = validate(userSchema, data)
  if (!success) {
    throw new Error(error)
  }
  try {
    const { email, password } = parsed
    const result = await addUser(email, password)
    return result
  } catch (error) {
    console.log('error', error)
  }
}

export async function loginUser(data: UserInput) {
  try {
    const { success, data: parsed, error } = validate(userSchema, data)
    if (!success) {
      throw new Error(error)
    }
    const result = await signIn('credentials', {
      ...parsed,
      redirectTo: '/cms/blog',
    })
    return result
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const loginWidthGithub = async () => {
  await signIn('github', {
    redirectTo: '/cms/blog',
  })
}

export async function fetchAllUser() {
  try {
    const user = await getAllUsers()
    const users = user.map((item) => ({
      key: item.id,
      userId: item.id,
      userName: item.name || '',
      email: item.email,
      createdAt: dayjs(item.createdAt).format('YYYY-MM-DD'),
    }))
    return users
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export async function modifyUserInfo(data: UserModifyType) {
  try {
    const { userId, userName } = actionValidate(userModifySchema, data)
    await updateUser(userId, userName)
    return
  } catch (error) {
    throw error
  }
}

export async function delUser(id: string) {
  try {
    const { userId } = actionValidate(userDelSchema, { userId: id })

    const session = await auth()
    const isCurrentUser = session?.user?.id === userId

    if (isCurrentUser) {
      throw new Error('不能删除当前用户')
    }
    await deleteUser(userId)
  } catch (error) {
    throw error
  }
}

export async function createTag(data: { tagName: string }) {
  const { success, data: parsed, error } = validate(tagSchema, data)
  if (!success) {
    throw new Error(error)
  }
  try {
    const newTag = await addTag(parsed.tagName)
    return newTag
  } catch (error) {
    console.error('Error creating tag:', error)
    throw new Error('Failed to create tag')
  }
}

export async function modifyTag(data: { tagId: string; tagName: string }) {
  const { success, data: parsed, error } = validate(tagUpdateSchema, data)
  if (!success) {
    throw new Error(error)
  }
  try {
    const updatedTag = await updateTag(parsed.tagId, parsed.tagName)
    return updatedTag
  } catch (error) {
    console.error('Error updating tag:', error)
    throw new Error('Failed to update tag')
  }
}

export async function removeTag(data: { tagId: string }) {
  const { success, data: parsed, error } = validate(tagDeleteSchema, data)
  if (!success) {
    throw new Error(error)
  }
  try {
    const deletedTag = await deleteTag(parsed.tagId)
    return deletedTag
  } catch (error) {
    console.error('Error deleting tag:', error)
    throw new Error('Failed to delete tag')
  }
}

export { getAllTags }

export async function createBlog(formData) {
  try {
    const file = formData.get('file')
    const session = await auth()

    const fields = {
      title: formData.get('title'),
      summary: formData.get('summary') || undefined,
      authorId: session?.user?.id,
      layout: formData.get('layout') || undefined,
      tags: formData.get('tags') ? formData.get('tags').split(',') : [],
      file,
    }

    const { success, data, error } = validate(blogAddSchema, fields)
    if (!success) {
      throw new Error(error)
    }

    if (!file || !(file instanceof File)) {
      throw new Error('File is required.')
    }
    const allowedExtensions = ['md', 'mdx']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      throw new Error('Invalid file type. Only .md and .mdx files are allowed.')
    }
    const relativeUploadDir = `/blog`
    const uploadDir = join(process.cwd(), 'data', relativeUploadDir)

    try {
      await stat(uploadDir)
    } catch (e) {
      const error = e as NodeJS.ErrnoException
      if (error?.code === 'ENOENT') {
        await mkdir(uploadDir, { recursive: true })
      } else {
        throw new Error('mkdir error')
      }
    }

    const uniqueSuffix = `${Math.random().toString(36).slice(-18)}`

    const uniqueFilename = `${uniqueSuffix}.mdx`

    const blog = await addBlog({
      title: data.title,
      summary: data.summary,
      authorId: data.authorId,
      layout: data.layout,
      tags: data.tags,
      filepath: `${relativeUploadDir}/${uniqueFilename}`,
    })
    const tagNames = await getTagsByIds(data.tags)

    const yamlFrontMatter = `---
title: '${blog.title}'
date: '${dayjs(blog.date).format('YYYY-MM-DD')}'
${tagNames.length > 0 ? `tags: [${tagNames.map((tag) => `'${tag.tagName}'`).join(', ')}]` : ''}
draft: false
${blog.summary ? `summary: '${blog.summary}'` : ''}
layout: ${blog.layout}
---\n`
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileContent = buffer.toString('utf-8')
    const newContent = yamlFrontMatter + fileContent

    await writeFile(`${uploadDir}/${uniqueFilename}`, newContent)
  } catch (error) {
    console.log('error', error)
    throw new Error(error)
  }
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
  try {
    const { success, data: parsed, error } = validate(blogDeleteSchema, data)
    if (!success) {
      throw new Error(error)
    }
    await deleteBlog(parsed.blogId)
  } catch (error) {
    console.error('Error deleting blog:', error)
    throw new Error('Failed to delete blog')
  }
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
    throw new Error('Failed to fetch blogs.')
  }
}
