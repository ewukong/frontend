import { dotenv } from '@/lib/env'

const prod = {
  wukong: 'https://api.ewukong.xyz',
}

const dev = {
  wukong: 'https://tapi.ewukong.xyz',
}

export const apiUrl = dotenv.isDev ? dev : prod
