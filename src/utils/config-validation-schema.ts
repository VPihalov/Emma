import * as joi from 'joi'

export const ConfigValidationSchema = joi.object({
  HOST: joi.string().required(),
  PORT: joi.number().port(),
  CACHE: joi.boolean().default(true),
})