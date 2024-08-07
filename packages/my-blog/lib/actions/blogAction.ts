'use server'

import { auth } from '../auth'
import {
  BlogUpdateType,
  blogAddSchema,
  blogDelSchema,
  blogUpdateSchema,
} from '../schema/blogSchema'
import { join } from 'path'

import { mkdir, stat, writeFile, readFile } from 'fs/promises'
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getTagsByIds,
  getUserById,
  updateBlog,
} from '../prismaClientUtils'
import dayjs from 'dayjs'
import { revalidatePath } from 'next/cache'

export async function createBlogAction(formData) {
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

    const result = blogAddSchema.safeParse(fields)

    if (!result.success) {
      console.error('Validation error:', result.error)
      throw new Error(result.error.issues[0].message)
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
    const { title, summary, authorId, layout, tags } = result.data
    const blog = await addBlog({
      title,
      summary,
      authorId,
      layout,
      tags,
      filepath: `${relativeUploadDir}/${uniqueFilename}`,
    })
    const tagNames = await getTagsByIds(tags)

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
    revalidatePath('/', 'page')


  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export async function updateBlogAction(data: BlogUpdateType) {
  try {
    const result = blogUpdateSchema.safeParse(data)
    if (!result.success) {
      console.error('Validation error:', result.error)
      throw new Error(result.error.issues[0].message)
    }
    const { blogId, title, summary, layout, tags = [] } = result.data
    const updatedBlog = await updateBlog(blogId, {
      title,
      summary,
      layout,
      tags,
      lastmod: new Date(),
    })
    const currentTags = await getTagsByIds(tags)
    const yamlFrontMatter = `---
title: '${updatedBlog.title}'
date: '${dayjs(updatedBlog.date).format('YYYY-MM-DD')}'
lastmod: '${dayjs(updatedBlog.lastmod).format('YYYY-MM-DD')}'
${
  currentTags.length > 0 ? `tags: [${currentTags.map((tag) => `'${tag.tagName}'`).join(', ')}]` : ''
}
draft: ${updatedBlog?.draft}
${updatedBlog.summary && `summary: '${updatedBlog.summary}'`}
layout: ${updatedBlog.layout}
---`

    const filePath = join(process.cwd(), 'data', updatedBlog.filepath)
    const fileContent = await readFile(filePath, 'utf-8')
    const newContent = fileContent.replace(/---[\s\S]*?---/, yamlFrontMatter)

    await writeFile(filePath, newContent)
    // 清除缓存，避免修改了 blog 数据，blog 显示不正确
    revalidatePath('/', 'page')

    return updatedBlog
  } catch (error) {
    console.error('Error updateBlogAction in action:', error)
    throw new Error('Failed to update blog info. Please try again later.')
  }
}

export async function deleteBlogAction(id) {
  try {
    const result = blogDelSchema.safeParse(id)
    if (!result.success) {
      console.error('Validation error:', result.error)
      throw new Error(result.error.issues[0].message)
    }
    const blogId = result.data
    await deleteBlog(blogId)
    revalidatePath('/', 'page')
  } catch (error) {
    console.error('Error deleting blog in action:', error)
    throw new Error('Failed to delete blog in action. Please try again later.')
  }
}

export async function getAllBlogsAction() {
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
    console.error('Error fetching all blogs in action:', error)
    throw new Error('Failed to get blogs. Please try again later.')
  }
}
