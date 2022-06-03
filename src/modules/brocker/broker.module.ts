import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { Broker } from './broker.service'

@Module({
  imports: [ConfigModule],
  providers: [Broker],
})
export class BrokerModule {}
