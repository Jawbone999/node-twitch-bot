import { ChatUserstate } from "tmi.js";
import { updateConfig } from "../services/fileService";
import { client } from "../services/twitchService";
import { logger } from "../utils/logger";
import { properties } from "../utils/properties";

export const aliases = ["reply", "replies"];

function createReply(trigger: string, reply: string) {
  try {
    properties.replies[trigger] = reply;
    updateConfig("replies");
    return `Reply '${trigger}' successfully created.`;
  } catch (err) {
    logger.error(err);
    return `Reply '${trigger}' could not be created.`;
  }
}

function deleteReply(trigger: string) {
  try {
    delete properties.replies[trigger];
    updateConfig("replies");
    return `Reply '${trigger}' successfully deleted.`;
  } catch (err) {
    logger.error(err);
    return `Reply '${trigger}' could not be deleted.`;
  }
}

export function handler(
  _channel: string,
  tags: ChatUserstate,
  params: string[]
) {
  let msg: string;
  const operation = params[0];
  const trigger = params[1];
  const reply = params.slice(2).join(" ");

  switch (operation) {
    case "create":
    case "make":
    case "add": {
      msg = createReply(trigger, reply);
      break;
    }

    case "delete":
    case "remove": {
      msg = deleteReply(trigger);
      break;
    }

    case "list":
    case "show":
    case "display": {
      const replyList = Object.keys(properties.replies).join(", ");
      if (replyList.length === 0) {
        msg = "There are currently no automated replies.";
      } else {
        msg = `Automated Replies: ${replyList}`;
      }
      break;
    }

    default: {
      msg = `Unknown reply operation: ${operation}`;
    }
  }

  client.whisper(tags.username, msg);
}
