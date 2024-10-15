import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useConnection } from '@solana/wallet-adapter-react'
import { web3 } from '@coral-xyz/anchor'

interface Options {
  signature: string | undefined
  onLoading?: () => void
  onError?: (error: Error) => void
  onSuccess?: (data: web3.RpcResponseAndContext<web3.SignatureResult>) => void
  onFianlly?: () => void
}

export const useWaitTransactionConfirm = ({
  signature,
  onLoading,
  onError,
  onSuccess,
  onFianlly,
}: Options) => {
  const { connection } = useConnection()

  const result = useQuery({
    queryKey: ['useWaitTransactionConfirm', signature],
    queryFn: async () => {
      const latestBlock = await connection.getLatestBlockhash()
      const { context, value } = await connection.confirmTransaction({
        signature: signature!,
        ...latestBlock,
      })

      if (value.err) throw new Error(value.err.toString())
      return { context, value }
    },
    enabled: !!signature,
  })
  const { data, error, isLoading, isError, isSuccess } = result

  useEffect(() => {
    if (isLoading) onLoading?.()
    if (isError) onError?.(error)
    if (isSuccess) onSuccess?.(data)
    if (isError || isSuccess) onFianlly?.()
  }, [isLoading, isError, isSuccess])

  return result
}
