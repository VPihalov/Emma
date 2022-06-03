import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { SHARE_PROBABILITY } from '../../constants/probability.const'
import { IRewardConfig, IRewardList, IRewardRateList } from '../../interfaces/reward.interface'
import { sortASC } from '../../utils/sort.util'
import { getTradableAssetsList } from '../../utils/tradable-assets.util'

@Injectable()
export class RewardService {
  constructor(private readonly config: ConfigService) {}

  getReward(): number {
    console.log(``, getTradableAssetsList())
    return this.weightedRewards(this.getSuccessRateList())
  }

  private getRandomShareValue(max, min): number {
    return Math.round(Math.random() * (max - min)) + min
  }

  private getSuccessRateList(): Array<IRewardRateList> {
    const rewardList = this.getRewardList()
    let rate = 0
    return rewardList.map((reward) => {
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
      lowMin: this.config.get<number>('REWARD.LOW_REWARD_MIN'),
      lowMax: this.config.get<number>('REWARD.LOW_REWARD_MAX'),
      middleMin: this.config.get<number>('REWARD.MIDDLE_REWARD_MIN'),
      middleMax: this.config.get<number>('REWARD.MIDDLE_REWARD_MAX'),
      highMin: this.config.get<number>('REWARD.HIGH_REWARD_MIN'),
      highMax: this.config.get<number>('REWARD.HIGH_REWARD_MAX'),
    }
  }

  private weightedRewards(list): number {
    const random = Math.random() * 100
    const rewards = list.sort(sortASC)
    for (const { rate, value } of rewards) {
      if (random <= rate) {
        return value
      }
    }
  }
}
