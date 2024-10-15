import { useQuery } from '@tanstack/react-query'
import { type Idl, type Address, Program } from '@coral-xyz/anchor'

import { useAnchorProvider } from './use-anchor-provider'

export interface UseProgramOptions<IDL extends Idl> {
  idl: IDL
  programId: Address
}

export const useProgram = <IDL extends Idl = Idl>({
  idl,
  programId,
}: UseProgramOptions<IDL>) => {
  const { provider } = useAnchorProvider()

  const { data: program, ...results } = useQuery({
    queryKey: ['useProgram', programId],
    queryFn: () => new Program<IDL>(idl, programId),
    enabled: !!provider,
  })

  return {
    program,
    ...results,
  }
}
