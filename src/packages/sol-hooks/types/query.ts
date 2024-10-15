import type {
  UseQueryOptions,
  DefaultError,
  QueryKey,
} from '@tanstack/react-query'

export type WithQueryOptions<
  TFnData,
  TError = DefaultError,
  TData = TFnData,
  TQueryKey extends QueryKey = QueryKey
> = {
  query?: Omit<
    UseQueryOptions<TFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
}
