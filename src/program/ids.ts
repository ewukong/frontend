import { web3 } from '@coral-xyz/anchor'
import { MPL_TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata'
import { dotenv } from '@/lib/env'

const metadata = new web3.PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID)

const prod = {
  metadata,
  stake: new web3.PublicKey('5pS3dEh3qDLRdHntMt7bRusFeXXf8KbjfJxg1XThuq4X'),
} as const

const dev = {
  metadata,
  stake: new web3.PublicKey('6dQGC5TLzuTZ9GwztPdScp7KoBodeCvwb7PWRjaqpjcg'),
} as const

export const programIds = dotenv.isDev ? dev : prod
