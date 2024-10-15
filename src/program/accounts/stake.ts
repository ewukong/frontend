import { web3 } from '@coral-xyz/anchor'
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token'

import { programIds } from '../ids'

/** @internal */
const getCommonAccounts = (
  tokenMint: web3.PublicKey,
  user: web3.PublicKey
) => ({
  tokenMint,
  user,
  tokenProgram: TOKEN_PROGRAM_ID,
  associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
  systemProgram: web3.SystemProgram.programId,
})

export const getPreStakeAccounts = (
  tokenMint: web3.PublicKey,
  user: web3.PublicKey
) => {
  const [nftVaultManager] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('nft_vault_manager')],
    programIds.stake
  )
  const [stakedNftData] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('staked_nft_data'), user.toBuffer(), tokenMint.toBuffer()],
    programIds.stake
  )
  const nftVaultAta = getAssociatedTokenAddressSync(
    tokenMint,
    nftVaultManager,
    true
  )

  return {
    nftVaultManager,
    nftVaultAta,
    stakedNftData,
    ...getCommonAccounts(tokenMint, user),
  }
}

export const getStakeAccounts = (
  tokenMint: web3.PublicKey,
  user: web3.PublicKey
) => {
  const [nftTokenMetadata] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      programIds.metadata.toBuffer(),
      tokenMint.toBuffer(),
    ],
    programIds.metadata
  )
  const [userStakeData] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('user_stake_data'), user.toBuffer()],
    programIds.stake
  )
  const [nftConfig] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from('nft_config')],
    programIds.stake
  )
  const userTokenAta = getAssociatedTokenAddressSync(tokenMint, user, true)

  return {
    // Not needed for now.
    // nftConfig,
    // userStakeData,
    nftTokenMetadata,
    nftProgramId: programIds.metadata,
    userTokenAta,
    ...getPreStakeAccounts(tokenMint, user),
  }
}

export const getUnstakeAccounts = (
  tokenMint: web3.PublicKey,
  user: web3.PublicKey
) => {
  const { nftTokenMetadata, nftProgramId, ...accounts } = getStakeAccounts(
    tokenMint,
    user
  )

  return accounts
}
