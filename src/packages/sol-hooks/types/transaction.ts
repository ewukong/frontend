import { web3 } from '@coral-xyz/anchor'

export type WithTransactionVersion = {
  version?: web3.TransactionVersion
}
