import chalk from 'chalk'
import { Logger, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { generateOpenAPIdoc, getConfig, setupSwagger } from './utils/bootstrap.util'

async function bootstrap(): Promise<void> {

  const logger = process.env.APP_LOGGING === 'true' ? new Logger() : false
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger,
  })

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
  const { APP_PORT, NODE_ENV } = getConfig(app)
  const document = setupSwagger(app)
  await generateOpenAPIdoc(document)
  await app.listen(APP_PORT, (): void => {
    Logger.log(chalk.hex('#FFD700').bold(`\nServer started listening on PORT: ${APP_PORT} \nNODE_ENV: ${NODE_ENV}`))
  })
}
bootstrap().catch((e): void => Logger.error(e.message, e))
