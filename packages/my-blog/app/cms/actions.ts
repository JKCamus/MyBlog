'use server';

import { z } from 'zod';
import { addTag, updateTag, deleteTag, getAllTags, addBlog, updateBlog, deleteBlog, getAllBlogs, getUserById, getTagsByIds } from '@/lib/prismaClientUtils';

const tagSchema = z.object({
  tagName: z.string().min(1, { message: 'Tag name cannot be empty' }),
});

const tagUpdateSchema = z.object({
  tagId: z.string().min(1, { message: 'Tag ID cannot be empty' }),
  tagName: z.string().min(1, { message: 'Tag name cannot be empty' }),
});

const tagDeleteSchema = z.object({
  tagId: z.string().min(1, { message: 'Tag ID cannot be empty' }),
});

const blogSchema = z.object({
  title: z.string().min(1, { message: 'Title 不能为空' }),
  summary: z.string().optional(),
  authorId: z.string().min(1, { message: 'AuthorId 不能为空' }),
  layout: z.string().optional(),
  tags: z.array(z.string().min(1, { message: 'Tag ID 不能为空' })).optional(),
  file: z.any(),
});

const blogUpdateSchema = z.object({
  blogId: z.number().min(1, { message: 'Blog ID 不能为空' }),
  title: z.string().optional(),
  summary: z.string().optional(),
  layout: z.string().optional(),
  tags: z.array(z.string().min(1, { message: 'Tag ID 不能为空' })).optional(),
  draft: z.boolean().optional(),
});

const blogDeleteSchema = z.object({
  blogId: z.number().min(1, { message: 'Blog ID 不能为空' }),
});

export async function createTag(data: { tagName: string }) {
  const parsed = tagSchema.parse(data);
  const newTag = await addTag(parsed.tagName);
  return newTag;
}

export async function modifyTag(data: { tagId: string; tagName: string }) {
  const parsed = tagUpdateSchema.parse(data);
  const updatedTag = await updateTag(parsed.tagId, parsed.tagName);
  return updatedTag;
}

export async function removeTag(data: { tagId: string }) {
  const parsed = tagDeleteSchema.parse(data);
  const deletedTag = await deleteTag(parsed.tagId);
  return deletedTag;
}

export { getAllTags };

export async function createBlog(data: any) {
  const parsed = blogSchema.parse(data);
  const newBlog = await addBlog(parsed);
  return newBlog;
}

export async function modifyBlog(data: any) {
  const parsed = blogUpdateSchema.parse(data);
  const updatedBlog = await updateBlog(parsed.blogId, parsed);
  return updatedBlog;
}

export async function removeBlog(data: any) {
  const parsed = blogDeleteSchema.parse(data);
  await deleteBlog(parsed.blogId);
  return;
}

export async function fetchAllBlogs() {
  try {
    const blogs = await getAllBlogs();
    const blogsData = await Promise.all(
      blogs.map(async (item) => {
        const user = await getUserById(item.authorId);
        const userName = user?.username;
        const tagIds = item?.tags?.map((tagOnBlog) => tagOnBlog.tagId) || [];
        const tags = await getTagsByIds(tagIds);

        return {
          key: item.id,
          title: item.title,
          summary: item?.summary || undefined,
          userName: userName,
          layout: item.layout,
          tags,
        };
      })
    );

    return blogsData;
  } catch (error) {
    console.error('Error fetching all blogs:', error);
    throw error;
  }
}
