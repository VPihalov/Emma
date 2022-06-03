import { registerAs } from '@nestjs/config'

const { env } = process

export interface IRewardConfig {
  LOW_REWARD_MIN: number
  LOW_REWARD_MAX: number
  MIDDLE_REWARD_MIN: number
  MIDDLE_REWARD_MAX: number
  HIGH_REWARD_MIN: number
  HIGH_REWARD_MAX: number
}

export default registerAs(
  'REWARD',
  (): IRewardConfig => ({
    LOW_REWARD_MIN: +(env.LOW_REWARD_MIN || 3),
    LOW_REWARD_MAX: +(env.LOW_REWARD_MAX || 10),
    MIDDLE_REWARD_MIN: +(env.MIDDLE_REWARD_MIN || 11),
    MIDDLE_REWARD_MAX: +env.MIDDLE_REWARD_MAX || 25,
    HIGH_REWARD_MIN: +env.HIGH_REWARD_MIN || 26,
    HIGH_REWARD_MAX: +env.HIGH_REWARD_MAX || 200,
  })
)
