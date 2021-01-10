import { transports, createLogger, format } from "winston";
import { properties } from "./properties";

// Create a new logger for the application using the config properties
export const logger = createLogger({
  exitOnError: false,
  handleExceptions: true,
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ level, message, timestamp }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
});

// If the config says to log to the console, add it to the logger
if (properties.logging.console) {
  const consoleTransport = new transports.Console(properties.logging.console);
  logger.add(consoleTransport);
}

// If the config says to log to a file, add it to the logger
if (properties.logging.file) {
  properties.logging.file.filename += ".log";
  const fileTransport = new transports.File(properties.logging.file);
  logger.add(fileTransport);
}
