import { web3 } from '@coral-xyz/anchor'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import {
  TransactionPayerPubkeyErr,
  TransactionVersionInvalidErr,
} from '../errors/transaction'

export const useVersionedTransaction = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  /** @internal */
  const createMessage = async (instructions: web3.TransactionInstruction[]) => {
    if (!publicKey) throw new TransactionPayerPubkeyErr()

    const { blockhash } = await connection.getLatestBlockhash()
    return new web3.TransactionMessage({
      payerKey: publicKey,
      instructions,
      recentBlockhash: blockhash,
    })
  }

  const createLegacyTransaction = async (
    instructions: web3.TransactionInstruction[]
  ) => {
    const message = await createMessage(instructions)
    const transaction = new web3.VersionedTransaction(
      message.compileToLegacyMessage()
    )
    return transaction
  }

  const createV0Transaction = async (
    instructions: web3.TransactionInstruction[],
    addressLookupTableAccounts: web3.AddressLookupTableAccount[] = []
  ) => {
    const message = await createMessage(instructions)
    const transaction = new web3.VersionedTransaction(
      message.compileToV0Message(addressLookupTableAccounts)
    )
    return transaction
  }

  const sendVersionedTransaction = async (
    instructions: web3.TransactionInstruction[],
    version: web3.TransactionVersion = 0
  ) => {
    const getTransaction = () => {
      if (version === 'legacy') return createLegacyTransaction(instructions)
      if (version === 0) return createV0Transaction(instructions)

      throw new TransactionVersionInvalidErr()
    }

    return sendTransaction(await getTransaction(), connection)
  }

  return {
    createLegacyTransaction,
    createV0Transaction,
    sendVersionedTransaction,
  }
}
