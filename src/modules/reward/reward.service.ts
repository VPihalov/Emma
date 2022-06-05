import { SHARE_PROBABILITY } from '@constants/index.const'
import { IRewardConfig, IRewardList, IRewardRateList } from '@interfaces/index.interface'
import { Broker } from '@modules/brocker/broker.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { sortASC } from '@utils/index.util'

@Injectable()
export class RewardService {
  constructor(private readonly config: ConfigService, private readonly broker: Broker) {}

  async getReward(userId): Promise<number | string> {
    const distributedReward = this.weightedRewards(this.getSuccessRateList())
    const isMarketOpen = await this.broker.isMarketOpen()
    if (!isMarketOpen.open) return `Market is closed now. The next open time is ${isMarketOpen.nextOpeningTime}`
    const tradableTickers = await this.getTickers()
    return distributedReward
  }

  private async getTickers(): Promise<Array<string>> {
    const listTradableAssets = await this.broker.listTradableAssets()
    return listTradableAssets.map((ticker: { tickerSymbol: string }) => ticker.tickerSymbol)
  }

  private getRandomShareValue(max, min): number {
    return Math.round(Math.random() * (max - min)) + min
  }

  private getSuccessRateList(): Array<IRewardRateList> {
    const rewardList = this.getRewardList()
    let rate = 0
    return rewardList.map((reward: IRewardRateList) => {
      rate = rate + reward.probability
      return { ...reward, rate }
    })
  }

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

  private weightedRewards(list): number {
    const random = Math.random() * 100
    const rewards = list.sort(sortASC)
    for (const { rate, value } of rewards) {
      if (random <= rate) return value
    }
  }
}
