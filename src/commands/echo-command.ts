import { ChatUserstate } from "tmi.js";
import { isTrusted, replyInContext } from "../utils/chat";

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
