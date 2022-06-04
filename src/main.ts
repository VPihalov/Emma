import { Logger, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston'

import { AppModule } from './app.module'
import { loggerConfig } from './config/index.config'
import { generateOpenAPIdoc, getConfig, setupSwagger } from './utils/bootstrap.util'

async function bootstrap(): Promise<void> {
  const logger = process.env.APP_LOGGING === 'true' ? new Logger() : false
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig()),
  })

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  app.use((request, response, next) => {
    if (logger !== false) {
      const { ip, method, path: url } = request
      const userAgent = request.get('user-agent') || ''

      response.on('finish', () => {
        const { statusCode } = response
        const contentLength = response.get('content-length')

        logger.log(`${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`)
      })
    }
    next()
  })

  app.enableVersioning({ type: VersioningType.URI, prefix: 'v' })
  const { APP_PORT } = getConfig(app)
  const document = setupSwagger(app)
  await generateOpenAPIdoc(document)
  await app.listen(APP_PORT, (): void => {
    Logger.log(`\nServer started listening on PORT: ${APP_PORT}`)
  })
}
bootstrap().catch((e): void => Logger.error(e.message, e))
