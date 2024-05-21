import { addNote, deleteNote, getAllNotes, getTagsByIds, updateNote } from '@/lib/prismaClientUtils'
import validate from '@/lib/validate'
import { Tags } from '@prisma/client'
import dayjs from 'dayjs'
import { mkdir, stat, writeFile, readFile } from 'fs/promises'
import { NextApiRequest } from 'next'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { z } from 'zod'
interface NextApiRequestWithFormData extends NextApiRequest {
  formData: () => Promise<FormData>
}

const noteAddSchema = z.object({
  title: z.string().min(1, { message: 'Title 不能为空' }),
  summary: z.string().optional(), // summary 不是必填项
  authorId: z.string().min(1, { message: 'AuthorId 不能为空' }),
  layout: z.string().optional(), // layout 不是必填项
  tags: z.array(z.string()).optional(), // tagId 数组 不是必填项
  file: z.any(), // 文件类型校验单独进行
})

const noteDeleteSchema = z.object({
  noteId: z.number().min(1, { message: 'Note ID 不能为空' }),
})

const noteUpdateSchema = z.object({
  noteId: z.number().min(1, { message: 'Note ID 不能为空' }),
  title: z.string().optional(),
  summary: z.string().optional(),
  layout: z.string().optional(),
  tags: z.array(z.string().min(1, { message: 'Tag ID 不能为空' })).optional(),
  draft: z.boolean().optional(),
})

export async function GET() {
  try {
    const notes = await getAllNotes()
    return NextResponse.json({ notes }, { status: 200 })
  } catch (error) {
    console.error('Error retrieving notes:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const fields = {
      title: formData.get('title') as string,
      summary: (formData.get('summary') as string) || undefined,
      authorId: formData.get('authorId') as string,
      layout: (formData.get('layout') as string) || undefined,
      tags: formData.get('tags') ? (formData.get('tags') as string).split(',') : [],
      file,
    }

    const { success, data, error } = validate(noteAddSchema, fields)
    if (!success) {
      return NextResponse.json({ error }, { status: 400 })
    }

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'File is required.' }, { status: 400 })
    }

    const allowedExtensions = ['md', 'mdx']
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only .md and .mdx files are allowed.' },
        { status: 400 }
      )
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
        console.error(e)
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
      }
    }

    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`
    const filename = file.name.replace(/\.[^/.]+$/, '')
    const uniqueFilename = `${filename}-${uniqueSuffix}.mdx`

    const note = await addNote({
      title: data.title,
      summary: data.summary,
      authorId: data.authorId,
      layout: data.layout,
      tags: data.tags,
      filepath: `${relativeUploadDir}/${uniqueFilename}`,
    })

    const tagNames = await getTagsByIds(data.tags)

    const yamlFrontMatter = `---
title: ${note.title}
date: '${dayjs(note.date).format('YYYY-MM-DD')}'
${note.lastmod ? `lastmod: ${note.lastmod}` : ''}
${tagNames.length > 0 ? `tags: [${tagNames.map((tag) => `'${tag.tagName}'`).join(', ')}]` : ''}
draft: false
${note.summary ? `summary: ${note.summary}` : ''}
layout: ${note.layout}
---`

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileContent = buffer.toString('utf-8')
    const newContent = yamlFrontMatter + fileContent

    await writeFile(`${uploadDir}/${uniqueFilename}`, newContent)

    return NextResponse.json(
      { message: 'File uploaded and note added successfully' },
      { status: 200 }
    )
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 })
    }
    console.error(e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json()
    const { success, data, error } = validate(noteDeleteSchema, body)

    if (!success) {
      return NextResponse.json({ error }, { status: 400 })
    }

    try {
      await deleteNote(data.noteId)
      return NextResponse.json({ message: '删除Note成功' }, { status: 200 })
    } catch (error) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: '无当前笔记' }, { status: 404 })
      }
      throw error
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 })
    }
    console.error(e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const body = await request.json()
    const { success, data, error } = validate(noteUpdateSchema, body)
    if (!success) {
      return NextResponse.json({ error }, { status: 400 })
    }

    const note = await updateNote(data.noteId, {
      title: data.title,
      summary: data.summary,
      layout: data.layout,
      draft: data.draft,
      lastmod: new Date(),
      tags: data?.tags || [],
    })
    let tags: Tags[] = []
    if (data.tags) {
      tags = await getTagsByIds(data.tags)
    }

    const yamlFrontMatter = `---
title: ${note.title}
date: '${dayjs(note.date).format('YYYY-MM-DD')}'
lastmod: '${dayjs(note.lastmod).format('YYYY-MM-DD')}'
${tags.length > 0 ? `tags: [${tags.map((tag) => `'${tag.tagName}'`).join(', ')}]` : ''}
draft: ${note.draft}
${note.summary ? `summary: ${note.summary}` : ''}
layout: ${note.layout}
---`

    const filePath = join(process.cwd(), 'data', note.filepath)
    const fileContent = await readFile(filePath, 'utf-8')

    const newContent = fileContent.replace(/---[\s\S]*?---/, yamlFrontMatter)

    await writeFile(filePath, newContent)

    return NextResponse.json({ message: 'Note updated successfully' }, { status: 200 })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.errors }, { status: 400 })
    }
    console.error(e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
