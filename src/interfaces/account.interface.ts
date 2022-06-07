export interface IAccount {
  id: string
  userId: string
  assets: Array<IAsset> | []
}

export interface IAsset {
  tickerSymbol: string
  quantity: number
  sharePrice: number
}
