// logger.ts
import * as winston from 'winston'

const { combine, timestamp, label, printf, colorize } = winston.format

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const options: winston.LoggerOptions = {
  format: combine(colorize(), label({ label: 'MyApp' }), timestamp(), myFormat),
  transports: [new winston.transports.Console({ level: 'info' })],
}

const logger = winston.createLogger(options)

export const getLogger = (label: string) => {
  return logger.child({ label })
}
