'use server'

import { addTag, deleteTag, getAllTags, updateTag } from '../prismaClientUtils'
import { tagAddSchema, tagDelSchema, tagUpdateSchema } from '../schema/tagSchema'

export async function createTagAction(tagName:string) {
  const result = tagAddSchema.safeParse(tagName)

  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }

  try {
    const newTag = await addTag(result.data)
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

export async function delTagAction(id:string) {
  const result = tagDelSchema.safeParse(id)
  if (!result.success) {
    console.error('Validation error:', result.error)
    throw new Error(result.error.issues[0].message)
  }
  const tagId = result.data
  try {
    const deletedTag = await deleteTag(tagId)
    return deletedTag
  } catch (error) {
    console.error('Error delate tag in action:', error)
    throw new Error('Failed to delete tag')
  }
}

export { getAllTags as getAllTagsAction }
