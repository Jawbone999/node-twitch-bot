import { readdirSync } from "fs";
import { join } from "path";
import { logger } from "../utils/logger";

export const handlers: any = {};

readdirSync(__dirname)
  .filter((file) => file.indexOf("-command") !== -1)
  .forEach((file) => {
    const handler = require(join(__dirname, file)).handler;
    const command = file.split("-command")[0];
    handlers[command] = handler;
  });
