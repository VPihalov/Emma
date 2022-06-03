import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { globalConfig } from './config/index.config'
import { appModules } from './modules/index.module'
import { ConfigValidationSchemaUtil } from './utils/config-validation-schema.util'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...globalConfig],
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      validationSchema: ConfigValidationSchemaUtil,
    }),
    ...appModules,
  ],
})
export class AppModule {}
