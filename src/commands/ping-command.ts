import { ChatUserstate } from "tmi.js";
import { isTrusted, replyInContext } from "../utils/chat";

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
