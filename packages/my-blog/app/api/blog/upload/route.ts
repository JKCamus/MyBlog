import { mkdir, stat, writeFile } from 'fs/promises'
import mime from 'mime'
import { NextApiRequest } from 'next'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { join } from 'path'

interface NextApiRequestWithFormData extends NextApiRequest {
  formData: () => Promise<FormData>
}

export async function POST(request: NextApiRequestWithFormData) {
  // 获取 formData
  const formData = await request.formData()
  const file = formData.get('file')

  // 空值判断
  // 在 TypeScript 中处理 FormData 时，您可能会遇到 "类型‘FormDataEntryValue’上不存在属性‘arrayBuffer’。" 的错误。这是因为 FormData.get() 返回的 FormDataEntryValue 类型可以是 File 或 string 类型，而 arrayBuffer() 方法只存在于 File 类型上。

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'File is required.' }, { status: 400 })
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
    console.log('file---', file)
    console.log('mime', mime.getExtension(file.type))

    // 用于获取 MIME 类型信息,获取扩展名
    const uniqueFilename = `${filename}-${uniqueSuffix}.mdx`
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer)

    // 调用接口，写入数据库

    const res = 'work'
    // 清除缓存
    revalidatePath('/', 'layout')

    return NextResponse.json({
      fileUrl: `${relativeUploadDir}/${uniqueFilename}`,
      uid: res,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
