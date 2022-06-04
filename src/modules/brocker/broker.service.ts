import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { setTimeout } from 'timers/promises'

import { ACCOUNT_ID } from '../../constants/account-ids.const'
import { assets } from '../../mocks/assets.mock'
import { getAccountByID } from '../../utils/get-account.util'
import { getSharePrice } from '../../utils/get-price.util'
import { updateAssets } from '../../utils/update-assets.util'

@Injectable()
export class Broker {
  constructor(private readonly config: ConfigService) {}

  async listTradableAssets(): Promise<Array<{ tickerSymbol: string }>> {
    return await setTimeout(
      1000,
      assets.map((asset) => ({ tickerSymbol: asset.tickerSymbol }))
    )
  }

  async getLatestPrice(tickerSymbol: string): Promise<{ sharePrice: number }> {
    const searchPrice = () => {
      const asset = assets.find((asset) => asset.tickerSymbol === tickerSymbol)
      return { sharePrice: asset.sharePrice }
    }
    return await setTimeout(1000, searchPrice())
  }

  async isMarketOpen(): Promise<{ open: boolean; nextOpeningTime: string; nextClosingTime: string }> {
    const isMarketOpen = () => ({
      open: faker.datatype.boolean(),
      nextOpeningTime: faker.date.soon(0.5).toISOString(),
      nextClosingTime: faker.date.soon(1).toISOString(),
    })
    return await setTimeout(1000, isMarketOpen())
  }

  async buySharesInRewardsAccount(
    tickerSymbol: string,
    quantity: number
  ): Promise<{ success: boolean; sharePricePaid: number }> {
    const buySharesInRewardsAccount = () => {
      const emmaAccount = getAccountByID(ACCOUNT_ID.EMMA)
      emmaAccount.assets = updateAssets(emmaAccount.assets, tickerSymbol, quantity)
      return { success: true, sharePricePaid: getSharePrice(tickerSymbol) }
    }
    return await setTimeout(1000, buySharesInRewardsAccount())
  }

  async getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string; quantity: number; sharePrice: number }>> {
    return await setTimeout(1000, getAccountByID(ACCOUNT_ID.EMMA).assets)
  }

  async moveSharesFromRewardsAccount(
    toAccount: string,
    tickerSymbol: string,
    quantity: number
  ) /*: Promise<{ success: boolean }>*/ {
    const moveSharesFromRewardsAccount = () => {}
    return await setTimeout(1000, () => console.log('BLABLACAR'))
  }
}
