export class WalletNotConnectErr extends Error {
  constructor(msg = 'Wallet is not connect') {
    super(msg)
  }
}
