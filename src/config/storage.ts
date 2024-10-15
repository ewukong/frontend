export const storageNs = 'wukong::'

export const tokenStorageKey = storageNs + 'token'

export type LocalStorage = {
  token: string
  lang: string
}

export type SessionStorage = {}
