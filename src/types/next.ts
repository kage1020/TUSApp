import type { ReactNode } from 'react'

export type Props = {
  children: ReactNode
}

export type Response<T> = SuccessResponse<T> | ErrorResponse

export type SuccessResponse<T> = {
  status: 200
  data: T
}

export type ErrorResponse = {
  status: 401 | 404 | 500
  msg: string
}
