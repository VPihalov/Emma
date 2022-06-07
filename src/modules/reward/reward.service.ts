import { SHARE_PROBABILITY } from '@constants/index.const'
import { IClaimShare, IRewardConfig, IRewardList, IRewardRateList } from '@interfaces/index.interface'
import { Broker } from '@modules/brocker/broker.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { getAccountByUserId, sortASC } from '@utils/index.util'

@Injectable()
export class RewardService {
  constructor(private readonly config: ConfigService, private readonly broker: Broker) {}

  /**
   * @name getReward
   * @description get reward shares for new users or when they refer a friend
   * @param userId - unique user id, string
   * @example 6ad50cbe-9970-431e-8bf9-b37dbe778cb7
   * @return reward request result, object
   * @example { success: true }
   * */
  async getReward(userId: string): Promise<IClaimShare | string> {
    const distributedReward = this.weightedRewards(this.getSuccessRateList())
    const isMarketOpen = await this.broker.isMarketOpen()
    if (!isMarketOpen.open) return `Market is closed now. Try it later`
    const { ticker, quantity } = await this.buyRewards(await this.getTickers(), distributedReward)
    const { id: toAccount } = getAccountByUserId(userId)
    return await this.broker.moveSharesFromRewardsAccount(toAccount, ticker, quantity)
  }

  /**
   * @name getTickers
   * @description - get an array of tickers symbols available to purchase
   * @return Array - reward request result, array of object
   * @example - ['FSEE', 'FFEE']
   * */
  private async getTickers(): Promise<Array<string>> {
    const listTradableAssets = await this.broker.listTradableAssets()
    return listTradableAssets.map((ticker: { tickerSymbol: string }) => ticker.tickerSymbol)
  }

  /**
   * @name getRandomShareValue
   * @description - get random value from the range provided
   * @param min - minimum value of the range, number
   * @param max - maximum value of the range, number
   * @return - random value from the range provided, number
   * @example 5
   * */
  private getRandomShareValue(max, min): number {
    return Math.round(Math.random() * (max - min)) + min
  }

  /**
   * @name getSuccessRateList
   * @description - get success rate list
   * @return - list of rewarded rate, array
   * */
  private getSuccessRateList(): Array<IRewardRateList> {
    const rewardList = this.getRewardList()
    let rate = 0
    return rewardList.map((reward: IRewardRateList) => {
      rate = rate + reward.probability
      return { ...reward, rate }
    })
  }

  /**
   * @name buyRewards
   * @description - move shares to emma's account
   * @param tickers - minimum value of the range, string
   * @param distributedReward - random value according to probability distribution, number
   * @return - object of ticker and quantity bought, object
   * @example { ticker: 'DSEE', quantity: 1}
   * */
  async buyRewards(tickers, distributedReward) {
    for (const ticker of tickers) {
      const price = await this.broker.getLatestPrice(ticker)
      if (price.sharePrice <= distributedReward) {
        const quantity = 1
        await this.broker.buySharesInRewardsAccount(ticker, quantity)
        return { ticker, quantity }
      }
    }
  }

  /**
   * @name getRewardList
   * @description get an array of pairs of random values and probability distribution
   * @return list of pairs, array
   * @example [{ value: 5, probability: 95 }, { value: 22, probability: 3 }, { value: 198, probability: 2 }]
   * */
  private getRewardList(): Array<IRewardList> {
    const rewardValue = this.getRewardValue()
    return [
      {
        value: this.getRandomShareValue(rewardValue.lowMax, rewardValue.lowMin),
        probability: SHARE_PROBABILITY.HIGH,
      },
      {
        value: this.getRandomShareValue(rewardValue.middleMax, rewardValue.middleMin),
        probability: SHARE_PROBABILITY.MIDDLE,
      },
      {
        value: this.getRandomShareValue(rewardValue.highMax, rewardValue.highMin),
        probability: SHARE_PROBABILITY.LOW,
      },
    ]
  }

  /**
   * @name getRewardValue
   * @description get config of distributed rewards
   * @return config of distributed rewards, object
   * @example { lowMin: 3, lowMax: 10, middleMin: 11, middleMax: 25, highMin: 26, highMax: 200}
   * */
  private getRewardValue(): IRewardConfig {
    return {
      lowMin: this.config.get<number>('REWARD.LOW_MIN'),
      lowMax: this.config.get<number>('REWARD.LOW_MAX'),
      middleMin: this.config.get<number>('REWARD.MIDDLE_MIN'),
      middleMax: this.config.get<number>('REWARD.MIDDLE_MAX'),
      highMin: this.config.get<number>('REWARD.HIGH_MIN'),
      highMax: this.config.get<number>('REWARD.HIGH_MAX'),
    }
  }

  /**
   * @name weightedRewards
   * @description get weighted reward
   * @param list of pairs both value and its probability, array
   * @return weighted reward, number
   * @example 6
   * */
  weightedRewards(list): number {
    const random = Math.random() * 100
    const rewards = list.sort(sortASC)
    for (const { rate, value } of rewards) {
      if (random <= rate) return value
    }
  }
}
