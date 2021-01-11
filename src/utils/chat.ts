import { ChatUserstate } from "tmi.js";
import { client } from "../services/twitchService";
import { properties } from "./properties";

export function isSecretUser(tags: ChatUserstate) {
  return properties.bot.secretUsers.indexOf(tags.username.toLowerCase()) !== -1;
}

export function isSubscriber(tags: ChatUserstate) {
  return tags.subscriber;
}

export function isMod(tags: ChatUserstate) {
  return tags.mod;
}

export function isTrusted(tags: ChatUserstate) {
  return isSecretUser(tags) || isMod(tags);
}

export function replyInContext(
  channel: string,
  tags: ChatUserstate,
  message: string
) {
  if (tags["message-type"] === "whisper") {
    client.whisper(tags.username, message);
  } else if (tags["message-type"] === "chat") {
    client.say(channel, message);
  }
}
