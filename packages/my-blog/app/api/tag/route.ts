import { addTag, deleteTag, getAllTags, updateTag } from '@/lib/prismaClientUtils';
import validate from '@/lib/validate';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// 定义 Zod schema
const tagSchema = z.object({
  tagName: z.string().min(1, { message: 'Tag 名称不能为空' }),
});

const tagUpdateSchema = z.object({
  tagId: z.string().min(1, { message: 'Tag ID 不能为空' }),
  tagName: z.string().min(1, { message: 'Tag 名称不能为空' }),
});

const tagDeleteSchema = z.object({
  tagId: z.string().min(1, { message: 'Tag ID 不能为空' }),
});



// 处理 POST 请求（新增 Tag）
export async function POST(request) {
  try {
    const body = await request.json();
    const { success, data, error } = validate(tagSchema, body);

    if (!success) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await addTag(data.tagName);
    return NextResponse.json({ message: '新建Tag成功' }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

// 处理 PUT 请求（更新 Tag）
export async function PUT(request) {
  try {
    const body = await request.json();
    const { success, data, error } = validate(tagUpdateSchema, body);

    if (!success) {
      return NextResponse.json({ error }, { status: 400 });
    }

    try {
      await updateTag(data.tagId, data.tagName);
      return NextResponse.json({ message: '更新Tag成功' }, { status: 200 });
    } catch (error) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: '无当前标签' }, { status: 404 });
      }
      throw error;
    }
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

// 处理 GET 请求（获取所有 Tags）
export async function GET() {
  try {
    const res = await getAllTags();
    return NextResponse.json({ res });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

// 处理 DELETE 请求（删除 Tag）
export async function DELETE(request) {
  try {
    const body = await request.json();
    const { success, data, error } = validate(tagDeleteSchema, body);

    if (!success) {
      return NextResponse.json({ error }, { status: 400 });
    }

    try {
      await deleteTag(data.tagId);
      return NextResponse.json({ message: '删除Tag成功' }, { status: 200 });
    } catch (error) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: '无当前标签' }, { status: 404 });
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors.map((e) => e.message).join(', ') }, { status: 400 });
    }
    console.log('error', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
