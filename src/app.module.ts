import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { globalConfig } from './config/index.config'
import { appModules } from './modules/index.module'
import { ConfigValidationSchema } from './utils/config-validation-schema'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...globalConfig],
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      validationSchema: ConfigValidationSchema,
    }),
    ...appModules,
  ],
})
export class AppModule {}
