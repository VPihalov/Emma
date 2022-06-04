export interface IAccount {
  id: string
  name: string
  assets: Array<IAsset> | []
}

export interface IAsset {
  tickerSymbol: string
  quantity: number
  sharePrice: number
}
