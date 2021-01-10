import { ChatUserstate } from "tmi.js";
import { client } from "../services/twitchService";
import { logger } from "../utils/logger";

export const aliases = ["ping"];

export function handler(
  channel: string,
  tags: ChatUserstate,
  _params: String[]
) {
  logger.info("Received ping command.");

  if (tags["message-type"] === "whisper") {
    client.whisper(tags.username, "Pong!");
  } else if (tags["message-type"] === "chat") {
    client.say(channel, "Pong!");
  }
}
