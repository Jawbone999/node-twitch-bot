import { logger } from "./utils/logger";
import { client, prefix } from "./services/twitchService";
import { handlers } from "./commands/index";
import { properties } from "./utils/properties";
import { replyInContext } from "./utils/chat";

// Log everyone who joins
client.on("join", (channel, username, _self) =>
  logger.info(`[${channel}] ${username} just joined`)
);

// Handle incoming messages
client.on("message", (channel, tags, message, self) => {
  if (self || !message.startsWith(prefix)) return;

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
});
