import { ChatUserstate } from "tmi.js";
import { client } from "../services/twitchService";
import { isSecretUser } from "../utils/chat";

export const aliases = ["disconnect", "dc", "leave"];

export function handler(
  _channel: string,
  tags: ChatUserstate,
  _params: string[]
) {
  if (isSecretUser(tags)) {
    client.disconnect();
  }
}
