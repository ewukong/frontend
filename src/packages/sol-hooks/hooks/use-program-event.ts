import { useEffect } from 'react'
import type { IdlEvents, Idl } from '@coral-xyz/anchor'

import { useProgram, type UseProgramOptions } from './use-program'

interface UseProgramEventOptions<
  IDL extends Idl,
  E extends keyof IdlEvents<IDL>
> extends UseProgramOptions<IDL> {
  eventName: E
  eventHandler: (
    data: IdlEvents<IDL>[E],
    slot: number,
    signature: string
  ) => void
}

export const useProgramEvent = <
  IDL extends Idl = Idl,
  Event extends keyof IdlEvents<IDL> = keyof IdlEvents<IDL>
>({
  idl,
  programId,
  eventName,
  eventHandler,
}: UseProgramEventOptions<IDL, Event>) => {
  const { program } = useProgram({
    idl,
    programId,
  })

  useEffect(() => {
    if (!program) return
    const listener = program.addEventListener(eventName, eventHandler)

    return () => {
      program.removeEventListener(listener)
    }
  }, [program])
}
