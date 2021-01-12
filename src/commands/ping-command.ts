import { ChatUserstate } from "tmi.js";
import { isTrusted, replyInContext } from "../utils/chat";

export const aliases = ["ping"];

export function handler(
  channel: string,
  tags: ChatUserstate,
  _params: string[]
) {
  if (isTrusted(tags)) {
    replyInContext(channel, tags, "Pong!");
  }
}
