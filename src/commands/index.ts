import { readdirSync } from "fs";
import { join } from "path";
import { logger } from "../utils/logger";

export const handlers: any = {};

readdirSync(__dirname)
  .filter((file) => file.indexOf("-command") !== -1)
  .forEach((file) => {
    const command = require(join(__dirname, file));
    const handler = command.handler;
    const aliases = command.aliases;

    aliases.forEach((alias: string) => {
      if (handlers[alias]) {
        logger.warn(`Duplicate command alias detected: ${alias}`);
      }
      handlers[alias] = handler;
    });
  });
