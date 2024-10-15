import { useMutation, type DefaultError } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'

import type { WithMutationOptions } from '../types/mutation'
import type { WithTransactionVersion } from '../types/transaction'
import { TransactionPayerPubkeyErr } from '../errors/transaction'
import { useVersionedTransaction } from './use-versioned-transaction'

interface MutationFnParams {
  toPubkey: web3.PublicKey
  lamports: number | bigint
}

type UseTransferSolOptions<Context> = WithMutationOptions<
  string,
  DefaultError,
  MutationFnParams,
  Context
> &
  WithTransactionVersion

export const useTransferSol = <Context = unknown>({
  version,
  mutation,
}: UseTransferSolOptions<Context> = {}) => {
  const { publicKey } = useWallet()
  const { sendVersionedTransaction } = useVersionedTransaction()

  const results = useMutation({
    mutationKey: ['useTransferSol', publicKey?.toString()],
    mutationFn: async ({ toPubkey, lamports }) => {
      if (!publicKey) throw new TransactionPayerPubkeyErr()
      return sendVersionedTransaction(
        [
          web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey,
            lamports,
          }),
        ],
        version
      )
    },
    ...mutation,
  })

  return results
}
