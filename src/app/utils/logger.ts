import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf((info) => {
      return `${new Date(info.timestamp as string).toLocaleDateString('en-GB', { timeZone: 'Asia/Bangkok', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} - [${info.level}]: ${info.message}`
    })
  ),
  transports: [new transports.File({ filename: 'logs/save-other-source.log' })]
})

export default logger
