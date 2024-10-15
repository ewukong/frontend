export class TransactionPayerPubkeyErr extends Error {
  name = ' TransactionPayerPubkeyErr'

  constructor(msg = 'Transaction payer pubkey invalid') {
    super(msg)
  }
}

export class TransactionVersionInvalidErr extends Error {
  name = 'TransactionVersionInvalidErr'

  constructor(msg = 'Transaction version invalid') {
    super(msg)
  }
}
