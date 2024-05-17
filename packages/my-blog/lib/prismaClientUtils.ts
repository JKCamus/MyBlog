import { NoteLayout, PrismaClient } from '@prisma/client'

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

interface AddNoteInput {
  title: string
  summary?: string
  authorId: string
  layout?: string
  tags?: string[] // tagId 数组
  filepath: string
}

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

export async function getUser(username, password) {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      notes: true,
    },
  })
  if (!user) return 0
  if (user.password !== password) return 1
  return {
    name: username,
    username,
    userId: user.id,
  }
}

export async function addNote({
  title,
  summary,
  authorId,
  layout = 'PostLayout',
  tags = [],
  filepath,
}: AddNoteInput) {
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

export async function getAllNotes() {
  // 查找登录用户的笔记
  const notes = await prisma.note.findMany({})
  // 构造返回数据
  const res = {}
  notes.forEach(({ title, content, id, updatedAt }) => {
    res[id] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    })
  })
  return res
}
