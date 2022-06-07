import { USER_ID } from '@constants/user-ids.const'
import * as dotenv from 'dotenv'
dotenv.config()
import { faker } from '@faker-js/faker'
import { BrokerServiceMock } from '@mocks/broker-service.mock'
import { Broker } from '@modules/brocker/broker.service'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import { RewardService } from './reward.service'

jest.useRealTimers()

describe('RewardService', () => {
  let rewardService: RewardService
  let config: ConfigService
  let broker: Broker

  beforeAll(async () => {
    const BrokerServiceProvider = {
      provide: Broker,
      useClass: BrokerServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardService, ConfigService, BrokerServiceProvider],
    }).compile()

    rewardService = module.get<RewardService>(RewardService)
    broker = module.get<Broker>(Broker)
    config = module.get<ConfigService>(ConfigService)
  })

  it('should be defined', () => {
    expect(rewardService).toBeDefined()
  })

  it('should call getReward method with expected params', async () => {
    const createRewardSpy = jest.spyOn(rewardService, 'getReward')
    await rewardService.getReward(USER_ID.USER_1)
    expect(createRewardSpy).toHaveBeenCalledWith(USER_ID.USER_1)
  })

  it('should return market is closed string', async () => {
    const mockFn = jest.fn(broker.isMarketOpen)
    mockFn.mockResolvedValueOnce({
      open: false,
      nextOpeningTime: faker.date.soon(0.5).toISOString(),
      nextClosingTime: faker.date.soon(1).toISOString(),
    })
    const expectedResponse = 'Market is closed now. Try it later'
    const response = await rewardService.getReward(USER_ID.USER_1)
    expect(response).toEqual(expectedResponse)
  })
})
