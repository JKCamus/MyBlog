import { Blog, BlogLayout, Prisma, PrismaClient, TagOnBlog, Tags, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
import { join } from 'path'
import { unlink } from 'fs/promises'

interface AddBlogInput {
  title: string
  summary?: string
  authorId: string
  layout?: string
  tags?: string[] // tagId 数组
  filepath: string
}

// user
// 添加 user
export async function addUser(email: string, password: string) {
  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (existUser) {
      return {
        error: '当前邮箱已存在！',
      }
    }
    // 给密码加盐，密码明文存数据库不安全
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name: email,
        email,
        password: hashedPassword,
      },
    })

    return
  } catch (error) {
    console.error('Error addUser in prisma:', error)
    throw error
  }
}

// 查询单条 User
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    if (!user) {
      return null
    }
    return {
      userName: user.name,
      userId: user.id,
    }
  } catch (error) {
    console.error('Error getUserById in prisma:', error)
    throw error
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    console.error('Error getAllUsers in prisma:', error)
    throw error
  }
}

// 更新 user
export async function updateUser(id: string, name: string): Promise<User> {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name },
    })
    return updatedUser
  } catch (error) {
    console.error('Error updateUser in prisma:', error)
    throw error
  }
}

// 删除单条 User（同时删除对应用户的博客）
export async function deleteUser(userId: string) {
  try {
    await prisma.$transaction(async (prisma) => {
      // 删除用户及其关联的记录（级联删除）
      await prisma.user.delete({
        where: { id: userId },
      })
    })
    return
  } catch (error) {
    console.error('Error deleteUser in prisma:', error)
    throw error
  }
}

// blog
//  添加 blog
export async function addBlog({
  title,
  summary,
  authorId,
  layout = 'PostLayout',
  tags = [],
  filepath,
}: AddBlogInput): Promise<Blog> {
  try {
    // 创建博客
    const newBlog = await prisma.blog.create({
      data: {
        title,
        summary,
        authorId,
        layout: layout as BlogLayout,
        filepath,
        tags: {
          create: tags.map((tagId) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        },
      },
      include: {
        tags: true,
      },
    })

    return newBlog
  } catch (error) {
    console.error('Error addBlog in prisma:', error)
    throw error
  }
}

export async function getAllBlogs(): Promise<
  (Blog & {
    tags: TagOnBlog[]
  })[]
> {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        tags: true,
      },
    })
    return blogs
  } catch (error) {
    console.error('Error getAllBlogs in prisma :', error)
    throw error
  }
}

export async function getBlogById(blogId: number): Promise<Blog | null> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        tags: true,
      },
    })
    return blog
  } catch (error) {
    console.error('Error getBlogById in prisma:', error)
    throw error
  }
}

// 更新 Blog（更新信息，包含关联的标签）
export async function updateBlog(blogId: number, blogData: Partial<Blog> & { tags: string[] }) {
  try {
    const updatedBlog = await prisma.$transaction(async (prisma) => {
      // 删除现有的 TagOnBlog 关系
      await prisma.tagOnBlog.deleteMany({
        where: { blogId: blogId },
      })

      // 更新 Blog 和重新创建 TagOnBlog 关系
      const blog = await prisma.blog.update({
        where: { id: blogId },
        data: {
          ...blogData,
          tags: {
            create: blogData.tags.map((tagId) => ({
              tag: {
                connect: { id: tagId },
              },
            })),
          },
        },
        include: { tags: true },
      })

      return blog
    })
    return updatedBlog
  } catch (error) {
    console.error('Error updateBlog in prisma:', error)
    throw error
  }
}

// 删除博客，并关联 user 和 tags
export async function deleteBlog(blogId: number): Promise<void> {
  try {
    // 启动一个事务
    await prisma.$transaction(async (prisma) => {
      // 获取要删除的 Blog 及其文件路径
      const blogToDelete = await prisma.blog.findUnique({
        where: { id: blogId },
        include: {
          tags: true,
          author: true,
        },
      })

      if (!blogToDelete) {
        throw new Error(`Blog with ID ${blogId} not found`)
      }

      // 删除 TagOnBlog 中的关联记录
      await prisma.tagOnBlog.deleteMany({
        where: { blogId: blogId },
      })

      // 删除 Blog
      await prisma.blog.delete({
        where: { id: blogId },
      })

      // 删除文件
      const filePath = join(process.cwd(), 'data', blogToDelete.filepath)
      await unlink(filePath)
    })
  } catch (error) {
    console.error('Error deleteBlog blog in prisma:', error)
    throw error
  }
}

// tags 方法
export async function addTag(tagName: string): Promise<Tags> {
  try {
    const newTag = await prisma.tags.create({
      data: { tagName },
    })
    return newTag
  } catch (error) {
    console.error('Error addTag in prisma:', error)
    throw error
  }
}

export async function getAllTags(): Promise<Tags[]> {
  try {
    const tags = await prisma.tags.findMany()
    return tags
  } catch (error) {
    console.error('Error getAllTags in prisma:', error)
    throw error
  }
}

export async function getTagsByIds(tagIds: string[]): Promise<Tags[]> {
  try {
    const tags = await prisma.tags.findMany({
      where: { id: { in: tagIds } },
      select: { id: true, tagName: true },
    })
    return tags
  } catch (error) {
    console.error('Error getTagsByIds in prisma:', error)
    throw error
  }
}

export async function updateTag(tagId: string, tagName: string): Promise<Tags> {
  try {
    const updatedTag = await prisma.tags.update({
      where: { id: tagId },
      data: { tagName },
    })
    return updatedTag
  } catch (error) {
    console.error('Error updateTag in prisma:', error)
    throw error
  }
}

// 删除单条 Tag（需要更新对应博客包含的标签信息）
export async function deleteTag(tagId: string) {
  try {
    await prisma.tagOnBlog.deleteMany({
      where: { tagId },
    })
    const deletedTag = await prisma.tags.delete({
      where: { id: tagId },
    })
    return deletedTag
  } catch (error) {
    console.error('Error updateTag in prisma:', error)
    throw error
  }
}
