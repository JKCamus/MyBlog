import { Note, NoteLayout, PrismaClient, Tags, User } from '@prisma/client'

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
import { join } from 'path'

import { unlink } from 'fs/promises'

interface AddNoteInput {
  title: string
  summary?: string
  authorId: string
  layout?: string
  tags?: string[] // tagId 数组
  filepath: string
}


interface Tag {
  id: string
  tagName: string
}
// user
// 添加user
export async function addUser(username, password) {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      notes: {
        create: [],
      },
    },
  })

  return {
    name: username,
    username,
    userId: user.id,
  }
}

// 查询单条 User
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { notes: true },
    })
    if (!user) {
      return null
    }
    return {
      username: user.username,
      userId: user.id,
    }
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    console.error('Error retrieving users:', error)
    throw error
  }
}

// 更新 user
export async function updateUser(
  userId: string,
  username: string,
  password: string
): Promise<User> {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username, password },
    })
    return updatedUser
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

// 删除单条 User（同时删除对应用户的笔记）
export async function deleteUser(userId: string): Promise<User> {
  await prisma.note.deleteMany({
    where: { authorId: userId },
  })
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  })
  return deletedUser
}

// note
//  添加 note
export async function addNote({
  title,
  summary,
  authorId,
  layout = 'PostLayout',
  tags = [],
  filepath,
}: AddNoteInput): Promise<Note> {
  try {
    // 创建笔记
    const newNote = await prisma.note.create({
      data: {
        title,
        summary,
        authorId,
        layout: layout as NoteLayout,
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

    return newNote
  } catch (error) {
    console.error('Error adding note:', error)
    throw error
  }
}

export async function getAllNotes(): Promise<Note[]> {
  try {
    const notes = await prisma.note.findMany({
      include: {
        tags: true,
      },
    })
    return notes
  } catch (error) {
    console.error('Error retrieving notes:', error)
    throw error
  }
}

export async function getNoteById(noteId: number): Promise<Note | null> {
  try {
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      include: {
        tags: true,
      },
    })
    return note
  } catch (error) {
    console.error('Error retrieving note:', error)
    throw error
  }
}

// 更新 Note（更新信息，包含关联的标签）
export async function updateNote(
  noteId: number,
  noteData: Partial<Note> & { tags: string[] }
): Promise<Note> {
  const updatedNote = await prisma.$transaction(async (prisma) => {
    // 删除现有的 TagOnNote 关系
    await prisma.tagOnNote.deleteMany({
      where: { noteId: noteId },
    })

    // 更新 Note 和重新创建 TagOnNote 关系
    const note = await prisma.note.update({
      where: { id: noteId },
      data: {
        ...noteData,
        tags: {
          create: noteData.tags.map((tagId) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        },
      },
      include: { tags: true },
    })

    return note
  })

  return updatedNote
}

// 删除笔记，并关联 user 和 tags
export async function deleteNote(noteId: number): Promise<void> {
  try {
    // 启动一个事务
    await prisma.$transaction(async (prisma) => {
      // 获取要删除的 Note 及其文件路径
      const noteToDelete = await prisma.note.findUnique({
        where: { id: noteId },
        include: {
          tags: true,
          author: true,
        },
      })

      if (!noteToDelete) {
        throw new Error(`Note with ID ${noteId} not found`)
      }

      // 删除 TagOnNote 中的关联记录
      await prisma.tagOnNote.deleteMany({
        where: { noteId: noteId },
      })

      // 删除 Note
      await prisma.note.delete({
        where: { id: noteId },
      })

      // 删除文件
      const filePath = join(process.cwd(), 'data', noteToDelete.filepath)
      await unlink(filePath)
    })
  } catch (error) {
    console.error('Error deleting note:', error)
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
    console.error('Error adding tag:', error)
    throw error
  }
}

export async function getAllTags(): Promise<Tags[]> {
  try {
    const tags = await prisma.tags.findMany()
    return tags
  } catch (error) {
    console.error('Error retrieving tags:', error)
    throw error
  }
}


export async function getTagsByIds(tagIds: string[]): Promise<Tag[]> {
  const tags = await prisma.tags.findMany({
    where: { id: { in: tagIds } },
    select: { id: true, tagName: true },
  })
  return tags
}

export async function updateTag(tagId: string, tagName: string): Promise<Tags> {
  try {
    const updatedTag = await prisma.tags.update({
      where: { id: tagId },
      data: { tagName },
    })
    return updatedTag
  } catch (error) {
    console.error('Error updating tag:', error)
    throw error
  }
}

// 删除单条 Tag（需要更新对应笔记包含的标签信息）
export async function deleteTag(tagId: string): Promise<Tags> {
  await prisma.tagOnNote.deleteMany({
    where: { tagId },
  })
  const deletedTag = await prisma.tags.delete({
    where: { id: tagId },
  })
  return deletedTag
}
