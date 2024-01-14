export type ResponseWrapper<T> = { data: T }

export interface Params {
  id: string
}

export interface ErrorUI {
  error: boolean
  message: string
}
