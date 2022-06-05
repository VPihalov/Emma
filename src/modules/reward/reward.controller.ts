import { Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { Broker } from '../brocker/broker.service'
import { RewardService } from './reward.service'

@ApiTags('v1')
@Controller({ version: '1' })
export class RewardController {
  constructor(private readonly rewardService: RewardService, private readonly brokerService: Broker) {}

  @Post('claim-free-share/:userId')
  claimFreeShare(@Param('userId', ParseUUIDPipe) userId: string): any {
    console.log(`userId`, userId)
    // return this.brokerService.listTradableAssets()
    return this.rewardService.getReward(userId)
  }
}
