import { registerAs } from '@nestjs/config'

const { env } = process

export interface IAppConfig {
  HOST: string
  PORT: number
  CACHE?: boolean
  APP_LOGGING?: boolean
}

export default registerAs(
  'APP',
  (): IAppConfig => ({
    HOST: env.HOST || '127.0.0.1',
    PORT: (env.PORT || 5000) as number,
    CACHE: env.CACHE === 'true' || false,
    APP_LOGGING: env.APP_LOGGING === 'true' || false,
  })
)