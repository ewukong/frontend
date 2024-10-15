import { createFetch } from '@/lib/create-fetch'
import { apiUrl } from '@/config/api'
import { tokenStorageKey } from '@/config/storage'

export const wukongFetch = createFetch(apiUrl.wukong, {
  requestTokenStorageKey: tokenStorageKey,
})
