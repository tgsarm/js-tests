const { createLogger, format, transports } = require('winston');
const { timestamp, combine, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

class Logger {
    constructor() {
        this.logger = createLogger({
            format: combine(
                timestamp({ format: 'HH:mm:ss'}),
                myFormat
            ),
            transports: [
                new transports.File({ filename: 'logs/log.log' })
            ]
        });
    }

    logInfo(message) {
        return this.logger.info(message);
    }

    logError(message) {
        return this.logger.error(message);
    }
}

module.exports = new Logger();