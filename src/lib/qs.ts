import QueryString from 'qs'

export const qs = {
  stringify: (
    query: Record<string, any> | string[][] | undefined,
    {
      withPrefix = true,
      ...options
    }: Parameters<typeof QueryString.stringify>['1'] & {
      withPrefix?: boolean
    } = {}
  ) => {
    if (!query) return ''

    const searchParams = QueryString.stringify(query, {
      encodeValuesOnly: true,
      indices: Array.isArray(query) ? false : undefined,
      ...options,
    })
    if (searchParams.length === 0) return ''

    return `${withPrefix ? '?' : ''}${searchParams}`
  },
  parse: (
    query: string | undefined,
    options?: Parameters<typeof QueryString.parse>['1']
  ) => {
    if (!query) return {} as Record<string, string>
    const str = query.startsWith('?') ? query.slice(1) : query
    return QueryString.parse(str, options)
  },
}
