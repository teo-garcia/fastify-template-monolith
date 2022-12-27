import { HttpError } from '@tools/types'

const isHttpError = (error: unknown): error is HttpError => {
  return error instanceof HttpError
}

export { isHttpError }
