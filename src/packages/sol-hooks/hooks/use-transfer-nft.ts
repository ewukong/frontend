import { type DefaultError, useMutation } from '@tanstack/react-query'
import { web3 } from '@coral-xyz/anchor'
import { createTransferCheckedInstruction } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import type { WithMutationOptions } from '../types/mutation'
import type { WithTransactionVersion } from '../types/transaction'
import { getAssociatedTokenAddressOrInstruction } from '../lib/utils'
import { useVersionedTransaction } from './use-versioned-transaction'
import { TransactionPayerPubkeyErr } from '../errors/transaction'

interface MutationFnParams {
  toPubkey: web3.PublicKey
  mintAddress: web3.PublicKey
}

type UseTransferNftOptions<Context> = WithMutationOptions<
  string,
  DefaultError,
  MutationFnParams,
  Context
> &
  WithTransactionVersion

export const useTransferNft = <Context = unknown>({
  version,
  mutation,
}: UseTransferNftOptions<Context> = {}) => {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const { sendVersionedTransaction } = useVersionedTransaction()

  const results = useMutation({
    mutationKey: ['useTransferNft', publicKey?.toString()],
    mutationFn: async ({ mintAddress, toPubkey }) => {
      if (!publicKey) throw new TransactionPayerPubkeyErr()

      const [fromToken, fromIx] = await getAssociatedTokenAddressOrInstruction(
        connection,
        publicKey,
        mintAddress,
        publicKey
      )
      const [toToken, toIx] = await getAssociatedTokenAddressOrInstruction(
        connection,
        publicKey,
        mintAddress,
        toPubkey
      )
      const ixs: web3.TransactionInstruction[] = []

      if (fromIx) ixs.push(fromIx)
      if (toIx) ixs.push(toIx)

      return sendVersionedTransaction(
        [
          ...ixs,
          createTransferCheckedInstruction(
            fromToken,
            mintAddress,
            toToken,
            publicKey,
            1,
            0
          ),
        ],
        version
      )
    },
    ...mutation,
  })

  return results
}
