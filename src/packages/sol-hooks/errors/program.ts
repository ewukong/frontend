export class ProgramNotFoundErr extends Error {
  name = 'ProgramNotFoundErr'

  constructor(msg = 'Program not found') {
    super(msg)
  }
}
