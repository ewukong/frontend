export enum HeaderType {
  ContentType = 'Content-Type',
  Authrization = 'Authorization',
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
}

export enum StatusCode {
  Success = 200,

  // Client error.
  AuthErr = 401,
  NotFoundErr = 404,
  ConflictErr = 409,
  TooLargeErr = 413,

  // Server error.
  ServerErr = 500,
}

export interface CreateFetchOptions {
  requestContentType?: ContentType
  requestTokenStorageKey?: string
  requestTokenPrefix?: string
  responseJsonDataKey?: string
  responseJsonCodeKey?: string
  responseJsonSuccessCode?: number
}

export type FetchMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface FetchOptions extends RequestInit {
  enableAuth?: boolean
}

export interface QueryOptions extends Omit<FetchOptions, 'method'> {
  query?: Record<string, any>
}

export interface MutateOptions
  extends Omit<FetchOptions, 'method' | 'body'>,
    Pick<QueryOptions, 'query'> {
  body?: BodyInit | Record<string, any>
}
