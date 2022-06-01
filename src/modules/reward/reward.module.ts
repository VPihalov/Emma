import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RewardController } from './reward.controller'
import { RewardService } from './reward.service'

@Module({
  imports: [ConfigModule],
  controllers: [RewardController],
  providers: [RewardService],
})
export class RewardModule {}
