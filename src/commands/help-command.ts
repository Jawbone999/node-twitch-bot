import { ChatUserstate } from "tmi.js";
import { client } from "../services/twitchService";
import { handlers } from "./index";

export const aliases = ["help"];

export function handler(
  _channel: string,
  tags: ChatUserstate,
  _params: string[]
) {
  const commandList = Object.keys(handlers).join(", ");
  const msg = `Commands: ${commandList}`;
  client.whisper(tags.username, msg);
}
