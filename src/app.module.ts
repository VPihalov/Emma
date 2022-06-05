import { globalConfig, loggerConfig } from '@config/index.config'
import { appModules } from '@modules/index.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ConfigValidationSchemaUtil } from '@utils/config-validation-schema.util'
import { WinstonModule } from 'nest-winston'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...globalConfig],
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      validationSchema: ConfigValidationSchemaUtil,
    }),
    WinstonModule.forRoot(loggerConfig()),
    ...appModules,
  ],
})
export class AppModule {}
