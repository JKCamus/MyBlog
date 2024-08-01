'use server'

import { addTag, deleteTag, getAllTags, updateTag } from '../prismaClientUtils'
import { tagAddSchema, tagDelSchema, tagUpdateSchema } from '../schema/tagSchema'

export async function createTagAction(data: { tagName: string }) {
  const result = tagAddSchema.safeParse(data)

  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }

  try {
    const newTag = await addTag(result.data.tagName)
    return newTag
  } catch (error) {
    console.error('Error creating tag in action:', error)
    throw new Error('Failed to create tag')
  }
}

export async function updateTagAction(data: { tagId: string; tagName: string }) {
  const result = tagUpdateSchema.safeParse(data)

  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }
  const { tagId, tagName } = result.data
  try {
    const updatedTag = await updateTag(tagId, tagName)
    return updatedTag
  } catch (error) {
    console.error('Error updating tag in action:', error)
    throw new Error('Failed to update tag')
  }
}

export async function delTagAction(data: { tagId: string }) {
  const result = tagDelSchema.safeParse(data)
  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }
  try {
    const deletedTag = await deleteTag(result?.data?.tagId)
    return deletedTag
  } catch (error) {
    console.error('Error delate tag in action:', error)
    throw new Error('Failed to delete tag')
  }
}

export { getAllTags as getAllTagsAction }
