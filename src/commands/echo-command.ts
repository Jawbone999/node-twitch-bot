import { ChatUserstate } from "tmi.js";
import { client } from "../services/twitchService";
import { isTrusted, replyInContext } from "../utils/chat";
import { logger } from "../utils/logger";
import { properties } from "../utils/properties";

export const aliases = ["echo", "say"];

export function handler(
  channel: string,
  tags: ChatUserstate,
  params: string[]
) {
  if (isTrusted(tags)) {
    const msg = params.join(" ");
    replyInContext(channel, tags, msg);
  }
}
