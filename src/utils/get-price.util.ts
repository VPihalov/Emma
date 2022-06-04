import { assets } from '../mocks/assets.mock'

export const getSharePrice = (ticker) => {
  const asset = assets.find((asset) => asset.tickerSymbol === ticker)
  return asset.sharePrice
}
