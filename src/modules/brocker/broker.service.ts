import { ACCOUNT_ID, DELAY } from '@constants/index.const'
import { OPERATION } from '@enums/index.enum'
import { faker } from '@faker-js/faker'
import { IAsset } from '@interfaces/index.interface'
import { assets } from '@mocks/index.mock'
import { Injectable } from '@nestjs/common'
import { buyOrSellAssets, getAccountByID, getSharePrice } from '@utils/index.util'
import { setTimeout } from 'timers/promises'

@Injectable()
export class Broker {
  async listTradableAssets(): Promise<Array<{ tickerSymbol: string }>> {
    return await setTimeout(
      DELAY,
      assets.map((asset: IAsset) => ({ tickerSymbol: asset.tickerSymbol }))
    )
  }

  async getLatestPrice(tickerSymbol: string): Promise<{ sharePrice: number }> {
    const getLatestPrice = () => {
      const asset = assets.find((asset: IAsset) => asset.tickerSymbol === tickerSymbol)
      return { sharePrice: asset.sharePrice }
    }
    return await setTimeout(DELAY, getLatestPrice())
  }

  async isMarketOpen(): Promise<{ open: boolean; nextOpeningTime: string; nextClosingTime: string }> {
    const isMarketOpen = () => ({
      open: faker.datatype.boolean(),
      nextOpeningTime: faker.date.soon(0.5).toISOString(),
      nextClosingTime: faker.date.soon(1).toISOString(),
    })
    return await setTimeout(DELAY, isMarketOpen())
  }

  async buySharesInRewardsAccount(
    tickerSymbol: string,
    quantity: number
  ): Promise<{ success: boolean; sharePricePaid: number }> {
    const buySharesInRewardsAccount = async () => {
      const emmaAccount = getAccountByID(ACCOUNT_ID.EMMA)
      emmaAccount.assets = await buyOrSellAssets({ assets: emmaAccount.assets, tickerSymbol, quantity })
      return { success: true, sharePricePaid: getSharePrice(tickerSymbol) }
    }
    return await setTimeout(DELAY, buySharesInRewardsAccount())
  }

  async getRewardsAccountPositions(): Promise<Array<{ tickerSymbol: string; quantity: number; sharePrice: number }>> {
    return await setTimeout(DELAY, getAccountByID(ACCOUNT_ID.EMMA).assets)
  }

  async moveSharesFromRewardsAccount(
    toAccount: string,
    tickerSymbol: string,
    quantity: number
  ): Promise<{ success: boolean }> {
    const moveSharesFromRewardsAccount = async () => {
      const emmaAccount = getAccountByID(ACCOUNT_ID.EMMA)
      emmaAccount.assets = await buyOrSellAssets({
        assets: emmaAccount.assets,
        tickerSymbol,
        quantity,
        operation: OPERATION.SELL,
      })
      const userAccount = getAccountByID(toAccount)
      userAccount.assets = await buyOrSellAssets({
        assets: userAccount.assets,
        tickerSymbol,
        quantity,
      })
      return { success: true }
    }

    return await setTimeout(DELAY, await moveSharesFromRewardsAccount())
  }
}
