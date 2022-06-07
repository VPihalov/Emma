import { registerAs } from '@nestjs/config'

const { env } = process

export interface IRewardConfig {
  LOW_MIN: number
  LOW_MAX: number
  MIDDLE_MIN: number
  MIDDLE_MAX: number
  HIGH_MIN: number
  HIGH_MAX: number
}

export default registerAs(
  'REWARD',
  (): IRewardConfig => ({
    LOW_MIN: +env.LOW_MIN || 3,
    LOW_MAX: +env.LOW_MAX || 10,
    MIDDLE_MIN: +env.MIDDLE_MIN || 11,
    MIDDLE_MAX: +env.MIDDLE_MAX || 25,
    HIGH_MIN: +env.HIGH_MIN || 26,
    HIGH_MAX: +env.HIGH_MAX || 200,
  })
)
