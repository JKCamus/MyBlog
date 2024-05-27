import { ZodSchema, z, ZodError } from 'zod'

interface ValidationSuccess<T> {
  success: true
  data: T
  error: undefined
}

interface ValidationError {
  success: false
  error: string
  data: undefined
}

type ValidationResult<T> = ValidationSuccess<T> | ValidationError

function validate<T>(schema: ZodSchema<T>, body: unknown): ValidationResult<T> {
  try {
    const data = schema.parse(body)
    return { success: true, data, error: undefined }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(', '),
        data: undefined,
      }
    }
    throw error
  }
}

export default validate
