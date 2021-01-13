import { ChatUserstate } from "tmi.js";
import { updateConfig } from "../services/fileService";
import { client } from "../services/twitchService";
import { logger } from "../utils/logger";
import { properties } from "../utils/properties";
import { addTimedMessage } from "../services/cronService";

export const aliases = [
  "schedule",
  "auto",
  "automate",
  "automessage",
  "timer",
  "timed",
  "repeat",
];

function createSchedule(
  title: string,
  message: string,
  channel: string,
  timer: string
) {
  try {
    properties.timedMessages[title] = {
      message,
      timer,
      channel,
    };
    const interval = addTimedMessage(title, message, channel, timer);
    updateConfig("timedMessages");
    return `Scheduled Message '${title}' successfully created: ${interval}`;
  } catch (err) {
    logger.error(err);
    return `Scheduled Message '${title}' could not be created.`;
  }
}

function deleteSchedule(title: string) {
  try {
    delete properties.timedMessages[title];
    updateConfig("timedMessages");
    return `Scheduled Message '${title}' successfully deleted.`;
  } catch (err) {
    logger.error(err);
    return `Scheduled Message '${title}' could not be deleted.`;
  }
}

export function handler(
  channel: string,
  tags: ChatUserstate,
  params: string[]
) {
  let msg: string;
  const operation = params[0];
  const title = params[1];
  const content = params.slice(2).join(" ").split("|");
  const message = content[0]?.trim();
  const timer = content[1]?.trim();

  switch (operation) {
    case "create":
    case "make":
    case "add": {
      msg = createSchedule(title, message, channel, timer);
      break;
    }

    case "delete":
    case "remove": {
      msg = deleteSchedule(title);
      break;
    }

    case "list":
    case "show":
    case "display": {
      const msgList = Object.keys(properties.timedMessages)
        .map((t: any) => `${t} (${properties.timedMessages[t].timer})`)
        .join(", ");
      if (msgList.length === 0) {
        msg = "There are currently no automated messages.";
      } else {
        msg = `Automated Messages: ${msgList}`;
      }
      break;
    }

    default: {
      msg = `Unknown schedule operation: ${operation}`;
    }
  }

  client.whisper(tags.username, msg);
}
