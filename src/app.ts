import { logger } from "./utils/logger";
import { client, prefix } from "./services/twitchService";
import { handlers } from "./commands/index";
import { properties } from "./utils/properties";
import { replyInContext } from "./utils/chat";
import { startTimedMessages } from "./services/cronService";

// Log everyone who joins
client.on("join", (channel, username, _self) =>
  logger.info(`[${channel}] ${username} just joined`)
);

// Schedule crons
startTimedMessages();

// Handle incoming messages
client.on("message", (channel, tags, message, self) => {
  if (self) {
    return;
  }

  if (!message.startsWith(prefix)) {
    const args = message.split(" ");
    const word = args[0];
    if (Object.keys(properties.replies).indexOf(word) !== -1) {
      replyInContext(channel, tags, properties.replies[word]);
    }
  } else {
    const args = message.split(" ");
    const command = args[0].slice(1).toLowerCase();
    const params = args.slice(1);

    const handler = handlers[command];
    if (handler) {
      logger.info(`Executing ${command.toUpperCase()}...`);
      handler(channel, tags, params);
    } else if (Object.keys(properties.custom).indexOf(command) !== -1) {
      replyInContext(channel, tags, properties.custom[command]);
    } else {
      logger.warn(`Invalid command: ${command}`);
    }
  }
});
