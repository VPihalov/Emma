import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions } from '@nestjs/swagger'

export const swaggerCustomOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Reward Service API Doc',
}

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('Reward Service')
  .setDescription('Reward Service API documentation')
  .setVersion('1.0')
  .addTag('Reward Service')
  .build()