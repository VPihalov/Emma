import { USER_ID } from '@constants/user-ids.const'
import { Broker } from '@modules/brocker/broker.service'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

import { RewardController } from './reward.controller'
import { RewardService } from './reward.service'

jest.useRealTimers()

const createMock = () => ({
  getReward: jest.fn(() => []),
  getTickers: jest.fn(() => []),
  getRandomShareValue: jest.fn(() => {}),
  getSuccessRateList: jest.fn(() => {}),
  buyRewards: jest.fn(() => {}),
  weightedRewards: jest.fn(() => {}),
})

describe('Controller', () => {
  let rewardController: RewardController
  let rewardService: RewardService

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: RewardService,
      useFactory: createMock,
    }

    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigService, Broker],
      controllers: [RewardController],
      providers: [RewardService, ConfigService, Broker, ApiServiceProvider],
    }).compile()

    rewardController = app.get<RewardController>(RewardController)
    rewardService = app.get<RewardService>(RewardService)
  })

  describe('Reward controller', () => {
    it('should be defined', () => {
      expect(rewardController).toBeDefined()
    })
    it('should call claimFreeShare method', () => {
      expect(rewardController.claimFreeShare(USER_ID.USER_1)).not.toEqual(null)
    })
    it('should be called with user id', () => {
      const createRewardSpy = jest.spyOn(rewardController, 'claimFreeShare')
      rewardController.claimFreeShare(USER_ID.USER_1)
      expect(createRewardSpy).toHaveBeenCalledWith(USER_ID.USER_1)
    })
    it('should call getReward method', () => {
      rewardController.claimFreeShare(USER_ID.USER_1)
      expect(rewardService.getReward).toHaveBeenCalled()
      expect(rewardService.getReward).toHaveBeenCalledWith(USER_ID.USER_1)
    })
  })
})
