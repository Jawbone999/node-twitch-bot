import { CommonUserstate } from "tmi.js";
import { client } from "../services/twitchService";
import { logger } from "../utils/logger";

export const command = "ping";

export function handler(
  channel: string,
  _tags: CommonUserstate,
  _params: String[]
) {
  logger.info("Received ping command.");
  client.say(channel, "Pong!");
}
