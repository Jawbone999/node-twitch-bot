import { logger } from "./utils/logger";
import { client, prefix } from "./services/twitchService";

client.on("message", (channel, tags, message, self) => {
  if (self || !message.startsWith(prefix)) return;

  logger.debug(message);
});
