import { addNote } from '@/lib/prismaClientUtils'
import { mkdir, stat, writeFile } from 'fs/promises'
import { NextApiRequest } from 'next'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { join } from 'path'
import { z } from 'zod'
interface NextApiRequestWithFormData extends NextApiRequest {
  formData: () => Promise<FormData>
}

const schema = z.object({
  title: z.string().min(1, { message: 'Title 不能为空' }),
  summary: z.string().optional(), // summary 不是必填项
  authorId: z.string().min(1, { message: 'AuthorId 不能为空' }),
  layout: z.string().optional(), // layout 不是必填项
  tags: z.array(z.string()).optional(), // tagId 数组 不是必填项
  file: z.any(), // 文件类型校验单独进行
})

export async function POST(request: NextApiRequestWithFormData, res) {
  // 获取 formData
  const formData = await request.formData()
  const file = formData.get('file')

  const fields = {
    title: formData.get('title') as string,
    summary: (formData.get('summary') as string) || undefined,
    authorId: formData.get('authorId') as string,
    layout: (formData.get('layout') as string) || undefined,
    tags: formData.get('tags') ? (formData.get('tags') as string).split(',') : [],
    file: file,
  }
  try {
    const validatedData = schema.parse(fields)
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.log('error', e)
      return NextResponse.json({ error: e.errors }, { status: 400 })
    } else {
      return NextResponse.json({ status: 500 })
    }
  }

  // 空值判断
  // 在 TypeScript 中处理 FormData 时，您可能会遇到 "类型‘FormDataEntryValue’上不存在属性‘arrayBuffer’。" 的错误。这是因为 FormData.get() 返回的 FormDataEntryValue 类型可以是 File 或 string 类型，而 arrayBuffer() 方法只存在于 File 类型上。

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

  const buffer = Buffer.from(await file.arrayBuffer())

  const relativeUploadDir = `/blog`
  const uploadDir = join(process.cwd(), 'data', relativeUploadDir)

  // 判断目标文件夹是否存在，没有则创建
  try {
    await stat(uploadDir) // stat() 函数可以返回文件的大小、权限和修改时间。
  } catch (e) {
    const error = e as NodeJS.ErrnoException
    if (error?.code === 'ENOENT') {
      //检查错误代码是否为 ENOENT，这表示文件或目录不存在。
      await mkdir(uploadDir, { recursive: true }) //没有文件夹，创建文件夹
    } else {
      console.error(e)
      return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
    }
  }

  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`
    const filename = file.name.replace(/\.[^/.]+$/, '')

    // 用于获取 MIME 类型信息,获取扩展名
    const uniqueFilename = `${filename}-${uniqueSuffix}.mdx`
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer)

    // 调用接口，写入数据库
    const newNote = await addNote({
      title: fields.title,
      summary: fields.summary,
      authorId: fields.authorId,
      layout: fields.layout,
      tags: fields.tags, // 假设 tags 数组包含的是 tagId
      filepath: `${relativeUploadDir}/${uniqueFilename}`,
    })

    // 清除缓存
    revalidatePath('/', 'layout')

    return NextResponse.json(
      {
        message: 'File uploaded and note added successfully',
      },
      { status: 200 }
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
