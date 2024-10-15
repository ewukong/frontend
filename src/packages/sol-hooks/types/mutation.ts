import type { UseMutationOptions, DefaultError } from '@tanstack/react-query'

export type WithMutationOptions<
  Data = unknown,
  Err = DefaultError,
  Variables = void,
  Context = unknown
> = {
  mutation?: Omit<
    UseMutationOptions<Data, Err, Variables, Context>,
    'mutationKey' | 'mutationFn'
  >
}
