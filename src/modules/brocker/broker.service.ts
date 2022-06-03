import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { setTimeout } from 'timers/promises'

import { assets } from '../../mocks/assets.mock'

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
    const getMarketOpen = () => ({
      open: faker.datatype.boolean(),
      nextOpeningTime: faker.date.soon(0.5).toISOString(),
      nextClosingTime: faker.date.soon(1).toISOString(),
    })
    return await setTimeout(1000, getMarketOpen())
  }

  // async buySharesInRewardsAccount(
  //   tickerSymbol: string,
  //   quantity: number
  // ): Promise<{ success: boolean; sharePricePaid: number }> {
  //   return { success: true, sharePricePaid: 3 }
  // }

  // getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string; quantity: number; sharePrice: number }>> {
  //   return null
  // }
  //
  // moveSharesFromRewardsAccount(
  //   toAccount: string,
  //   tickerSymbol: string,
  //   quantity: number
  // ): Promise<{ success: boolean }> {
  //   return null
  // }
}
