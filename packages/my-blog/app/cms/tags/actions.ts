'use server'

import { z } from 'zod'
import { addTag, updateTag, deleteTag, getAllTags } from '@/lib/prismaClientUtils'

const tagSchema = z.object({
  tagName: z.string().min(1, { message: 'Tag name cannot be empty' }),
})

const tagUpdateSchema = z.object({
  tagId: z.string().min(1, { message: 'Tag ID cannot be empty' }),
  tagName: z.string().min(1, { message: 'Tag name cannot be empty' }),
})

const tagDeleteSchema = z.object({
  tagId: z.string().min(1, { message: 'Tag ID cannot be empty' }),
})

export async function createTag(data: { tagName: string }) {
  const parsed = tagSchema.parse(data)
  const newTag = await addTag(parsed.tagName)
  return newTag
}

export async function modifyTag(data: { tagId: string; tagName: string }) {
  const parsed = tagUpdateSchema.parse(data)
  const updatedTag = await updateTag(parsed.tagId, parsed.tagName)
  return updatedTag
}

export async function removeTag(data: { tagId: string }) {
  const parsed = tagDeleteSchema.parse(data)
  const deletedTag = await deleteTag(parsed.tagId)
  return deletedTag
}

export {getAllTags as fetchAllTags}
