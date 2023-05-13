import { fileURLToPath } from 'url';
import path from 'path';
import log4js from 'log4js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logDir = path.join(__dirname, 'logs');

log4js.configure({
  appenders: {
    console: { type: 'console' },
    infoFile: {type: 'file', filename: path.join(logDir, 'info.log')},
    warnFile: { type: 'file', filename: path.join(logDir, 'warn.log') },
    errorFile: { type: 'file' , filename: path.join(logDir, 'error.log') },
    consoleLogger: { type: 'logLevelFilter', appender: 'infoFile', level: 'info' },
    warnFileLogger: { type: 'logLevelFilter', appender: 'warnFile', level: 'warn' },
    errorFileLogger: { type: 'logLevelFilter', appender: 'errorFile', level: 'error' }
  }, 
  categories: {
    default: {
      appenders: ['consoleLogger', 'warnFileLogger', 'errorFileLogger'],
      level: 'all'
    }
  }
});

const logger = log4js.getLogger();

export default logger;