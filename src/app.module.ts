import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { globalConfig } from './config/index.config'

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
