const { createLogger, transports, format } = require('winston');
const { combine, timestamp, prettyPrint, printf } = format
require("winston-mongodb") 
const config = require("config")

const username = config.get("db.username")
const password = config.get("db.password")
const database = config.get("db.database")
const cluster = config.get("db.cluster")

const logger = createLogger({
    level: 'debug',
    format: combine(
        timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        prettyPrint(),
        printf(({ timestamp, level, message, stack }) => {
            if (stack) {
                return `${timestamp} [${level}] ${message}:\n${stack}`;
            } else {
                return `${timestamp} [${level}] ${message}`;
            }
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: "error" }),
        new transports.MongoDB({
            db: `mongodb+srv://${username}:${password}@${cluster}.jv1fs.mongodb.net/${database}?retryWrites=true&w=majority`,
            level: 'error',
            options: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
            format: combine(
                timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
                prettyPrint(),
                printf(({ timestamp, level, message, stack }) => {
                    if (stack) {
                        return `${timestamp} [${level}] ${message}:\n${stack}`;
                    } else {
                        return `${timestamp} [${level}] ${message}`;
                    }
                })
            )
        })
    ]
});

module.exports = logger;