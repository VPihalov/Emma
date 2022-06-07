import * as joi from 'joi'

export const ConfigValidationSchemaUtil = joi.object({
  HOST: joi.string().required(),
  PORT: joi.number().port(),
  CACHE: joi.boolean().default(true),
  APP_LOGGING: joi.boolean().default(true),
  LOW_MIN: joi.number().min(3),
  LOW_MAX: joi.number().max(10),
  MIDDLE_MIN: joi.number().min(11),
  MIDDLE_MAX: joi.number().max(25),
  HIGH_MIN: joi.number().min(26),
  HIGH_MAX: joi.number().max(200),
})
