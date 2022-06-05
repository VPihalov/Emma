import { swaggerConfig, swaggerCustomOptions } from '@config/swagger.config'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { writeFile } from 'fs/promises'
import * as path from 'path'
import * as YAML from 'yaml'

export const generateOpenAPIdoc = async (document: OpenAPIObject): Promise<void> => {
  const swaggerYamlPath = path.resolve(process.cwd(), 'openapi.yaml')
  const doc = new YAML.Document()
  doc.contents = document
  await writeFile(swaggerYamlPath, doc.toString())
}

export const setupSwagger = (app: NestExpressApplication) => {
  const document: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig)
  document.info.version = 'Emma'
  document.info.title = 'Reward Service API'
  SwaggerModule.setup('api', app, document, swaggerCustomOptions)
  return document
}

export const getConfig = (app: NestExpressApplication): Record<string, string | number> => {
  const appConfig: ConfigService = app.get<ConfigService>(ConfigService)
  const APP_PORT: number = appConfig.get<number>('APP.PORT')
  const NODE_ENV: string = appConfig.get<string>('APP.NODE_ENV')
  return { APP_PORT, NODE_ENV }
}
