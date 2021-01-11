import { ChatUserstate } from "tmi.js";
import { client } from "../services/twitchService";
import { isTrusted, replyInContext } from "../utils/chat";
import { logger } from "../utils/logger";

export const aliases = ["ping"];

export function handler(
  channel: string,
  tags: ChatUserstate,
  _params: String[]
) {
  if (isTrusted(tags)) {
    replyInContext(channel, tags, "Pong!");
  }
}
