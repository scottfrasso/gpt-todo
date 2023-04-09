"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
// logger.ts
const winston = require("winston");
const { combine, timestamp, label, printf, colorize } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const options = {
    format: combine(colorize(), label({ label: 'MyApp' }), timestamp(), myFormat),
    transports: [new winston.transports.Console({ level: 'info' })],
};
const logger = winston.createLogger(options);
const getLogger = (label) => {
    return logger.child({ label });
};
exports.getLogger = getLogger;
//# sourceMappingURL=index.js.map