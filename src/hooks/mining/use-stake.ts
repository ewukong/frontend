import { useMutation } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { stakeIdl } from '@/program/idl/stake'
import { programIds } from '@/program/ids'
import {
  getPreStakeAccounts,
  getStakeAccounts,
  getUnstakeAccounts,
} from '@/program/accounts/stake'
import { useProgram, useVersionedTransaction } from '@/packages/sol-hooks'
import { WalletNotConnectErr } from '@/errors/wallet'

export const useStake = (onSuccess?: VoidFunction) => {
  const { t } = useTranslation()
  const { publicKey } = useWallet()
  const { sendVersionedTransaction } = useVersionedTransaction()
  const { program, error } = useProgram({
    idl: stakeIdl,
    programId: programIds.stake,
  })

  const {
    data: stakeHash,
    isPending: isStaking,
    mutateAsync: stake,
    reset: resetStake,
  } = useMutation({
    mutationKey: ['stake', publicKey],
    mutationFn: async (mintAddress: string) => {
      if (!publicKey) throw new WalletNotConnectErr()
      if (!program) throw error

      const tokenMint = new web3.PublicKey(mintAddress)
      const ixs = await Promise.all([
        program.methods
          .preStakeNft()
          .accounts(getPreStakeAccounts(tokenMint, publicKey))
          .instruction(),
        program.methods
          .stakeNft()
          .accounts(getStakeAccounts(tokenMint, publicKey))
          .instruction(),
      ])

      return sendVersionedTransaction(ixs)
    },
    onMutate: () => toast.loading(t('stake.loading')),
    onSettled: (_, __, ___, id) => toast.dismiss(id),
    onError: ({ message }) => {
      resetStake()
      toast.error(message)
    },
    onSuccess: (sign) => {
      console.log('stake', sign)
      onSuccess?.()
      toast.success(t('stake.success'))
    },
  })

  const {
    data: unstakeHash,
    isPending: isUnstaking,
    mutateAsync: unstake,
    reset: resetUnstake,
  } = useMutation({
    mutationKey: ['unstake', publicKey],
    mutationFn: async (mintAddress: string) => {
      if (!publicKey) throw new WalletNotConnectErr()
      if (!program) throw error
      const tokenMint = new web3.PublicKey(mintAddress)

      return sendVersionedTransaction([
        await program.methods
          .unstakeNft()
          .accounts(getUnstakeAccounts(tokenMint, publicKey))
          .instruction(),
      ])
    },
    onMutate: () => toast.loading(t('unstake.loading')),
    onSettled: (_, __, ___, id) => toast.dismiss(id),
    onError: ({ message }) => {
      resetUnstake()
      toast.error(message)
    },
    onSuccess: (sign) => {
      console.log('unstake', sign)
      onSuccess?.()
      toast.success(t('unstake.success'))
    },
  })

  const reset = () => {
    resetStake()
    resetUnstake()
  }

  return {
    hash: stakeHash || unstakeHash,
    isPending: isStaking || isUnstaking,
    isStaking,
    isUnstaking,
    stake,
    unstake,
    reset,
  }
}
