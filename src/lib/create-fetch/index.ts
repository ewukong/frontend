import { qs } from '@/lib/qs'
import {
  type FetchMethods,
  type QueryOptions,
  type MutateOptions,
  type FetchOptions,
  type CreateFetchOptions,
  StatusCode,
  HeaderType,
  ContentType,
} from './types'

const isJson = (headers: HeadersInit) =>
  !!new Headers(headers).get(HeaderType.ContentType)?.includes(ContentType.Json)

export const createFetch = (
  input: RequestInfo | URL,
  {
    requestContentType = ContentType.Json,
    requestTokenStorageKey = 'token',
    requestTokenPrefix = 'Bearer ',
    responseJsonDataKey = 'data',
    responseJsonCodeKey = 'code',
    responseJsonSuccessCode = 0,
  }: CreateFetchOptions = {}
) => {
  const handleHeaders = ({ enableAuth = true, ...init }: FetchOptions = {}) => {
    const headers = new Headers(init?.headers)
    const token = localStorage.getItem(requestTokenStorageKey)
    const hasToken = !!token?.trim()

    // With `Content-Type`.
    if (!headers.has(HeaderType.ContentType)) {
      headers.set(HeaderType.ContentType, requestContentType)
    }

    // With token.
    if (enableAuth && hasToken && !headers.has(HeaderType.Authrization)) {
      headers.set(HeaderType.Authrization, requestTokenPrefix + token)
    }

    init.headers = headers
    return init
  }

  const handleError = (response: Response) => {
    if (response.status === StatusCode.AuthErr) {
      localStorage.removeItem(requestTokenStorageKey)
    }
    throw response
  }

  // Core function
  const fetcher = async <T>(path: string, opts: FetchOptions) => {
    const baseUrl = input instanceof Request ? input.url : input
    const response = await fetch(baseUrl + path, handleHeaders(opts))

    if (isJson(response.headers)) {
      const json = await response.json()
      if (json[responseJsonCodeKey] !== responseJsonSuccessCode) throw json
      return json[responseJsonDataKey] as T
    }
    if (!response.ok) throw handleError(response)

    return response.body as T
  }

  const queryFn = <T>(path: string, { query, ...opts }: QueryOptions = {}) => {
    return fetcher<T>(path + qs.stringify(query), {
      method: 'GET',
      ...opts,
    })
  }

  const mutateFn = <T>(
    method: FetchMethods,
    path: string,
    { body, query, ...opts }: MutateOptions = {}
  ) => {
    return fetcher<T>(path + qs.stringify(query), {
      method,
      body: body instanceof Object ? JSON.stringify(body) : body,
      ...opts,
    })
  }

  return {
    GET: queryFn,
    POST: <T>(p: string, o?: MutateOptions) => mutateFn<T>('POST', p, o),
    PUT: <T>(p: string, o?: MutateOptions) => mutateFn<T>('PUT', p, o),
    PATCH: <T>(p: string, o?: MutateOptions) => mutateFn<T>('PATCH', p, o),
    DELETE: <T>(p: string, o?: MutateOptions) => mutateFn<T>('DELETE', p, o),
  }
}
