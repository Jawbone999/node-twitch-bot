import { writeFileSync } from "fs";
import { logger } from "../utils/logger";
import { properties } from "../utils/properties";

export function updateConfig(file: string) {
  const filePath = `configs/${file}.json`;

  switch (file) {
    case "customCommands": {
      writeFileSync(filePath, JSON.stringify(properties.custom, null, 2));
      break;
    }
    case "replies": {
      writeFileSync(filePath, JSON.stringify(properties.replies, null, 2));
      break;
    }
    case "timedMessages": {
      writeFileSync(
        filePath,
        JSON.stringify(properties.timedMessages, null, 2)
      );
      break;
    }
    default: {
      logger.error(`Attempted to update invalid config ${file}`);
    }
  }
}
