import { OPERATION } from '@enums/operation.enum'
import { IAsset } from '@interfaces/account.interface'
import { HttpException, HttpStatus } from '@nestjs/common'
import { getSharePrice } from '@utils/index.util'
import { setTimeout } from 'timers/promises'

export const buyOrSellAssets = async ({
  assets,
  tickerSymbol,
  quantity,
  operation = OPERATION.BUY,
}): Promise<Array<IAsset>> => {
  const buyOrSellAssets = (): Array<IAsset> => {
    const sharePrice = getSharePrice(tickerSymbol)
    const index = assets.findIndex((_element) => _element.tickerSymbol === tickerSymbol)
    if (operation === OPERATION.BUY) {
      if (index > -1) assets[index] = { ...assets[index], quantity: assets[index]['quantity'] + quantity, sharePrice }
      else assets.push({ tickerSymbol, quantity, sharePrice })
    }
    if (operation === OPERATION.SELL) {
      const quantityAfterSell = assets[index]['quantity'] - quantity
      if (quantityAfterSell < 0) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Not enough shares to move from rewards account. Buy it first please',
          },
          HttpStatus.BAD_REQUEST
        )
      }
      if (index > -1) assets[index] = { ...assets[index], quantity: quantityAfterSell, sharePrice }
    }
    return assets
  }
  return setTimeout(1000, buyOrSellAssets())
}
