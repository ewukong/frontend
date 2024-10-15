import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { first, isEmpty } from 'lodash'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const joinPaths = (...paths: (string | number)[]) => {
  if (isEmpty(paths)) return ''

  const hasSlash = first(paths)?.toString().startsWith('/')
  const path = paths
    .map((a) => String(a).replace(/^\/|\/$/g, ''))
    .filter(Boolean)
    .join('/')

  return hasSlash ? `/${path}` : path
}

export const sleep = (delay = 1000) =>
  new Promise((resolve) => setTimeout(resolve, delay))
