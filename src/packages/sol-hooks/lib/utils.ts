import { BigNumber } from 'bignumber.js'
import { web3 } from '@coral-xyz/anchor'
import {
  type Account,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  TokenInvalidMintError,
  TokenInvalidOwnerError,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token'

export const formatSol = (amount: number | string) => {
  return BigNumber(amount).div(web3.LAMPORTS_PER_SOL).toFixed()
}

export const parseSol = (amount: number | string) => {
  return BigNumber(amount).multipliedBy(web3.LAMPORTS_PER_SOL).toNumber()
}

export const isSolAddress = (addr: string) => {
  try {
    return web3.PublicKey.isOnCurve(addr)
  } catch (err) {
    return false
  }
}

/**
 * Rewrite `getOrCreateAssociatedTokenAccount` of `@solana/spl-token`.
 */
export async function getAssociatedTokenAddressOrInstruction(
  connection: web3.Connection,
  payer: web3.PublicKey,
  mint: web3.PublicKey,
  owner: web3.PublicKey,
  allowOwnerOffCurve = false,
  commitment?: web3.Commitment,
  programId = TOKEN_PROGRAM_ID,
  associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID
) {
  const associatedToken = getAssociatedTokenAddressSync(
    mint,
    owner,
    allowOwnerOffCurve,
    programId,
    associatedTokenProgramId
  )

  // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
  // Sadly we can't do this atomically.
  let account: Account | null = null
  try {
    account = await getAccount(
      connection,
      associatedToken,
      commitment,
      programId
    )
  } catch (error: unknown) {
    // TokenAccountNotFoundError can be possible if the associated address has already received some lamports,
    // becoming a system account. Assuming program derived addressing is safe, this is the only case for the
    // TokenInvalidAccountOwnerError in this code path.
    if (
      error instanceof TokenAccountNotFoundError ||
      error instanceof TokenInvalidAccountOwnerError
    ) {
      // As this isn't atomic, it's possible others can create associated accounts meanwhile.
      try {
        const instruction = createAssociatedTokenAccountInstruction(
          payer,
          associatedToken,
          owner,
          mint,
          programId,
          associatedTokenProgramId
        )

        return [associatedToken, instruction] as const
      } catch (error: unknown) {
        // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
        // instruction error if the associated account exists already.
      }
    } else {
      throw error
    }
  }

  if (!account?.mint.equals(mint)) throw new TokenInvalidMintError()
  if (!account?.owner.equals(owner)) throw new TokenInvalidOwnerError()

  return [account.address ?? associatedToken, null] as const
}
