import { ChatUserstate } from "tmi.js";
import { updateConfig } from "../services/fileService";
import { client } from "../services/twitchService";
import { logger } from "../utils/logger";
import { properties } from "../utils/properties";

export const aliases = ["command"];

function createCommand(command: string, params: string[]) {
  try {
    properties.custom[command] = params.join(" ");
    updateConfig("customCommands");
    return `Command '${command}' successfully created.`;
  } catch (err) {
    logger.error(err);
    return `Command '${command}' could not be created.`;
  }
}

function deleteCommand(command: string) {
  try {
    delete properties.custom[command];
    updateConfig("customCommands");
    return `Command '${command}' successfully deleted.`;
  } catch (err) {
    logger.error(err);
    return `Command '${command}' could not be deleted.`;
  }
}

export function handler(
  channel: string,
  tags: ChatUserstate,
  params: string[]
) {
  let msg: string;
  const operation = params[0];
  const command = params[1];
  const reply = params.slice(2);

  switch (operation) {
    case "create":
    case "make":
    case "add": {
      msg = createCommand(command, reply);
      break;
    }

    case "delete":
    case "remove": {
      msg = deleteCommand(command);
      break;
    }

    case "list":
    case "show":
    case "display": {
      const cmdList = Object.keys(properties.custom).join(", ");
      if (cmdList.length === 0) {
        msg = "There are currently no custom commands.";
      } else {
        msg = `Custom Commands: ${cmdList}`;
      }
      break;
    }

    default: {
      msg = `Unknown command operation: ${operation}`;
    }
  }

  client.whisper(tags.username, msg);
}
