import { z } from "zod"

const validate = (schema, body) => {
  try {
    return { success: true, data: schema.parse(body) }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors.map((e) => e.message).join(', ') }
    }
    throw error
  }
}

export default validate
