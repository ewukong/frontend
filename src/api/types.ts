export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

export interface ApiPaginationReq {
  page: number
  pageSize: number
}

export interface ApiPaginationRes<T = unknown> {
  total: number
  list: T[]
}

export enum ApiCodes {}
