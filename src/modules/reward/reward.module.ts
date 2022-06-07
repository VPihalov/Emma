import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { Broker } from '../brocker/broker.service'
import { RewardController } from './reward.controller'
import { RewardService } from './reward.service'

@Module({
  imports: [ConfigModule],
  controllers: [RewardController],
  providers: [RewardService, Broker],
})
export class RewardModule {}
