import { ChatUserstate } from "tmi.js";
import { client } from "../services/twitchService";
import { logger } from "../utils/logger";
import { properties } from "../utils/properties";

export const aliases = ["disconnect", "dc"];

export function handler(
  _channel: string,
  tags: ChatUserstate,
  _params: String[]
) {
  if (properties.bot.secretUsers.indexOf(tags.username) !== -1) {
    logger.info("Received disconnect command.");
    client.disconnect();
  }
}
