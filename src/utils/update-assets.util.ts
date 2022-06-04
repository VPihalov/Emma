import { getSharePrice } from './get-price.util'

export const updateAssets = (assets, tickerSymbol, quantity) => {
  const sharePrice = getSharePrice(tickerSymbol)
  const i = assets.findIndex((_element) => _element.tickerSymbol === tickerSymbol)
  if (i > -1) assets[i] = { ...assets[i], quantity: assets[i]['quantity'] + quantity, sharePrice }
  else assets.push({ tickerSymbol, quantity, sharePrice })
  return assets
}
