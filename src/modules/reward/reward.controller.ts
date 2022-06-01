import { Controller, Get } from '@nestjs/common'

import { RewardService } from './reward.service'

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Get()
  getHello(): string {
    return this.rewardService.getHello()
  }
}
