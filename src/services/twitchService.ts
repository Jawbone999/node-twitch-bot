import { Client } from "tmi.js";
import { properties } from "../utils/properties";
import { logger } from "../utils/logger";

export const prefix = properties.bot.prefix;

export const client = new Client({
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: properties.bot.username,
    password: properties.bot.token,
  },
  channels: [properties.bot.channel],
  logger,
});

client
  .connect()
  .catch((err) => logger.error(`Failed to connect to Twitch: ${err}`));
