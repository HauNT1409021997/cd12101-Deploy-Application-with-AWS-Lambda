import winston from 'winston'

/**
 * Create a logger instance to write log messages in JSON format.
 *
 * @param loggerName - a name of a logger that will be added to all messages
 */
export default function createLogger(loggerName, logLevel = 'info') {
  const logDir = '/tmp/logs'

  return winston.createLogger({
    level: logLevel,
    format: winston.format.json(),
    defaultMeta: { name: loggerName },
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `${logDir}/app.log` }),
      new winston.transports.File({
        filename: `${logDir}/error.log`,
        level: 'error'
      })
    ]
  })
}
