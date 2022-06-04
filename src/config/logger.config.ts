import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities'
import * as winston from 'winston'

export const loggerConfig = () => ({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.splat(),
        winston.format.align(),
        winston.format.cli({
          level: false,
          all: true,
          message: true,
          colors: {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            debug: 'cyan',
          },
        }),
        nestWinstonModuleUtilities.format.nestLike('REWARD-EMMA', { prettyPrint: true })
      ),
    }),
  ],
})
